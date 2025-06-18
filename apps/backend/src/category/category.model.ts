import { CategoryDTO, CreateCategoryDTO } from '@internal/dto/dto.category';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { User } from '~/auth/auth.model';
import { SwaggerID, SwaggerNumber, SwaggerValue } from '~/swager/swager.decorators';

export type CategoryDocument = HydratedDocument<Category>;

export class CreateCategory implements CreateCategoryDTO{
  @IsString()
  @SwaggerValue()
  name: string;
}

@Schema({ timestamps: false })
export class Category implements CategoryDTO {
  @SwaggerID()
  _id: string;

  @Prop()
  @SwaggerValue()
  name: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
