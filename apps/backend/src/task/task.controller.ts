import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskType, UserFromToken } from "@honack/util-shared-types";
import GetCurrentUser from "../../decorators/GetCurrentUser";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetCurrentUser() user: UserFromToken): Promise<TaskType> {
    return this.taskService.create(createTaskDto, user);
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
  findAllByIterationId(number, @Param("id") id: number): Promise<TaskType[]> {
    return this.taskService.findAllByIterationId(id);
  }

  @Patch(":id")
  update(@Param("id") id: number,
         @Body() updateTaskDto: UpdateTaskDto,
         @GetCurrentUser() user: UserFromToken): Promise<TaskType> {
    return this.taskService.update(id, updateTaskDto, user);
  }
}
