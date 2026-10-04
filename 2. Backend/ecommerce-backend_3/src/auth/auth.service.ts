import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { SecureToken } from '../common/utils/secure-token.util';
import { normalizeEmail } from '../common/utils/email.util';
import { AuditService } from '../audit/audit.service';
import { EmailService } from '../email/email.service';
import { PasswordService } from '../security/password/password.service';
import { UsersService, UserWithRoles } from '../users/users.service';
import { AuthSessionResponseDto } from './dto/auth-session-response.dto';
import { SessionMetadata, SessionsService } from './sessions/sessions.service';
import { TokenService } from './tokens/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly sessionsService: SessionsService,
    private readonly emailService: EmailService,
    private readonly auditService: AuditService,
  ) {}

  // -------------------------------------------------------------------
  // Registration
  // -------------------------------------------------------------------

  async register(params: {
    email: string;
    password: string;
    displayName: string;
    metadata: SessionMetadata;
  }): Promise<AuthSessionResponseDto> {
    if (!this.passwordService.meetsPolicy(params.password)) {
      throw AppException.validationFailed(
        `Password must be between ${PasswordService.MIN_LENGTH} and ${PasswordService.MAX_LENGTH} characters.`,
      );
    }

    const passwordHash = await this.passwordService.hash(params.password);
    const user = await this.usersService.createCustomerAccount({
      email: params.email,
      passwordHash,
      displayName: params.displayName,
    });

    await this.auditService.record({
      actorUserId: user.id,
      action: 'auth.register',
      targetType: 'User',
      targetId: user.id,
      outcome: 'SUCCESS',
    });

    await this.issueEmailVerificationToken(user);

    return this.issueSessionResponse(user, params.metadata);
  }

  // -------------------------------------------------------------------
  // Login
  // -------------------------------------------------------------------

  async login(params: {
    email: string;
    password: string;
    metadata: SessionMetadata;
  }): Promise<AuthSessionResponseDto> {
    const user = await this.usersService.findByNormalizedEmail(params.email);

    // Deliberately identical failure path/timing profile whether the
    // account exists or the password is wrong, to avoid an enumeration
    // oracle. We always run a hash verification, using a static dummy
    // hash when there is no real account.
    const passwordHash = user?.passwordHash ?? AuthService.DUMMY_HASH;
    const passwordMatches = await this.passwordService.verify(passwordHash, params.password);

    if (!user || !passwordMatches) {
      await this.auditService.record({
        action: 'auth.login',
        outcome: 'FAILURE',
        metadata: { emailAttempted: normalizeEmail(params.email) },
      });
      throw AppException.invalidCredentials();
    }

    if (user.status === UserStatus.SUSPENDED || user.status === UserStatus.DEACTIVATED) {
      await this.auditService.record({
        actorUserId: user.id,
        action: 'auth.login',
        outcome: 'FAILURE',
        metadata: { reason: 'account_status', status: user.status },
      });
      throw AppException.accountSuspended();
    }

    await this.auditService.record({
      actorUserId: user.id,
      action: 'auth.login',
      outcome: 'SUCCESS',
    });

    return this.issueSessionResponse(user, params.metadata);
  }

  // A fixed, validly-formatted argon2id hash with no known plaintext.
  // Used only to keep login timing/shape consistent when no account
  // exists, per email-enumeration protection requirements.
  private static readonly DUMMY_HASH =
    '$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHRzb21lc2FsdA$KYFtLb1Ss1J3v9boCkNjWXO6TQ0Y1zXWWrO6b/EhXaU';

  // -------------------------------------------------------------------
  // Token refresh / logout
  // -------------------------------------------------------------------

  async refresh(rawRefreshToken: string, metadata: SessionMetadata) {
    const { session, rawRefreshToken: newRawRefreshToken } = await this.sessionsService.rotate(
      rawRefreshToken,
      metadata,
    );
    const user = await this.usersService.requireById(session.userId);

    const accessToken = await this.tokenService.signAccessToken({
      sub: user.id,
      roles: user.platformRoles.map((r: { role: string }) => r.role),
    });

    return {
      accessToken,
      refreshToken: newRawRefreshToken,
      expiresInSeconds: this.configService.get<number>('auth.accessTokenTtlSeconds') ?? 900,
      user: this.usersService.toResponseDto(user),
    };
  }

  async logout(rawRefreshToken: string, userId?: string): Promise<void> {
    await this.sessionsService.revokeByRawToken(rawRefreshToken);
    await this.auditService.record({
      actorUserId: userId,
      action: 'auth.logout',
      outcome: 'SUCCESS',
    });
  }

  // -------------------------------------------------------------------
  // Email verification
  // -------------------------------------------------------------------

  async issueEmailVerificationToken(user: UserWithRoles): Promise<void> {
    const rawToken = SecureToken.generate();
    const ttlSeconds = this.configService.get<number>('auth.emailVerificationTtlSeconds') ?? 86400;

    await this.prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash: SecureToken.hash(rawToken),
        expiresAt: new Date(Date.now() + ttlSeconds * 1000),
      },
    });

    await this.emailService.sendEmailVerification(user.email, rawToken);
  }

  async resendVerification(email: string): Promise<void> {
    const user = await this.usersService.findByNormalizedEmail(email);
    // Generic response regardless of whether the account exists or is
    // already verified — anti-enumeration.
    if (user && !user.emailVerifiedAt) {
      await this.issueEmailVerificationToken(user);
    }
  }

  async verifyEmail(rawToken: string): Promise<void> {
    const tokenHash = SecureToken.hash(rawToken);
    const record = await this.prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    });

    if (!record) {
      throw AppException.tokenInvalid();
    }
    if (record.consumedAt) {
      throw AppException.tokenReused();
    }
    if (record.expiresAt.getTime() < Date.now()) {
      throw AppException.tokenExpired();
    }

    await this.prisma.$transaction([
      this.prisma.emailVerificationToken.update({
        where: { id: record.id },
        data: { consumedAt: new Date() },
      }),
    ]);
    await this.usersService.markEmailVerified(record.userId);

    await this.auditService.record({
      actorUserId: record.userId,
      action: 'auth.email_verified',
      outcome: 'SUCCESS',
    });
  }

  // -------------------------------------------------------------------
  // Password reset
  // -------------------------------------------------------------------

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByNormalizedEmail(email);
    // Always return success to the caller regardless of whether the
    // account exists — anti-enumeration. Only actually issue a token
    // when it does.
    if (!user) {
      return;
    }

    const rawToken = SecureToken.generate();
    const ttlSeconds = this.configService.get<number>('auth.passwordResetTtlSeconds') ?? 3600;

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: SecureToken.hash(rawToken),
        expiresAt: new Date(Date.now() + ttlSeconds * 1000),
      },
    });

    await this.emailService.sendPasswordReset(user.email, rawToken);

    await this.auditService.record({
      actorUserId: user.id,
      action: 'auth.password_reset_requested',
      outcome: 'SUCCESS',
    });
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    if (!this.passwordService.meetsPolicy(newPassword)) {
      throw AppException.validationFailed(
        `Password must be between ${PasswordService.MIN_LENGTH} and ${PasswordService.MAX_LENGTH} characters.`,
      );
    }

    const tokenHash = SecureToken.hash(rawToken);
    const record = await this.prisma.passwordResetToken.findUnique({ where: { tokenHash } });

    if (!record) {
      throw AppException.tokenInvalid();
    }
    if (record.consumedAt) {
      throw AppException.tokenReused();
    }
    if (record.expiresAt.getTime() < Date.now()) {
      throw AppException.tokenExpired();
    }

    const passwordHash = await this.passwordService.hash(newPassword);

    await this.prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    });
    await this.usersService.updatePasswordHash(record.userId, passwordHash);
    // Credential compromise/reset must invalidate existing sessions.
    await this.sessionsService.revokeAllForUser(record.userId);

    await this.auditService.record({
      actorUserId: record.userId,
      action: 'auth.password_reset_completed',
      outcome: 'SUCCESS',
    });
  }

  // -------------------------------------------------------------------
  // Shared helpers
  // -------------------------------------------------------------------

  private async issueSessionResponse(
    user: UserWithRoles,
    metadata: SessionMetadata,
  ): Promise<AuthSessionResponseDto> {
    const { rawRefreshToken } = await this.sessionsService.createSession(user.id, metadata);
    const accessToken = await this.tokenService.signAccessToken({
      sub: user.id,
      roles: user.platformRoles.map((r: { role: string }) => r.role),
    });

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      expiresInSeconds: this.configService.get<number>('auth.accessTokenTtlSeconds') ?? 900,
      user: this.usersService.toResponseDto(user),
    };
  }
}
