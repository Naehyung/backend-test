import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
