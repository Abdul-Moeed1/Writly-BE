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
    const previousUser = await this.userModal.findOne({
      email: payload.email,
    });
    if (previousUser) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModal(payload);
    return user.save();
  }
}
