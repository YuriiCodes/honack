import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/sequelize";
import Task from "../../models/Task.entity";
import { IterationService } from "../iteration/iteration.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task)
              private taskModel: typeof Task,
              private readonly iterationService: IterationService,
              private readonly authService: AuthService) {
  }


  async create(createTaskDto: CreateTaskDto) {
    // check if the with given iterationId  exists:
    await this.iterationService.checkIfIterationExists(createTaskDto.iterationId);

    // check if the executor with given id exists:
    await this.authService.checkIfUserExists(createTaskDto.executorId)

    // check if task creator with given id exists:
    await this.authService.checkIfUserExists(createTaskDto.creatorId)

    // check if task executor belongs to the project:
    await this.iterationService.checkIfUserBelongsToProject(createTaskDto.executorId, createTaskDto.iterationId)

    // check if task creator belongs to the project:
    await this.iterationService.checkIfUserBelongsToProject(createTaskDto.creatorId, createTaskDto.iterationId)


    return await this.taskModel.create({
      ...createTaskDto
    });
  }

  async findAll() {
    return await this.taskModel.findAll();
  }

  async findOne(id: number) {
    return await this.taskModel.findByPk(id);
  }

  async findAllByIterationId(iterationId: number) {
    return await this.taskModel.findAll({
      where: {
        iterationId
      }
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.executorId = updateTaskDto.executorId;

    await task.save();
    return task;
  }

  async remove(id: number) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await task.destroy();
    return task;
  }
}
