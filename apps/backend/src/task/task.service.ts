import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/sequelize";
import Task from "../../models/Task.entity";
import { IterationService } from "../iteration/iteration.service";
import { AuthService } from "../auth/auth.service";
import { TaskStatus, TaskType, UserFromToken } from "@honack/util-shared-types";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task)
              private taskModel: typeof Task,
              private readonly iterationService: IterationService,
              private readonly authService: AuthService) {
  }


  async create(createTaskDto: CreateTaskDto, user: UserFromToken): Promise<TaskType> {
    // check if the with given iterationId  exists:
    await this.iterationService.checkIfIterationExists(createTaskDto.iterationId);

    // check if the executor with given id exists:
    await this.authService.checkIfUserExists(createTaskDto.executorId);

    // check if task creator with given id exists:
    await this.authService.checkIfUserExists(user.id);

    // check if task executor belongs to the project:
    await this.iterationService.checkIfUserBelongsToProject(createTaskDto.executorId, createTaskDto.projectId);

    // check if task creator is the project owner
    await this.iterationService.checkIfUserIsCreator(user.id, createTaskDto.projectId);

    // check if the task creator

    return await this.taskModel.create({
      ...createTaskDto,
      creatorId: user.id
    }) as TaskType;
  }

  async findAll(): Promise<TaskType[]> {
    return await this.taskModel.findAll() as TaskType[];
  }

  async findOne(id: number): Promise<TaskType> {
    return await this.taskModel.findByPk(id) as TaskType;
  }

  async findAllByIterationId(iterationId: number): Promise<TaskType[]> {
    return await this.taskModel.findAll({
      where: {
        iterationId
      }
    }) as TaskType[];
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: UserFromToken): Promise<TaskType> {
    // check if task moderator is the project owner
    await this.iterationService.checkIfUserIsCreator(user.id, updateTaskDto.projectId);

    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.executorId = updateTaskDto.executorId;
    task.points = updateTaskDto.points;

    // validate that we get the right status
    if (!Object.values(TaskStatus).includes(updateTaskDto.status)) {
      throw new NotFoundException("Task status not found");
    }

    task.status = updateTaskDto.status;

    await task.save();
    return task as TaskType;
  }

  async remove(id: number): Promise<TaskType> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    await task.destroy();
    return task as TaskType;
  }
}
