import {ConflictException, Injectable, NotAcceptableException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {InjectModel} from "@nestjs/sequelize";
import User from "../../models/User.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {DomainUser} from "@honack/util-shared-types";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
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

    const userByUsername = await this.userModel.findOne({
      where: {
        username: createUserDto.username,
      }
    })
    // if user exists throw error
    if (userByUsername) {
      throw new ConflictException('User already exists')
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // else create user
    return await this.userModel.create({
      email: createUserDto.email,
      username: createUserDto.username,
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

  async validateUser(username: string, password: string): Promise<DomainUser> {
    const user = await this.userModel.findOne({
      where: {
        username,
      }
    }) as DomainUser;

    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user._id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
