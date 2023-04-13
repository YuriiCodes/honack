import { ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import User from "../../models/User.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { DomainUser } from "@honack/util-shared-types";
import Salary from "../../models/Salary.entity";
import { MailService } from "../mail/mail.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Salary)
    private salaryModel: typeof Salary,
    private jwtService: JwtService,

    private mailService: MailService
  ) {
  }

  async checkIfUserExists(id: number) {
    const existingUser = await this.userModel.findByPk(id);
    if (!existingUser) {
      throw new NotAcceptableException("User does not exist");
    }
  }

  async create(createUserDto: CreateUserDto) {
    // find user by email:
    const user = await this.userModel.findOne({
      where: {
        email: createUserDto.email
      }
    });

    // if user exists throw error
    if (user) {
      throw new ConflictException("User already exists");
    }

    const userByUsername = await this.userModel.findOne({
      where: {
        username: createUserDto.username
      }
    });
    // if user exists throw error
    if (userByUsername) {
      throw new ConflictException("User already exists");
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // else create user
    const createdUser = await this.userModel.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword
    });

    // create salary
    await this.salaryModel.create({
      userId: createdUser.id,
      amount: 0
    });

    return createdUser.email;
  }

  async validateUser(email: string, password: string): Promise<DomainUser> {
    const user = await this.userModel.findOne({
      where: {
        email
      }
    }) as DomainUser;

    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: DomainUser & { _id: number }) {
    const payload = { id: user.id, email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    // check if user with given email exists:
    const user = await this.userModel.findOne({
      where: {
        email
      }
    });

    // if user exists throw error
    if (!user) {
      throw new ConflictException("User does not exist");
    }

    // generate random password
    const password = Math.random().toString(36).slice(-8);

    // hash password
    const saltOrRounds = 10;
    // update user password
    user.password = await bcrypt.hash(password, saltOrRounds);
    await user.save();


    // send email
    await this.mailService.send({
      to: email,
      from: "yuriypidlisnyi2020@gmail.com",
      subject: "Forgot Password",
      text: `Your password is: ${password}`,
      html: `<strong>Your password is: ${password}</strong>`
    });

    return {
      message: "Email sent"
    };
  }
}
