import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  password: string;
}
