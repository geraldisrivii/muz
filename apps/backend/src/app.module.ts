import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/config/config.env';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { YandexCloudModule } from '~/yandex-cloud/yandex-cloud.module';
import { RolesModule } from '~/role/role.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `.production.env`,
    }),
    MongooseModule.forRoot(config.getOrThrow('MONGO_URL'), {
      dbName: config.getOrThrow('DATABASE_NAME'),
    }),
    AuthModule,
    RolesModule,
    FilesModule,
    YandexCloudModule,
  ],
  controllers: [],
})
export class AppModule {}
