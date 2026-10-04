import { AuthorizationService } from './authorization.service';
import { PlatformRoleName, SellerMembershipRoleName } from './role.enum';
import { Permission } from './permission.enum';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';

function buildPrismaMock() {
  return { sellerMembership: { findUnique: jest.fn() } };
}

describe('AuthorizationService', () => {
  it('grants baseline self-profile permissions to every user regardless of role', () => {
    const service = new AuthorizationService(buildPrismaMock() as any);
    const user: AuthenticatedUser = { userId: 'u1', platformRoles: [PlatformRoleName.CUSTOMER] };

    const permissions = service.getPlatformPermissions(user);

    expect(permissions.has(Permission.PROFILE_READ_SELF)).toBe(true);
    expect(permissions.has(Permission.PLATFORM_ADMIN_FULL_ACCESS)).toBe(false);
  });

  it('grants platform-admin permissions only to PLATFORM_ADMIN', () => {
    const service = new AuthorizationService(buildPrismaMock() as any);
    const admin: AuthenticatedUser = {
      userId: 'u1',
      platformRoles: [PlatformRoleName.PLATFORM_ADMIN],
    };

    expect(service.hasPlatformPermission(admin, Permission.PLATFORM_ADMIN_FULL_ACCESS)).toBe(true);
    expect(service.isPlatformAdmin(admin)).toBe(true);
  });

  it('denies seller-organization access when the user has no membership row', async () => {
    const prisma = buildPrismaMock();
    prisma.sellerMembership.findUnique.mockResolvedValue(null);
    const service = new AuthorizationService(prisma as any);
    const user: AuthenticatedUser = { userId: 'u1', platformRoles: [PlatformRoleName.CUSTOMER] };

    await expect(service.requireSellerOrganizationAccess(user, 'org-1')).rejects.toMatchObject({
      code: 'ORGANIZATION_ACCESS_DENIED',
    });
  });

  it('denies seller-organization access for a suspended membership', async () => {
    const prisma = buildPrismaMock();
    prisma.sellerMembership.findUnique.mockResolvedValue({
      status: 'SUSPENDED',
      role: SellerMembershipRoleName.SELLER_STAFF,
    });
    const service = new AuthorizationService(prisma as any);
    const user: AuthenticatedUser = { userId: 'u1', platformRoles: [PlatformRoleName.CUSTOMER] };

    await expect(service.requireSellerOrganizationAccess(user, 'org-1')).rejects.toMatchObject({
      code: 'ORGANIZATION_ACCESS_DENIED',
    });
  });

  it('grants org-scoped permissions matching an active membership role', async () => {
    const prisma = buildPrismaMock();
    prisma.sellerMembership.findUnique.mockResolvedValue({
      status: 'ACTIVE',
      role: SellerMembershipRoleName.SELLER_STAFF,
    });
    const service = new AuthorizationService(prisma as any);
    const user: AuthenticatedUser = { userId: 'u1', platformRoles: [PlatformRoleName.CUSTOMER] };

    const permissions = await service.requireSellerOrganizationAccess(user, 'org-1');

    expect(permissions.has(Permission.SELLER_ORGANIZATION_READ)).toBe(true);
    expect(permissions.has(Permission.SELLER_MEMBERSHIP_MANAGE)).toBe(false);
  });

  it('never trusts a different organizationId than the one it looked up membership for', async () => {
    const prisma = buildPrismaMock();
    prisma.sellerMembership.findUnique.mockResolvedValue(null);
    const service = new AuthorizationService(prisma as any);
    const user: AuthenticatedUser = { userId: 'u1', platformRoles: [PlatformRoleName.CUSTOMER] };

    await expect(
      service.requireSellerOrganizationAccess(user, 'someone-elses-org'),
    ).rejects.toBeDefined();
    expect(prisma.sellerMembership.findUnique).toHaveBeenCalledWith({
      where: { userId_organizationId: { userId: 'u1', organizationId: 'someone-elses-org' } },
    });
  });

  it('lets platform admins act across organizations with seller-admin-equivalent permissions', async () => {
    const prisma = buildPrismaMock();
    const service = new AuthorizationService(prisma as any);
    const admin: AuthenticatedUser = {
      userId: 'admin-1',
      platformRoles: [PlatformRoleName.PLATFORM_ADMIN],
    };

    const permissions = await service.requireSellerOrganizationAccess(admin, 'any-org');

    expect(permissions.has(Permission.SELLER_MEMBERSHIP_MANAGE)).toBe(true);
    // Admin bypass must not even need to query membership.
    expect(prisma.sellerMembership.findUnique).not.toHaveBeenCalled();
  });
});
