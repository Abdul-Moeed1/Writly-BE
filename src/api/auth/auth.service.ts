import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDTO } from './DTOs/createUser.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<User>,
  ) {}

  async createUser(payload: createUserDTO) {
    const user = new this.userModal(payload);
    return await user.save();
  }
}
