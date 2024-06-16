import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, User } from 'src/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Post()
  create(@Body() todo: CreateTodoDto, @User() user: { id: string }) {
    return this._todoService.create({ title: todo.title, userId: user.id });
  }

  @Get()
  getTodoList(@User() user: { id: string }) {
    return this._todoService.findAll(user.id);
  }

  @Get('/:todoId')
  getTaskById(@User() user: { id: string }, @Param('todoId') todoId: string) {
    return this._todoService.findOne({ userId: user.id, todoId: todoId });
  }
}
