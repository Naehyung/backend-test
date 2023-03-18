import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAuthStrategy } from './strategies/user-auth.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, UserAuthStrategy],
  exports: [UserService],
})
export class UserModule {}
