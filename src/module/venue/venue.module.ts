import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { VenueAuthStrategy } from './strategies/venue-auth.strategy';

@Module({
  controllers: [VenueController],
  providers: [VenueService, VenueAuthStrategy],
  exports: [VenueService],
})
export class VenueModule {}
