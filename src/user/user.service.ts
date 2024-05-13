import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    return await this._userRepository.findUnique({ username });
  }

  async createUser(username: string, password: string) {
    return await this._userRepository.create({ username, password });
  }
}
