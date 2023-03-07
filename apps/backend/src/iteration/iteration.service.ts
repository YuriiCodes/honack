import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';
import {ProjectService} from "../project/project.service";
import {InjectModel} from "@nestjs/sequelize";
import Iteration from "../../models/Iteration.entity";

@Injectable()
export class IterationService {
  constructor(private readonly projectService: ProjectService,
              @InjectModel(Iteration)
              private iterationModel: typeof Iteration
              ) {

  }

  async create(createIterationDto: CreateIterationDto) {
    await this.projectService.checkIfProjectExists(createIterationDto.projectId)
    return await this.iterationModel.create({...createIterationDto});
  }

  async findAll() {
    return await this.iterationModel.findAll();
  }

  async findAllByProjectId(projectId: number) {
    return await this.iterationModel.findAll({
      where: {
        projectId
      }
    });
  }

  async findOne(id: number) {
    return await this.iterationModel.findByPk(id);
  }

  async update(id: number, updateIterationDto: UpdateIterationDto) {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    iteration.name = updateIterationDto.name;
    iteration.description = updateIterationDto.description;

    await iteration.save();
    return iteration;
  }

  async remove(id: number) {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    await iteration.destroy();
    return iteration;
  }

  async checkIfIterationExists(id: number) {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotAcceptableException('Iteration not found');
    }
  }

  async checkIfUserBelongsToProject(userId: number, projectId: number) {
    await this.projectService.checkIfUserBelongsToProject(userId, projectId);
  }
}
