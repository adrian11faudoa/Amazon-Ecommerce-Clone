import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CartStatus, OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { OutboxService } from '../catalog/events/outbox.service';
import { CartEventType } from './cart-event-types';
import { CartOwner, isCustomerOwner } from './cart-owner';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemWarningDto, CartResponseDto } from './dto/cart-response.dto';

const ANONYMOUS_CART_TTL_DAYS = 30;

type CartWithItems = Prisma.CartGetPayload<{
  include: { items: { include: { sellerOffer: true } } };
}>;

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
  ) {}

  /**
   * Resolves (and creates if necessary) the active cart for the given
   * owner. This is the ONLY entry point that establishes cart identity —
   * callers never pass a cartId directly from the client for the
   * "current cart" flows, which is what makes cross-customer cart
   * access structurally impossible rather than merely checked.
   */
  async getOrCreateActiveCart(owner: CartOwner): Promise<CartWithItems> {
    const where = isCustomerOwner(owner)
      ? { customerId: owner.customerId, status: CartStatus.ACTIVE }
      : { anonymousToken: owner.anonymousToken, status: CartStatus.ACTIVE };

    const existing = await this.prisma.cart.findFirst({
      where,
      include: { items: { include: { sellerOffer: true } } },
    });
    if (existing) {
      return existing;
    }

    const created = await this.prisma.cart.create({
      data: isCustomerOwner(owner)
        ? { customerId: owner.customerId, status: CartStatus.ACTIVE }
        : {
            anonymousToken: owner.anonymousToken,
            status: CartStatus.ACTIVE,
            expiresAt: new Date(Date.now() + ANONYMOUS_CART_TTL_DAYS * 24 * 60 * 60 * 1000),
          },
      include: { items: { include: { sellerOffer: true } } },
    });
    return created;
  }

  static generateAnonymousToken(): string {
    return randomUUID();
  }

  /** Ownership check for operations addressed by cartId (item mutations). 404s on mismatch, never 403 — see PRIVACY. */
  async requireOwned(owner: CartOwner, cartId: string): Promise<CartWithItems> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { sellerOffer: true } } },
    });
    const belongsToOwner = isCustomerOwner(owner)
      ? cart?.customerId === owner.customerId
      : cart?.anonymousToken === owner.anonymousToken;

    if (!cart || !belongsToOwner) {
      throw AppException.notFound('Cart not found.');
    }
    return cart;
  }

  async addItem(owner: CartOwner, cartId: string, dto: AddCartItemDto): Promise<CartWithItems> {
    await this.requireOwned(owner, cartId);

    const offer = await this.prisma.sellerOffer.findUnique({ where: { id: dto.sellerOfferId } });
    if (!offer) {
      throw AppException.itemUnavailable('This item is no longer available.');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const existingItem = await tx.cartItem.findUnique({
        where: { cartId_sellerOfferId: { cartId, sellerOfferId: dto.sellerOfferId } },
      });

      const item = existingItem
        ? await tx.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + dto.quantity },
          })
        : await tx.cartItem.create({
            data: { cartId, sellerOfferId: dto.sellerOfferId, quantity: dto.quantity },
          });

      const cart = await tx.cart.update({
        where: { id: cartId },
        data: { revision: { increment: 1 } },
        include: { items: { include: { sellerOffer: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: existingItem ? CartEventType.CART_ITEM_UPDATED : CartEventType.CART_ITEM_ADDED,
        aggregateType: 'Cart',
        aggregateId: cartId,
        payload: {
          cartId,
          cartItemId: item.id,
          sellerOfferId: dto.sellerOfferId,
          quantity: item.quantity,
        },
      });

      return cart;
    });
  }

  async updateItemQuantity(
    owner: CartOwner,
    cartId: string,
    cartItemId: string,
    dto: UpdateCartItemDto,
  ): Promise<CartWithItems> {
    const cart = await this.requireOwned(owner, cartId);
    const item = cart.items.find((i: { id: string }) => i.id === cartItemId);
    if (!item) {
      throw AppException.notFound('Cart item not found.');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.cartItem.update({ where: { id: cartItemId }, data: { quantity: dto.quantity } });
      const updatedCart = await tx.cart.update({
        where: { id: cartId },
        data: { revision: { increment: 1 } },
        include: { items: { include: { sellerOffer: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: CartEventType.CART_ITEM_UPDATED,
        aggregateType: 'Cart',
        aggregateId: cartId,
        payload: { cartId, cartItemId, quantity: dto.quantity },
      });

      return updatedCart;
    });
  }

  async removeItem(owner: CartOwner, cartId: string, cartItemId: string): Promise<CartWithItems> {
    const cart = await this.requireOwned(owner, cartId);
    const item = cart.items.find((i: { id: string }) => i.id === cartItemId);
    if (!item) {
      throw AppException.notFound('Cart item not found.');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.cartItem.delete({ where: { id: cartItemId } });
      const updatedCart = await tx.cart.update({
        where: { id: cartId },
        data: { revision: { increment: 1 } },
        include: { items: { include: { sellerOffer: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: CartEventType.CART_ITEM_REMOVED,
        aggregateType: 'Cart',
        aggregateId: cartId,
        payload: { cartId, cartItemId },
      });

      return updatedCart;
    });
  }

  async clear(owner: CartOwner, cartId: string): Promise<CartWithItems> {
    await this.requireOwned(owner, cartId);

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.cartItem.deleteMany({ where: { cartId } });
      const updatedCart = await tx.cart.update({
        where: { id: cartId },
        data: { revision: { increment: 1 } },
        include: { items: { include: { sellerOffer: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: CartEventType.CART_UPDATED,
        aggregateType: 'Cart',
        aggregateId: cartId,
        payload: { cartId, cleared: true },
      });

      return updatedCart;
    });
  }

  /**
   * Deterministic merge: matching sellerOffer lines have their
   * quantities summed (capped at the per-line maximum); anonymous-only
   * lines are copied over. No customer item is ever discarded. The
   * anonymous cart is marked MERGED (not deleted) so it remains
   * available for analytics/audit.
   */
  async mergeAnonymousIntoCustomerCart(
    customerId: string,
    anonymousToken: string,
  ): Promise<CartWithItems> {
    const anonymousCart = await this.prisma.cart.findFirst({
      where: { anonymousToken, status: CartStatus.ACTIVE },
      include: { items: true },
    });
    if (!anonymousCart) {
      // Nothing to merge is not an error — the customer's own cart is authoritative.
      return this.getOrCreateActiveCart({ customerId });
    }

    const customerCart = await this.getOrCreateActiveCart({ customerId });

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const anonymousItem of anonymousCart.items) {
        const existing = await tx.cartItem.findUnique({
          where: {
            cartId_sellerOfferId: {
              cartId: customerCart.id,
              sellerOfferId: anonymousItem.sellerOfferId,
            },
          },
        });
        if (existing) {
          await tx.cartItem.update({
            where: { id: existing.id },
            data: { quantity: Math.min(existing.quantity + anonymousItem.quantity, 100) },
          });
        } else {
          await tx.cartItem.create({
            data: {
              cartId: customerCart.id,
              sellerOfferId: anonymousItem.sellerOfferId,
              quantity: anonymousItem.quantity,
            },
          });
        }
      }

      await tx.cart.update({
        where: { id: anonymousCart.id },
        data: { status: CartStatus.MERGED },
      });
      const mergedCart = await tx.cart.update({
        where: { id: customerCart.id },
        data: { revision: { increment: 1 } },
        include: { items: { include: { sellerOffer: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: CartEventType.CART_UPDATED,
        aggregateType: 'Cart',
        aggregateId: customerCart.id,
        payload: { cartId: customerCart.id, mergedFromCartId: anonymousCart.id },
      });

      return mergedCart;
    });
  }

  /**
   * Read-only augmentation: flags items whose underlying offer is no
   * longer ACTIVE. Never mutates cart state on read — see CART
   * VALIDATION ("do not mutate cart state merely because a read
   * discovers stale information").
   */
  private buildWarnings(cart: CartWithItems): CartItemWarningDto[] {
    const warnings: CartItemWarningDto[] = [];
    for (const item of cart.items) {
      if (item.sellerOffer.status !== OfferStatus.ACTIVE) {
        warnings.push({
          cartItemId: item.id,
          code: 'ITEM_UNAVAILABLE',
          message: 'This item is no longer available for purchase.',
        });
      }
    }
    return warnings;
  }

  toResponseDto(cart: CartWithItems): CartResponseDto {
    return {
      id: cart.id,
      customerId: cart.customerId,
      anonymousToken: cart.anonymousToken,
      status: cart.status,
      revision: cart.revision,
      items: cart.items.map(
        (i: {
          id: string;
          sellerOfferId: string;
          quantity: number;
          addedAt: Date;
          updatedAt: Date;
        }) => ({
          id: i.id,
          sellerOfferId: i.sellerOfferId,
          quantity: i.quantity,
          addedAt: i.addedAt,
          updatedAt: i.updatedAt,
        }),
      ),
      warnings: this.buildWarnings(cart),
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
