import { Global, Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PermissionsGuard } from './permissions.guard';
import { SellerOrganizationPolicy } from './policies/seller-organization.policy';

@Global()
@Module({
  providers: [AuthorizationService, PermissionsGuard, SellerOrganizationPolicy],
  exports: [AuthorizationService, PermissionsGuard, SellerOrganizationPolicy],
})
export class AuthorizationModule {}
