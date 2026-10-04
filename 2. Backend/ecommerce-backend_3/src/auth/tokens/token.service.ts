import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppException } from '../../common/errors/app-exception';

export interface AccessTokenPayload {
  sub: string; // userId
  roles: string[];
}

/**
 * Access tokens are short-lived, signed JWTs carrying the user's platform
 * roles. Embedding roles avoids a database round-trip on every request;
 * the short TTL (see JWT_ACCESS_TTL_SECONDS) bounds how stale that
 * embedded role snapshot can be after an administrative role change.
 * Anything with a longer-lived trust requirement (org membership,
 * financial actions) is re-checked against the database on each request
 * rather than trusted from the token — see AuthorizationService.
 */
@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signAccessToken(payload: AccessTokenPayload): Promise<string> {
    const ttl = this.configService.get<number>('auth.accessTokenTtlSeconds');
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('auth.accessTokenSecret'),
      expiresIn: ttl,
    });
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      return await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        secret: this.configService.get<string>('auth.accessTokenSecret'),
      });
    } catch (error) {
      const err = error as { name?: string };
      if (err?.name === 'TokenExpiredError') {
        throw AppException.tokenExpired();
      }
      throw AppException.tokenInvalid();
    }
  }
}
