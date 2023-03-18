import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { VenueService } from '../venue/venue.service';
import { VenueModule } from '../venue/venue.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [VenueModule],
  exports: [CategoryService],
})
export class CategoryModule {}
