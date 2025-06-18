import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.model';
import mongoose, { Connection, Model, Types } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getUser(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async getUsers(ids: Types.ObjectId[]) {
    return this.userModel.find({ _id: { $in: ids } });
  }
}
