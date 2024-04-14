import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatalogDocument = Catalog & Document;

enum Vertical {
  fashion = 'fashion',
  home = 'home',
  general = 'general',
}

@Schema()
export class Catalog extends Document {
  @Prop({
    required: [true, 'Name cannot be empty'], // Custom error message for required field
    unique: true,
    validate: {
      validator: (value) => /^[a-zA-Z\s]*[a-zA-Z]+[a-zA-Z\s]*$/.test(value), // Custom validation function to check for letters only
      message: 'Name must contain only letters',
    },
  })
  name: string;

  @Prop({ required: true, enum: Vertical })
  vertical: Vertical;

  @Prop({ required: true })
  primary: boolean;

  @Prop({ required: true })
  locales: string[];

  @Prop({ required: false})
  isMultiLocale: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
