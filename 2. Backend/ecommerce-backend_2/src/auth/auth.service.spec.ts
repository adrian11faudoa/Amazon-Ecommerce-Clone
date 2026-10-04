import { AuthService } from './auth.service';
import { AppException } from '../common/errors/app-exception';

function buildDeps() {
  const prisma = {
    emailVerificationToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    passwordResetToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    $transaction: jest.fn(async (ops: unknown[]) => Promise.all(ops as Promise<unknown>[])),
  };
  const configService = {
    get: jest.fn((key: string) => {
      const values: Record<string, number> = {
        'auth.accessTokenTtlSeconds': 900,
        'auth.emailVerificationTtlSeconds': 86400,
        'auth.passwordResetTtlSeconds': 3600,
      };
      return values[key];
    }),
  };
  const usersService = {
    createCustomerAccount: jest.fn(),
    findByNormalizedEmail: jest.fn(),
    requireById: jest.fn(),
    markEmailVerified: jest.fn(),
    updatePasswordHash: jest.fn(),
    toResponseDto: jest.fn((u: any) => ({ id: u.id, email: u.email })),
  };
  const passwordService = {
    meetsPolicy: jest.fn().mockReturnValue(true),
    hash: jest.fn().mockResolvedValue('hashed'),
    verify: jest.fn(),
  };
  const tokenService = {
    signAccessToken: jest.fn().mockResolvedValue('signed.jwt.token'),
  };
  const sessionsService = {
    createSession: jest.fn().mockResolvedValue({
      session: { id: 'session-1' },
      rawRefreshToken: 'raw-refresh-token',
    }),
    rotate: jest.fn(),
    revokeByRawToken: jest.fn(),
    revokeAllForUser: jest.fn(),
  };
  const emailService = {
    sendEmailVerification: jest.fn(),
    sendPasswordReset: jest.fn(),
  };
  const auditService = { record: jest.fn() };

  const service = new AuthService(
    prisma as any,
    configService as any,
    usersService as any,
    passwordService as any,
    tokenService as any,
    sessionsService as any,
    emailService as any,
    auditService as any,
  );

  return {
    service,
    prisma,
    configService,
    usersService,
    passwordService,
    tokenService,
    sessionsService,
    emailService,
    auditService,
  };
}

describe('AuthService.register', () => {
  it('creates the account, issues a verification email, and returns a session', async () => {
    const deps = buildDeps();
    const createdUser = {
      id: 'user-1',
      email: 'new@example.com',
      platformRoles: [{ role: 'CUSTOMER' }],
    };
    deps.usersService.createCustomerAccount.mockResolvedValue(createdUser);

    const result = await deps.service.register({
      email: 'new@example.com',
      password: 'longenoughpassword',
      displayName: 'New User',
      metadata: {},
    });

    expect(deps.usersService.createCustomerAccount).toHaveBeenCalled();
    expect(deps.emailService.sendEmailVerification).toHaveBeenCalled();
    expect(result.accessToken).toEqual('signed.jwt.token');
    expect(result.refreshToken).toEqual('raw-refresh-token');
  });

  it('rejects passwords that do not meet policy before touching the database', async () => {
    const deps = buildDeps();
    deps.passwordService.meetsPolicy.mockReturnValue(false);

    await expect(
      deps.service.register({
        email: 'new@example.com',
        password: 'short',
        displayName: 'New User',
        metadata: {},
      }),
    ).rejects.toBeInstanceOf(AppException);

    expect(deps.usersService.createCustomerAccount).not.toHaveBeenCalled();
  });
});

describe('AuthService.login', () => {
  it('logs in successfully with correct credentials', async () => {
    const deps = buildDeps();
    const user = {
      id: 'user-1',
      email: 'user@example.com',
      status: 'ACTIVE',
      passwordHash: 'hashed',
      platformRoles: [{ role: 'CUSTOMER' }],
    };
    deps.usersService.findByNormalizedEmail.mockResolvedValue(user);
    deps.passwordService.verify.mockResolvedValue(true);

    const result = await deps.service.login({
      email: 'user@example.com',
      password: 'correct-password',
      metadata: {},
    });

    expect(result.accessToken).toEqual('signed.jwt.token');
  });

  it('throws generic INVALID_CREDENTIALS for a nonexistent account, still hashing to avoid a timing oracle', async () => {
    const deps = buildDeps();
    deps.usersService.findByNormalizedEmail.mockResolvedValue(null);
    deps.passwordService.verify.mockResolvedValue(false);

    await expect(
      deps.service.login({ email: 'nobody@example.com', password: 'x', metadata: {} }),
    ).rejects.toMatchObject({ code: 'INVALID_CREDENTIALS' });

    // Anti-enumeration: verify() must still be called with a real hash shape
    // even though there is no matching user.
    expect(deps.passwordService.verify).toHaveBeenCalledWith(
      expect.stringContaining('$argon2id$'),
      'x',
    );
  });

  it('throws generic INVALID_CREDENTIALS (not a different message) for a wrong password on a real account', async () => {
    const deps = buildDeps();
    deps.usersService.findByNormalizedEmail.mockResolvedValue({
      id: 'user-1',
      status: 'ACTIVE',
      passwordHash: 'hashed',
      platformRoles: [],
    });
    deps.passwordService.verify.mockResolvedValue(false);

    await expect(
      deps.service.login({ email: 'user@example.com', password: 'wrong', metadata: {} }),
    ).rejects.toMatchObject({ code: 'INVALID_CREDENTIALS' });
  });

  it('rejects login for a suspended account even with correct credentials', async () => {
    const deps = buildDeps();
    deps.usersService.findByNormalizedEmail.mockResolvedValue({
      id: 'user-1',
      status: 'SUSPENDED',
      passwordHash: 'hashed',
      platformRoles: [],
    });
    deps.passwordService.verify.mockResolvedValue(true);

    await expect(
      deps.service.login({ email: 'user@example.com', password: 'correct', metadata: {} }),
    ).rejects.toMatchObject({ code: 'ACCOUNT_SUSPENDED' });
  });
});

describe('AuthService email verification', () => {
  it('verifies a valid, unconsumed, unexpired token', async () => {
    const deps = buildDeps();
    deps.prisma.emailVerificationToken.findUnique.mockResolvedValue({
      id: 'token-1',
      userId: 'user-1',
      consumedAt: null,
      expiresAt: new Date(Date.now() + 1000),
    });

    await deps.service.verifyEmail('raw-token');

    expect(deps.usersService.markEmailVerified).toHaveBeenCalledWith('user-1');
  });

  it('rejects an already-consumed (reused) token', async () => {
    const deps = buildDeps();
    deps.prisma.emailVerificationToken.findUnique.mockResolvedValue({
      id: 'token-1',
      userId: 'user-1',
      consumedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000),
    });

    await expect(deps.service.verifyEmail('raw-token')).rejects.toMatchObject({
      code: 'TOKEN_REUSED',
    });
  });

  it('rejects an expired token', async () => {
    const deps = buildDeps();
    deps.prisma.emailVerificationToken.findUnique.mockResolvedValue({
      id: 'token-1',
      userId: 'user-1',
      consumedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    });

    await expect(deps.service.verifyEmail('raw-token')).rejects.toMatchObject({
      code: 'TOKEN_EXPIRED',
    });
  });
});

describe('AuthService password reset', () => {
  it('requestPasswordReset is a silent no-op for a nonexistent account (anti-enumeration)', async () => {
    const deps = buildDeps();
    deps.usersService.findByNormalizedEmail.mockResolvedValue(null);

    await expect(deps.service.requestPasswordReset('nobody@example.com')).resolves.toBeUndefined();
    expect(deps.prisma.passwordResetToken.create).not.toHaveBeenCalled();
  });

  it('resetPassword invalidates all existing sessions on success', async () => {
    const deps = buildDeps();
    deps.prisma.passwordResetToken.findUnique.mockResolvedValue({
      id: 'reset-1',
      userId: 'user-1',
      consumedAt: null,
      expiresAt: new Date(Date.now() + 1000),
    });

    await deps.service.resetPassword('raw-token', 'brand-new-password');

    expect(deps.usersService.updatePasswordHash).toHaveBeenCalledWith('user-1', 'hashed');
    expect(deps.sessionsService.revokeAllForUser).toHaveBeenCalledWith('user-1');
  });

  it('rejects a reused password-reset token', async () => {
    const deps = buildDeps();
    deps.prisma.passwordResetToken.findUnique.mockResolvedValue({
      id: 'reset-1',
      userId: 'user-1',
      consumedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000),
    });

    await expect(
      deps.service.resetPassword('raw-token', 'brand-new-password'),
    ).rejects.toMatchObject({ code: 'TOKEN_REUSED' });
  });
});
