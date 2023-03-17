import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VenueService } from '../venue.service';

@Injectable()
export class VenueAuthGuard implements CanActivate {
  constructor(private readonly venueService: VenueService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
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

    return true;
  }
}
