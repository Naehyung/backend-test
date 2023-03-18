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

@ApiTags('Concerts')
@UseInterceptors(CheckTransformDateInterceptor)
@ApiBearerAuth('Authorization')
@UseGuards(VenueAuthGuard)
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  create(@Body() createConcertDto: CreateConcertDto, @GetVenue() venue: Venue) {
    return this.concertService.create(createConcertDto, venue);
  }

  @Patch(':id')
  update(
    @Param('id', new CheckExistPipe('concert', '', true)) id: string,
    @Body() updateConcertDto: UpdateConcertDto,
    @GetVenue() venue: Venue,
  ) {
    return this.concertService.update(id, updateConcertDto, venue);
  }
}
