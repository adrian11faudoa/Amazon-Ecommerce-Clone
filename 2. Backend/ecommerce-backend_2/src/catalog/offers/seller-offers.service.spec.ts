import { SellerOffersService } from './seller-offers.service';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';

function buildDeps() {
  const prisma: any = {
    sku: { findUnique: jest.fn() },
    sellerOffer: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));
  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };
  const service = new SellerOffersService(
    prisma,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );
  return { service, prisma };
}

describe('SellerOffersService.create', () => {
  it('re-derives SKU ownership from the database rather than trusting the caller', async () => {
    const { service, prisma } = buildDeps();
    prisma.sku.findUnique.mockResolvedValue({ id: 'sku-1', organizationId: 'org-OTHER' });

    await expect(
      service.create('user-1', 'org-A', { skuId: 'sku-1' } as any),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });

  it('creates a DRAFT offer for a SKU owned by the caller organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.sku.findUnique.mockResolvedValue({ id: 'sku-1', organizationId: 'org-A' });
    prisma.sellerOffer.create.mockResolvedValue({
      id: 'offer-1',
      organizationId: 'org-A',
      skuId: 'sku-1',
      status: 'DRAFT',
    });

    const offer = await service.create('user-1', 'org-A', { skuId: 'sku-1' } as any);
    expect(offer.status).toEqual('DRAFT');
  });
});

describe('SellerOffersService.transitionStatus', () => {
  it('requireOwned throws 404 across tenants', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({
      id: 'offer-1',
      organizationId: 'org-A',
      status: 'DRAFT',
    });

    await expect(service.requireOwned('org-B', 'offer-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });

  it('rejects an invalid transition', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({
      id: 'offer-1',
      organizationId: 'org-A',
      status: 'ARCHIVED',
    });

    await expect(
      service.transitionStatus('user-1', 'org-A', 'offer-1', 'ACTIVE' as any),
    ).rejects.toMatchObject({ code: 'INVALID_STATE_TRANSITION' });
  });
});
