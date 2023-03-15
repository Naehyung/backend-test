import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from '../src/shared/api-config-service';
import PrismaConnection from './prisma-connection';

export default abstract class PrismaProvider {
  private static prismaConnection: PrismaConnection;

  static getConnection() {
    if (!this.prismaConnection) {
      this.prismaConnection = new PrismaConnection(
        new ApiConfigService(new ConfigService()),
      );
    }

    return this.prismaConnection;
  }
}
