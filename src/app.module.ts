import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { VenueModule } from './module/venue/venue.module';
import ConfigSchemaValidation from './shared/config-schema-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigSchemaValidation.validationSchema,
      envFilePath: `${__dirname}/../.env`,
    }),
    UserModule,
    VenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
