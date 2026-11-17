import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly adminClerkUserId: string;

  constructor(configService: ConfigService) {
    this.adminClerkUserId = configService.getOrThrow<string>(
      'ADMIN_CLERK_USER_ID',
    );
  }

  isAdmin(userId: string): boolean {
    return this.adminClerkUserId === userId;
  }
}
