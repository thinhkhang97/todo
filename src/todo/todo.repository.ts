import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoProps, DeleteTodoProps, GetTodoByIdProps } from './types';

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

  deleteTask(props: DeleteTodoProps) {
    return this._prismaService.todo.delete({
      where: {
        id: props.id,
      },
    });
  }
}
