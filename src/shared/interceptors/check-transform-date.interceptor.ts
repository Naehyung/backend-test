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
    if (req.body.date) {
      req.body.date = new CheckTransformDatePipe().transform(req.body.date);
    }
    if (req.query.date) {
      req.query.date = new CheckTransformDatePipe().transform(req.query.date);
    }
    return next.handle();
  }
}
