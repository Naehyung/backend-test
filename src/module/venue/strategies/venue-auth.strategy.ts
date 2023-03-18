import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Venue } from '@prisma/client';
import { Strategy } from 'passport-custom';
import { VenueService } from '../venue.service';

@Injectable()
export class VenueAuthStrategy extends PassportStrategy(
  Strategy,
  'venue-auth',
) {
  constructor(private readonly venueService: VenueService) {
    super();
  }

  async validate(req: Request): Promise<Venue> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }

    const [, venueId] = authorizationHeader.split('Bearer ');

    if (!venueId) {
      throw new UnauthorizedException();
    }

    const venue = await this.venueService.findOne(venueId);

    if (!venue) {
      throw new UnauthorizedException();
    }

    return venue;
  }
}
