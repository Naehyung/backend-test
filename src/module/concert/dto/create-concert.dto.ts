import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConcertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', format: 'date', example: '2022-03-18' })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
