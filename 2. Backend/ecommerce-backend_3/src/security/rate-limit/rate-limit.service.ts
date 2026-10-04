import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../infrastructure/redis/redis.service';

export interface RateLimitRule {
  max: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAtEpochSeconds: number;
}

/**
 * Fixed-window rate limiting backed by Redis.
 *
 * Key convention: `mkt:ratelimit:<scope>:<identifier>:<windowStart>`
 *
 * Failure behavior (documented per REDIS FAILURE BEHAVIOR requirement):
 *  - For auth-critical scopes (login, register, password-reset,
 *    email-verification, token-refresh) a Redis outage FAILS CLOSED: the
 *    request is treated as rate-limited rather than allowed, because an
 *    outage must never silently disable brute-force protection.
 */
@Injectable()
export class RateLimitService {
  private readonly logger = new Logger(RateLimitService.name);

  constructor(private readonly redisService: RedisService) {}

  async consume(scope: string, identifier: string, rule: RateLimitRule): Promise<RateLimitResult> {
    const windowStart = Math.floor(Date.now() / 1000 / rule.windowSeconds) * rule.windowSeconds;
    const key = `mkt:ratelimit:${scope}:${identifier}:${windowStart}`;
    const resetAtEpochSeconds = windowStart + rule.windowSeconds;

    if (!this.redisService.isReady()) {
      this.logger.warn(
        `Rate limiter degraded (Redis not ready) for scope=${scope} — failing closed.`,
      );
      return { allowed: false, remaining: 0, resetAtEpochSeconds };
    }

    try {
      const count = await this.redisService.client.incr(key);
      if (count === 1) {
        await this.redisService.client.expire(key, rule.windowSeconds);
      }

      const allowed = count <= rule.max;
      const remaining = Math.max(0, rule.max - count);
      return { allowed, remaining, resetAtEpochSeconds };
    } catch (error) {
      this.logger.error(`Rate limiter Redis error for scope=${scope} — failing closed.`);
      return { allowed: false, remaining: 0, resetAtEpochSeconds };
    }
  }
}
