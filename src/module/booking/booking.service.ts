import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PrismaProvider from 'prisma/prisma-provider';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ConcertService } from '../concert/concert.service';

@Injectable()
export class BookingService {
  constructor(private readonly concertService: ConcertService) {}
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();

  async create(concertId: string, userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId,
        concertId,
      },
    });

    if (bookings.length > 0) {
      throw new NotAcceptableException('You have already booked this concert');
    }

    const concert = await this.concertService.findOne(concertId);

    if (!concert) {
      throw new NotFoundException('Concert does not exist');
    }

    const bookingsByConcertId = await this.prisma.booking.findMany({
      where: {
        concertId,
      },
    });

    if (bookingsByConcertId.length >= concert.capacity) {
      throw new NotAcceptableException(
        'Number of booking for this concert has reached to its limit',
      );
    }

    return this.prisma.booking.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        concert: {
          connect: {
            id: concertId,
          },
        },
      },
    });
  }

  findAllByUserId(paginationDto: PaginationDto, userId: string) {
    return this.prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        concert: true,
      },
      take: paginationDto.take,
      skip: paginationDto.take * (paginationDto.page - 1),
    });
  }

  async remove(userId: string, concertId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId: userId,
        concertId: concertId,
      },
      include: {
        concert: true,
      },
    });

    if (bookings.length === 0) {
      throw new NotAcceptableException(
        "You don't have booking with this concert",
      );
    }

    return this.prisma.booking.deleteMany({
      where: {
        AND: {
          userId: userId,
          concertId: concertId,
        },
      },
    });
  }
}
