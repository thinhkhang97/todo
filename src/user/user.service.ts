import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    return await this._userRepository.findUnique({ username });
  }

  async createUser(username: string, password: string) {
    return await this._userRepository.create({ username, password });
  }

  async getUserById(id: string) {
    return omit(await this._userRepository.findUnique({ id }), ['password']);
  }
}
