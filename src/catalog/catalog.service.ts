import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';
import { CreateCatalogDto } from './create-catalog.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name)
    private readonly userModel: Model<CatalogDocument>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const catalog = new this.userModel(createCatalogDto);

    if (createCatalogDto.primary) {
      await this.userModel.updateMany(
        { vertical: createCatalogDto.vertical, primary: true },
        { primary: false },
      );
    }

    return catalog.save();
  }

  async findAll(): Promise<Catalog[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Catalog> {
    return this.userModel.findById(id).exec();
  }

  async updatePrimary(id: ObjectId, primary: boolean): Promise<Catalog> {

    const catalog = await this.userModel.findById(id).exec();

    if (!catalog) {
      throw new Error('Catalog not found');
    }

    if (primary) {
      await this.userModel.updateMany(
        { vertical: catalog.vertical, primary: true },
        { primary: false },
      );
    }

    catalog.primary = primary;
    return catalog.save();
  }

  async updateLocales(id: ObjectId, locales: string[]): Promise<Catalog> {
    const catalog = await this.userModel.findById(id).exec();

    if (!catalog) {
      throw new Error('Catalog not found');
    }

    catalog.locales = locales;
    return catalog.save();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async removeBulk(ids: ObjectId[]): Promise<void> {
    await this.userModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
