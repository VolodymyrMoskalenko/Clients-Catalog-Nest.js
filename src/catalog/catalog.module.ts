import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller'
import { CatalogSchema } from './catalog.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Catalog', schema: CatalogSchema }]),
      ],
    controllers: [CatalogController],
    providers: [CatalogService],
})
export class CatalogModule {}