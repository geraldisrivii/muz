import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Good } from '~/good/good.model';
import { CreateGoodDTO } from '@internal/dto/dto.good';

@Injectable()
export class GoodService {
  constructor(@InjectModel(Good.name) private goodModel: Model<Good>) {}

  async getAll() {
    return await this.goodModel.find();
  }

  async create(data: CreateGoodDTO) {
    return await this.goodModel.create(data);
  }

  async getByName(name: string) {
    return await this.goodModel.findOne({ $where: `this.name == "${name}"` });
  }
}
