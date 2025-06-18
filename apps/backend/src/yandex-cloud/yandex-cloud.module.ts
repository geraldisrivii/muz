import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YandexCloudService } from '~/yandex-cloud/yandex-cloud.service';

@Module({
  imports: [ConfigModule],
  providers: [YandexCloudService],
  exports: [YandexCloudService],
})
export class YandexCloudModule {}
