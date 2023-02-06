import { Module } from '@nestjs/common';
import { IterationService } from './iteration.service';
import { IterationController } from './iteration.controller';

@Module({
  controllers: [IterationController],
  providers: [IterationService]
})
export class IterationModule {}
