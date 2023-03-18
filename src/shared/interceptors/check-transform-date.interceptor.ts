import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/module/category/category.service';
import { CheckTransformDatePipe } from '../pipes/check-transform-date.pipe';

@Injectable()
export class CheckTransformDateInterceptor implements NestInterceptor {
  constructor(private readonly categoryService: CategoryService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.body.date = new CheckTransformDatePipe().transform(req.body.date);
    return next.handle();
  }
}
