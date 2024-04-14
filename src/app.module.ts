import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';

@Global()
@Module({
  imports: [
    CatalogModule,
    MongooseModule.forRoot('MONGODB_URI'),
  ],
})
export class AppModule {}

