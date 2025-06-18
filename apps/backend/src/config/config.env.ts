import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  APP_VERSION: string;

  @IsString()
  APP_JWT_SECRET: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  MONGO_URL: string;

  @IsNumber()
  CLIENT_ID: number;

  @IsString()
  REDIRECT_URI: string;

  @IsString()
  YANDEX_CLOUD_ID: string;

  @IsString()
  YANDEX_CLOUD_SECRET: string;

  @IsString()
  DDATA_KEY: string;

  @IsString()
  DDATA_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
