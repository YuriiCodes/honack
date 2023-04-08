import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from "@honack/util-shared-types";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  status: TaskStatus;
}
