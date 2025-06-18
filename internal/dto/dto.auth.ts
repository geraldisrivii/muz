import { UserDTO } from "./dto.user";

export interface AuthDTO {
  access: string;
  refresh: string;
  user: UserDTO;
}

export interface TokenDTO {
  user: UserDTO
  type: "access" | "refresh";
  iat: number;
  exp: number;
}

export interface AuthCodeDTO {
  code: string;
  email: string;
}

export interface RefreshDTO {
  refresh: string;
}
