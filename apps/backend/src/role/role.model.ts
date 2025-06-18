import { RoleDTO } from '@internal/dto/dto.role';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { User } from '~/auth/auth.model';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role implements RoleDTO {
  @SwaggerID()
  _id: string;

  @Prop()
  @SwaggerValue()
  name: string;

  // timestamps
  createdAt: string;
  updatedAt: string;
}

export const roleSchema = SchemaFactory.createForClass(Role);
