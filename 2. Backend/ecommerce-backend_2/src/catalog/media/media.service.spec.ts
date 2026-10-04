import { MediaService } from './media.service';
import { ConfigService } from '@nestjs/config';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';
import { StorageProvider } from '../../infrastructure/storage/storage-provider.interface';

function buildDeps() {
  const prisma: any = {
    product: { findUnique: jest.fn() },
    productVariant: { findUnique: jest.fn() },
    mediaAsset: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      findMany: jest.fn(),
    },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));

  const configService = {
    get: jest.fn((key: string) => {
      const values: Record<string, unknown> = {
        'storage.allowedContentTypes': ['image/jpeg', 'image/png'],
        'storage.maxUploadBytes': 1_000_000,
        'storage.uploadTtlSeconds': 900,
      };
      return values[key];
    }),
  } as unknown as ConfigService;

  const storageProvider: StorageProvider = {
    createPresignedUploadUrl: jest.fn().mockResolvedValue({
      url: 'https://example.com/presigned',
      method: 'PUT',
      expiresAt: new Date(),
    }),
    headObject: jest.fn(),
    deleteObject: jest.fn(),
  };

  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };

  const service = new MediaService(
    prisma,
    configService,
    storageProvider,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );

  return { service, prisma, storageProvider };
}

describe('MediaService.createUploadIntent', () => {
  it('rejects a product entity not owned by the caller organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({ id: 'prod-1', organizationId: 'org-OTHER' });

    await expect(
      service.createUploadIntent('user-1', 'org-A', {
        entityType: 'PRODUCT',
        entityId: 'prod-1',
        assetType: 'IMAGE',
        mimeType: 'image/jpeg',
        sizeBytes: 1000,
      }),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });

  it('rejects a disallowed content type', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({ id: 'prod-1', organizationId: 'org-A' });

    await expect(
      service.createUploadIntent('user-1', 'org-A', {
        entityType: 'PRODUCT',
        entityId: 'prod-1',
        assetType: 'DOCUMENT',
        mimeType: 'application/x-executable',
        sizeBytes: 1000,
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects a file exceeding the configured maximum size', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({ id: 'prod-1', organizationId: 'org-A' });

    await expect(
      service.createUploadIntent('user-1', 'org-A', {
        entityType: 'PRODUCT',
        entityId: 'prod-1',
        assetType: 'IMAGE',
        mimeType: 'image/jpeg',
        sizeBytes: 5_000_000,
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('generates a server-side storage key, never trusting a client-supplied path', async () => {
    const { service, prisma, storageProvider } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({ id: 'prod-1', organizationId: 'org-A' });
    prisma.mediaAsset.create.mockImplementation(({ data }: any) => ({ id: 'asset-1', ...data }));

    await service.createUploadIntent('user-1', 'org-A', {
      entityType: 'PRODUCT',
      entityId: 'prod-1',
      assetType: 'IMAGE',
      mimeType: 'image/jpeg',
      sizeBytes: 1000,
    });

    const createArgs = (storageProvider.createPresignedUploadUrl as jest.Mock).mock.calls[0][0];
    expect(createArgs.key).toMatch(/^catalog\/org-A\/product\/prod-1\/[\w-]+\.jpg$/);
  });
});

describe('MediaService.finalize', () => {
  it('is idempotent: finalizing an already-READY asset is a no-op success', async () => {
    const { service, prisma } = buildDeps();
    prisma.mediaAsset.findUnique.mockResolvedValue({
      id: 'asset-1',
      organizationId: 'org-A',
      status: 'READY',
    });

    const result = await service.finalize('user-1', 'org-A', 'asset-1');
    expect(result.status).toEqual('READY');
  });

  it('refuses to mark an asset READY when the storage provider cannot confirm the object exists', async () => {
    const { service, prisma, storageProvider } = buildDeps();
    prisma.mediaAsset.findUnique.mockResolvedValue({
      id: 'asset-1',
      organizationId: 'org-A',
      status: 'PENDING_UPLOAD',
      storageKey: 'catalog/org-A/product/p1/x.jpg',
      uploadExpiresAt: new Date(Date.now() + 60_000),
    });
    (storageProvider.headObject as jest.Mock).mockResolvedValue({ exists: false });

    await expect(service.finalize('user-1', 'org-A', 'asset-1')).rejects.toMatchObject({
      code: 'MEDIA_UPLOAD_CONFLICT',
    });
    expect(prisma.mediaAsset.update).not.toHaveBeenCalled();
  });

  it('marks the asset READY once the storage provider confirms the object exists', async () => {
    const { service, prisma, storageProvider } = buildDeps();
    prisma.mediaAsset.findUnique.mockResolvedValue({
      id: 'asset-1',
      organizationId: 'org-A',
      status: 'PENDING_UPLOAD',
      storageKey: 'catalog/org-A/product/p1/x.jpg',
      uploadExpiresAt: new Date(Date.now() + 60_000),
      sizeBytes: 1000,
    });
    (storageProvider.headObject as jest.Mock).mockResolvedValue({ exists: true, sizeBytes: 1000 });
    prisma.mediaAsset.update.mockResolvedValue({ id: 'asset-1', status: 'READY' });

    const result = await service.finalize('user-1', 'org-A', 'asset-1');
    expect(result.status).toEqual('READY');
  });

  it('rejects finalizing past the upload expiry window', async () => {
    const { service, prisma } = buildDeps();
    prisma.mediaAsset.findUnique.mockResolvedValue({
      id: 'asset-1',
      organizationId: 'org-A',
      status: 'PENDING_UPLOAD',
      storageKey: 'x',
      uploadExpiresAt: new Date(Date.now() - 1000),
    });

    await expect(service.finalize('user-1', 'org-A', 'asset-1')).rejects.toMatchObject({
      code: 'MEDIA_UPLOAD_CONFLICT',
    });
  });
});

describe('MediaService.delete', () => {
  it('is idempotent: deleting an already-DELETED asset is a no-op success', async () => {
    const { service, prisma, storageProvider } = buildDeps();
    prisma.mediaAsset.findUnique.mockResolvedValue({
      id: 'asset-1',
      organizationId: 'org-A',
      status: 'DELETED',
    });

    const result = await service.delete('user-1', 'org-A', 'asset-1');
    expect(result.status).toEqual('DELETED');
    expect(storageProvider.deleteObject).not.toHaveBeenCalled();
  });
});

describe('MediaService.cleanupExpiredUploadIntents', () => {
  it('only touches PENDING_UPLOAD assets past their expiry, marking them FAILED', async () => {
    const { service, prisma } = buildDeps();
    prisma.mediaAsset.findMany.mockResolvedValue([{ id: 'asset-1' }, { id: 'asset-2' }]);

    const count = await service.cleanupExpiredUploadIntents();

    expect(count).toEqual(2);
    expect(prisma.mediaAsset.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['asset-1', 'asset-2'] } },
      data: { status: 'FAILED' },
    });
  });
});
