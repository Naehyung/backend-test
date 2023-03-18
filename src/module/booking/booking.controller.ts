import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import GetUser from 'src/shared/decorator/get-user.decorator';
import { CheckExistPipe } from 'src/shared/pipes/check-exist.pipe';
import { UserAuthGuard } from '../user/guard/user-auth.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@ApiBearerAuth('Authorization')
@UseGuards(UserAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(
    @Body(new CheckExistPipe('concert', 'id', true, 'concertId'))
    createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ) {
    return this.bookingService.create(createBookingDto.concertId, user.id);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
