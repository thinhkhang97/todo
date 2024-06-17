import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoProps, GetTodoByIdProps } from './types';

@Injectable()
export class TodoService {
  constructor(private readonly _todoRepository: TodoRepository) {}

  create(props: CreateTodoProps) {
    return this._todoRepository.create(props);
  }

  findAll(userId: string) {
    return this._todoRepository.findAll(userId);
  }

  async findOne(props: GetTodoByIdProps) {
    const task = await this._todoRepository.findOne(props);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }
}
