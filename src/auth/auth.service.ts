import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

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

  async signIn(username: string, password: string) {
    const user = await this._userService.getUserByUsername(username);
    if (!user) {
      throw new BadRequestException('invalid_credentials');
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestException('invalid_credentials');
    }

    const payload = { username: user.username, id: user.id };
    return {
      accessToken: await this._jwtService.signAsync(payload),
    };
  }
}
