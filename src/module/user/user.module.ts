import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAuthStrategy } from './strategies/user-auth.strategy';
import { BookingModule } from '../booking/booking.module';
import { ConcertModule } from '../concert/concert.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserAuthStrategy],
  exports: [UserService],
  imports: [BookingModule, ConcertModule],
})
export class UserModule {}
