import { CreateUserDTO, LoginUserDTO, UserDTO } from '@internal/dto/dto.user';
import { HttpException, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, TokenDTO } from '@internal/dto/dto.auth';
import { Request as RequestExpress } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser, LoginUser, Refresh, User } from './auth.model';
import * as bcrypt from 'bcryptjs';
import { validateToken } from '~/helpers/helpers.auth';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as VKID from '@vkid/sdk';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { RolesService } from '~/role/role.service';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyEmailDTO } from '@internal/dto/dto.email';
import { AuthCode } from '~/auth/auth.code.model';
import { FilesService } from '~/files/files.service';
import { YandexCloudService } from '~/yandex-cloud/yandex-cloud.service';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService,
    private readonly mailerService: MailerService,
    private readonly yandexCloudService: YandexCloudService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AuthCode.name) private authCodeModel: Model<AuthCode>,
  ) {}

  async getAuthDTO(user: User) {
    return {
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
      user,
    };
  }

  async updateUser(_id: string, dto: Partial<UserDTO>) {
    return await this.userModel.findByIdAndUpdate(_id, { $set: { ...dto } }, { new: true });
  }

async createUser({ email, password, confirmPassword }: CreateUser) {
    // 1. Проверка совпадения паролей
    if (password !== confirmPassword) {
    throw new HttpException(
      { message: 'Пароли не совпадают' },
      HttpStatus.BAD_REQUEST,
    );
  }

    // 2. Проверка существования пользователя
    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new HttpException({ message: 'Электронная почта уже существует' }, 400);

    // 3. Хеширование пароля и создание пользователя
    const user = await this.userModel.create({ 
        email, 
        password: bcrypt.hashSync(password) 
    });

    // 4. Генерация кода подтверждения
    const text = Math.random().toString(36).slice(4);
    await this.authCodeModel.create({ code: text, email });

    // 5. Отправка email с кодом подтверждения
    this.mailerService.sendMail({ 
        to: email,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${text}`
    });

    // 6. Возврат данных пользователя с токенами
    return this.getAuthDTO(user);
}

  async loginUser({ email, password }: LoginUser) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException({ message: 'unknown_user' }, 400);

    if (!bcrypt.compareSync(password, user.password))
      throw new HttpException({ message: 'false_pass' }, 403);

    return this.getAuthDTO(user);
  }

  async emailVerify({ code }: VerifyEmailDTO, { email }: UserDTO) {
    const initial = await this.authCodeModel.findOne({ email });
console.log(initial)
    if (!initial) throw new HttpException({ message: 'unknown_user' }, 400);

    if (initial.code !== code) throw new HttpException({ message: 'false_code' }, 403);
    
    await this.authCodeModel.deleteOne({ _id: initial._id });

    await this.userModel.updateOne({ email }, { confirm: true });

    return { message: 'email_confirmed' };
  }


  getUser(req: RequestExpress) {
    const token = req.headers.authorization;
    const tokenValue = validateToken(token);
    try {
      return this.jwtService.verify<TokenDTO>(tokenValue);
    } catch {
      throw new HttpException('Token is expired', 403);
    }
  }

  private generateAccessToken(user: User) {
    return this.jwtService.sign(
      {
        user,
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(user: User) {
    return this.jwtService.sign(
      {
        user,
        type: 'refresh',
      },
      {
        expiresIn: '10d',
      },
    );
  }

  refresh(dto: Refresh) {
    try {
      const result = this.jwtService.verify<TokenDTO>(dto.refresh);
      const { user } = result;
      return {
        access: this.generateAccessToken(user),
        refresh: this.generateRefreshToken(user),
        user,
      };
    } catch (e: any) {
      throw new UnauthorizedException(e.message);
    }
  }
}
