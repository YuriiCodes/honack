import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import Task from "../../models/Task.entity";
import { IterationModule } from "../iteration/iteration.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Task,
    ]),
    IterationModule,
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
