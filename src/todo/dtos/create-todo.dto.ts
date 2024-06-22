import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;
}
