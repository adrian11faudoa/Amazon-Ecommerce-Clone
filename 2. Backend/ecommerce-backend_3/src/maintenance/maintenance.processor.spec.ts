import {
  MaintenanceProcessor,
  EXPIRE_CHECKOUTS_JOB,
  EXPIRE_RESERVATIONS_JOB,
} from './maintenance.processor';

function buildProcessor() {
  const outboxRelayService = { relayPendingEvents: jest.fn().mockResolvedValue(0) };
  const mediaService = { cleanupExpiredUploadIntents: jest.fn().mockResolvedValue(0) };
  const inventoryService = {
    findExpiredActiveReservations: jest.fn(),
    expireReservation: jest.fn(),
  };
  const checkoutService = {
    findExpiredActiveCheckouts: jest.fn(),
    expire: jest.fn(),
  };

  const processor = new MaintenanceProcessor(
    outboxRelayService as any,
    mediaService as any,
    inventoryService as any,
    checkoutService as any,
  );

  return { processor, inventoryService, checkoutService };
}

describe('MaintenanceProcessor', () => {
  it('one reservation failing to expire does not block the rest of the batch', async () => {
    const { processor, inventoryService } = buildProcessor();
    inventoryService.findExpiredActiveReservations.mockResolvedValue([
      { id: 'res-1' },
      { id: 'res-2' },
    ]);
    inventoryService.expireReservation
      .mockRejectedValueOnce(new Error('transient db error'))
      .mockResolvedValueOnce({ id: 'res-2', state: 'EXPIRED' });

    await processor.process({ name: EXPIRE_RESERVATIONS_JOB } as any);

    expect(inventoryService.expireReservation).toHaveBeenCalledTimes(2);
    expect(inventoryService.expireReservation).toHaveBeenCalledWith('res-1');
    expect(inventoryService.expireReservation).toHaveBeenCalledWith('res-2');
  });

  it('one checkout failing to expire does not block the rest of the batch', async () => {
    const { processor, checkoutService } = buildProcessor();
    checkoutService.findExpiredActiveCheckouts.mockResolvedValue([
      { id: 'checkout-1' },
      { id: 'checkout-2' },
    ]);
    checkoutService.expire
      .mockRejectedValueOnce(new Error('transient db error'))
      .mockResolvedValueOnce({ id: 'checkout-2', status: 'EXPIRED' });

    await processor.process({ name: EXPIRE_CHECKOUTS_JOB } as any);

    expect(checkoutService.expire).toHaveBeenCalledTimes(2);
  });
});
