import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@ApiTags('Venue')
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.venueService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(id);
  }
}
