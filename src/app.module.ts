import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { RegisterSchema } from './register/schema/register.schema';
import { REGISTER } from './common/models/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB,{}),
    MongooseModule.forFeature([{ name:  REGISTER.name, schema: RegisterSchema }]),
    RegisterModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
