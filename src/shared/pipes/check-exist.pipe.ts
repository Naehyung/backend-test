import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import PrismaProvider from '../../../prisma/prisma-provider';

@Injectable()
export class CheckExistPipe implements PipeTransform {
  private readonly prisma = PrismaProvider.getConnection();

  constructor(
    private model: Uncapitalize<Prisma.ModelName>,
    private property?: string,
    private returnId: boolean = false,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('Provide a value ');

    const record = await this.getRecord(value, metadata);
    if (!record) throw new NotFoundException(`${this.model} not found`);
    return this.returnId ? value : record;
  }

  private getRecord(value: any, metadata: ArgumentMetadata) {
    return this.prisma[this.model as any].findUnique({
      where: {
        [this.property || metadata.data]: value,
      },
    });
  }
}
