import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

/**
 * Requires a live Postgres + Redis (see docker-compose.yml) reachable via
 * the DATABASE_URL / REDIS_URL in your environment. Not executed in the
 * sandbox this project was authored in, which has neither — see the
 * README's "Known environment caveats" section.
 */
describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health/live returns 200 without touching dependencies', async () => {
    await request(app.getHttpServer()).get('/health/live').expect(200).expect({ status: 'ok' });
  });

  it('GET /health/ready returns 200 when Postgres and Redis are reachable', async () => {
    await request(app.getHttpServer()).get('/health/ready').expect(200);
  });
});
