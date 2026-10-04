import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';

/**
 * Injects the authenticated user attached to the request by JwtAuthGuard.
 * Never trust an alternate source (headers, body) for identity.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthenticatedUser | undefined;
  },
);
