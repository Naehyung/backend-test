import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaClient, Venue } from '@prisma/client';
import PrismaProvider from 'prisma/prisma-provider';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ConcertService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();

  constructor(private readonly categoryService: CategoryService) {}

  async create(createConcertDto: CreateConcertDto, venue: Venue) {
    const { title, categoryName, capacity, date } = createConcertDto;

    const category = await this.categoryService.findOne(categoryName);

    if (!category) {
      throw new NotFoundException(`Category ${categoryName} does not exist`);
    }

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

  async update(id: string, updateConcertDto: UpdateConcertDto, venue: Venue) {
    const concert = await this.prisma.concert.findUnique({
      where: {
        id,
      },
    });

    if (concert.venueId !== venue.id) {
      throw new UnauthorizedException();
    }

    if (updateConcertDto.categoryName) {
      const category = await this.categoryService.findOne(
        updateConcertDto.categoryName,
      );

      if (!category) {
        throw new NotFoundException(
          `Category ${updateConcertDto.categoryName} does not exist`,
        );
      }
    }

    return this.prisma.concert.update({
      where: {
        id,
      },
      data: updateConcertDto,
    });
  }
}
