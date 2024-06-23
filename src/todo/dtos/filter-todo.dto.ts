import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../types';

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  @ApiProperty()
  status: TodoStatus;

  @IsOptional()
  @IsString()
  @ApiProperty()
  search: string;
}
