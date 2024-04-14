import { ObjectId } from 'mongodb';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './create-catalog.dto';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';


@Controller('/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('/')
  async create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Get('/')
  async findAll() {
    const catalogs = await this.catalogService.findAll();
    catalogs.forEach(catalog => {
      catalog.isMultiLocale = catalog.locales.length > 1; // Add property indicating if catalog is multi-locale
    });
    return catalogs;
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    const catalog = await this.catalogService.findOne(id);
    catalog.isMultiLocale = catalog.locales.length > 1; // Add property indicating if catalog is multi-locale
    return catalog;
  }

  @Put(':id/setPrimary')
  async updatePrimary(@Param('id') id: ObjectId, @Body('primary') primary: boolean) {
    return this.catalogService.updatePrimary(id, primary);
  }

  @Put(':id/setLocales')
  async updateLocales(@Param('id') id: ObjectId, @Body('locales') locales: string[]) {
    return this.catalogService.updateLocales(id, locales);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    return this.catalogService.remove(id);
  }

  @Post('deleteBulk')
  async removeBulk(@Body('ids') ids: ObjectId[]) {
    return this.catalogService.removeBulk(ids);
  }
}
