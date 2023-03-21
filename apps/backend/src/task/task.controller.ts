import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskType } from "@honack/util-shared-types";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskType> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(): Promise<TaskType[]> {
    return this.taskService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<TaskType> {
    return this.taskService.findOne(id);
  }

  @Get("iteration/:id")
  findAllByIterationId(@Param("id") id: number): Promise<TaskType[]> {
    return this.taskService.findAllByIterationId(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskType> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<TaskType> {
    return this.taskService.remove(id);
  }
}
