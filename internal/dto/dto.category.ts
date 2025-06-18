export interface CategoryDTO {
  _id: string;
  name: string;
}

export interface CreateCategoryDTO extends Omit<CategoryDTO, "_id"> {}
