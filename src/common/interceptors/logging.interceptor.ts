import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const logger = new Logger();
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const body = JSON.stringify(request.body);

    logger.log(`[${method}] ${url} Input: ${body}`);

    return next.handle().pipe(
      tap((response) =>
        logger.log(
          `[${method}] ${url} Output: ${JSON.stringify(response)} Time: ${
            Date.now() - now
          }ms`,
        ),
      ),
      catchError((error) => {
        logger.error(
          `[${method}] ${url} Error: ${error.message} Time: ${
            Date.now() - now
          }ms`,
        );
        throw error;
      }),
    );
  }
}
