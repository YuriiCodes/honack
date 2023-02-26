import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Project from "../../models/Project.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
