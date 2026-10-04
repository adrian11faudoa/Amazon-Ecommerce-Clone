import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Session } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { SecureToken } from '../../common/utils/secure-token.util';
import { AuditService } from '../../audit/audit.service';

export interface SessionMetadata {
  userAgent?: string;
  ipAddress?: string;
}

export interface IssuedSession {
  session: Session;
  rawRefreshToken: string;
}

/**
 * Owns the refresh-token/session lifecycle.
 *
 * Security model:
 *  - Only the SHA-256 hash of a refresh token is ever persisted.
 *  - Refresh tokens rotate on every use (rotate-on-use). The previous
 *    session row is marked revoked at the moment a new one is issued.
 *  - If a refresh token whose session is already revoked is presented
 *    again, that is replay of an already-rotated token: we treat it as a
 *    compromise signal and revoke the entire session family for that user.
 */
@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  async createSession(userId: string, metadata: SessionMetadata): Promise<IssuedSession> {
    const rawRefreshToken = SecureToken.generate();
    const ttlSeconds = this.configService.get<number>('auth.refreshTokenTtlSeconds') ?? 2592000;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    const session = await this.prisma.session.create({
      data: {
        userId,
        refreshTokenHash: SecureToken.hash(rawRefreshToken),
        userAgent: metadata.userAgent?.slice(0, 512),
        ipAddress: metadata.ipAddress,
        expiresAt,
      },
    });

    return { session, rawRefreshToken };
  }

  /**
   * Validates and rotates a refresh token in one transaction. Returns the
   * new session/refresh-token pair and the userId to issue a fresh access
   * token for.
   */
  async rotate(rawRefreshToken: string, metadata: SessionMetadata): Promise<IssuedSession> {
    const tokenHash = SecureToken.hash(rawRefreshToken);
    const session = await this.prisma.session.findUnique({
      where: { refreshTokenHash: tokenHash },
    });

    if (!session) {
      throw AppException.tokenInvalid('Refresh token is not recognized.');
    }

    if (session.revokedAt) {
      // Reuse of an already-rotated (or explicitly revoked) refresh token.
      // Treat as a possible token-theft signal and revoke the whole family.
      await this.revokeAllForUser(session.userId);
      await this.auditService.record({
        actorUserId: session.userId,
        action: 'session.refresh_token_reuse_detected',
        targetType: 'Session',
        targetId: session.id,
        outcome: 'FAILURE',
      });
      throw AppException.tokenReused();
    }

    if (session.expiresAt.getTime() < Date.now()) {
      throw AppException.tokenExpired('Refresh token has expired.');
    }

    const rawNewRefreshToken = SecureToken.generate();
    const ttlSeconds = this.configService.get<number>('auth.refreshTokenTtlSeconds') ?? 2592000;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    const newSession = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const created = await tx.session.create({
        data: {
          userId: session.userId,
          refreshTokenHash: SecureToken.hash(rawNewRefreshToken),
          userAgent: metadata.userAgent?.slice(0, 512),
          ipAddress: metadata.ipAddress,
          expiresAt,
        },
      });

      await tx.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date(), replacedBySessionId: created.id },
      });

      return created;
    });

    return { session: newSession, rawRefreshToken: rawNewRefreshToken };
  }

  async revokeByRawToken(rawRefreshToken: string): Promise<void> {
    const tokenHash = SecureToken.hash(rawRefreshToken);
    const session = await this.prisma.session.findUnique({
      where: { refreshTokenHash: tokenHash },
    });
    if (!session || session.revokedAt) {
      return; // Idempotent: logging out an already-revoked/unknown session is a no-op success.
    }
    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
