import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

  async signUp(username: string, password: string) {
    const user = await this._userService.getUserByUsername(username);
    if (user) {
      throw new BadRequestException('user_exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return _.omit(
      await this._userService.createUser(username, hashedPassword),
      'password',
    );
  }
}
