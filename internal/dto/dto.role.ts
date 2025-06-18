export interface RoleDTO {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDTO extends Omit<RoleDTO, "_id"> {}
