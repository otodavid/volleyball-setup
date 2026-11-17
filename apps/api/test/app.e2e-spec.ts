import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app/app.module.js';
import { clerkMiddleware } from '@clerk/express';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(
      clerkMiddleware({
        publishableKey: `pk_test_${Buffer.from('example.clerk.accounts.dev$').toString('base64')}`,
        secretKey: 'sk_test_not_a_real_key',
        authorizedParties: ['http://localhost:5173'],
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('rejects an admin check without a session token', () => {
    return request(app.getHttpServer()).get('/users/admin').expect(401);
  });

  it('rejects a malformed session token', () => {
    return request(app.getHttpServer())
      .get('/users/admin')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  it('does not accept the old caller-supplied user ID route', () => {
    return request(app.getHttpServer())
      .get('/users/admin/user_admin')
      .expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
