import { Injectable } from '@nestjs/common';
import EasyYandexS3 from 'easy-yandex-s3';
import { ConfigService } from '@nestjs/config';
import S3 from 'aws-sdk/clients/s3';

@Injectable()
export class YandexCloudService {
  private readonly s3: EasyYandexS3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: this.configService.get('YANDEX_CLOUD_ID')!,
        secretAccessKey: this.configService.get('YANDEX_CLOUD_SECRET')!,
      },
      Bucket: 'reworks',
    });
  }

  async uploadFile(file: Express.Multer.File) {
    return this.s3.Upload(
      {
        buffer: file.buffer,
        name: file.originalname,
      },
      '/files/',
    );
  }

  async uploadFiles<T extends object>(files: Record<keyof T, Express.Multer.File | undefined>) {
    const uploaded: Record<string, string | undefined> = {};

    for (const key in files) {
      if(!files[key]) continue

      const result = await this.uploadFile(files[key]);

      if (!result) {
        uploaded[key] = undefined;
        continue;
      }

      uploaded[key] = (result as S3.ManagedUpload.SendData).Location;
    }

    return uploaded;
  }

  async uploadBlob(file: File) {
    return this.s3.Upload(
      {
        buffer: new Buffer(await file.arrayBuffer()),
        name: file.name,
      },
      '/files/',
    );
  }
}
