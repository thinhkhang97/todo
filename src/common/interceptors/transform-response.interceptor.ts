import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor {
  intercept(context, next) {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
