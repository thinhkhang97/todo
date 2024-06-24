import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTodoProps,
  DeleteTodoProps,
  GetAllTodoProps,
  GetTodoByIdProps,
  CompleteTodoProps,
  TodoStatus,
} from './types';

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

  findAll(props: GetAllTodoProps) {
    const {
      filter: { search, status },
      userId,
    } = props;

    // Create a base query object with filters that always apply.
    const queryFilters: Prisma.TodoWhereInput = {
      userId: userId,
      title: search ? { contains: search } : undefined,
    };

    // Conditionally add status filter if provided.
    if (status) {
      queryFilters.doneAt =
        status === TodoStatus.COMPLETED ? { not: null } : null;
    }

    return this._prismaService.todo.findMany({
      where: queryFilters,
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

  deleteTodo(props: DeleteTodoProps) {
    return this._prismaService.todo.delete({
      where: {
        id: props.userId,
      },
    });
  }

  completeTodo(props: CompleteTodoProps) {
    return this._prismaService.todo.update({
      where: {
        id: props.todoId,
        userId: props.userId,
      },
      data: {
        doneAt: new Date(),
      },
    });
  }
}
