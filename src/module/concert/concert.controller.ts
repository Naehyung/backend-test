import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Venue } from '@prisma/client';
import GetVenue from 'src/shared/decorator/get-venue.decorator';
import { CheckTransformDateInterceptor } from 'src/shared/interceptors/check-transform-date.interceptor';
import { CheckExistPipe } from 'src/shared/pipes/check-exist.pipe';
import { VenueAuthGuard } from '../venue/guard/venue-auth.guard';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { CreateUpdateConcertInterceptor } from './interceptor/create-update-concert.interceptor';

@ApiTags('Concerts')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @UseInterceptors(CreateUpdateConcertInterceptor)
  @Post()
  @ApiBearerAuth('Authorization')
  @UseGuards(VenueAuthGuard)
  create(@Body() createConcertDto: CreateConcertDto, @GetVenue() venue: Venue) {
    return this.concertService.create(createConcertDto, venue);
  }

  @Get()
  findAll() {
    return this.concertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(id);
  }

  @UseInterceptors(CreateUpdateConcertInterceptor)
  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(VenueAuthGuard)
  update(
    @Param('id', new CheckExistPipe('concert', true)) id: string,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    return this.concertService.update(id, updateConcertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertService.remove(id);
  }
}
