import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { getAuth } from '@clerk/express';
import type { Request } from 'express';
import type { CurrentUserResponse } from '@volleyball/types';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() request: Request): CurrentUserResponse {
    const { userId } = getAuth(request);
    if (!userId) {
      throw new UnauthorizedException('Sign in to view your profile');
    }
    return { isAdmin: this.usersService.isAdmin(userId) };
  }
}
