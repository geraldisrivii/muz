import { Body, Controller, Patch, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { Auth, CreateUser, LoginUser, Refresh, User } from '~/auth/auth.model';
import { VerifyEmailDTO } from '@internal/dto/dto.email';
import { Request as RequestExpress } from 'express';
import { UserService } from '~/auth/auth.user.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiResponse({ status: 201, type: Auth })
  @Post('/register')
  register(@Body() dto: CreateUser) {
    return this.authService.createUser(dto);
  }

  @ApiResponse({ status: 201, type: Auth })
  @Post('/login')
  login(@Body() dto: LoginUser) {
    return this.authService.loginUser(dto);
  }

  @ApiResponse({ status: 201, type: Auth })
  @Post('/email-verify')
  emailVerify(@Body() dto: VerifyEmailDTO, @Req() req: RequestExpress) {
    const { user } = this.authService.getUser(req);
    return this.authService.emailVerify(dto, user);
  }

  // @ApiResponse({ status: 200, type: User })
  // @Patch('/user')
  // updateUser(@Body() dto: Partial<UpdateUser>, @Req() req: RequestExpress) {
  //   const { user } = this.authService.getUser(req);
  //   return this.authService.updateUser(user._id, dto);
  // }

  @ApiResponse({ status: 200, type: Auth })
  @Post('/refresh')
  refresh(@Body() dto: Refresh) {
    return this.authService.refresh(dto);
  }
}
