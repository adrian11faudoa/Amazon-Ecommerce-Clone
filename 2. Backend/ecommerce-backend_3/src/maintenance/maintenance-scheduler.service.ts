import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CATALOG_MAINTENANCE_QUEUE } from '../infrastructure/queue/queue.module';
import {
  CLEANUP_MEDIA_JOB,
  EXPIRE_CHECKOUTS_JOB,
  EXPIRE_RESERVATIONS_JOB,
  RELAY_OUTBOX_JOB,
} from './maintenance.processor';

const RELAY_OUTBOX_INTERVAL_MS = 10_000;
const CLEANUP_MEDIA_INTERVAL_MS = 60_000;
const EXPIRE_RESERVATIONS_INTERVAL_MS = 30_000;
const EXPIRE_CHECKOUTS_INTERVAL_MS = 30_000;

/**
 * Registers the recurring jobs once at startup. BullMQ identifies a
 * repeatable job by its (name, repeat options, jobId) key, so calling
 * `add` again on every process restart does not create duplicates —
 * this is safe to run on every instance in a multi-instance deployment.
 */
@Injectable()
export class MaintenanceSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(MaintenanceSchedulerService.name);

  constructor(@InjectQueue(CATALOG_MAINTENANCE_QUEUE) private readonly queue: Queue) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.queue.add(
        RELAY_OUTBOX_JOB,
        {},
        { repeat: { every: RELAY_OUTBOX_INTERVAL_MS }, jobId: RELAY_OUTBOX_JOB },
      );
      await this.queue.add(
        CLEANUP_MEDIA_JOB,
        {},
        { repeat: { every: CLEANUP_MEDIA_INTERVAL_MS }, jobId: CLEANUP_MEDIA_JOB },
      );
      await this.queue.add(
        EXPIRE_RESERVATIONS_JOB,
        {},
        { repeat: { every: EXPIRE_RESERVATIONS_INTERVAL_MS }, jobId: EXPIRE_RESERVATIONS_JOB },
      );
      await this.queue.add(
        EXPIRE_CHECKOUTS_JOB,
        {},
        { repeat: { every: EXPIRE_CHECKOUTS_INTERVAL_MS }, jobId: EXPIRE_CHECKOUTS_JOB },
      );
    } catch (error) {
      // Redis/BullMQ unavailable at startup must not crash the whole
      // application — the maintenance jobs are auxiliary, not on the
      // path of core correctness (see RELIABILITY).
      this.logger.error(
        'Failed to register recurring maintenance jobs; will not retry until restart.',
      );
    }
  }
}
