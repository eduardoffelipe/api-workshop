import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 12);
    const encryptedUser: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.userModel.create(encryptedUser);
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  async verifyPassword(id: string, updatePassword: { password: string }) {
    const user = await this.userModel.findById(id);
    const isMatch = await compare(updatePassword.password, user.password);
    console.log(isMatch);
    console.log(isMatch);
    if (!isMatch) {
      throw new HttpException(
        {
          status: 401,
          error: 'Senha errada',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
