import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get projectName(): string {
    console.log('configService', this.configService.get('PROJECT_NAME'));
    return this.configService.getOrThrow('PROJECT_NAME');
  }

  get applicationPort(): number {
    return Number(this.configService.get('APPLICATION_PORT'));
  }
}
