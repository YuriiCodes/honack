import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CreateIterationDto } from "./dto/create-iteration.dto";
import { UpdateIterationDto } from "./dto/update-iteration.dto";
import { ProjectService } from "../project/project.service";
import { InjectModel } from "@nestjs/sequelize";
import Iteration from "../../models/Iteration.entity";
import { IterationType } from "@honack/util-shared-types";

@Injectable()
export class IterationService {
  constructor(private readonly projectService: ProjectService,
              @InjectModel(Iteration)
              private iterationModel: typeof Iteration
  ) {

  }

  async create(createIterationDto: CreateIterationDto): Promise<IterationType> {
    await this.projectService.checkIfProjectExists(createIterationDto.projectId);
    return await this.iterationModel.create({ ...createIterationDto }) as IterationType;
  }

  async findAll(): Promise<IterationType[]> {
    return await this.iterationModel.findAll() as IterationType[];
  }

  async findAllByProjectId(projectId: number): Promise<IterationType[]> {
    return await this.iterationModel.findAll({
      where: {
        projectId
      }
    }) as IterationType[];
  }

  async findOne(id: number): Promise<IterationType> {
    return await this.iterationModel.findByPk(id) as IterationType;
  }

  async update(id: number, updateIterationDto: UpdateIterationDto): Promise<IterationType> {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotFoundException("Iteration not found");
    }
    iteration.name = updateIterationDto.name;
    iteration.description = updateIterationDto.description;

    await iteration.save();
    return iteration as IterationType;
  }

  async remove(id: number): Promise<IterationType> {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotFoundException("Iteration not found");
    }
    await iteration.destroy();
    return iteration as IterationType;
  }

  async checkIfIterationExists(id: number) {
    const iteration = await this.iterationModel.findByPk(id);
    if (!iteration) {
      throw new NotAcceptableException("Iteration not found");
    }
  }

  async checkIfUserBelongsToProject(userId: number, projectId: number) {
    await this.projectService.checkIfUserBelongsToProject(userId, projectId);
  }
}
