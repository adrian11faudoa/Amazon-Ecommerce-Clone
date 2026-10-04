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
import { CatalogEventsModule } from './catalog/events/events.module';
import { CategoriesModule } from './catalog/categories/categories.module';
import { AttributeDefinitionsModule } from './catalog/attributes/attribute-definitions.module';
import { ProductsModule } from './catalog/products/products.module';
import { ProductVariantsModule } from './catalog/variants/product-variants.module';
import { SellerOffersModule } from './catalog/offers/seller-offers.module';
import { PricingModule } from './catalog/pricing/pricing.module';
import { PromotionsModule } from './catalog/promotions/promotions.module';
import { MediaModule } from './catalog/media/media.module';
import { SearchIndexingModule } from './catalog/search-indexing/search-indexing.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

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
    CatalogEventsModule,
    CategoriesModule,
    AttributeDefinitionsModule,
    ProductsModule,
    ProductVariantsModule,
    SellerOffersModule,
    PricingModule,
    PromotionsModule,
    MediaModule,
    SearchIndexingModule,
    InventoryModule,
    CartModule,
    CheckoutModule,
    MaintenanceModule,
    CommonModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
