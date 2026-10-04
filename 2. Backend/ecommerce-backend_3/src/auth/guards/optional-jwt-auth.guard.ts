import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestContext } from '../../common/context/request-context';
import { TokenService } from '../tokens/token.service';
import { AuthenticatedUser } from '../authenticated-user.interface';
import { PlatformRoleName } from '../../authorization/role.enum';

/**
 * Like JwtAuthGuard, but never rejects the request for a missing or
 * invalid token — it simply leaves `request.user` unset. Routes that
 * accept both anonymous and authenticated callers (cart) use this and
 * branch on whether `request.user` ended up populated.
 *
 * An invalid/expired token is treated the same as no token at all here
 * (fail open to anonymous, not fail closed) — this guard's entire
 * purpose is optional identification, not enforcement.
 */
@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request);

    if (token) {
      try {
        const payload = await this.tokenService.verifyAccessToken(token);
        const user: AuthenticatedUser = {
          userId: payload.sub,
          platformRoles: payload.roles as PlatformRoleName[],
        };
        request.user = user;
        RequestContext.set({ userId: user.userId });
      } catch {
        // Invalid/expired token on an optional-auth route: proceed as anonymous.
      }
    }

    return true;
  }

  private extractBearerToken(request: Request): string | undefined {
    const header = request.header('authorization');
    if (!header) {
      return undefined;
    }
    const [scheme, token] = header.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return undefined;
    }
    return token;
  }
}
