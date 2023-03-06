import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Project from "../../models/Project.entity";
import UsersProjects from "../../models/UsersProjects";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      UsersProjects,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
