import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, User } from 'src/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @ApiBearerAuth('access-token')
  async getUser(@User() user: { id: string }) {
    return await this._userService.getUserById(user.id);
  }
}
