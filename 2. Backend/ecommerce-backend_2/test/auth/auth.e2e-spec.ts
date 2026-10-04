import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

/**
 * Requires a live Postgres + Redis (see docker-compose.yml). Not executed
 * in the authoring sandbox — see the README's "Known environment
 * caveats" section. Run this against a disposable test database.
 */
describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const uniqueEmail = () => `e2e-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;

  it('registers, verifies-fails-with-bad-token, logs in, refreshes, and logs out', async () => {
    const email = uniqueEmail();

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: 'a-very-long-password', displayName: 'E2E User' })
      .expect(201);

    expect(registerResponse.body.accessToken).toBeDefined();
    expect(registerResponse.body.refreshToken).toBeDefined();

    await request(app.getHttpServer())
      .post('/auth/verify-email')
      .send({ token: 'not-a-real-token' })
      .expect(401);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'a-very-long-password' })
      .expect(201);

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: loginResponse.body.refreshToken })
      .expect(201);

    expect(refreshResponse.body.accessToken).toBeDefined();

    // The rotated-out original refresh token must now be rejected (reuse detection).
    await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: loginResponse.body.refreshToken })
      .expect(401);

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${refreshResponse.body.accessToken}`)
      .expect(200)
      .expect((res: request.Response) => expect(res.body.email).toEqual(email));

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${refreshResponse.body.accessToken}`)
      .send({ refreshToken: refreshResponse.body.refreshToken })
      .expect(204);
  });

  it('rejects a second registration with the same (normalized) email', async () => {
    const email = uniqueEmail();
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: 'a-very-long-password', displayName: 'E2E User' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: email.toUpperCase(),
        password: 'a-very-long-password',
        displayName: 'E2E User',
      })
      .expect(409);
  });

  it('returns generic 401 for a nonexistent account and for a wrong password alike', async () => {
    const email = uniqueEmail();
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: 'a-very-long-password', displayName: 'E2E User' })
      .expect(201);

    const nonexistent = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: uniqueEmail(), password: 'whatever-password' })
      .expect(401);

    const wrongPassword = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'the-wrong-password' })
      .expect(401);

    expect(nonexistent.body.error.code).toEqual(wrongPassword.body.error.code);
  });

  it('requires authentication for /auth/me', async () => {
    await request(app.getHttpServer()).get('/auth/me').expect(401);
  });
});
