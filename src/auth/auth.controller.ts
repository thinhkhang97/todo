import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpData: SignUpDto) {
    return await this._authService.signUp(
      signUpData.username,
      signUpData.password,
    );
  }
}
