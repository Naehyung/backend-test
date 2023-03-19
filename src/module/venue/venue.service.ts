import { Injectable } from '@nestjs/common';
import PrismaProvider from 'prisma/prisma-provider';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VenueService {
  private readonly prisma: PrismaClient = PrismaProvider.getConnection();

  findOne(id: string) {
    return this.prisma.venue.findUnique({
      where: {
        id,
      },
    });
  }
}
