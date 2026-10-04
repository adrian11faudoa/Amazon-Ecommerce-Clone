import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

export const CATALOG_SEARCH_INDEX_QUEUE = 'catalog-search-index';
export const CATALOG_MAINTENANCE_QUEUE = 'catalog-maintenance';

/**
 * BullMQ connection reuses the same Redis instance as RateLimitService
 * (see REDIS USAGE — one Redis, clearly namespaced, not a second
 * unmanaged connection pool). BullMQ manages its own ioredis client
 * internally from these connection options; it does not share the
 * RedisService client instance, since BullMQ requires specific
 * client options (maxRetriesPerRequest: null) that aren't appropriate
 * for the rate-limiter's connection.
 */
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = new URL(configService.get<string>('redis.url') ?? 'redis://localhost:6379');
        return {
          connection: {
            host: url.hostname,
            port: Number(url.port || 6379),
            password: url.password || undefined,
            maxRetriesPerRequest: null,
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: CATALOG_SEARCH_INDEX_QUEUE,
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: false, // keep failed jobs visible for operational review
      },
    }),
    BullModule.registerQueue({
      name: CATALOG_MAINTENANCE_QUEUE,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 200,
        removeOnFail: 50,
      },
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
