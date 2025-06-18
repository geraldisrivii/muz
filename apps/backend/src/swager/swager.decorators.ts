import { ApiProperty } from '@nestjs/swagger';
import * as uuid from 'uuid';

export function SwaggerID(description: string = 'Unique identifier') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({ example: 'DDG6Br3brKEiuqDHn', description })(...args);
  };
}
export function SwaggerEmail(description: string = 'Email address') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'user@example.com',
      description,
    })(...args);
  };
}

export function SwaggerPassword(description: string = 'password') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: '10$7HWQjTXPOzd89MEnvpmy/eQ7ncj6Tk6es.zor3Jk/tN1bBOOeuxj',
      description,
    })(...args);
  };
}

export function SwaggerValue(description: string = 'Value') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'some value',
      description,
    })(...args);
  };
}

export function SwaggerNumber(description: string = 'Value') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 2,
      description,
    })(...args);
  };
}


export function SwaggerEnum(Enum: object) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: Object.values(Enum).at(0),
    })(...args);
  };
}

export function SwaggerBoolean(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({ example: 'true', description })(...args);
  };
}

export function SwaggerAddress(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: '0x65374Fb4bB7e813d8C37...244bA5EDFB019eD0',
      description,
    })(...args);
  };
}

export function SwaggerToken(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'eyJiOiJIJ9...FGP0hxknuvDBlrYGu4J8c0CM',
      description,
    })(...args);
  };
}

export function SwaggerFile(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: uuid.v4() + ['.png', '.jpg'].at(Math.floor(Math.random() * 2)),
      description,
    })(...args);
  };
}

export function SwaggerDate(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: new Date().toISOString(),
      description,
    })(...args);
  };
}
