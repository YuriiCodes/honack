import { Module } from '@nestjs/common';
import { IterationService } from './iteration.service';
import { IterationController } from './iteration.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Iteration from "../../models/Iteration.entity";
import {ProjectModule} from "../project/project.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Iteration,
    ]),
    ProjectModule
  ],
  controllers: [IterationController],
  providers: [IterationService],
  exports: [IterationService],
})
export class IterationModule {}
