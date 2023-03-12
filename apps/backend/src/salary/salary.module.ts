import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import Salary from "../../models/Salary.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Salary,
    ]),
  ],
  controllers: [SalaryController],
  providers: [SalaryService],
  exports: [SalaryService]
})
export class SalaryModule {}
