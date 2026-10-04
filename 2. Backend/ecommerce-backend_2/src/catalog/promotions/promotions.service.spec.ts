import { PromotionsService } from './promotions.service';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';
import { PromotionDiscountTypeDto } from './dto/create-promotion.dto';

function buildDeps() {
  const prisma: any = {
    sellerOffer: { findMany: jest.fn() },
    promotion: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn(), findMany: jest.fn() },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));
  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };
  const service = new PromotionsService(
    prisma,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );
  return { service, prisma };
}

const baseDto = {
  name: 'Summer Sale',
  discountType: PromotionDiscountTypeDto.PERCENTAGE,
  discountValue: 20,
  startAt: '2026-06-01T00:00:00.000Z',
  endAt: '2026-06-30T00:00:00.000Z',
  offerIds: ['offer-1'],
};

describe('PromotionsService.create', () => {
  it('rejects startAt not strictly before endAt', async () => {
    const { service } = buildDeps();
    await expect(
      service.create('user-1', 'org-A', {
        ...baseDto,
        startAt: baseDto.endAt,
        endAt: baseDto.startAt,
      }),
    ).rejects.toMatchObject({ code: 'INVALID_PROMOTION' });
  });

  it('rejects a percentage discount outside 1-100', async () => {
    const { service } = buildDeps();
    await expect(
      service.create('user-1', 'org-A', { ...baseDto, discountValue: 150 }),
    ).rejects.toMatchObject({ code: 'INVALID_PROMOTION' });
  });

  it('rejects a non-positive fixed-amount discount', async () => {
    const { service } = buildDeps();
    await expect(
      service.create('user-1', 'org-A', {
        ...baseDto,
        discountType: PromotionDiscountTypeDto.FIXED_AMOUNT,
        discountValue: 0,
      }),
    ).rejects.toMatchObject({ code: 'INVALID_PROMOTION' });
  });

  it('rejects attaching an offer that belongs to a different seller organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findMany.mockResolvedValue([{ id: 'offer-1', organizationId: 'org-OTHER' }]);

    await expect(service.create('user-1', 'org-A', baseDto)).rejects.toMatchObject({
      code: 'ORGANIZATION_ACCESS_DENIED',
    });
  });

  it('creates a promotion when all offers are owned by the caller organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.sellerOffer.findMany.mockResolvedValue([{ id: 'offer-1', organizationId: 'org-A' }]);
    prisma.promotion.create.mockResolvedValue({
      id: 'promo-1',
      organizationId: 'org-A',
      isActive: false,
      offers: [{ sellerOfferId: 'offer-1' }],
    });

    const promotion = await service.create('user-1', 'org-A', baseDto);
    expect(promotion.isActive).toBe(false);
  });
});

describe('PromotionsService.setActive', () => {
  it('requireOwned throws 404 across tenants', async () => {
    const { service, prisma } = buildDeps();
    prisma.promotion.findUnique.mockResolvedValue({
      id: 'promo-1',
      organizationId: 'org-A',
      offers: [],
    });

    await expect(service.requireOwned('org-B', 'promo-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });

  it('rejects activating a promotion whose end date has already passed', async () => {
    const { service, prisma } = buildDeps();
    prisma.promotion.findUnique.mockResolvedValue({
      id: 'promo-1',
      organizationId: 'org-A',
      endAt: new Date(Date.now() - 1000),
      usageLimit: null,
      timesUsed: 0,
      offers: [],
    });

    await expect(service.setActive('user-1', 'org-A', 'promo-1', true)).rejects.toMatchObject({
      code: 'INVALID_PROMOTION',
    });
  });

  it('rejects activating a promotion that has reached its usage limit', async () => {
    const { service, prisma } = buildDeps();
    prisma.promotion.findUnique.mockResolvedValue({
      id: 'promo-1',
      organizationId: 'org-A',
      endAt: new Date(Date.now() + 100000),
      usageLimit: 5,
      timesUsed: 5,
      offers: [],
    });

    await expect(service.setActive('user-1', 'org-A', 'promo-1', true)).rejects.toMatchObject({
      code: 'INVALID_PROMOTION',
    });
  });
});
