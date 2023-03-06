import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectModel} from "@nestjs/sequelize";
import Project from "../../models/Project.entity";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project)
              private projectModel: typeof Project) {
  }

 async  create(createProjectDto: CreateProjectDto, userEmail: string) {
    // return await this.projectModel.create({
      // name: createProjectDto.name,
      // description: createProjectDto.description,
      // userId: ,
    // });
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
