import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDTO } from './DTOs/createUser.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logInDTO } from './DTOs/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<User>,
  ) {}

  async createUser(payload: createUserDTO) {
    const user = new this.userModal(payload);
    return await user.save();
  }

  async logIn(payload: logInDTO) {
    const user = await this.userModal.findOne({ email: payload.email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (user.password !== payload.password) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
