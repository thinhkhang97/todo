import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import {
  CompleteTodoProps,
  CreateTodoProps,
  DeleteTodoProps,
  GetAllTodoProps,
  GetTodoByIdProps,
  Todo,
} from './types';
@Injectable()
export class TodoService {
  constructor(private readonly _todoRepository: TodoRepository) {}

  create(props: CreateTodoProps): Promise<Todo> {
    return this._todoRepository.create(props);
  }

  findAll(props: GetAllTodoProps): Promise<Todo[]> {
    return this._todoRepository.findAll(props);
  }

  async findOne(props: GetTodoByIdProps): Promise<Todo> {
    const todo = await this._todoRepository.findOne(props);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async deleteTodo(props: DeleteTodoProps): Promise<void> {
    await this.findOne(props);
    this._todoRepository.deleteTodo(props);
    return;
  }

  async completeTodo(props: CompleteTodoProps): Promise<Todo> {
    const todoBeforeUpdating = await this.findOne(props);
    if (todoBeforeUpdating.doneAt) {
      throw new BadRequestException('Todo is already completed');
    }
    const todoAfterUpdating = await this._todoRepository.completeTodo(props);
    return todoAfterUpdating;
  }
}
