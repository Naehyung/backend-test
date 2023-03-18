import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { ConcertModule } from '../concert/concert.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
  imports: [ConcertModule],
})
export class BookingModule {}
