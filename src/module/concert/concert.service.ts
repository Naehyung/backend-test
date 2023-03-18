import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaClient, Venue } from '@prisma/client';
import PrismaProvider from 'prisma/prisma-provider';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ConcertService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();

  constructor(private readonly categoryService: CategoryService) {}

  create(createConcertDto: CreateConcertDto, venue: Venue) {
    const { title, categoryName, capacity, date } = createConcertDto;

    return this.prisma.concert.create({
      data: {
        title: title,
        capacity: capacity,
        date: date,
        venue: {
          connect: {
            id: venue.id,
          },
        },
        category: {
          connect: {
            name: categoryName,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all concert`;
  }

  findOne(id: string) {
    return `This action returns a #${id} concert`;
  }

  update(id: string, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  remove(id: string) {
    return `This action removes a #${id} concert`;
  }
}
