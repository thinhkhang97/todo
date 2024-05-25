import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

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

  @Post('signin')
  async signin(@Body() signInData: SignInDto) {
    return await this._authService.signIn(
      signInData.username,
      signInData.password,
    );
  }
}
