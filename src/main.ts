import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import OpenApi from './open-api';
import { ApiConfigService } from './shared/api-config-service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const apiConfigService = new ApiConfigService(configService);

  app.setGlobalPrefix('api/v1').useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  await new OpenApi(apiConfigService).handler(app);

  await app.listen(3000);
}
bootstrap();
