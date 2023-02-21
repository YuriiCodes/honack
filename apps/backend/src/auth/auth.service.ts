import {ConflictException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {InjectModel} from "@nestjs/sequelize";
import User from "../../models/User.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    // find user by email:
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      }
    })


    // if user exists throw error
    if (user) {
      throw new ConflictException('User already exists')
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // else create user
    return await this.userModel.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
