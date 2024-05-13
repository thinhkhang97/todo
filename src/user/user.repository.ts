import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findUnique(props: { id?: string; username?: string }) {
    const where = props.id ? { id: props.id } : { username: props.username };
    return this._prismaService.user.findUnique({ where });
  }

  async create(data: { username: string; password: string }) {
    return this._prismaService.user.create({ data });
  }
}
