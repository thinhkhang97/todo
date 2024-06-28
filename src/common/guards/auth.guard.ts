import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    try {
      const token = authHeader.replace('Bearer ', '');
      const user = this._jwtService.verify<{ username: string; id: string }>(
        token,
      );
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
