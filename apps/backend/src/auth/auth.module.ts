import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import User from "../../models/User.entity";
import {LocalStrategy} from "./strategies/local.auth";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../constants";
import {JwtStrategy} from "./strategies/jwt.strategy";
import Salary from "../../models/Salary.entity";
import { MailModule } from "../mail/mail.module";


@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Salary
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
