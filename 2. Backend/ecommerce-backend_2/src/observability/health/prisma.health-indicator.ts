import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async check(key: string): Promise<HealthIndicatorResult> {
    const healthy = await this.prisma.isHealthy();
    const result = this.getStatus(key, healthy);
    if (!healthy) {
      throw new HealthCheckError('Database check failed', result);
    }
    return result;
  }
}
