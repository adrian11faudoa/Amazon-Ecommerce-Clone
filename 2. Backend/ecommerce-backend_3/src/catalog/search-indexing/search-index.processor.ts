import { Inject, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { OutboxEventStatus } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CATALOG_SEARCH_INDEX_QUEUE } from '../../infrastructure/queue/queue.module';
import { SEARCH_INDEX_CLIENT, SearchIndexClient } from './search-index-client.interface';

export interface SearchIndexJobData {
  outboxEventId: string;
  eventType: string;
  aggregateType: string;
  aggregateId: string;
  payload: Record<string, unknown>;
}

/**
 * Idempotent by construction: re-processing the same job (BullMQ retry,
 * duplicate delivery, or a manual re-relay) re-indexes the same document
 * under the same aggregateId, which is a pure overwrite in any real
 * search backend — not an accumulating side effect.
 *
 * Retries/backoff are configured on the queue (see QueueModule); this
 * processor only needs to decide success vs. throw. On the final
 * exhausted attempt, BullMQ's `Failed` lifecycle still calls
 * `process()` once more and then fires `onFailed` — we mark the outbox
 * row FAILED there so operators have visibility (see METRICS /
 * SEARCH FAILURE BEHAVIOR: no infinite retry loop, no silent loss).
 */
@Processor(CATALOG_SEARCH_INDEX_QUEUE)
export class SearchIndexProcessor extends WorkerHost {
  private readonly logger = new Logger(SearchIndexProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(SEARCH_INDEX_CLIENT) private readonly searchIndexClient: SearchIndexClient,
  ) {
    super();
  }

  async process(job: Job<SearchIndexJobData>): Promise<void> {
    const { outboxEventId, eventType, aggregateType, aggregateId, payload } = job.data;

    await this.searchIndexClient.indexDocument({
      aggregateType,
      aggregateId,
      eventType,
      document: payload,
    });

    await this.prisma.outboxEvent.update({
      where: { id: outboxEventId },
      data: {
        status: OutboxEventStatus.PUBLISHED,
        publishedAt: new Date(),
        attempts: job.attemptsMade + 1,
      },
    });
  }

  async onFailed(job: Job<SearchIndexJobData>, error: Error): Promise<void> {
    const isFinalAttempt = job.attemptsMade >= (job.opts.attempts ?? 1);
    this.logger.error(
      `Search-index job for outbox event ${job.data.outboxEventId} failed (attempt ${job.attemptsMade}): ${error.message}`,
    );

    await this.prisma.outboxEvent.update({
      where: { id: job.data.outboxEventId },
      data: {
        attempts: job.attemptsMade,
        lastError: error.message.slice(0, 1000),
        status: isFinalAttempt ? OutboxEventStatus.FAILED : OutboxEventStatus.PENDING,
      },
    });
  }
}
