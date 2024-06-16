import { Injectable } from '@nestjs/common';
import { CreateTodoProps, DeleteTodoProps } from './types';
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

  deleteTask(props: DeleteTodoProps) {
    return this._prismaService.todo.delete({
      where: {
        id: props.id,
        userId: props.userId,
      },
    });
  }
}
