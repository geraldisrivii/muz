import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { validateToken } from '~/helpers/helpers.auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization;

    const tokenValue = validateToken(token);

    try {
      this.jwtService.verify(tokenValue);
    } catch {
      throw new HttpException('Token is expired', 401);
    }

    return true;
  }
}
