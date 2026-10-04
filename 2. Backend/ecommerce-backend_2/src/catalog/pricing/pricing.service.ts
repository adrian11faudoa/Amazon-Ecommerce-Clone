import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import { isNonNegativeMinorUnits, isValidCurrency } from '../common/money.util';
import { CreatePriceDto } from './dto/create-price.dto';
import { PriceResponseDto } from './dto/price-response.dto';

@Injectable()
export class PricingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Activates a new price for an offer, atomically deactivating whatever
   * was previously active — this is how "no overlapping active price
   * definitions" (PRICE VALIDATION) is enforced: at most one row with
   * (isActive=true, effectiveTo=null) can exist per offer at any time,
   * by construction of this transaction, not by a database constraint
   * alone (Postgres has no native "at most one true" constraint without
   * a partial unique index, which we also add for defense in depth — see
   * the migration).
   */
  async activatePrice(
    actorUserId: string,
    organizationId: string,
    offerId: string,
    dto: CreatePriceDto,
  ) {
    const offer = await this.prisma.sellerOffer.findUnique({ where: { id: offerId } });
    if (!offer || offer.organizationId !== organizationId) {
      throw AppException.notFound('Offer not found.');
    }

    const currency = dto.currency.toUpperCase();
    if (!isValidCurrency(currency)) {
      throw AppException.validationFailed(`Unsupported currency: ${dto.currency}.`);
    }

    let amountMinorUnits: bigint;
    try {
      amountMinorUnits = BigInt(dto.amountMinorUnits);
    } catch {
      throw AppException.validationFailed('amountMinorUnits must be a valid integer string.');
    }
    if (!isNonNegativeMinorUnits(amountMinorUnits)) {
      throw AppException.validationFailed('amountMinorUnits must not be negative.');
    }

    const effectiveFrom = dto.effectiveFrom ? new Date(dto.effectiveFrom) : new Date();

    const price = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const previousActive = await tx.price.findFirst({
        where: { sellerOfferId: offerId, isActive: true, effectiveTo: null },
      });
      if (previousActive) {
        await tx.price.update({
          where: { id: previousActive.id },
          data: { isActive: false, effectiveTo: effectiveFrom },
        });
      }

      const created = await tx.price.create({
        data: {
          sellerOfferId: offerId,
          amountMinorUnits,
          currency,
          effectiveFrom,
          isActive: true,
        },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.PRICE_CHANGED,
        aggregateType: 'SellerOffer',
        aggregateId: offerId,
        payload: {
          offerId,
          organizationId,
          amountMinorUnits: created.amountMinorUnits.toString(),
          currency: created.currency,
          effectiveFrom: created.effectiveFrom.toISOString(),
        },
      });

      return created;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.price.activated',
      targetType: 'Price',
      targetId: price.id,
      outcome: 'SUCCESS',
      metadata: {
        organizationId,
        offerId,
        amountMinorUnits: price.amountMinorUnits.toString(),
        currency: price.currency,
      },
    });

    return price;
  }

  async history(organizationId: string, offerId: string) {
    const offer = await this.prisma.sellerOffer.findUnique({ where: { id: offerId } });
    if (!offer || offer.organizationId !== organizationId) {
      throw AppException.notFound('Offer not found.');
    }
    return this.prisma.price.findMany({
      where: { sellerOfferId: offerId },
      orderBy: { effectiveFrom: 'desc' },
    });
  }

  toResponseDto(price: {
    id: string;
    sellerOfferId: string;
    amountMinorUnits: bigint;
    currency: string;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    isActive: boolean;
    createdAt: Date;
  }): PriceResponseDto {
    return {
      id: price.id,
      sellerOfferId: price.sellerOfferId,
      amountMinorUnits: price.amountMinorUnits.toString(),
      currency: price.currency,
      effectiveFrom: price.effectiveFrom,
      effectiveTo: price.effectiveTo,
      isActive: price.isActive,
      createdAt: price.createdAt,
    };
  }
}
