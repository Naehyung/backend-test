import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { VenueModule } from './module/venue/venue.module';
import { BookingModule } from './module/booking/booking.module';
import { CategoryModule } from './module/category/category.module';
import ConfigSchemaValidation from './shared/config-schema-validation';
import { ConcertModule } from './module/concert/concert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigSchemaValidation.validationSchema,
      envFilePath: `${__dirname}/../.env`,
    }),
    UserModule,
    VenueModule,
    BookingModule,
    CategoryModule,
    ConcertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
