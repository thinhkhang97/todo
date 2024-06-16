import { Injectable } from '@nestjs/common';
import { CreateTodoProps, GetTodoByIdProps } from './types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(props: CreateTodoProps) {
    return this._prismaService.todo.create({
      data: {
        title: props.title,
        userId: props.userId,
      },
    });
  }

  findAll(userId: string) {
    return this._prismaService.todo.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(props: GetTodoByIdProps) {
    return this._prismaService.todo.findUnique({
      where: {
        id: props.todoId,
        userId: props.userId,
      },
    });
  }
}
