import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoProps } from './types';

@Injectable()
export class TodoService {
  constructor(private readonly _todoRepository: TodoRepository) {}

  create(props: CreateTodoProps) {
    return this._todoRepository.create(props);
  }

  findAll(userId: string) {
    return this._todoRepository.findAll(userId);
  }

  findOne(props: { userId: string; todoId: string }) {
    return this._todoRepository.findOne(props);
  }
}
