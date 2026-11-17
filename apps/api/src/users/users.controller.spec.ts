import { getAuth } from '@clerk/express';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

vi.mock('@clerk/express', () => ({ getAuth: vi.fn() }));

describe('UsersController', () => {
  const controller = new UsersController(
    new UsersService(new ConfigService({ ADMIN_CLERK_USER_ID: 'user_admin' })),
  );

  // Deliberately supply a forged ID: only Clerk's verified identity should count.
  const request = { params: { userId: 'user_admin' } } as unknown as Request;

  afterEach(() => vi.resetAllMocks());

  it('rejects an unauthenticated caller even with a supplied admin ID', () => {
    vi.mocked(getAuth).mockReturnValue({ userId: null } as ReturnType<
      typeof getAuth
    >);
    expect(() => controller.isAdmin(request)).toThrow(UnauthorizedException);
  });

  it('uses the verified identity instead of a supplied admin ID', () => {
    vi.mocked(getAuth).mockReturnValue({ userId: 'user_regular' } as ReturnType<
      typeof getAuth
    >);
    expect(controller.isAdmin(request)).toBe(false);
  });

  it('recognizes an authenticated admin', () => {
    vi.mocked(getAuth).mockReturnValue({ userId: 'user_admin' } as ReturnType<
      typeof getAuth
    >);
    expect(controller.isAdmin(request)).toBe(true);
  });
});
