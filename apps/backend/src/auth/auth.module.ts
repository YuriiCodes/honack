import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import User from "../../models/User.entity";
import {LocalStrategy} from "./strategies/local.auth";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../constants";
import {JwtStrategy} from "./strategies/jwt.strategy";


@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
