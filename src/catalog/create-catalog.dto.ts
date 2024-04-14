import { IsNotEmpty, IsEnum, IsString, IsBoolean, IsArray } from 'class-validator';

enum Vertical {
  Fashion = 'fashion',
  Home = 'home',
  General = 'general'
}
export class CreateCatalogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString() 
  @IsEnum(Vertical, { message: 'Vertical must be one of fashion, home, or general' })
  vertical: Vertical;

  @IsNotEmpty()
  @IsArray()
  locales: string[];

  @IsNotEmpty()
  @IsBoolean()
  primary: boolean;
}
