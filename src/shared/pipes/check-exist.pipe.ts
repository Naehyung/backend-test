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
    private dtoKey?: string,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('Provide a value ');

    const record = await this.getRecord(
      this.dtoKey ? value[this.dtoKey] : value,
      metadata,
    );
    if (!record) throw new NotFoundException(`${this.model} not found`);
    return this.returnId ? value : record;
  }

  //TODO: Look into this
  private getRecord(value: any, metadata: ArgumentMetadata) {
    //@ts-ignore
    return this.prisma[this.model as any].findUnique({
      where: {
        //@ts-ignore
        [this.property || metadata.data]: value,
      },
    });
  }
}
