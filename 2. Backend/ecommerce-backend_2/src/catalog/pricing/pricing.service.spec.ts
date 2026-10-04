import { PricingService } from './pricing.service';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';

function buildDeps() {
  const prisma: any = {
    sellerOffer: { findUnique: jest.fn() },
    price: { findFirst: jest.fn(), update: jest.fn(), create: jest.fn(), findMany: jest.fn() },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));
  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };
  const service = new PricingService(
    prisma,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );
  return { service, prisma };
}

describe('PricingService.activatePrice', () => {
  it('rejects an offer not owned by the caller organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', organizationId: 'org-OTHER' });

    await expect(
      service.activatePrice('user-1', 'org-A', 'offer-1', {
        amountMinorUnits: '1999',
        currency: 'USD',
      }),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });

  it('rejects an unsupported currency', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', organizationId: 'org-A' });

    await expect(
      service.activatePrice('user-1', 'org-A', 'offer-1', {
        amountMinorUnits: '1999',
        currency: 'ZZZ',
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects a non-integer amountMinorUnits string', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', organizationId: 'org-A' });

    await expect(
      service.activatePrice('user-1', 'org-A', 'offer-1', {
        amountMinorUnits: '19.99',
        currency: 'USD',
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('deactivates the previously active price when activating a new one (no overlap)', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', organizationId: 'org-A' });
    prisma.price.findFirst.mockResolvedValue({ id: 'price-old' });
    prisma.price.create.mockResolvedValue({
      id: 'price-new',
      sellerOfferId: 'offer-1',
      amountMinorUnits: 1999n,
      currency: 'USD',
      effectiveFrom: new Date(),
      isActive: true,
    });

    await service.activatePrice('user-1', 'org-A', 'offer-1', {
      amountMinorUnits: '1999',
      currency: 'USD',
    });

    expect(prisma.price.update).toHaveBeenCalledWith({
      where: { id: 'price-old' },
      data: expect.objectContaining({ isActive: false }),
    });
  });

  it('activates a price directly when no previous active price exists', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', organizationId: 'org-A' });
    prisma.price.findFirst.mockResolvedValue(null);
    prisma.price.create.mockResolvedValue({
      id: 'price-new',
      sellerOfferId: 'offer-1',
      amountMinorUnits: 500n,
      currency: 'USD',
      effectiveFrom: new Date(),
      isActive: true,
    });

    const price = await service.activatePrice('user-1', 'org-A', 'offer-1', {
      amountMinorUnits: '500',
      currency: 'usd',
    });

    expect(prisma.price.update).not.toHaveBeenCalled();
    expect(price.currency).toEqual('USD');
    expect(prisma.price.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ currency: 'USD' }) }),
    );
  });
});
