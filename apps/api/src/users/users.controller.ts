import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { getAuth } from '@clerk/express';
import type { Request } from 'express';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin')
  isAdmin(@Req() request: Request): boolean {
    const { userId } = getAuth(request);
    if (!userId) {
      throw new UnauthorizedException('Sign in to check admin access');
    }
    return this.usersService.isAdmin(userId);
  }
}
