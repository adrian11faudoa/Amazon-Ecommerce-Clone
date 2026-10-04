import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';
import { Permission } from './permission.enum';

function buildContext(request: Record<string, unknown>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => request }),
    getHandler: () => jest.fn(),
  } as unknown as ExecutionContext;
}

describe('PermissionsGuard', () => {
  it('allows the request through when no permissions are declared', async () => {
    const reflector = { get: jest.fn().mockReturnValue(undefined) } as unknown as Reflector;
    const authorizationService = { getPlatformPermissions: jest.fn() } as any;
    const guard = new PermissionsGuard(reflector, authorizationService);

    await expect(guard.canActivate(buildContext({ user: { userId: 'u1' } }))).resolves.toBe(true);
  });

  it('throws AUTHENTICATION_REQUIRED if no user is attached to the request', async () => {
    const reflector = {
      get: jest.fn().mockReturnValue([Permission.PROFILE_READ_SELF]),
    } as unknown as Reflector;
    const authorizationService = { getPlatformPermissions: jest.fn() } as any;
    const guard = new PermissionsGuard(reflector, authorizationService);

    await expect(guard.canActivate(buildContext({ params: {} }))).rejects.toMatchObject({
      code: 'AUTHENTICATION_REQUIRED',
    });
  });

  it('grants access when the platform permission set includes the required permission', async () => {
    const reflector = {
      get: jest.fn().mockReturnValue([Permission.PROFILE_READ_SELF]),
    } as unknown as Reflector;
    const authorizationService = {
      getPlatformPermissions: jest.fn().mockReturnValue(new Set([Permission.PROFILE_READ_SELF])),
    } as any;
    const guard = new PermissionsGuard(reflector, authorizationService);

    await expect(
      guard.canActivate(buildContext({ user: { userId: 'u1' }, params: {} })),
    ).resolves.toBe(true);
  });

  it('denies access (FORBIDDEN) when the permission is missing', async () => {
    const reflector = {
      get: jest.fn().mockReturnValue([Permission.PLATFORM_ADMIN_FULL_ACCESS]),
    } as unknown as Reflector;
    const authorizationService = {
      getPlatformPermissions: jest.fn().mockReturnValue(new Set([Permission.PROFILE_READ_SELF])),
    } as any;
    const guard = new PermissionsGuard(reflector, authorizationService);

    await expect(
      guard.canActivate(buildContext({ user: { userId: 'u1' }, params: {} })),
    ).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });

  it('resolves organization-scoped permissions via AuthorizationService when :organizationId is present, never trusting the param alone', async () => {
    const reflector = {
      get: jest.fn().mockReturnValue([Permission.SELLER_ORGANIZATION_MANAGE]),
    } as unknown as Reflector;
    const authorizationService = {
      requireSellerOrganizationAccess: jest
        .fn()
        .mockResolvedValue(new Set([Permission.SELLER_ORGANIZATION_MANAGE])),
    } as any;
    const guard = new PermissionsGuard(reflector, authorizationService);

    const context = buildContext({
      user: { userId: 'u1' },
      params: { organizationId: 'org-1' },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(authorizationService.requireSellerOrganizationAccess).toHaveBeenCalledWith(
      { userId: 'u1' },
      'org-1',
    );
  });
});
