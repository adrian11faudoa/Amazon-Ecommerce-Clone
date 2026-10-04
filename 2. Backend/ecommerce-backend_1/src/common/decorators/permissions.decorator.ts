import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../authorization/permission.enum';

export const PERMISSIONS_KEY = 'required_permissions';

/**
 * Declares the permission(s) required to invoke a route handler.
 * Enforcement happens in PermissionsGuard — this decorator only attaches
 * metadata and must never be the sole authorization mechanism relied upon.
 */
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
