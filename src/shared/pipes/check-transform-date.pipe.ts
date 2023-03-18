import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class CheckTransformDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) {
      throw new BadRequestException(
        'Invalid date format. Please use the YYYY-MM-DD format.',
      );
    }
    return new Date(value);
  }
}
