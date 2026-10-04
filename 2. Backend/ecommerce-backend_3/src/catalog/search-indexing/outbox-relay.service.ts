import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OutboxEventStatus } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CATALOG_SEARCH_INDEX_QUEUE } from '../../infrastructure/queue/queue.module';

/**
 * Relays PENDING transactional-outbox rows into the search-indexing
 * queue. Uses the outbox row's own ID as the BullMQ jobId, so re-running
 * the relay while a job is still in flight (or already completed but not
 * yet marked PUBLISHED) is a safe no-op rather than a duplicate — BullMQ
 * rejects re-adding a job with an ID already present in the queue.
 *
 * This relay never marks events PUBLISHED itself — only the worker
 * (SearchIndexProcessor) does that, after the search client actually
 * confirms the write. See SEARCH FAILURE BEHAVIOR: catalog correctness
 * never depends on this succeeding, so relay failures are logged and
 * retried on the next tick rather than escalated.
 */
@Injectable()
export class OutboxRelayService {
  private readonly logger = new Logger(OutboxRelayService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue(CATALOG_SEARCH_INDEX_QUEUE) private readonly queue: Queue,
  ) {}

  async relayPendingEvents(batchSize = 100): Promise<number> {
    const pending = await this.prisma.outboxEvent.findMany({
      where: { status: OutboxEventStatus.PENDING },
      orderBy: { producedAt: 'asc' },
      take: batchSize,
    });

    let enqueued = 0;
    for (const event of pending) {
      try {
        await this.queue.add(
          'index-catalog-document',
          {
            outboxEventId: event.id,
            eventType: event.eventType,
            aggregateType: event.aggregateType,
            aggregateId: event.aggregateId,
            payload: event.payload,
          },
          { jobId: event.id },
        );
        enqueued += 1;
      } catch (error) {
        // A queue-connectivity failure here must not throw the whole
        // batch away or mark anything FAILED — the event stays PENDING
        // and will be retried on the next relay tick.
        this.logger.error(`Failed to enqueue outbox event ${event.id} for indexing.`);
      }
    }

    return enqueued;
  }
}
