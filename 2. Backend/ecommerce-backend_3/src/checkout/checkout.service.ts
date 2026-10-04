import { Injectable, Logger } from '@nestjs/common';
import { CheckoutStatus, Prisma, PromotionDiscountType } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { OutboxService } from '../catalog/events/outbox.service';
import { CheckoutEventType } from './checkout-event-types';
import { CartService } from '../cart/cart.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CheckoutResponseDto, PaymentIntentContractDto } from './dto/checkout-response.dto';

const CHECKOUT_TTL_MINUTES = 15;

// Explicit, closed state machine. COMPLETED is reserved for the future
// payment/order milestone — nothing in this milestone transitions into
// it (see FINAL EXECUTION DIRECTIVE / EXPLICIT OUT-OF-SCOPE BOUNDARIES).
const CANCELLABLE_STATES: CheckoutStatus[] = [
  CheckoutStatus.CREATED,
  CheckoutStatus.VALIDATING,
  CheckoutStatus.RESERVED,
  CheckoutStatus.AWAITING_PAYMENT,
];
const EXPIRABLE_STATES: CheckoutStatus[] = [
  CheckoutStatus.CREATED,
  CheckoutStatus.VALIDATING,
  CheckoutStatus.RESERVED,
  CheckoutStatus.AWAITING_PAYMENT,
];

interface ResolvedLine {
  sellerOfferId: string;
  inventoryItemId: string;
  quantity: number;
  unitPriceMinorUnits: bigint;
  discountMinorUnits: bigint;
  currency: string;
}

type CheckoutWithItems = Prisma.CheckoutGetPayload<{ include: { items: true } }>;

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly inventoryService: InventoryService,
    private readonly outboxService: OutboxService,
  ) {}

  /**
   * Idempotent by (customerId, idempotencyKey): a retried request with
   * the same key always returns the same checkout, never creating a
   * second one or a second set of reservations.
   */
  async create(customerId: string, dto: CreateCheckoutDto): Promise<CheckoutWithItems> {
    const existing = await this.prisma.checkout.findUnique({
      where: { customerId_idempotencyKey: { customerId, idempotencyKey: dto.idempotencyKey } },
      include: { items: true },
    });
    if (existing) {
      return existing;
    }

    const cart = await this.cartService.getOrCreateActiveCart({ customerId });
    if (cart.items.length === 0) {
      throw AppException.validationFailed('Cannot check out an empty cart.');
    }

    const lines = await this.resolveLines(
      cart.items.map((i: { sellerOfferId: string; quantity: number }) => ({
        sellerOfferId: i.sellerOfferId,
        quantity: i.quantity,
      })),
    );

    const currencies = new Set(lines.map((l) => l.currency));
    if (currencies.size > 1) {
      throw AppException.validationFailed(
        'All items in a single checkout must share one currency.',
      );
    }
    const currency = lines[0].currency;

    const subtotal = lines.reduce((sum, l) => sum + l.unitPriceMinorUnits * BigInt(l.quantity), 0n);
    const discount = lines.reduce((sum, l) => sum + l.discountMinorUnits, 0n);
    const total = subtotal - discount;

    let checkout: CheckoutWithItems;
    try {
      checkout = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const created = await tx.checkout.create({
          data: {
            customerId,
            cartId: cart.id,
            cartRevisionAtCreation: cart.revision,
            idempotencyKey: dto.idempotencyKey,
            status: CheckoutStatus.CREATED,
            currency,
            subtotalMinorUnits: subtotal,
            discountMinorUnits: discount,
            totalMinorUnits: total,
            expiresAt: new Date(Date.now() + CHECKOUT_TTL_MINUTES * 60 * 1000),
            items: {
              create: lines.map((l) => ({
                sellerOfferId: l.sellerOfferId,
                quantity: l.quantity,
                unitPriceMinorUnits: l.unitPriceMinorUnits,
                discountMinorUnits: l.discountMinorUnits,
                currency: l.currency,
              })),
            },
          },
          include: { items: true },
        });

        await this.outboxService.record(tx, {
          eventType: CheckoutEventType.CHECKOUT_CREATED,
          aggregateType: 'Checkout',
          aggregateId: created.id,
          payload: {
            checkoutId: created.id,
            customerId,
            totalMinorUnits: total.toString(),
            currency,
          },
        });

        return created;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Lost a race against a concurrent identical retry — the winner
        // already created the checkout; return it (idempotent).
        const raceWinner = await this.prisma.checkout.findUnique({
          where: { customerId_idempotencyKey: { customerId, idempotencyKey: dto.idempotencyKey } },
          include: { items: true },
        });
        if (raceWinner) {
          return raceWinner;
        }
      }
      throw error;
    }

    return this.reserveInventoryOrCompensate(checkout, lines);
  }

  /**
   * Reserves inventory for every line. If any reservation fails partway
   * through, every reservation already acquired for THIS checkout is
   * released (compensation) and the checkout is marked FAILED — never
   * left holding partial reservations because a later line failed. See
   * CHECKOUT FAILURE COMPENSATION.
   */
  private async reserveInventoryOrCompensate(
    checkout: CheckoutWithItems,
    lines: ResolvedLine[],
  ): Promise<CheckoutWithItems> {
    const acquiredReservationIds: string[] = [];

    try {
      for (const line of lines) {
        const reservation = await this.inventoryService.reserveForCheckout(
          checkout.id,
          line.inventoryItemId,
          line.quantity,
        );
        acquiredReservationIds.push(reservation.id);

        await this.prisma.checkoutItem.update({
          where: {
            checkoutId_sellerOfferId: {
              checkoutId: checkout.id,
              sellerOfferId: line.sellerOfferId,
            },
          },
          data: { inventoryReservationId: reservation.id },
        });
      }
    } catch (error) {
      for (const reservationId of acquiredReservationIds) {
        await this.inventoryService.releaseReservation(reservationId).catch(() => {
          this.logger.error(
            `Failed to compensate reservation ${reservationId} for failed checkout ${checkout.id}.`,
          );
        });
      }

      const failureReason =
        error instanceof AppException ? error.message : 'Inventory reservation failed.';
      await this.transitionAndRecord(
        checkout.id,
        CheckoutStatus.FAILED,
        CheckoutEventType.CHECKOUT_VALIDATION_FAILED,
        {
          failureReason,
        },
      );

      throw error;
    }

    return this.transitionAndRecord(
      checkout.id,
      CheckoutStatus.AWAITING_PAYMENT,
      CheckoutEventType.CHECKOUT_READY_FOR_PAYMENT,
      {},
    );
  }

  /**
   * Validates item availability, resolves the current authoritative
   * price, and applies the single best currently-active promotion (no
   * stacking — see docs/CHECKOUT.md) for every requested line. Never
   * trusts anything about price/discount from the cart or client.
   */
  private async resolveLines(
    requested: { sellerOfferId: string; quantity: number }[],
  ): Promise<ResolvedLine[]> {
    const lines: ResolvedLine[] = [];

    for (const { sellerOfferId, quantity } of requested) {
      const offer = await this.prisma.sellerOffer.findUnique({ where: { id: sellerOfferId } });
      if (!offer || offer.status !== 'ACTIVE') {
        throw AppException.itemUnavailable(`Offer ${sellerOfferId} is no longer available.`);
      }

      const price = await this.prisma.price.findFirst({
        where: { sellerOfferId, isActive: true, effectiveTo: null },
      });
      if (!price) {
        throw AppException.itemUnavailable(`Offer ${sellerOfferId} has no active price.`);
      }

      const inventoryItem = await this.prisma.inventoryItem.findUnique({
        where: { sellerOfferId },
      });
      if (!inventoryItem) {
        throw AppException.itemUnavailable(`Offer ${sellerOfferId} has no inventory record.`);
      }
      if (inventoryItem.onHandQuantity - inventoryItem.reservedQuantity < quantity) {
        throw AppException.insufficientInventory(
          `Insufficient available inventory for offer ${sellerOfferId}.`,
        );
      }

      const lineSubtotal = price.amountMinorUnits * BigInt(quantity);
      const discount = await this.computeBestDiscount(sellerOfferId, lineSubtotal);

      lines.push({
        sellerOfferId,
        inventoryItemId: inventoryItem.id,
        quantity,
        unitPriceMinorUnits: price.amountMinorUnits,
        discountMinorUnits: discount,
        currency: price.currency,
      });
    }

    return lines;
  }

  private async computeBestDiscount(sellerOfferId: string, lineSubtotal: bigint): Promise<bigint> {
    const now = new Date();
    const promotionLinks = await this.prisma.promotionOffer.findMany({
      where: { sellerOfferId },
      include: { promotion: true },
    });

    let best = 0n;
    for (const link of promotionLinks) {
      const promo = link.promotion;
      if (!promo.isActive || promo.startAt > now || promo.endAt < now) {
        continue;
      }
      if (promo.usageLimit !== null && promo.timesUsed >= promo.usageLimit) {
        continue;
      }

      const candidate =
        promo.discountType === PromotionDiscountType.PERCENTAGE
          ? (lineSubtotal * BigInt(promo.discountValue)) / 100n
          : BigInt(promo.discountValue);

      const capped = candidate > lineSubtotal ? lineSubtotal : candidate;
      if (capped > best) {
        best = capped;
      }
    }

    return best;
  }

  // -------------------------------------------------------------------
  // Cancellation / expiration
  // -------------------------------------------------------------------

  async cancel(customerId: string, checkoutId: string): Promise<CheckoutWithItems> {
    const checkout = await this.requireOwned(customerId, checkoutId);

    if (checkout.status === CheckoutStatus.CANCELLED) {
      return checkout; // idempotent
    }
    if (checkout.status === CheckoutStatus.COMPLETED) {
      throw AppException.checkoutAlreadyCompleted();
    }
    if (!CANCELLABLE_STATES.includes(checkout.status)) {
      throw AppException.invalidStateTransition(
        `Cannot cancel a checkout in state ${checkout.status}.`,
      );
    }

    await this.releaseAllReservations(checkoutId);
    return this.transitionAndRecord(
      checkoutId,
      CheckoutStatus.CANCELLED,
      CheckoutEventType.CHECKOUT_CANCELLED,
      {},
    );
  }

  /** Used by the expiration worker. Idempotent, bounded batches upstream via findExpiredActiveCheckouts. */
  async expire(checkoutId: string): Promise<CheckoutWithItems> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id: checkoutId },
      include: { items: true },
    });
    if (!checkout) {
      throw AppException.notFound('Checkout not found.');
    }
    if (checkout.status === CheckoutStatus.EXPIRED) {
      return checkout; // idempotent
    }
    if (!EXPIRABLE_STATES.includes(checkout.status)) {
      return checkout; // already terminal in some other way; nothing to do
    }

    await this.releaseAllReservations(checkoutId);
    return this.transitionAndRecord(
      checkoutId,
      CheckoutStatus.EXPIRED,
      CheckoutEventType.CHECKOUT_EXPIRED,
      {},
    );
  }

  async findExpiredActiveCheckouts(batchSize = 100) {
    return this.prisma.checkout.findMany({
      where: { status: { in: EXPIRABLE_STATES }, expiresAt: { lt: new Date() } },
      take: batchSize,
    });
  }

  private async releaseAllReservations(checkoutId: string): Promise<void> {
    const reservations = await this.prisma.inventoryReservation.findMany({
      where: { checkoutId, state: 'ACTIVE' },
    });
    for (const reservation of reservations) {
      await this.inventoryService.releaseReservation(reservation.id).catch(() => {
        this.logger.error(
          `Failed to release reservation ${reservation.id} for checkout ${checkoutId}.`,
        );
      });
    }
  }

  private async transitionAndRecord(
    checkoutId: string,
    status: CheckoutStatus,
    eventType: CheckoutEventType,
    extra: { failureReason?: string },
  ): Promise<CheckoutWithItems> {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updated = await tx.checkout.update({
        where: { id: checkoutId },
        data: { status, failureReason: extra.failureReason },
        include: { items: true },
      });

      await this.outboxService.record(tx, {
        eventType,
        aggregateType: 'Checkout',
        aggregateId: checkoutId,
        payload: { checkoutId, status },
      });

      return updated;
    });
  }

  // -------------------------------------------------------------------
  // Reads
  // -------------------------------------------------------------------

  async requireOwned(customerId: string, checkoutId: string): Promise<CheckoutWithItems> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id: checkoutId },
      include: { items: true },
    });
    if (!checkout || checkout.customerId !== customerId) {
      throw AppException.notFound('Checkout not found.');
    }
    return checkout;
  }

  /** The stable seam a future payment domain consumes — see EXTERNAL PAYMENT BOUNDARY. Never a provider SDK type. */
  buildPaymentIntentContract(checkout: CheckoutWithItems): PaymentIntentContractDto {
    return {
      checkoutId: checkout.id,
      amountMinorUnits: checkout.totalMinorUnits.toString(),
      currency: checkout.currency,
      customerId: checkout.customerId,
      idempotencyKey: checkout.idempotencyKey,
      metadata: { cartId: checkout.cartId },
    };
  }

  toResponseDto(checkout: CheckoutWithItems): CheckoutResponseDto {
    return {
      id: checkout.id,
      customerId: checkout.customerId,
      cartId: checkout.cartId,
      status: checkout.status,
      currency: checkout.currency,
      subtotalMinorUnits: checkout.subtotalMinorUnits.toString(),
      discountMinorUnits: checkout.discountMinorUnits.toString(),
      totalMinorUnits: checkout.totalMinorUnits.toString(),
      failureReason: checkout.failureReason,
      items: checkout.items.map(
        (i: {
          id: string;
          sellerOfferId: string;
          quantity: number;
          unitPriceMinorUnits: bigint;
          discountMinorUnits: bigint;
          currency: string;
          inventoryReservationId: string | null;
        }) => ({
          id: i.id,
          sellerOfferId: i.sellerOfferId,
          quantity: i.quantity,
          unitPriceMinorUnits: i.unitPriceMinorUnits.toString(),
          discountMinorUnits: i.discountMinorUnits.toString(),
          currency: i.currency,
          inventoryReservationId: i.inventoryReservationId,
        }),
      ),
      expiresAt: checkout.expiresAt,
      createdAt: checkout.createdAt,
      updatedAt: checkout.updatedAt,
    };
  }
}
