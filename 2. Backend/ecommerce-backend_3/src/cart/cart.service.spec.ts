import { CartService } from './cart.service';
import { OutboxService } from '../catalog/events/outbox.service';

function buildDeps() {
  const prisma: any = {
    cart: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn(), findUnique: jest.fn() },
    cartItem: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    sellerOffer: { findUnique: jest.fn() },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));
  const outboxService = { record: jest.fn() };
  const service = new CartService(prisma, outboxService as unknown as OutboxService);
  return { service, prisma, outboxService };
}

describe('CartService.getOrCreateActiveCart', () => {
  it('creates a new cart for a customer with no existing active cart', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findFirst.mockResolvedValue(null);
    prisma.cart.create.mockResolvedValue({ id: 'cart-1', customerId: 'cust-1', items: [] });

    const cart = await service.getOrCreateActiveCart({ customerId: 'cust-1' });
    expect(cart.id).toEqual('cart-1');
    expect(prisma.cart.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ customerId: 'cust-1' }) }),
    );
  });

  it('returns the existing active cart rather than creating a duplicate', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findFirst.mockResolvedValue({
      id: 'cart-existing',
      customerId: 'cust-1',
      items: [],
    });

    const cart = await service.getOrCreateActiveCart({ customerId: 'cust-1' });
    expect(cart.id).toEqual('cart-existing');
    expect(prisma.cart.create).not.toHaveBeenCalled();
  });

  it('creates an anonymous cart keyed by opaque token, never a customer ID', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findFirst.mockResolvedValue(null);
    prisma.cart.create.mockResolvedValue({ id: 'cart-anon', anonymousToken: 'tok-1', items: [] });

    await service.getOrCreateActiveCart({ anonymousToken: 'tok-1' });
    expect(prisma.cart.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ anonymousToken: 'tok-1' }) }),
    );
  });
});

describe('CartService.requireOwned', () => {
  it('throws 404 when a customer requests a cart owned by a different customer', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({ id: 'cart-1', customerId: 'cust-OTHER', items: [] });

    await expect(service.requireOwned({ customerId: 'cust-1' }, 'cart-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });

  it('throws 404 when an anonymous token does not match the cart', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({
      id: 'cart-1',
      anonymousToken: 'tok-OTHER',
      items: [],
    });

    await expect(
      service.requireOwned({ anonymousToken: 'tok-mine' }, 'cart-1'),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });

  it('succeeds when the owner matches', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({ id: 'cart-1', customerId: 'cust-1', items: [] });

    await expect(service.requireOwned({ customerId: 'cust-1' }, 'cart-1')).resolves.toMatchObject({
      id: 'cart-1',
    });
  });
});

describe('CartService.addItem', () => {
  it('rejects adding an item that references a nonexistent offer', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({ id: 'cart-1', customerId: 'cust-1', items: [] });
    prisma.sellerOffer.findUnique.mockResolvedValue(null);

    await expect(
      service.addItem({ customerId: 'cust-1' }, 'cart-1', {
        sellerOfferId: 'offer-1',
        quantity: 1,
      }),
    ).rejects.toMatchObject({ code: 'ITEM_UNAVAILABLE' });
  });

  it('increments quantity when the offer is already in the cart, rather than creating a duplicate line', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({ id: 'cart-1', customerId: 'cust-1', items: [] });
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1' });
    prisma.cartItem.findUnique.mockResolvedValue({ id: 'item-1', quantity: 2 });
    prisma.cartItem.update.mockResolvedValue({ id: 'item-1', quantity: 5 });
    prisma.cart.update.mockResolvedValue({ id: 'cart-1', revision: 1, items: [] });

    await service.addItem({ customerId: 'cust-1' }, 'cart-1', {
      sellerOfferId: 'offer-1',
      quantity: 3,
    });

    expect(prisma.cartItem.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { quantity: 5 } }),
    );
    expect(prisma.cartItem.create).not.toHaveBeenCalled();
  });

  it('bumps the cart revision on every mutation', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findUnique.mockResolvedValue({ id: 'cart-1', customerId: 'cust-1', items: [] });
    prisma.sellerOffer.findUnique.mockResolvedValue({ id: 'offer-1' });
    prisma.cartItem.findUnique.mockResolvedValue(null);
    prisma.cartItem.create.mockResolvedValue({ id: 'item-1', quantity: 1 });
    prisma.cart.update.mockResolvedValue({ id: 'cart-1', revision: 1, items: [] });

    await service.addItem({ customerId: 'cust-1' }, 'cart-1', {
      sellerOfferId: 'offer-1',
      quantity: 1,
    });

    expect(prisma.cart.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ revision: { increment: 1 } }) }),
    );
  });
});

describe('CartService merge', () => {
  it('sums quantities for lines present in both carts rather than discarding either', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findFirst
      .mockResolvedValueOnce({
        id: 'cart-anon',
        items: [{ id: 'i1', sellerOfferId: 'offer-1', quantity: 3 }],
      }) // anonymous cart lookup
      .mockResolvedValueOnce({ id: 'cart-cust', items: [] }); // customer cart lookup (getOrCreateActiveCart)
    prisma.cartItem.findUnique.mockResolvedValue({ id: 'existing-item', quantity: 2 });
    prisma.cart.update.mockResolvedValue({ id: 'cart-cust', revision: 1, items: [] });

    await service.mergeAnonymousIntoCustomerCart('cust-1', 'tok-1');

    expect(prisma.cartItem.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { quantity: 5 } }),
    );
  });

  it('marks the anonymous cart MERGED rather than deleting it', async () => {
    const { service, prisma } = buildDeps();
    prisma.cart.findFirst
      .mockResolvedValueOnce({ id: 'cart-anon', items: [] })
      .mockResolvedValueOnce({ id: 'cart-cust', items: [] });
    prisma.cart.update.mockResolvedValue({ id: 'cart-cust', revision: 1, items: [] });

    await service.mergeAnonymousIntoCustomerCart('cust-1', 'tok-1');

    expect(prisma.cart.update).toHaveBeenCalledWith({
      where: { id: 'cart-anon' },
      data: { status: 'MERGED' },
    });
  });
});
