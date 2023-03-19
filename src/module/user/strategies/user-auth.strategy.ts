import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-custom';
import { UserService } from '../user.service';

@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy, 'user-auth') {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('No user found');
    }

    const [, userId] = authorizationHeader.split('Bearer ');

    if (!userId) {
      throw new UnauthorizedException('No user found');
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('No user found');
    }

    return user;
  }
}
