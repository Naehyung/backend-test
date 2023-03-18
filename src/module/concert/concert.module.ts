import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { VenueModule } from '../venue/venue.module';
import { CategoryModule } from '../category/category.module';
import { ConcertController } from './concert.controller';

@Module({
  controllers: [ConcertController],
  providers: [ConcertService],
  imports: [VenueModule, CategoryModule],
  exports: [ConcertService],
})
export class ConcertModule {}
