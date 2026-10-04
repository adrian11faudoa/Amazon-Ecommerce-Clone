import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { Permission } from './permission.enum';
import { PlatformRoleName, SellerMembershipRoleName } from './role.enum';
import { permissionsForPlatformRoles, permissionsForSellerRole } from './role-permissions.map';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';

/**
 * Central authorization decision-maker.
 *
 * This is the one place that knows how to turn (identity, optional
 * organization context) into an effective permission set. Guards call
 * into this rather than re-implementing role/permission logic.
 */
@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma: PrismaService) {}

  /** Permissions derived purely from platform-level roles. */
  getPlatformPermissions(user: AuthenticatedUser): Set<Permission> {
    return permissionsForPlatformRoles(user.platformRoles as PlatformRoleName[]);
  }

  hasPlatformPermission(user: AuthenticatedUser, permission: Permission): boolean {
    return this.getPlatformPermissions(user).has(permission);
  }

  isPlatformAdmin(user: AuthenticatedUser): boolean {
    return user.platformRoles.includes(PlatformRoleName.PLATFORM_ADMIN);
  }

  /**
   * Resolves the caller's active membership in a specific seller
   * organization and returns its effective permission set.
   *
   * This is the sole enforcement point for seller-organization isolation:
   * it never trusts a client-supplied organizationId by itself — it always
   * re-derives membership from the authenticated user's own row.
   */
  async requireSellerOrganizationAccess(
    user: AuthenticatedUser,
    organizationId: string,
  ): Promise<Set<Permission>> {
    if (this.isPlatformAdmin(user)) {
      // Platform admins may act across organizations for support/ops
      // purposes; this is itself an auditable, high-privilege path — see
      // AuditService usage at the call sites that use this branch.
      return permissionsForSellerRole(SellerMembershipRoleName.SELLER_ADMIN);
    }

    const membership = await this.prisma.sellerMembership.findUnique({
      where: { userId_organizationId: { userId: user.userId, organizationId } },
    });

    if (!membership || membership.status !== 'ACTIVE') {
      throw AppException.organizationAccessDenied();
    }

    return permissionsForSellerRole(membership.role as SellerMembershipRoleName);
  }
}
