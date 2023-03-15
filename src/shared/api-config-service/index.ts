import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get projectName(): string {
    return this.configService.getOrThrow('PROJECT_NAME');
  }

  get applicationPort(): number {
    return Number(this.configService.get('APPLICATION_PORT'));
  }
}
