import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { VenueModule } from '../venue/venue.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ConcertController],
  providers: [ConcertService],
  imports: [VenueModule, CategoryModule],
})
export class ConcertModule {}
