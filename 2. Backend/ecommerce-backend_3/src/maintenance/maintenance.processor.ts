import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CATALOG_MAINTENANCE_QUEUE } from '../infrastructure/queue/queue.module';
import { OutboxRelayService } from '../catalog/search-indexing/outbox-relay.service';
import { MediaService } from '../catalog/media/media.service';
import { InventoryService } from '../inventory/inventory.service';
import { CheckoutService } from '../checkout/checkout.service';

export const RELAY_OUTBOX_JOB = 'relay-outbox';
export const CLEANUP_MEDIA_JOB = 'cleanup-media';
export const EXPIRE_RESERVATIONS_JOB = 'expire-reservations';
export const EXPIRE_CHECKOUTS_JOB = 'expire-checkouts';

/**
 * All of this project's recurring background jobs, on one shared queue.
 * Every underlying operation is idempotent (see each service's own
 * doc comments), so overlapping or repeated runs — including across
 * multiple app instances — are safe. Bounded batch sizes keep each tick
 * small; see RESERVATION EXPIRATION WORKER ("do not process unlimited
 * records in one transaction").
 */
@Processor(CATALOG_MAINTENANCE_QUEUE)
export class MaintenanceProcessor extends WorkerHost {
  private readonly logger = new Logger(MaintenanceProcessor.name);

  constructor(
    private readonly outboxRelayService: OutboxRelayService,
    private readonly mediaService: MediaService,
    private readonly inventoryService: InventoryService,
    private readonly checkoutService: CheckoutService,
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
      case EXPIRE_RESERVATIONS_JOB: {
        await this.expireReservations();
        return;
      }
      case EXPIRE_CHECKOUTS_JOB: {
        await this.expireCheckouts();
        return;
      }
      default:
        this.logger.warn(`Unknown maintenance job name: ${job.name}`);
    }
  }

  /**
   * Expires active reservations past their TTL in bounded batches. Each
   * expiration is its own atomic, idempotent operation (see
   * InventoryService.expireReservation) — one reservation failing to
   * expire (e.g. a transient DB error) never blocks the rest of the
   * batch or corrupts already-processed rows.
   */
  private async expireReservations(): Promise<void> {
    const expired = await this.inventoryService.findExpiredActiveReservations(100);
    let succeeded = 0;
    for (const reservation of expired) {
      try {
        await this.inventoryService.expireReservation(reservation.id);
        succeeded += 1;
      } catch (error) {
        this.logger.error(`Failed to expire reservation ${reservation.id}; will retry next tick.`);
      }
    }
    if (succeeded > 0) {
      this.logger.log(`Expired ${succeeded} inventory reservation(s).`);
    }
  }

  private async expireCheckouts(): Promise<void> {
    const expired = await this.checkoutService.findExpiredActiveCheckouts(100);
    let succeeded = 0;
    for (const checkout of expired) {
      try {
        await this.checkoutService.expire(checkout.id);
        succeeded += 1;
      } catch (error) {
        this.logger.error(`Failed to expire checkout ${checkout.id}; will retry next tick.`);
      }
    }
    if (succeeded > 0) {
      this.logger.log(`Expired ${succeeded} checkout(s).`);
    }
  }
}
