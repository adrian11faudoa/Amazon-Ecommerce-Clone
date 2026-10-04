import { RateLimitService } from './rate-limit.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

function buildRedisServiceMock(overrides: Partial<RedisService> = {}): RedisService {
  return {
    isReady: jest.fn().mockReturnValue(true),
    client: {
      incr: jest.fn(),
      expire: jest.fn(),
    },
    ...overrides,
  } as unknown as RedisService;
}

describe('RateLimitService', () => {
  it('allows requests under the configured maximum', async () => {
    const redis = buildRedisServiceMock();
    (redis.client.incr as jest.Mock).mockResolvedValue(1);
    const service = new RateLimitService(redis);

    const result = await service.consume('login', '127.0.0.1:user@example.com', {
      max: 10,
      windowSeconds: 900,
    });

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it('sets an expiration only on the first increment in a window', async () => {
    const redis = buildRedisServiceMock();
    (redis.client.incr as jest.Mock).mockResolvedValue(1);
    const service = new RateLimitService(redis);

    await service.consume('login', 'id', { max: 10, windowSeconds: 900 });

    expect(redis.client.expire).toHaveBeenCalledWith(expect.any(String), 900);
  });

  it('denies requests once the maximum is exceeded', async () => {
    const redis = buildRedisServiceMock();
    (redis.client.incr as jest.Mock).mockResolvedValue(11);
    const service = new RateLimitService(redis);

    const result = await service.consume('login', 'id', { max: 10, windowSeconds: 900 });

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('fails CLOSED (denies) when Redis is not ready, rather than silently allowing', async () => {
    const redis = buildRedisServiceMock({ isReady: jest.fn().mockReturnValue(false) });
    const service = new RateLimitService(redis);

    const result = await service.consume('login', 'id', { max: 10, windowSeconds: 900 });

    expect(result.allowed).toBe(false);
  });

  it('fails CLOSED when the Redis command itself throws', async () => {
    const redis = buildRedisServiceMock();
    (redis.client.incr as jest.Mock).mockRejectedValue(new Error('ECONNRESET'));
    const service = new RateLimitService(redis);

    const result = await service.consume('login', 'id', { max: 10, windowSeconds: 900 });

    expect(result.allowed).toBe(false);
  });
});
