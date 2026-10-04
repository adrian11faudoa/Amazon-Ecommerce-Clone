import { Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferResponseDto } from './dto/offer-response.dto';

const ALLOWED_TRANSITIONS: Record<OfferStatus, OfferStatus[]> = {
  DRAFT: [OfferStatus.ACTIVE, OfferStatus.ARCHIVED],
  ACTIVE: [OfferStatus.PAUSED, OfferStatus.ARCHIVED],
  PAUSED: [OfferStatus.ACTIVE, OfferStatus.ARCHIVED],
  ARCHIVED: [],
};

@Injectable()
export class SellerOffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  async create(actorUserId: string, organizationId: string, dto: CreateOfferDto) {
    // Ownership is re-derived from the SKU's own organizationId — never
    // trust that the caller's org context alone makes this SKU theirs.
    const sku = await this.prisma.sku.findUnique({ where: { id: dto.skuId } });
    if (!sku || sku.organizationId !== organizationId) {
      throw AppException.notFound('SKU not found.');
    }

    try {
      const offer = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const created = await tx.sellerOffer.create({
          data: {
            organizationId,
            skuId: dto.skuId,
            condition: dto.condition ?? 'NEW',
            status: OfferStatus.DRAFT,
          },
        });

        await this.outboxService.record(tx, {
          eventType: CatalogEventType.OFFER_CREATED,
          aggregateType: 'SellerOffer',
          aggregateId: created.id,
          payload: {
            offerId: created.id,
            organizationId,
            skuId: dto.skuId,
            status: created.status,
          },
        });

        return created;
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.offer.created',
        targetType: 'SellerOffer',
        targetId: offer.id,
        outcome: 'SUCCESS',
        metadata: { organizationId, skuId: dto.skuId },
      });

      return offer;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('This SKU already has an offer.');
      }
      throw error;
    }
  }

  async transitionStatus(
    actorUserId: string,
    organizationId: string,
    offerId: string,
    targetStatus: OfferStatus,
  ) {
    const offer = await this.requireOwned(organizationId, offerId);
    const allowed = ALLOWED_TRANSITIONS[offer.status] ?? [];
    if (!allowed.includes(targetStatus)) {
      throw AppException.invalidStateTransition(
        `Cannot transition offer from ${offer.status} to ${targetStatus}.`,
        { from: offer.status, to: targetStatus },
      );
    }

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.sellerOffer.update({
        where: { id: offerId },
        data: { status: targetStatus },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.OFFER_UPDATED,
        aggregateType: 'SellerOffer',
        aggregateId: result.id,
        payload: { offerId: result.id, organizationId, status: result.status },
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.offer.status_changed',
      targetType: 'SellerOffer',
      targetId: offerId,
      outcome: 'SUCCESS',
      metadata: { organizationId, from: offer.status, to: targetStatus },
    });

    return updated;
  }

  async requireOwned(organizationId: string, offerId: string) {
    const offer = await this.prisma.sellerOffer.findUnique({ where: { id: offerId } });
    if (!offer || offer.organizationId !== organizationId) {
      throw AppException.notFound('Offer not found.');
    }
    return offer;
  }

  async listForOrganization(organizationId: string) {
    return this.prisma.sellerOffer.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  toResponseDto(offer: {
    id: string;
    organizationId: string;
    skuId: string;
    status: string;
    condition: string;
    createdAt: Date;
    updatedAt: Date;
  }): OfferResponseDto {
    return { ...offer };
  }
}
