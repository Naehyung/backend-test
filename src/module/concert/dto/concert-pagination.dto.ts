import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ConcertPaginationDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    example: '2022-03-18',
    required: false,
  })
  @IsOptional()
  date: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  categoryName: string;
}
