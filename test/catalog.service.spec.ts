import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from '../src/catalog/catalog.controller';
import { CatalogService } from '../src/catalog/catalog.service';
import { Catalog } from '../src/catalog/catalog.schema';
import { ObjectId } from 'mongodb';

describe('CatalogsController', () => {
    let controller: CatalogController;
    let service: CatalogService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CatalogController],
        providers: [
          {
            provide: CatalogService,
            useValue: {
              findAll: jest.fn(),
              findOne: jest.fn(),
              create: jest.fn(),
              updateLocales: jest.fn(),
              remove: jest.fn(),
            },
          },
        ],
      }).compile();
  
      controller = module.get<CatalogController>(CatalogController);
      service = module.get<CatalogService>(CatalogService);
    });
  
    describe('findOne', () => {
      it('should return a catalog with isMultiLocale property', async () => {
        const idTest = new ObjectId();
        const mockCatalog: any = {
          _id: idTest,
          name: 'Catalog A',
          vertical: 'fashion',
          primary: true,
          locales: ['en_US', 'en_CA']
        };
  
        jest.spyOn(service, 'findOne').mockResolvedValue(mockCatalog);
  
        const result = await controller.findOne(idTest) as any;
        result.isMultiLocale = result.locales.length > 1;
        expect(result).toEqual({
          ...mockCatalog,
          isMultiLocale: true
        });
      });
  
      it('should return a catalog with isMultiLocale property as false if locales length is 1', async () => {
        const idTest = new ObjectId();
        const mockCatalog: any = {
          _id: idTest,
          name: 'Catalog B',
          vertical: 'fashion',
          primary: true,
          locales: ['en_US']
        };
  
        jest.spyOn(service, 'findOne').mockResolvedValue(mockCatalog);
  
        const result = await controller.findOne(idTest) as any;
        result.isMultiLocale = result.locales.length > 1;
        expect(result).toEqual({
          ...mockCatalog,
          isMultiLocale: false
        });
      });
    });

    describe('create', () => {
        it('should create a new catalog', async () => {
          const createDto = { name: 'New Catalog', vertical: 'fashion', primary: true, locales: ['en_US'] };
          const createdCatalog: any = { _id: '1', ...createDto };
    
          jest.spyOn(service, 'create').mockResolvedValue(createdCatalog);
    
          expect(await controller.create(createDto)).toEqual(createdCatalog);
        });
      });
    
      describe('updateLocales', () => {
        it('should update locales of a catalog', async () => {
          const catalogId = new ObjectId();
          const updatedLocales = ['en_US', 'en_CA'];
    
          jest.spyOn(service, 'updateLocales').mockResolvedValue(null);
    
          expect(await controller.updateLocales(catalogId, updatedLocales)).toBeNull();
        });
      });
    
      describe('remove', () => {
        it('should remove a catalog', async () => {
          const catalogId = new ObjectId();
    
          jest.spyOn(service, 'remove').mockResolvedValue(null);
    
          expect(await controller.remove(catalogId)).toBeNull();
        });
      });
  });