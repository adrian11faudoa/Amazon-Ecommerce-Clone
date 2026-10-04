import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RequestContext } from '../../common/context/request-context';
import { CATALOG_EVENT_SCHEMA_VERSION, CatalogEventType } from './catalog-event-types';

export interface RecordOutboxEventInput {
  eventType: CatalogEventType;
  aggregateType: string;
  aggregateId: string;
  payload: Record<string, unknown>;
}

/**
 * Transactional outbox: the event row is written inside the SAME
 * transaction as the domain mutation that produced it (callers pass the
 * transaction client `tx`), so a committed catalog change can never be
 * silently missing its event, and a rolled-back mutation never leaves a
 * stray event behind. A separate relay (see OutboxRelayService) publishes
 * PENDING rows asynchronously — this service never publishes directly.
 */
@Injectable()
export class OutboxService {
  async record(tx: Prisma.TransactionClient, input: RecordOutboxEventInput): Promise<void> {
    const ctx = RequestContext.current();

    await tx.outboxEvent.create({
      data: {
        eventType: input.eventType,
        eventVersion: CATALOG_EVENT_SCHEMA_VERSION,
        aggregateType: input.aggregateType,
        aggregateId: input.aggregateId,
        payload: input.payload as Prisma.InputJsonValue,
        correlationId: ctx?.correlationId,
      },
    });
  }
}
