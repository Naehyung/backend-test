import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  take: number;
}
