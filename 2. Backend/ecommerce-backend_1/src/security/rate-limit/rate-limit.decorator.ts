import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit_scope';

/** Declares which named rate-limit scope (see RateLimitConfig) applies to a route. */
export const RateLimitScope = (scope: string) => SetMetadata(RATE_LIMIT_KEY, scope);
