import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';
import { AppException } from '../../common/errors/app-exception';
import { RequestContext } from '../../common/context/request-context';
import { TokenService } from '../tokens/token.service';
import { AuthenticatedUser } from '../authenticated-user.interface';
import { PlatformRoleName } from '../../authorization/role.enum';

/**
 * Validates the `Authorization: Bearer <token>` header and attaches the
 * resulting AuthenticatedUser to `request.user`.
 *
 * This is the ONLY place identity is established for the rest of the
 * request pipeline. Downstream guards/services must read `request.user`,
 * never re-parse the token or trust any client-supplied identity field.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean | undefined>(IS_PUBLIC_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request);

    if (!token) {
      if (isPublic) {
        return true;
      }
      throw AppException.authenticationRequired();
    }

    const payload = await this.tokenService.verifyAccessToken(token);
    const user: AuthenticatedUser = {
      userId: payload.sub,
      platformRoles: payload.roles as PlatformRoleName[],
    };

    request.user = user;
    RequestContext.set({ userId: user.userId });

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
