import { ProductsService } from './products.service';
import { AttributeDefinitionsService } from '../attributes/attribute-definitions.service';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';

function buildDeps() {
  const prisma: any = {
    category: { findUnique: jest.fn() },
    product: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    productAttributeValue: { deleteMany: jest.fn() },
    productVariant: { count: jest.fn() },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));

  const attributeDefinitionsService = {
    requireByIds: jest.fn().mockResolvedValue([]),
    validateValue: jest.fn(),
  };
  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };

  const service = new ProductsService(
    prisma,
    attributeDefinitionsService as unknown as AttributeDefinitionsService,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );

  return { service, prisma, attributeDefinitionsService, outboxService, auditService };
}

describe('ProductsService seller isolation', () => {
  it('requireOwned throws 404 (not 403) when the product belongs to a different organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      attributeValues: [],
    });

    await expect(service.requireOwned('org-B', 'prod-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });

  it('requireOwned succeeds when the product belongs to the requesting organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      attributeValues: [],
    });

    await expect(service.requireOwned('org-A', 'prod-1')).resolves.toMatchObject({
      id: 'prod-1',
    });
  });

  it('getPublicById only returns ACTIVE products, 404 for DRAFT/PAUSED/ARCHIVED', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      status: 'DRAFT',
      attributeValues: [],
    });

    await expect(service.getPublicById('prod-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });
});

describe('ProductsService.transitionStatus', () => {
  it('rejects an invalid transition (e.g. ARCHIVED -> ACTIVE)', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'ARCHIVED',
      attributeValues: [],
    });

    await expect(
      service.transitionStatus('user-1', 'org-A', 'prod-1', 'ACTIVE' as any),
    ).rejects.toMatchObject({ code: 'INVALID_STATE_TRANSITION' });
  });

  it('rejects publishing a product with no category', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'DRAFT',
      categoryId: null,
      attributeValues: [],
    });

    await expect(
      service.transitionStatus('user-1', 'org-A', 'prod-1', 'ACTIVE' as any),
    ).rejects.toMatchObject({ code: 'INVALID_STATE_TRANSITION' });
  });

  it('rejects publishing a product with no orderable (active, priced) variant', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'DRAFT',
      categoryId: 'cat-1',
      attributeValues: [],
    });
    prisma.productVariant.count.mockResolvedValue(0);

    await expect(
      service.transitionStatus('user-1', 'org-A', 'prod-1', 'ACTIVE' as any),
    ).rejects.toMatchObject({ code: 'INVALID_STATE_TRANSITION' });
  });

  it('allows publishing a product with a category and at least one orderable variant', async () => {
    const { service, prisma, outboxService } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'DRAFT',
      categoryId: 'cat-1',
      attributeValues: [],
    });
    prisma.productVariant.count.mockResolvedValue(1);
    prisma.product.update.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'ACTIVE',
      categoryId: 'cat-1',
      attributeValues: [],
      updatedAt: new Date(),
    });

    const updated = await service.transitionStatus('user-1', 'org-A', 'prod-1', 'ACTIVE' as any);

    expect(updated.status).toEqual('ACTIVE');
    expect(outboxService.record).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ eventType: 'catalog.product.published' }),
    );
  });

  it('allows DRAFT -> ARCHIVED directly without publication requirements', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.findUnique.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'DRAFT',
      categoryId: null,
      attributeValues: [],
    });
    prisma.product.update.mockResolvedValue({
      id: 'prod-1',
      organizationId: 'org-A',
      status: 'ARCHIVED',
      attributeValues: [],
      updatedAt: new Date(),
    });

    await expect(
      service.transitionStatus('user-1', 'org-A', 'prod-1', 'ARCHIVED' as any),
    ).resolves.toMatchObject({ status: 'ARCHIVED' });
  });
});

describe('ProductsService.create', () => {
  it('derives a slug from the title when none is provided', async () => {
    const { service, prisma } = buildDeps();
    prisma.product.create.mockImplementation(({ data }: any) => ({
      ...data,
      id: 'prod-1',
      attributeValues: [],
      updatedAt: new Date(),
    }));

    const product = await service.create('user-1', 'org-A', {
      title: 'Wireless Mouse — Pro',
      description: 'A mouse.',
    } as any);

    expect(product.slug).toEqual('wireless-mouse-pro');
  });

  it('rejects an unknown categoryId', async () => {
    const { service, prisma } = buildDeps();
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(
      service.create('user-1', 'org-A', {
        title: 'X',
        description: 'Y',
        categoryId: 'missing-cat',
      } as any),
    ).rejects.toMatchObject({ code: 'INVALID_CATEGORY' });
  });
});
