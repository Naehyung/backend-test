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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Venue } from '@prisma/client';
import GetVenue from 'src/shared/decorator/get-venue.decorator';
import { CheckTransformDateInterceptor } from 'src/shared/interceptors/check-transform-date.interceptor';
import { CheckExistPipe } from 'src/shared/pipes/check-exist.pipe';
import { UserAuthGuard } from '../user/guard/user-auth.guard';
import { VenueAuthGuard } from '../venue/guard/venue-auth.guard';
import { ConcertService } from './concert.service';
import { ConcertPaginationDto } from './dto/concert-pagination.dto';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@ApiTags('Concerts')
@ApiBearerAuth('Authorization')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  @UseGuards(VenueAuthGuard)
  @UseInterceptors(CheckTransformDateInterceptor)
  create(@Body() createConcertDto: CreateConcertDto, @GetVenue() venue: Venue) {
    return this.concertService.create(createConcertDto, venue);
  }

  @Patch(':id')
  @UseGuards(VenueAuthGuard)
  @UseInterceptors(CheckTransformDateInterceptor)
  update(
    @Param('id', new CheckExistPipe('concert', '', true)) id: string,
    @Body() updateConcertDto: UpdateConcertDto,
    @GetVenue() venue: Venue,
  ) {
    return this.concertService.update(id, updateConcertDto, venue);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  findAll(@Query() concertPaginationDto: ConcertPaginationDto) {
    return this.concertService.findAll(concertPaginationDto);
  }
}
