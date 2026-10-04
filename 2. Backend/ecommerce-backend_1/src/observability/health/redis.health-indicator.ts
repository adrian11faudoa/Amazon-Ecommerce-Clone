import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redis: RedisService) {
    super();
  }

  async check(key: string): Promise<HealthIndicatorResult> {
    const healthy = await this.redis.isHealthy();
    const result = this.getStatus(key, healthy);
    if (!healthy) {
      throw new HealthCheckError('Redis check failed', result);
    }
    return result;
  }
}
