import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../common/decorators/permissions.decorator';
import { AppException } from '../common/errors/app-exception';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { Permission } from './permission.enum';
import { AuthorizationService } from './authorization.service';

/**
 * Enforces the permissions declared via @RequirePermissions on a route.
 *
 * Authorization decisions never rely on the decorator alone: this guard
 * always re-resolves the effective permission set from the authenticated
 * identity (and, for org-scoped routes, from the caller's actual
 * membership row) rather than trusting anything client-supplied.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<Permission[] | undefined>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser | undefined;
    if (!user) {
      throw AppException.authenticationRequired();
    }

    const organizationId = request.params?.organizationId;
    const effectivePermissions = organizationId
      ? await this.authorizationService.requireSellerOrganizationAccess(user, organizationId)
      : this.authorizationService.getPlatformPermissions(user);

    const isAuthorized = requiredPermissions.every((permission) =>
      effectivePermissions.has(permission),
    );

    if (!isAuthorized) {
      throw AppException.forbidden();
    }

    return true;
  }
}
