import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '~/auth/auth.model';
import { RolesModule } from '~/role/role.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthCode, authCodeSchema } from '~/auth/auth.code.model';
import { UserService } from '~/auth/auth.user.service';
import { FilesModule } from '~/files/files.module';
import { YandexCloudModule } from '~/yandex-cloud/yandex-cloud.module';

const config = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [
    JwtModule.register({
      secret: config.get('APP_JWT_SECRET') || 'secret',
    }),
    MailerModule.forRoot({
      transport: 'smtps://sasamaltsev981@gmail.com:ppdt hemv qgsd txtw@smtp.gmail.com',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: AuthCode.name, schema: authCodeSchema },
    ]),
    RolesModule,
    forwardRef(() => ConfigModule),
    FilesModule,
    YandexCloudModule,
  ],
  exports: [JwtModule, AuthService, UserService],
})
export class AuthModule {}
