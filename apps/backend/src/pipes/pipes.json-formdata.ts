import { ArgumentMetadata, ExecutionContext, HttpException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { hasJsonStructure } from '~/helpers/helpers.json';
import { isNumericString } from '~/helpers/helpers.string';

export class FormDataToJson<T extends Record<string, any>>
  implements PipeTransform<Record<keyof T, any>>
{
  private excludeFields: Array<keyof T>;
  constructor(...excludeFields: Array<keyof T>) {
    this.excludeFields = excludeFields;
  }

  async transform(value: Record<keyof T, any>) {
    try {
      Object.entries(value).forEach(([key, field]) => {
        if (this.excludeFields.includes(key)) return;

        if (isNumericString(field)) return (value[key as keyof T] = Number(field));

        if (!hasJsonStructure(field)) return (value[key as keyof T] = field);

        value[key as keyof T] = JSON.parse(field);
      });
      return value;
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }
}
