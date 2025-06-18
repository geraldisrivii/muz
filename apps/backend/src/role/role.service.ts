import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '~/role/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async getAll() {
    return await this.roleModel.find();
  }

  async getByName(name: string) {
    return await this.roleModel.findOne({ $where: `this.name == "${name}"` });
  }
}
