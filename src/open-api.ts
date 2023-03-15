import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiConfigService } from './shared/api-config-service';

export default class OpenApi {
  constructor(private apiConfigService: ApiConfigService) {}

  async handler(app: INestApplication) {
    if (this.apiConfigService.isDevelopment) {
      const document = SwaggerModule.createDocument(app, this.swaggerSettings);

      SwaggerModule.setup('api/swagger', app, document);
    }
  }

  get swaggerSettings() {
    return new DocumentBuilder()
      .setTitle(`${this.apiConfigService.projectName} Api`)
      .setDescription(`${this.apiConfigService.projectName} endpoints`)
      .setVersion('1.0')
      .addBearerAuth(
        {
          description:
            'The JWT token is required to access the some of the endpoints.',
          type: 'http',
          in: 'header',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'Authorization',
      )
      .build();
  }
}
