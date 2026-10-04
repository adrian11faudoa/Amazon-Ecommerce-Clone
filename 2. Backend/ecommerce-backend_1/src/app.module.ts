import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { ObservabilityLoggerModule } from './observability/logger/logger.module';
import { HealthModule } from './observability/health/health.module';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';
import { CommonModule } from './common/common.module';
import { RateLimitModule } from './security/rate-limit/rate-limit.module';
import { SecurityModule } from './security/security.module';
import { AuditModule } from './audit/audit.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [
    ConfigModule,
    ObservabilityLoggerModule,
    PrismaModule,
    RedisModule,
    AuditModule,
    SecurityModule,
    RateLimitModule,
    AuthorizationModule,
    HealthModule,
    UsersModule,
    EmailModule,
    AuthModule,
    OrganizationsModule,
    MembershipsModule,
    CommonModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
