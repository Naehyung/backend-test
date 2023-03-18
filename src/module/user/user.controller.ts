import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from '../booking/booking.service';
import { ConcertService } from '../concert/concert.service';
import { UserAuthGuard } from './guard/user-auth.guard';
import GetUser from 'src/shared/decorator/get-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth('Authorization')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingService: BookingService,
  ) {}

  @Get('/bookings')
  findAllBookings(
    @Query() paginationDto: PaginationDto,
    @GetUser() user: User,
  ) {
    return this.bookingService.findAllByUserId(paginationDto, user.id);
  }

  @Delete('/bookings/concert/:id')
  removeBooking(@GetUser() user: User, @Param('id') concertId: string) {
    return this.bookingService.remove(user.id, concertId);
  }
}
