import { SessionsService } from './sessions.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuditService } from '../../audit/audit.service';
import { SecureToken } from '../../common/utils/secure-token.util';

function buildPrismaMock() {
  const prisma: any = {
    session: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));
  return prisma;
}

describe('SessionsService', () => {
  let prisma: ReturnType<typeof buildPrismaMock>;
  let configService: ConfigService;
  let auditService: AuditService;
  let service: SessionsService;

  beforeEach(() => {
    prisma = buildPrismaMock();
    configService = { get: jest.fn().mockReturnValue(2592000) } as unknown as ConfigService;
    auditService = { record: jest.fn() } as unknown as AuditService;
    service = new SessionsService(prisma as unknown as PrismaService, configService, auditService);
  });

  it('creates a session and returns a raw refresh token whose hash matches the stored value', async () => {
    prisma.session.create.mockImplementation(({ data }: any) => ({ id: 'session-1', ...data }));

    const { session, rawRefreshToken } = await service.createSession('user-1', {});

    expect(session.userId).toBe('user-1');
    expect(SecureToken.hash(rawRefreshToken)).toEqual(session.refreshTokenHash);
  });

  it('rejects a refresh token that does not match any session', async () => {
    prisma.session.findUnique.mockResolvedValue(null);

    await expect(service.rotate('unknown-token', {})).rejects.toMatchObject({
      code: 'TOKEN_INVALID',
    });
  });

  it('rejects an expired refresh token', async () => {
    prisma.session.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      revokedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    });

    await expect(service.rotate('expired-token', {})).rejects.toMatchObject({
      code: 'TOKEN_EXPIRED',
    });
  });

  it('rotates a valid refresh token: issues a new session and revokes the old one', async () => {
    prisma.session.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
    });
    prisma.session.create.mockImplementation(({ data }: any) => ({ id: 'session-2', ...data }));

    const { session } = await service.rotate('valid-token', {});

    expect(session.userId).toBe('user-1');
    expect(prisma.session.update).toHaveBeenCalledWith({
      where: { id: 'session-1' },
      data: expect.objectContaining({ replacedBySessionId: 'session-2' }),
    });
  });

  it('detects replay of an already-rotated refresh token and revokes the whole session family', async () => {
    prisma.session.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      revokedAt: new Date(), // already rotated/revoked
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(service.rotate('reused-token', {})).rejects.toMatchObject({
      code: 'TOKEN_REUSED',
    });

    expect(prisma.session.updateMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', revokedAt: null },
      data: expect.objectContaining({ revokedAt: expect.any(Date) }),
    });
    expect(auditService.record).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'session.refresh_token_reuse_detected' }),
    );
  });

  it('revoking by an unknown raw token is a no-op, not an error (idempotent logout)', async () => {
    prisma.session.findUnique.mockResolvedValue(null);
    await expect(service.revokeByRawToken('unknown')).resolves.toBeUndefined();
    expect(prisma.session.update).not.toHaveBeenCalled();
  });
});
