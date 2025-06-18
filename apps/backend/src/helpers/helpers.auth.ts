import { HttpException } from "@nestjs/common";

export function validateToken(token: string | undefined) {
  if (!token) {
    throw new HttpException('Authorization header not found', 401);
  }

  const bearer = token.split(' ')[0];
  const tokenValue = token.split(' ')[1];

  if (bearer !== 'Bearer' || !tokenValue) {
    throw new HttpException('Authorization header is not valid', 401);
  }
  
  return tokenValue;
}
