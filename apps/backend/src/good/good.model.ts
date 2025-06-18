import { CreateCategoryDTO } from '@internal/dto/dto.category';
import { CreateGoodDTO, GoodDTO } from '@internal/dto/dto.good';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '~/auth/auth.model';
import { Category } from '~/category/category.model';
import { SwaggerID, SwaggerNumber, SwaggerValue } from '~/swager/swager.decorators';

export type GoodDocument = HydratedDocument<Good>;

export class CreateGood implements CreateGoodDTO {
  @IsString()
  @SwaggerID()
  category: string;

  @IsString()
  @SwaggerValue()
  name: string;

  @IsNumber()
  @SwaggerValue()
  price: number;

  @IsString()
  @SwaggerValue()
  description: string;
}

@Schema()
export class Good implements GoodDTO {
  @SwaggerID()
  _id: string;

  @Prop()
  @SwaggerValue()
  name: string;

  @Prop({ type: Number })
  @SwaggerValue()
  price: number;

  @Prop()
  @SwaggerValue()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @ApiProperty({ type: Category })
  category: Category;

  // timestamps
  createdAt: string;
  updatedAt: string;
}

export const goodSchema = SchemaFactory.createForClass(Good);
