import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '~/role/role.model';
import { Category } from '~/category/category.model';
import { CreateCategoryDTO } from '@internal/dto/dto.category';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getAll() {
    return await this.categoryModel.find();
  }

  async getByName(name: string) {
    return await this.categoryModel.findOne({ $where: `this.name == "${name}"` });
  }

  async create(data: CreateCategoryDTO) {
    return await this.categoryModel.create(data);
  }
}
