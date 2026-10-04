import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppException } from '../../common/errors/app-exception';
import { RateLimitConfig } from '../../config/configuration';
import { RATE_LIMIT_KEY } from './rate-limit.decorator';
import { RateLimitService } from './rate-limit.service';

/**
 * Enforces per-scope rate limits on sensitive authentication endpoints.
 *
 * The rate-limit identifier is derived from the client IP plus, where
 * present, a stable request attribute (e.g. the email being logged in
 * with) — never from unauthenticated client-supplied identifiers alone,
 * to prevent trivial bypass by omitting/rotating a header.
 */
@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const scope = this.reflector.get<string | undefined>(RATE_LIMIT_KEY, context.getHandler());
    if (!scope) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const rateLimitConfig = this.configService.get<RateLimitConfig>('rateLimit');
    const rule = rateLimitConfig?.[scope as keyof RateLimitConfig];
    if (!rule) {
      // Misconfiguration: a scope was declared without a matching rule.
      // Fail closed rather than silently skip rate limiting.
      throw AppException.rateLimited('Rate limit configuration missing for this endpoint.');
    }

    const secondaryIdentifier = this.extractSecondaryIdentifier(request);
    const identifier = `${request.ip}:${secondaryIdentifier ?? 'anonymous'}`;

    const result = await this.rateLimitService.consume(scope, identifier, rule);
    if (!result.allowed) {
      throw AppException.rateLimited();
    }

    return true;
  }

  private extractSecondaryIdentifier(request: Request): string | undefined {
    const email = (request.body as Record<string, unknown> | undefined)?.email;
    return typeof email === 'string' ? email.trim().toLowerCase() : undefined;
  }
}
