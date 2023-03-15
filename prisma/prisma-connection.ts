import { INestApplication, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ApiConfigService } from '../src/shared/api-config-service';

export default class PrismaConnection
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  private logger = new Logger('DATABASE');

  constructor(apiConfigService: ApiConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

    if (apiConfigService.isDevelopment) this.printQuery();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  printQuery() {
    this.$on('query', (e) => {
      this.logger.debug(`\x1b[34m${e.query}\x1b[0m ${e.params}`);
    });
  }
}
