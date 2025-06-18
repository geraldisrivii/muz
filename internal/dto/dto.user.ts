import { RoleDTO } from "./dto.role";

export interface UserDTO {
  _id: string;
  email: string;
  password: string;
  confirm: boolean;
  role: RoleDTO;
  
}

export interface CreateUserDTO extends Omit<UserDTO, "role" | "_id" | "confirm"> { password: string;
  confirmPassword: string;}

export interface LoginUserDTO extends Omit<UserDTO, "role" | "_id" | "confirm"> {}
