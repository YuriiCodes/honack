import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectModel} from "@nestjs/sequelize";
import Project from "../../models/Project.entity";
import {ProjectType} from "@honack/util-shared-types";
import UsersProjects from "../../models/UsersProjects";

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


    const project =  await this.projectModel.create({
      ...createProjectDto,
      ownerId: userId
    }) as ProjectType;

    // add project to user's projects
    await this.usersProjectsModel.create({
      userId,
      projectId: project.id
    });

    return project;
  }

  async findAll() {
    return await this.projectModel.findAll();
  }

  async findOne(id: number) {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async checkIfProjectNameExists(name: string) {
    const existingProject = await this.projectModel.findOne({
      where: {
        name
      }
    });
    if (existingProject) {
      throw new ConflictException('Project name already exists');
    }
  }
  async checkIfProjectExists(id: number) {
    const existingProject = await this.projectModel.findByPk(id)
    if (!existingProject) {
      throw new NotFoundException('Project with given ID does not exist');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByPk(id);
    //check if project name already exists
    await this.checkIfProjectNameExists(updateProjectDto.name);
    return await project.update(updateProjectDto);
  }

  async remove(id: number) {
    return await this.projectModel.destroy({
      where: {
        id
      }
    });
  }
}
