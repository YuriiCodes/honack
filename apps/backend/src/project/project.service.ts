import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectModel } from "@nestjs/sequelize";
import Project from "../../models/Project.entity";
import { ProjectType } from "@honack/util-shared-types";
import UsersProjects from "../../models/UsersProjects";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project)
              private projectModel: typeof Project,
              @InjectModel(UsersProjects)
              private usersProjectsModel: typeof UsersProjects
  ) {
  }

  async create(createProjectDto: CreateProjectDto, userId: number): Promise<ProjectType> {
    // check if project name already exists
    await this.checkIfProjectNameExists(createProjectDto.name);


    const project = await this.projectModel.create({
      ...createProjectDto,
      ownerId: userId,
      joinCode: uuidv4()
    }) as ProjectType;

    // add project to user's projects
    await this.usersProjectsModel.create({
      userId,
      projectId: project.id
    });
    return project;
  }

  async findAll(): Promise<ProjectType[]> {
    return await this.projectModel.findAll() as ProjectType[];
  }

  async findOne(id: number): Promise<ProjectType> {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException("Project not found");
    }
    return project as ProjectType;
  }

  async checkIfProjectNameExists(name: string) {
    const existingProject = await this.projectModel.findOne({
      where: {
        name
      }
    });
    if (existingProject) {
      throw new ConflictException("Project name already exists");
    }
  }

  async checkIfProjectExists(id: number) {
    const existingProject = await this.projectModel.findByPk(id);
    if (!existingProject) {
      throw new NotFoundException("Project with given ID does not exist");
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<ProjectType> {
    const project = await this.projectModel.findByPk(id);
    //check if project name already exists
    await this.checkIfProjectNameExists(updateProjectDto.name);
    return await project.update(updateProjectDto) as ProjectType;
  }

  async remove(id: number) {
    return await this.projectModel.destroy({
      where: {
        id
      }
    });
  }

  async checkIfUserBelongsToProject(userId, projectId) {
    const userProject = await this.usersProjectsModel.findOne({
      where: {
        userId,
        projectId
      }
    });
    if (!userProject) {
      throw new NotFoundException(`User ${userId} does not belong to project ${projectId}`);
    }
  }

  async addUserToProject(userId: number, joinCode: string) {
    const project = await this.projectModel.findOne({
      where: {
        joinCode
      }
    });
    if (!project) {
      throw new NotFoundException("Project with given join code does not exist");
    }
    return await this.usersProjectsModel.create({
      userId,
      projectId: project.id
    });

  }
}
