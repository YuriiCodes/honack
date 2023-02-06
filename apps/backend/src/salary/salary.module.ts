import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';

@Module({
  controllers: [SalaryController],
  providers: [SalaryService]
})
export class SalaryModule {}
