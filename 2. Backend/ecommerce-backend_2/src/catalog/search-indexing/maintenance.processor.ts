import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CATALOG_MAINTENANCE_QUEUE } from '../../infrastructure/queue/queue.module';
import { OutboxRelayService } from './outbox-relay.service';
import { MediaService } from '../media/media.service';

export const RELAY_OUTBOX_JOB = 'relay-outbox';
export const CLEANUP_MEDIA_JOB = 'cleanup-media';

/**
 * Handles this milestone's two recurring background jobs (see
 * BACKGROUND JOBS): relaying pending outbox events to the search-index
 * queue, and cleaning up expired media upload intents. Both underlying
 * operations are idempotent (see OutboxRelayService and
 * MediaService.cleanupExpiredUploadIntents), so overlapping or repeated
 * runs are safe — bounded batch sizes keep each tick's work small.
 */
@Processor(CATALOG_MAINTENANCE_QUEUE)
export class MaintenanceProcessor extends WorkerHost {
  private readonly logger = new Logger(MaintenanceProcessor.name);

  constructor(
    private readonly outboxRelayService: OutboxRelayService,
    private readonly mediaService: MediaService,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case RELAY_OUTBOX_JOB: {
        const enqueued = await this.outboxRelayService.relayPendingEvents();
        if (enqueued > 0) {
          this.logger.log(`Relayed ${enqueued} pending outbox event(s) for indexing.`);
        }
        return;
      }
      case CLEANUP_MEDIA_JOB: {
        await this.mediaService.cleanupExpiredUploadIntents();
        return;
      }
      default:
        this.logger.warn(`Unknown maintenance job name: ${job.name}`);
    }
  }
}
