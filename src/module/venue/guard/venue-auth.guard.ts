import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class VenueAuthGuard extends AuthGuard('venue-auth') {}
