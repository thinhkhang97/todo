import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoProps, DeleteTodoProps } from './types';

@Injectable()
export class TodoService {
  constructor(private readonly _todoRepository: TodoRepository) {}

  create(props: CreateTodoProps) {
    return this._todoRepository.create(props);
  }

  deleteTask(props: DeleteTodoProps) {
    this._todoRepository.deleteTask(props);
    return;
  }
}
