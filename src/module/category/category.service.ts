import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PrismaProvider from 'prisma/prisma-provider';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll(paginationDto: PaginationDto) {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: paginationDto.take,
      skip: paginationDto.take * (paginationDto.page - 1),
    });
  }

  findOne(name: string) {
    return this.prisma.category.findUnique({
      where: {
        name,
      },
    });
  }

  update(name: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        name,
      },
      data: updateCategoryDto,
    });
  }

  remove(name: string) {
    return this.prisma.category.delete({
      where: {
        name,
      },
    });
  }
}
