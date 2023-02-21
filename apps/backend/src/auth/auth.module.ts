import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import User from "../../models/User.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
