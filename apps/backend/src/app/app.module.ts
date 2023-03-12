import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import configValidationSchema from "../../config.schema";
import User from "../../models/User.entity";
import Project from "../../models/Project.entity";
import Iteration from "../../models/Iteration.entity";
import Salary from "../../models/Salary.entity";
import Task from "../../models/Task.entity";
import UsersProjects from "../../models/UsersProjects";
import {AuthModule} from "../auth/auth.module";
import {AuthController} from "../auth/auth.controller";
import {ProjectController} from "../project/project.controller";
import {ProjectModule} from "../project/project.module";
import {IterationController} from "../iteration/iteration.controller";
import {IterationModule} from "../iteration/iteration.module";
import { TaskModule } from "../task/task.module";
import { TaskController } from "../task/task.controller";
import { SalaryModule } from "../salary/salary.module";
import { SalaryController } from "../salary/salary.controller";

@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`apps/backend/.env.stage.${process.env.STAGE}`],
    expandVariables: true,
    validationSchema: configValidationSchema,
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [
          Iteration,
          Salary,
          Task,
          Project,
          User,
          UsersProjects,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  AuthModule, ProjectModule, IterationModule, TaskModule, SalaryModule],
  controllers: [AppController, AuthController, ProjectController, IterationController, TaskController, SalaryController],
  providers: [AppService],
})
export class AppModule {}
