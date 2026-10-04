import { Injectable } from '@nestjs/common';
import { Prisma, PromotionDiscountType } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionResponseDto } from './dto/promotion-response.dto';

type PromotionWithOffers = Prisma.PromotionGetPayload<{ include: { offers: true } }>;

@Injectable()
export class PromotionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  async create(actorUserId: string, organizationId: string, dto: CreatePromotionDto) {
    const startAt = new Date(dto.startAt);
    const endAt = new Date(dto.endAt);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || startAt >= endAt) {
      throw AppException.invalidPromotion('startAt must be a valid date strictly before endAt.');
    }

    if (dto.discountType === 'PERCENTAGE' && (dto.discountValue < 1 || dto.discountValue > 100)) {
      throw AppException.invalidPromotion('A percentage discount must be between 1 and 100.');
    }
    if (dto.discountType === 'FIXED_AMOUNT' && dto.discountValue <= 0) {
      throw AppException.invalidPromotion('A fixed-amount discount must be a positive integer.');
    }

    // Seller ownership of every attached offer is re-derived from the
    // database, never trusted from the request alone.
    const offers = await this.prisma.sellerOffer.findMany({
      where: { id: { in: dto.offerIds } },
    });
    const ownedIds = new Set(
      offers
        .filter((o: { organizationId: string }) => o.organizationId === organizationId)
        .map((o: { id: string }) => o.id),
    );
    const unowned = dto.offerIds.filter((id) => !ownedIds.has(id));
    if (unowned.length > 0) {
      throw AppException.organizationAccessDenied(
        'One or more offers do not belong to this seller organization.',
      );
    }

    const promotion = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const created = await tx.promotion.create({
        data: {
          organizationId,
          name: dto.name,
          discountType: dto.discountType as PromotionDiscountType,
          discountValue: dto.discountValue,
          startAt,
          endAt,
          usageLimit: dto.usageLimit,
          isActive: false,
          offers: {
            create: dto.offerIds.map((sellerOfferId) => ({ sellerOfferId })),
          },
        },
        include: { offers: true },
      });

      return created;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.promotion.created',
      targetType: 'Promotion',
      targetId: promotion.id,
      outcome: 'SUCCESS',
      metadata: { organizationId, offerIds: dto.offerIds },
    });

    return promotion;
  }

  async setActive(
    actorUserId: string,
    organizationId: string,
    promotionId: string,
    isActive: boolean,
  ) {
    const promotion = await this.requireOwned(organizationId, promotionId);

    if (isActive) {
      const now = new Date();
      if (promotion.endAt.getTime() <= now.getTime()) {
        throw AppException.invalidPromotion(
          'Cannot activate a promotion whose end date has already passed.',
        );
      }
      if (promotion.usageLimit !== null && promotion.timesUsed >= promotion.usageLimit) {
        throw AppException.invalidPromotion(
          'Cannot activate a promotion that has reached its usage limit.',
        );
      }
    }

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.promotion.update({
        where: { id: promotionId },
        data: { isActive },
        include: { offers: true },
      });

      await this.outboxService.record(tx, {
        eventType: isActive
          ? CatalogEventType.PROMOTION_ACTIVATED
          : CatalogEventType.PROMOTION_DEACTIVATED,
        aggregateType: 'Promotion',
        aggregateId: result.id,
        payload: {
          promotionId: result.id,
          organizationId,
          isActive: result.isActive,
          offerIds: result.offers.map((o: { sellerOfferId: string }) => o.sellerOfferId),
        },
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.promotion.activation_changed',
      targetType: 'Promotion',
      targetId: promotionId,
      outcome: 'SUCCESS',
      metadata: { organizationId, isActive },
    });

    return updated;
  }

  async requireOwned(organizationId: string, promotionId: string): Promise<PromotionWithOffers> {
    const promotion = await this.prisma.promotion.findUnique({
      where: { id: promotionId },
      include: { offers: true },
    });
    if (!promotion || promotion.organizationId !== organizationId) {
      throw AppException.notFound('Promotion not found.');
    }
    return promotion;
  }

  async listForOrganization(organizationId: string) {
    return this.prisma.promotion.findMany({
      where: { organizationId },
      include: { offers: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  toResponseDto(promotion: PromotionWithOffers): PromotionResponseDto {
    return {
      id: promotion.id,
      organizationId: promotion.organizationId,
      name: promotion.name,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      isActive: promotion.isActive,
      usageLimit: promotion.usageLimit,
      timesUsed: promotion.timesUsed,
      offerIds: promotion.offers.map((o: { sellerOfferId: string }) => o.sellerOfferId),
    };
  }
}
