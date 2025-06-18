import { AuthCodeDTO, AuthDTO, RefreshDTO } from '@internal/dto/dto.auth';
import { CreateUserDTO, LoginUserDTO, UserDTO } from '@internal/dto/dto.user';

import { VerifyEmailDTO } from '@internal/dto/dto.email';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import {
  SwaggerEmail,
  SwaggerPassword,
  SwaggerToken,
  SwaggerID,
  SwaggerValue,
} from '~/swager/swager.decorators';

export type AuthCodeDocument = HydratedDocument<AuthCode>;

@Schema()
export class AuthCode implements AuthCodeDTO {
  @SwaggerID()
  _id: string;

  @Prop()
  code: string;

  @Prop()
  email: string;

  createdAt: string;
  updatedAt: string;
}

export const authCodeSchema = SchemaFactory.createForClass(AuthCode);
