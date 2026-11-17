import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  const service = new UsersService(
    new ConfigService({ ADMIN_CLERK_USER_ID: 'user_admin' }),
  );

  it('recognizes the configured admin', () => {
    expect(service.isAdmin('user_admin')).toBe(true);
  });

  it('does not grant admin access to another user', () => {
    expect(service.isAdmin('user_regular')).toBe(false);
  });

  it('requires an admin ID in configuration', () => {
    expect(() => new UsersService(new ConfigService({}))).toThrow();
  });
});
