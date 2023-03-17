import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import PrismaProvider from 'prisma/prisma-provider';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class VenueService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();
  create(createVenueDto: CreateVenueDto) {
    return this.prisma.venue.create({
      data: createVenueDto,
    });
  }

  findAll(paginationDto: PaginationDto) {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: paginationDto.take,
      skip: paginationDto.take * (paginationDto.page - 1),
    });
  }

  findOne(id: string) {
    return this.prisma.venue.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.prisma.venue.update({
      where: {
        id,
      },
      data: updateVenueDto,
    });
  }

  remove(id: string) {
    return this.prisma.venue.delete({
      where: {
        id,
      },
    });
  }
}
