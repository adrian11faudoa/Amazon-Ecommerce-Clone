import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';
import { OutboxService } from '../catalog/events/outbox.service';
import { AuditService } from '../audit/audit.service';

function buildDeps() {
  const prisma: any = {
    sellerOffer: { findUnique: jest.fn() },
    inventoryItem: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findMany: jest.fn(),
    },
    inventoryAdjustment: { create: jest.fn(), findMany: jest.fn() },
    inventoryReservation: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    $executeRaw: jest.fn(),
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));

  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };

  const service = new InventoryService(
    prisma,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );

  return { service, prisma, outboxService, auditService };
}

describe('InventoryService.adjust', () => {
  it('rejects an adjustment that would drive on-hand quantity negative (atomic guard, no read-then-write)', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryItem.findUnique.mockResolvedValue({ id: 'inv-1', organizationId: 'org-A' });
    prisma.$executeRaw.mockResolvedValue(0); // WHERE clause matched zero rows

    await expect(
      service.adjust('user-1', 'org-A', 'inv-1', {
        quantityDelta: -100,
        type: 'MANUAL_CORRECTION' as any,
        reason: 'test',
      }),
    ).rejects.toMatchObject({ code: 'INSUFFICIENT_INVENTORY' });

    expect(prisma.inventoryAdjustment.create).not.toHaveBeenCalled();
  });

  it('applies the adjustment and records it when the guard passes', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryItem.findUnique.mockResolvedValue({ id: 'inv-1', organizationId: 'org-A' });
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryAdjustment.create.mockResolvedValue({ id: 'adj-1' });
    prisma.inventoryItem.findUniqueOrThrow.mockResolvedValue({ id: 'inv-1', onHandQuantity: 10 });

    const { adjustment } = await service.adjust('user-1', 'org-A', 'inv-1', {
      quantityDelta: 10,
      type: 'FOUND' as any,
      reason: 'found stock',
    });

    expect(adjustment.id).toEqual('adj-1');
  });

  it('rejects adjusting inventory owned by a different organization', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryItem.findUnique.mockResolvedValue({ id: 'inv-1', organizationId: 'org-OTHER' });

    await expect(
      service.adjust('user-1', 'org-A', 'inv-1', {
        quantityDelta: 1,
        type: 'FOUND' as any,
        reason: 'x',
      }),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });
});

describe('InventoryService.reconcile', () => {
  it('is a no-op when the authoritative count matches current on-hand', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryItem.findUnique.mockResolvedValue({
      id: 'inv-1',
      organizationId: 'org-A',
      onHandQuantity: 50,
    });

    const result = await service.reconcile('user-1', 'org-A', 'inv-1', {
      authoritativeOnHandQuantity: 50,
      reason: 'count',
    });

    expect(result.discrepancy).toEqual(0);
    expect(prisma.$executeRaw).not.toHaveBeenCalled();
  });

  it('applies the discrepancy as an auditable RECONCILIATION adjustment', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryItem.findUnique.mockResolvedValue({
      id: 'inv-1',
      organizationId: 'org-A',
      onHandQuantity: 50,
    });
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryAdjustment.create.mockResolvedValue({ id: 'adj-1', quantityDelta: -5 });
    prisma.inventoryItem.findUniqueOrThrow.mockResolvedValue({ id: 'inv-1', onHandQuantity: 45 });

    const result = await service.reconcile('user-1', 'org-A', 'inv-1', {
      authoritativeOnHandQuantity: 45,
      reason: 'physical count found shrinkage',
    });

    expect(result.discrepancy).toEqual(-5);
  });
});

describe('InventoryService.reserveForCheckout', () => {
  it('fails with INSUFFICIENT_INVENTORY when the atomic guard finds no availability (concurrency-safe: one statement, no separate read)', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue(null);
    prisma.$executeRaw.mockResolvedValue(0);

    await expect(service.reserveForCheckout('checkout-1', 'inv-1', 5)).rejects.toMatchObject({
      code: 'INSUFFICIENT_INVENTORY',
    });
  });

  it('creates a reservation when the atomic guard succeeds', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue(null);
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryReservation.create.mockResolvedValue({
      id: 'res-1',
      inventoryItemId: 'inv-1',
      checkoutId: 'checkout-1',
      quantity: 5,
      state: 'ACTIVE',
    });

    const reservation = await service.reserveForCheckout('checkout-1', 'inv-1', 5);
    expect(reservation.id).toEqual('res-1');
  });

  it('is idempotent: an identical repeat request for the same checkout+item returns the existing reservation', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({
      id: 'res-1',
      state: 'ACTIVE',
      quantity: 5,
    });

    const reservation = await service.reserveForCheckout('checkout-1', 'inv-1', 5);

    expect(reservation.id).toEqual('res-1');
    expect(prisma.$executeRaw).not.toHaveBeenCalled();
  });

  it('rejects a repeat request for the same checkout+item with a DIFFERENT quantity (deterministic conflict, not silent double-reservation)', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({
      id: 'res-1',
      state: 'ACTIVE',
      quantity: 5,
    });

    await expect(service.reserveForCheckout('checkout-1', 'inv-1', 10)).rejects.toMatchObject({
      code: 'RESERVATION_CONFLICT',
    });
  });

  it('falls back to the idempotent lookup when it loses a P2002 race on (checkoutId, inventoryItemId)', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique
      .mockResolvedValueOnce(null) // initial lookup: nothing yet
      .mockResolvedValueOnce({ id: 'res-winner', quantity: 5 }); // re-lookup after P2002
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryReservation.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('unique violation', 'P2002'),
    );

    const reservation = await service.reserveForCheckout('checkout-1', 'inv-1', 5);
    expect(reservation.id).toEqual('res-winner');
  });
});

describe('InventoryService reservation transitions', () => {
  it('releaseReservation is idempotent for an already-released reservation', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({ id: 'res-1', state: 'RELEASED' });

    const result = await service.releaseReservation('res-1');
    expect(result.state).toEqual('RELEASED');
    expect(prisma.$executeRaw).not.toHaveBeenCalled();
  });

  it('rejects releasing a CONSUMED reservation (invalid transition)', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({ id: 'res-1', state: 'CONSUMED' });

    await expect(service.releaseReservation('res-1')).rejects.toMatchObject({
      code: 'INVALID_STATE_TRANSITION',
    });
  });

  it('releases an active reservation, decrementing reservedQuantity atomically', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({
      id: 'res-1',
      state: 'ACTIVE',
      inventoryItemId: 'inv-1',
      quantity: 5,
      checkoutId: 'checkout-1',
    });
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryReservation.update.mockResolvedValue({ id: 'res-1', state: 'RELEASED' });

    const result = await service.releaseReservation('res-1');
    expect(result.state).toEqual('RELEASED');
  });

  it('consumeReservation is idempotent for an already-consumed reservation', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({ id: 'res-1', state: 'CONSUMED' });

    const result = await service.consumeReservation('res-1');
    expect(result.state).toEqual('CONSUMED');
  });

  it('consumeReservation atomically reduces both reservedQuantity and onHandQuantity', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findUnique.mockResolvedValue({
      id: 'res-1',
      state: 'ACTIVE',
      inventoryItemId: 'inv-1',
      quantity: 3,
      checkoutId: 'checkout-1',
    });
    prisma.$executeRaw.mockResolvedValue(1);
    prisma.inventoryReservation.update.mockResolvedValue({ id: 'res-1', state: 'CONSUMED' });

    const result = await service.consumeReservation('res-1');
    expect(result.state).toEqual('CONSUMED');
    expect(prisma.$executeRaw).toHaveBeenCalled();
  });
});

describe('InventoryService.findExpiredActiveReservations', () => {
  it('queries with a bounded batch size', async () => {
    const { service, prisma } = buildDeps();
    prisma.inventoryReservation.findMany.mockResolvedValue([]);

    await service.findExpiredActiveReservations(50);

    expect(prisma.inventoryReservation.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 50 }),
    );
  });
});
