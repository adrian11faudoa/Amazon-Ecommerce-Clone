import { Injectable, Logger } from '@nestjs/common';
import { InventoryAdjustmentType, Prisma, ReservationState } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { AuditService } from '../audit/audit.service';
import { OutboxService } from '../catalog/events/outbox.service';
import { InventoryEventType } from './inventory-event-types';
import {
  clampPageSize,
  decodeCursor,
  encodeCursor,
  PagedResult,
} from '../common/utils/cursor-pagination.util';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { AdjustInventoryDto } from './dto/adjust-inventory.dto';
import { ReconcileInventoryDto } from './dto/reconcile-inventory.dto';
import {
  ADJUSTMENT_LIST_DEFAULT_PAGE_SIZE,
  ADJUSTMENT_LIST_MAX_PAGE_SIZE,
  ListAdjustmentsQueryDto,
} from './dto/list-adjustments-query.dto';
import { InventoryItemResponseDto } from './dto/inventory-item-response.dto';
import { InventoryAdjustmentResponseDto } from './dto/inventory-adjustment-response.dto';

export interface InventoryItemRow {
  id: string;
  organizationId: string;
  sellerOfferId: string;
  onHandQuantity: number;
  reservedQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface InventoryAdjustmentRowShape {
  id: string;
  inventoryItemId: string;
  quantityDelta: number;
  type: string;
  reason: string;
  actorUserId: string | null;
  referenceType: string | null;
  referenceId: string | null;
  createdAt: Date;
}

/**
 * Owns inventory quantities and reservation state.
 *
 * Quantity semantics (see INVENTORY QUANTITY MODEL): onHandQuantity and
 * reservedQuantity are both stored and atomically maintained via
 * conditional SQL updates (never read-then-write in application memory).
 * availableQuantity = onHandQuantity - reservedQuantity is ALWAYS derived
 * at read time — see toResponseDto — never stored, so it cannot drift.
 */
@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  // -------------------------------------------------------------------
  // Creation
  // -------------------------------------------------------------------

  async create(actorUserId: string, organizationId: string, dto: CreateInventoryItemDto) {
    const offer = await this.prisma.sellerOffer.findUnique({ where: { id: dto.sellerOfferId } });
    if (!offer || offer.organizationId !== organizationId) {
      throw AppException.notFound('Seller offer not found.');
    }

    try {
      const item = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const created = await tx.inventoryItem.create({
          data: {
            organizationId,
            sellerOfferId: dto.sellerOfferId,
            onHandQuantity: dto.initialQuantity,
            reservedQuantity: 0,
          },
        });

        if (dto.initialQuantity > 0) {
          await tx.inventoryAdjustment.create({
            data: {
              inventoryItemId: created.id,
              quantityDelta: dto.initialQuantity,
              type: InventoryAdjustmentType.INITIAL_STOCK,
              reason: 'Initial stock at inventory item creation.',
              actorUserId,
            },
          });
        }

        await this.outboxService.record(tx, {
          eventType: InventoryEventType.INVENTORY_CREATED,
          aggregateType: 'InventoryItem',
          aggregateId: created.id,
          payload: {
            inventoryItemId: created.id,
            organizationId,
            sellerOfferId: dto.sellerOfferId,
            onHandQuantity: created.onHandQuantity,
          },
        });

        return created;
      });

      await this.auditService.record({
        actorUserId,
        action: 'inventory.item.created',
        targetType: 'InventoryItem',
        targetId: item.id,
        outcome: 'SUCCESS',
        metadata: { organizationId, sellerOfferId: dto.sellerOfferId },
      });

      return item;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('An inventory item already exists for this seller offer.');
      }
      throw error;
    }
  }

  // -------------------------------------------------------------------
  // Manual adjustments (on-hand quantity)
  // -------------------------------------------------------------------

  /**
   * Atomically applies a signed delta to onHandQuantity. The WHERE
   * clause's `"onHandQuantity" + delta >= 0` guard means the database
   * itself rejects an adjustment that would drive stock negative — there
   * is no read-then-decide-then-write window for a race to exploit.
   */
  async adjust(
    actorUserId: string,
    organizationId: string,
    inventoryItemId: string,
    dto: AdjustInventoryDto,
  ) {
    await this.requireOwned(organizationId, inventoryItemId);

    const result = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const affected = await tx.$executeRaw`
        UPDATE "inventory_items"
        SET "onHandQuantity" = "onHandQuantity" + ${dto.quantityDelta}, "updatedAt" = NOW()
        WHERE "id" = ${inventoryItemId} AND "onHandQuantity" + ${dto.quantityDelta} >= 0
      `;

      if (affected === 0) {
        throw AppException.insufficientInventory(
          'This adjustment would drive on-hand quantity negative.',
        );
      }

      const adjustment = await tx.inventoryAdjustment.create({
        data: {
          inventoryItemId,
          quantityDelta: dto.quantityDelta,
          type: dto.type as InventoryAdjustmentType,
          reason: dto.reason,
          actorUserId,
          referenceType: dto.referenceType,
          referenceId: dto.referenceId,
        },
      });

      const updatedItem = await tx.inventoryItem.findUniqueOrThrow({
        where: { id: inventoryItemId },
      });

      await this.outboxService.record(tx, {
        eventType: InventoryEventType.INVENTORY_ADJUSTED,
        aggregateType: 'InventoryItem',
        aggregateId: inventoryItemId,
        payload: {
          inventoryItemId,
          organizationId,
          quantityDelta: dto.quantityDelta,
          type: dto.type,
          onHandQuantity: updatedItem.onHandQuantity,
        },
      });

      return { adjustment, item: updatedItem };
    });

    await this.auditService.record({
      actorUserId,
      action: 'inventory.item.adjusted',
      targetType: 'InventoryItem',
      targetId: inventoryItemId,
      outcome: 'SUCCESS',
      metadata: {
        organizationId,
        quantityDelta: dto.quantityDelta,
        type: dto.type,
        reason: dto.reason,
      },
    });

    return result;
  }

  /**
   * Compares the authoritative count against the current on-hand
   * quantity and, if they differ, applies the discrepancy as an
   * auditable RECONCILIATION adjustment — never a silent overwrite. A
   * discrepancy of zero is a no-op that still returns the current state.
   */
  async reconcile(
    actorUserId: string,
    organizationId: string,
    inventoryItemId: string,
    dto: ReconcileInventoryDto,
  ) {
    const item = await this.requireOwned(organizationId, inventoryItemId);
    const discrepancy = dto.authoritativeOnHandQuantity - item.onHandQuantity;

    if (discrepancy === 0) {
      return { adjustment: null, item, discrepancy: 0 };
    }

    const { adjustment, item: updatedItem } = await this.adjust(
      actorUserId,
      organizationId,
      inventoryItemId,
      {
        quantityDelta: discrepancy,
        type: InventoryAdjustmentType.RECONCILIATION as never,
        reason: dto.reason,
      },
    );

    await this.auditService.record({
      actorUserId,
      action: 'inventory.reconciled',
      targetType: 'InventoryItem',
      targetId: inventoryItemId,
      outcome: 'SUCCESS',
      metadata: { organizationId, discrepancy },
    });

    return { adjustment, item: updatedItem, discrepancy };
  }

  // -------------------------------------------------------------------
  // Reservation lifecycle
  // -------------------------------------------------------------------

  /**
   * Reserves `quantity` units of `inventoryItemId` for `checkoutId`.
   *
   * Concurrency safety: the reservedQuantity increment and the
   * availability check happen in ONE atomic SQL statement
   * (`"onHandQuantity" - "reservedQuantity" >= quantity` in the WHERE
   * clause) — there is no separate "read available, then decide, then
   * write" step for two concurrent requests to race through.
   *
   * Idempotency: (checkoutId, inventoryItemId) is unique. A repeated
   * request for the same checkout+item either finds the existing
   * reservation (same quantity -> idempotent no-op; different quantity
   * -> deterministic RESERVATION_CONFLICT) or, under true concurrency,
   * loses a race on that unique constraint and falls back to the same
   * existing-reservation lookup.
   */
  async reserveForCheckout(checkoutId: string, inventoryItemId: string, quantity: number) {
    const existing = await this.prisma.inventoryReservation.findUnique({
      where: { checkoutId_inventoryItemId: { checkoutId, inventoryItemId } },
    });
    if (existing) {
      if (existing.state !== ReservationState.ACTIVE) {
        throw AppException.reservationConflict(
          `A reservation for this checkout and item already exists in state ${existing.state}.`,
        );
      }
      if (existing.quantity !== quantity) {
        throw AppException.reservationConflict(
          'A reservation for this checkout and item already exists with a different quantity.',
        );
      }
      return existing; // idempotent replay
    }

    try {
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const affected = await tx.$executeRaw`
          UPDATE "inventory_items"
          SET "reservedQuantity" = "reservedQuantity" + ${quantity}, "updatedAt" = NOW()
          WHERE "id" = ${inventoryItemId} AND "onHandQuantity" - "reservedQuantity" >= ${quantity}
        `;

        if (affected === 0) {
          throw AppException.insufficientInventory();
        }

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15-minute reservation window
        const reservation = await tx.inventoryReservation.create({
          data: {
            inventoryItemId,
            checkoutId,
            quantity,
            state: ReservationState.ACTIVE,
            expiresAt,
          },
        });

        await this.outboxService.record(tx, {
          eventType: InventoryEventType.INVENTORY_RESERVED,
          aggregateType: 'InventoryReservation',
          aggregateId: reservation.id,
          payload: { reservationId: reservation.id, inventoryItemId, checkoutId, quantity },
        });

        return reservation;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Lost the race on the (checkoutId, inventoryItemId) unique
        // constraint to a concurrent identical request — fall back to
        // the idempotent lookup rather than surfacing a raw conflict.
        const raceWinner = await this.prisma.inventoryReservation.findUnique({
          where: { checkoutId_inventoryItemId: { checkoutId, inventoryItemId } },
        });
        if (raceWinner && raceWinner.quantity === quantity) {
          return raceWinner;
        }
        throw AppException.reservationConflict(
          'A concurrent request already created a conflicting reservation for this checkout and item.',
        );
      }
      throw error;
    }
  }

  /** Idempotent: releasing an already-released/expired reservation is a no-op success. */
  async releaseReservation(reservationId: string, actorUserId?: string) {
    return this.transitionReservation(
      reservationId,
      ReservationState.RELEASED,
      InventoryEventType.INVENTORY_RESERVATION_RELEASED,
      actorUserId,
    );
  }

  /** Used by the expiration worker (see ReservationExpirationProcessor). Idempotent. */
  async expireReservation(reservationId: string) {
    return this.transitionReservation(
      reservationId,
      ReservationState.EXPIRED,
      InventoryEventType.INVENTORY_RESERVATION_EXPIRED,
    );
  }

  /**
   * Converts an ACTIVE reservation into consumed inventory: releases the
   * reservedQuantity AND permanently removes the stock from
   * onHandQuantity, atomically, in one guarded SQL statement. This is
   * the seam a future Order/payment-completion workflow calls — this
   * milestone defines and tests the operation but does not implement
   * the order aggregate that would call it in production.
   */
  async consumeReservation(reservationId: string, actorUserId?: string) {
    const reservation = await this.prisma.inventoryReservation.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw AppException.notFound('Reservation not found.');
    }
    if (reservation.state === ReservationState.CONSUMED) {
      return reservation; // idempotent
    }
    if (reservation.state !== ReservationState.ACTIVE) {
      throw AppException.invalidStateTransition(
        `Cannot consume a reservation in state ${reservation.state}.`,
      );
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const affected = await tx.$executeRaw`
        UPDATE "inventory_items"
        SET "reservedQuantity" = "reservedQuantity" - ${reservation.quantity},
            "onHandQuantity" = "onHandQuantity" - ${reservation.quantity},
            "updatedAt" = NOW()
        WHERE "id" = ${reservation.inventoryItemId}
          AND "reservedQuantity" - ${reservation.quantity} >= 0
          AND "onHandQuantity" - ${reservation.quantity} >= 0
      `;

      if (affected === 0) {
        // Should be unreachable under correct operation (the reservation
        // itself proves the quantity was reserved), but fail loudly
        // rather than silently corrupt state if it ever happens.
        throw AppException.reservationConflict(
          'Inventory state is inconsistent with this reservation and cannot be consumed safely.',
        );
      }

      const updated = await tx.inventoryReservation.update({
        where: { id: reservationId },
        data: { state: ReservationState.CONSUMED, consumedAt: new Date() },
      });

      await this.outboxService.record(tx, {
        eventType: InventoryEventType.INVENTORY_RESERVATION_CONSUMED,
        aggregateType: 'InventoryReservation',
        aggregateId: reservationId,
        payload: {
          reservationId,
          inventoryItemId: reservation.inventoryItemId,
          checkoutId: reservation.checkoutId,
        },
      });

      await this.auditService.record({
        actorUserId,
        action: 'inventory.reservation.consumed',
        targetType: 'InventoryReservation',
        targetId: reservationId,
        outcome: 'SUCCESS',
      });

      return updated;
    });
  }

  private async transitionReservation(
    reservationId: string,
    targetState: typeof ReservationState.RELEASED | typeof ReservationState.EXPIRED,
    eventType: InventoryEventType,
    actorUserId?: string,
  ) {
    const reservation = await this.prisma.inventoryReservation.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw AppException.notFound('Reservation not found.');
    }
    if (reservation.state === targetState) {
      return reservation; // idempotent
    }
    if (reservation.state !== ReservationState.ACTIVE) {
      throw AppException.invalidStateTransition(
        `Cannot transition a reservation from ${reservation.state} to ${targetState}.`,
      );
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const affected = await tx.$executeRaw`
        UPDATE "inventory_items"
        SET "reservedQuantity" = "reservedQuantity" - ${reservation.quantity}, "updatedAt" = NOW()
        WHERE "id" = ${reservation.inventoryItemId} AND "reservedQuantity" - ${reservation.quantity} >= 0
      `;

      if (affected === 0) {
        throw AppException.reservationConflict(
          'Inventory state is inconsistent with this reservation and cannot be released safely.',
        );
      }

      const updated = await tx.inventoryReservation.update({
        where: { id: reservationId },
        data: {
          state: targetState,
          releasedAt: targetState === ReservationState.RELEASED ? new Date() : undefined,
        },
      });

      await this.outboxService.record(tx, {
        eventType,
        aggregateType: 'InventoryReservation',
        aggregateId: reservationId,
        payload: {
          reservationId,
          inventoryItemId: reservation.inventoryItemId,
          checkoutId: reservation.checkoutId,
        },
      });

      if (actorUserId) {
        await this.auditService.record({
          actorUserId,
          action: `inventory.reservation.${targetState.toLowerCase()}`,
          targetType: 'InventoryReservation',
          targetId: reservationId,
          outcome: 'SUCCESS',
        });
      }

      return updated;
    });
  }

  /**
   * Bounded batch of active reservations past their expiry — used by
   * ReservationExpirationProcessor. Never processes unlimited rows in
   * one pass.
   */
  async findExpiredActiveReservations(batchSize = 100) {
    return this.prisma.inventoryReservation.findMany({
      where: { state: ReservationState.ACTIVE, expiresAt: { lt: new Date() } },
      take: batchSize,
    });
  }

  // -------------------------------------------------------------------
  // Reads
  // -------------------------------------------------------------------

  async requireOwned(organizationId: string, inventoryItemId: string): Promise<InventoryItemRow> {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id: inventoryItemId } });
    if (!item || item.organizationId !== organizationId) {
      throw AppException.notFound('Inventory item not found.');
    }
    return item;
  }

  async listForOrganization(organizationId: string) {
    return this.prisma.inventoryItem.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listAdjustments(
    organizationId: string,
    inventoryItemId: string,
    query: ListAdjustmentsQueryDto,
  ): Promise<PagedResult<InventoryAdjustmentResponseDto>> {
    await this.requireOwned(organizationId, inventoryItemId);
    const pageSize = clampPageSize(
      query.pageSize,
      ADJUSTMENT_LIST_DEFAULT_PAGE_SIZE,
      ADJUSTMENT_LIST_MAX_PAGE_SIZE,
    );

    const where: Prisma.InventoryAdjustmentWhereInput = { inventoryItemId };
    if (query.cursor) {
      const position = decodeCursor(query.cursor);
      where.OR = [
        { createdAt: { lt: new Date(position.createdAt) } },
        { createdAt: new Date(position.createdAt), id: { lt: position.id } },
      ];
    }

    const rows = await this.prisma.inventoryAdjustment.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: pageSize + 1,
    });

    const hasMore = rows.length > pageSize;
    const page = hasMore ? rows.slice(0, pageSize) : rows;
    const last = page[page.length - 1];

    return {
      items: page.map((a: InventoryAdjustmentRowShape) => this.adjustmentToResponseDto(a)),
      nextCursor:
        hasMore && last
          ? encodeCursor({ createdAt: last.createdAt.toISOString(), id: last.id })
          : null,
    };
  }

  toResponseDto(item: InventoryItemRow): InventoryItemResponseDto {
    return {
      id: item.id,
      organizationId: item.organizationId,
      sellerOfferId: item.sellerOfferId,
      onHandQuantity: item.onHandQuantity,
      reservedQuantity: item.reservedQuantity,
      availableQuantity: item.onHandQuantity - item.reservedQuantity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  adjustmentToResponseDto(adjustment: InventoryAdjustmentRowShape): InventoryAdjustmentResponseDto {
    return {
      id: adjustment.id,
      inventoryItemId: adjustment.inventoryItemId,
      quantityDelta: adjustment.quantityDelta,
      type: adjustment.type,
      reason: adjustment.reason,
      actorUserId: adjustment.actorUserId,
      referenceType: adjustment.referenceType,
      referenceId: adjustment.referenceId,
      createdAt: adjustment.createdAt,
    };
  }
}
