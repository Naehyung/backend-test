import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVenueDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newTitle: string;
}
