import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

/**
 * Managed Redis client for caching, rate limiting, and other ephemeral
 * coordination.
 *
 * Ownership and key conventions:
 *  - All keys are namespaced with a `mkt:<domain>:` prefix (see individual
 *    callers, e.g. RateLimitService uses `mkt:ratelimit:...`).
 *  - Everything stored here is ephemeral and must carry an explicit TTL.
 *    Redis is never the durable source of truth for business data.
 *
 * Failure behavior:
 *  - Redis is NOT authoritative for authorization decisions. Callers that
 *    use Redis for rate limiting must fail closed (deny/limit) rather than
 *    silently disabling protection when Redis is unavailable — see
 *    RateLimitService for the concrete policy.
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('redis.url');
    this.client = new Redis(url ?? '', {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      retryStrategy: (times) => Math.min(times * 200, 2000),
    });

    this.client.on('error', (err) => {
      this.logger.error(`Redis client error: ${err.message}`);
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.log('Redis connection established.');
    } catch (error) {
      // Redis is used for rate limiting and ephemeral coordination, not
      // core durable state, so we log and continue rather than crash the
      // whole process — individual features decide how to degrade.
      this.logger.error('Failed to establish Redis connection at startup.');
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.client.disconnect();
  }

  isReady(): boolean {
    return this.client.status === 'ready';
  }

  async isHealthy(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === 'PONG';
    } catch {
      return false;
    }
  }
}
