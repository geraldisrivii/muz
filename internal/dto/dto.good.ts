import { CategoryDTO } from "./dto.category";

export interface GoodDTO {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: CategoryDTO;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoodDTO extends Omit<GoodDTO, "_id" | "category" | "createdAt" | "updatedAt"> {
  category: string
}
