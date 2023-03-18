import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/module/category/category.service';
import { CheckTransformDatePipe } from 'src/shared/pipes/check-transform-date.pipe';

@Injectable()
export class CreateUpdateConcertInterceptor implements NestInterceptor {
  constructor(private readonly categoryService: CategoryService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const category = await this.categoryService.findOne(req.body.categoryName);

    if (!category) {
      throw new NotFoundException(
        `Category ${req.body.categoryName} does not exist`,
      );
    }

    req.body.date = new CheckTransformDatePipe().transform(req.body.date);
    return next.handle();
  }
}
