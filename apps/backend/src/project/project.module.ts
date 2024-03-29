import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Project from "../../models/Project.entity";
import UsersProjects from "../../models/UsersProjects";
import User from "../../models/User.entity";
import Salary from "../../models/Salary.entity";
import Task from "../../models/Task.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      UsersProjects,
      User,
      Salary,
      Task
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
