import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PartsModule } from './parts/parts.module';
import { MongooseModule } from './config/mongo.config';

@Module({
  imports: [MongooseModule, UsersModule, PartsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
