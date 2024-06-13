import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { REGISTER, USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { RegisterSchema } from './schema/register.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: REGISTER.name,
        useFactory: () => RegisterSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: USER.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
