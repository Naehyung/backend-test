import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  create(concertId: string, userId: string) {
    return 'This action adds a new booking';
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: string) {
    return `This action returns a #${id} booking`;
  }

  remove(id: string) {
    return `This action removes a #${id} booking`;
  }
}
