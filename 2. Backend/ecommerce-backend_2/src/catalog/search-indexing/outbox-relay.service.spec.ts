import { OutboxRelayService } from './outbox-relay.service';

function buildDeps() {
  const prisma: any = { outboxEvent: { findMany: jest.fn() } };
  const queue: any = { add: jest.fn() };
  const service = new OutboxRelayService(prisma, queue);
  return { service, prisma, queue };
}

describe('OutboxRelayService.relayPendingEvents', () => {
  it('enqueues each PENDING event using its own ID as the BullMQ jobId (idempotent re-relay)', async () => {
    const { service, prisma, queue } = buildDeps();
    prisma.outboxEvent.findMany.mockResolvedValue([
      {
        id: 'evt-1',
        eventType: 'catalog.product.created',
        aggregateType: 'Product',
        aggregateId: 'p1',
        payload: {},
      },
    ]);

    const count = await service.relayPendingEvents();

    expect(count).toEqual(1);
    expect(queue.add).toHaveBeenCalledWith(
      'index-catalog-document',
      expect.objectContaining({ outboxEventId: 'evt-1' }),
      { jobId: 'evt-1' },
    );
  });

  it('does not let one failed enqueue abort the rest of the batch', async () => {
    const { service, prisma, queue } = buildDeps();
    prisma.outboxEvent.findMany.mockResolvedValue([
      { id: 'evt-1', eventType: 'x', aggregateType: 'Product', aggregateId: 'p1', payload: {} },
      { id: 'evt-2', eventType: 'x', aggregateType: 'Product', aggregateId: 'p2', payload: {} },
    ]);
    queue.add
      .mockRejectedValueOnce(new Error('queue unavailable'))
      .mockResolvedValueOnce(undefined);

    const count = await service.relayPendingEvents();

    expect(count).toEqual(1);
    expect(queue.add).toHaveBeenCalledTimes(2);
  });

  it('returns 0 without calling the queue when there are no pending events', async () => {
    const { service, prisma, queue } = buildDeps();
    prisma.outboxEvent.findMany.mockResolvedValue([]);

    const count = await service.relayPendingEvents();

    expect(count).toEqual(0);
    expect(queue.add).not.toHaveBeenCalled();
  });
});
