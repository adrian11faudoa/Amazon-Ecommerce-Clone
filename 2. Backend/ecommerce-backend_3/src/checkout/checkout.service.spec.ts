import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';
import { InventoryService } from '../inventory/inventory.service';
import { OutboxService } from '../catalog/events/outbox.service';

function buildDeps() {
  const prisma: any = {
    checkout: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), findMany: jest.fn() },
    checkoutItem: { update: jest.fn() },
    sellerOffer: { findUnique: jest.fn() },
    price: { findFirst: jest.fn() },
    inventoryItem: { findUnique: jest.fn() },
    promotionOffer: { findMany: jest.fn() },
    inventoryReservation: { findMany: jest.fn() },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));

  const cartService = { getOrCreateActiveCart: jest.fn() };
  const inventoryService = {
    reserveForCheckout: jest.fn(),
    releaseReservation: jest.fn().mockResolvedValue(undefined),
  };
  const outboxService = { record: jest.fn() };

  const service = new CheckoutService(
    prisma,
    cartService as unknown as CartService,
    inventoryService as unknown as InventoryService,
    outboxService as unknown as OutboxService,
  );

  return { service, prisma, cartService, inventoryService, outboxService };
}

function activeOffer() {
  return { id: 'offer-1', status: 'ACTIVE' };
}
function activePrice() {
  return { amountMinorUnits: 1000n, currency: 'USD' };
}
function inventoryItem() {
  return { id: 'inv-1', onHandQuantity: 10, reservedQuantity: 0 };
}

describe('CheckoutService.create', () => {
  it('is idempotent: a repeated request with the same idempotency key returns the same checkout without re-processing', async () => {
    const { service, prisma, cartService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({ id: 'checkout-1', items: [] });

    const result = await service.create('cust-1', { idempotencyKey: 'key-1' });

    expect(result.id).toEqual('checkout-1');
    expect(cartService.getOrCreateActiveCart).not.toHaveBeenCalled();
  });

  it('rejects checking out an empty cart', async () => {
    const { service, prisma, cartService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({ id: 'cart-1', revision: 0, items: [] });

    await expect(service.create('cust-1', { idempotencyKey: 'key-1' })).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
    });
  });

  it('rejects a line whose offer is no longer ACTIVE (never trusts stale cart state)', async () => {
    const { service, prisma, cartService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 0,
      items: [{ sellerOfferId: 'offer-1', quantity: 1 }],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1', status: 'PAUSED' });

    await expect(service.create('cust-1', { idempotencyKey: 'key-1' })).rejects.toMatchObject({
      code: 'ITEM_UNAVAILABLE',
    });
  });

  it('rejects a line with no active price', async () => {
    const { service, prisma, cartService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 0,
      items: [{ sellerOfferId: 'offer-1', quantity: 1 }],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue(activeOffer());
    prisma.price.findFirst.mockResolvedValue(null);

    await expect(service.create('cust-1', { idempotencyKey: 'key-1' })).rejects.toMatchObject({
      code: 'ITEM_UNAVAILABLE',
    });
  });

  it('rejects a line with insufficient available inventory before ever creating a checkout row', async () => {
    const { service, prisma, cartService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 0,
      items: [{ sellerOfferId: 'offer-1', quantity: 100 }],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue(activeOffer());
    prisma.price.findFirst.mockResolvedValue(activePrice());
    prisma.inventoryItem.findUnique.mockResolvedValue(inventoryItem()); // onHand 10, reserved 0

    await expect(service.create('cust-1', { idempotencyKey: 'key-1' })).rejects.toMatchObject({
      code: 'INSUFFICIENT_INVENTORY',
    });
    expect(prisma.checkout.create).not.toHaveBeenCalled();
  });

  it('creates a checkout with server-computed totals (never trusting a client price) and reserves inventory', async () => {
    const { service, prisma, cartService, inventoryService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 2,
      items: [{ sellerOfferId: 'offer-1', quantity: 2 }],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue(activeOffer());
    prisma.price.findFirst.mockResolvedValue(activePrice());
    prisma.inventoryItem.findUnique.mockResolvedValue(inventoryItem());
    prisma.promotionOffer.findMany.mockResolvedValue([]);
    prisma.checkout.create.mockResolvedValue({
      id: 'checkout-1',
      customerId: 'cust-1',
      status: 'CREATED',
      items: [{ sellerOfferId: 'offer-1', quantity: 2 }],
    });
    inventoryService.reserveForCheckout.mockResolvedValue({ id: 'res-1' });
    prisma.checkout.update.mockResolvedValue({
      id: 'checkout-1',
      status: 'AWAITING_PAYMENT',
      items: [],
    });

    const checkout = await service.create('cust-1', { idempotencyKey: 'key-1' });

    expect(prisma.checkout.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ subtotalMinorUnits: 2000n, totalMinorUnits: 2000n }),
      }),
    );
    expect(inventoryService.reserveForCheckout).toHaveBeenCalledWith('checkout-1', 'inv-1', 2);
    expect(checkout.status).toEqual('AWAITING_PAYMENT');
  });

  it('applies the best active promotion as a discount', async () => {
    const { service, prisma, cartService, inventoryService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 0,
      items: [{ sellerOfferId: 'offer-1', quantity: 1 }],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue(activeOffer());
    prisma.price.findFirst.mockResolvedValue({ amountMinorUnits: 1000n, currency: 'USD' });
    prisma.inventoryItem.findUnique.mockResolvedValue(inventoryItem());
    prisma.promotionOffer.findMany.mockResolvedValue([
      {
        promotion: {
          isActive: true,
          startAt: new Date(Date.now() - 1000),
          endAt: new Date(Date.now() + 100000),
          usageLimit: null,
          timesUsed: 0,
          discountType: 'PERCENTAGE',
          discountValue: 10,
        },
      },
    ]);
    prisma.checkout.create.mockImplementation(({ data }: any) => ({
      id: 'checkout-1',
      ...data,
      items: [],
    }));
    inventoryService.reserveForCheckout.mockResolvedValue({ id: 'res-1' });
    prisma.checkout.update.mockResolvedValue({
      id: 'checkout-1',
      status: 'AWAITING_PAYMENT',
      items: [],
    });

    await service.create('cust-1', { idempotencyKey: 'key-1' });

    expect(prisma.checkout.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ discountMinorUnits: 100n, totalMinorUnits: 900n }),
      }),
    );
  });

  it('compensates (releases) already-acquired reservations and marks the checkout FAILED when a later line fails to reserve', async () => {
    const { service, prisma, cartService, inventoryService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue(null);
    cartService.getOrCreateActiveCart.mockResolvedValue({
      id: 'cart-1',
      revision: 0,
      items: [
        { sellerOfferId: 'offer-1', quantity: 1 },
        { sellerOfferId: 'offer-2', quantity: 1 },
      ],
    });
    prisma.sellerOffer.findUnique.mockResolvedValue(activeOffer());
    prisma.price.findFirst.mockResolvedValue(activePrice());
    prisma.inventoryItem.findUnique
      .mockResolvedValueOnce({ id: 'inv-1', onHandQuantity: 10, reservedQuantity: 0 })
      .mockResolvedValueOnce({ id: 'inv-2', onHandQuantity: 10, reservedQuantity: 0 });
    prisma.promotionOffer.findMany.mockResolvedValue([]);
    prisma.checkout.create.mockResolvedValue({
      id: 'checkout-1',
      items: [
        { sellerOfferId: 'offer-1', quantity: 1 },
        { sellerOfferId: 'offer-2', quantity: 1 },
      ],
    });
    inventoryService.reserveForCheckout
      .mockResolvedValueOnce({ id: 'res-1' }) // first line succeeds
      .mockRejectedValueOnce(new Error('insufficient')); // second line fails
    prisma.checkout.update.mockResolvedValue({ id: 'checkout-1', status: 'FAILED', items: [] });

    await expect(service.create('cust-1', { idempotencyKey: 'key-1' })).rejects.toThrow();

    expect(inventoryService.releaseReservation).toHaveBeenCalledWith('res-1');
    expect(prisma.checkout.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'FAILED' }) }),
    );
  });
});

describe('CheckoutService.cancel', () => {
  it('is idempotent for an already-cancelled checkout', async () => {
    const { service, prisma } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      customerId: 'cust-1',
      status: 'CANCELLED',
      items: [],
    });

    const result = await service.cancel('cust-1', 'checkout-1');
    expect(result.status).toEqual('CANCELLED');
  });

  it('rejects cancelling an already-completed checkout', async () => {
    const { service, prisma } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      customerId: 'cust-1',
      status: 'COMPLETED',
      items: [],
    });

    await expect(service.cancel('cust-1', 'checkout-1')).rejects.toMatchObject({
      code: 'CHECKOUT_ALREADY_COMPLETED',
    });
  });

  it('404s when a different customer attempts to cancel the checkout', async () => {
    const { service, prisma } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      customerId: 'cust-OTHER',
      status: 'AWAITING_PAYMENT',
      items: [],
    });

    await expect(service.cancel('cust-1', 'checkout-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });

  it('releases active reservations and transitions to CANCELLED', async () => {
    const { service, prisma, inventoryService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      customerId: 'cust-1',
      status: 'AWAITING_PAYMENT',
      items: [],
    });
    prisma.inventoryReservation.findMany.mockResolvedValue([{ id: 'res-1' }]);
    prisma.checkout.update.mockResolvedValue({ id: 'checkout-1', status: 'CANCELLED', items: [] });

    const result = await service.cancel('cust-1', 'checkout-1');

    expect(inventoryService.releaseReservation).toHaveBeenCalledWith('res-1');
    expect(result.status).toEqual('CANCELLED');
  });
});

describe('CheckoutService.expire', () => {
  it('is idempotent for an already-expired checkout', async () => {
    const { service, prisma } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      status: 'EXPIRED',
      items: [],
    });

    const result = await service.expire('checkout-1');
    expect(result.status).toEqual('EXPIRED');
  });

  it('releases reservations and transitions AWAITING_PAYMENT -> EXPIRED', async () => {
    const { service, prisma, inventoryService } = buildDeps();
    prisma.checkout.findUnique.mockResolvedValue({
      id: 'checkout-1',
      status: 'AWAITING_PAYMENT',
      items: [],
    });
    prisma.inventoryReservation.findMany.mockResolvedValue([{ id: 'res-1' }]);
    prisma.checkout.update.mockResolvedValue({ id: 'checkout-1', status: 'EXPIRED', items: [] });

    const result = await service.expire('checkout-1');

    expect(inventoryService.releaseReservation).toHaveBeenCalledWith('res-1');
    expect(result.status).toEqual('EXPIRED');
  });
});

describe('CheckoutService.buildPaymentIntentContract', () => {
  it('never leaks a provider-specific shape — just the stable internal contract fields', () => {
    const { service } = buildDeps();
    const contract = service.buildPaymentIntentContract({
      id: 'checkout-1',
      totalMinorUnits: 2000n,
      currency: 'USD',
      customerId: 'cust-1',
      idempotencyKey: 'key-1',
      cartId: 'cart-1',
    } as any);

    expect(contract).toEqual({
      checkoutId: 'checkout-1',
      amountMinorUnits: '2000',
      currency: 'USD',
      customerId: 'cust-1',
      idempotencyKey: 'key-1',
      metadata: { cartId: 'cart-1' },
    });
  });
});
