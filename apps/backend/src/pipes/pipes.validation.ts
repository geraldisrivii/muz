import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ProjectValidationPipe implements PipeTransform<Promise<any>> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype!, value);

    if (!obj && metadata.type == 'custom') {
      throw new HttpException(
        {
          errors: {
            files: 'is required',
          },
        },
        422,
      );
    }

    if (metadata.type !== 'body') {
      return value;
    }

    const errors = await validate(obj);

    if (errors.length) {
      throw new HttpException(
        {
          errors: errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints!)
              .reverse()
              .join(', ');
            return acc;
          }, {}),
        },
        422,
      );
    }

    return value;
  }
}
