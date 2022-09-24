import { MongooseModule as MongoModule } from '@nestjs/mongoose';

export const MongooseModule = MongoModule.forRoot(
  'mongodb+srv://api-admin:2VzkdpkXfRsXuA4U@api-workshop.f2yjlzg.mongodb.net/test',
);
