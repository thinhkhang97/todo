import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, User } from 'src/common';
import { TodoService } from './todo.service';
import { Todo } from './types';
import { CreateTodoDto, FilterTodoDto } from './dtos';

@Controller('todo')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Post()
  create(
    @Body() todo: CreateTodoDto,
    @User() user: { id: string },
  ): Promise<Todo> {
    return this._todoService.create({ title: todo.title, userId: user.id });
  }

  @Get()
  getTodoList(
    @User() user: { id: string },
    @Query() filterDto: FilterTodoDto,
  ): Promise<Todo[]> {
    return this._todoService.findAll({ userId: user.id, filter: filterDto });
  }

  @Get('/:todoId')
  getTodoById(
    @User() user: { id: string },
    @Param('todoId') todoId: string,
  ): Promise<Todo> {
    return this._todoService.findOne({ userId: user.id, todoId: todoId });
  }

  @Delete('/delete/:id')
  deleteTodo(
    @User() user: { id: string },
    @Param('id') id: string,
  ): Promise<void> {
    return this._todoService.deleteTodo({ todoId: id, userId: user.id });
  }

  @Patch('/mark-as-completed/:id')
  markTodoAsCompleted(
    @User() user: { id: string },
    @Param('id') id: string,
  ): Promise<Todo> {
    return this._todoService.markTodoAsCompleted({
      todoId: id,
      userId: user.id,
    });
  }
}
