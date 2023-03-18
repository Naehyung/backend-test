import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PrismaProvider from 'prisma/prisma-provider';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
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
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
