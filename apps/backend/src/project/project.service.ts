import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectModel } from "@nestjs/sequelize";
import Project from "../../models/Project.entity";
import { DomainUserWithoutPassword, DomainUserWithSalary, ProjectType, UserFromToken } from "@honack/util-shared-types";
import UsersProjects from "../../models/UsersProjects";
import { v4 as uuidv4 } from "uuid";
import Iteration from "../../models/Iteration.entity";
import User from "../../models/User.entity";
import Salary from "../../models/Salary.entity";
import Task from "../../models/Task.entity";
import { Op } from "sequelize";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project)
              private projectModel: typeof Project,
              @InjectModel(UsersProjects)
              private usersProjectsModel: typeof UsersProjects,
              @InjectModel(User)
              private user: typeof User,
              @InjectModel(Salary)
              private salary: typeof Salary,
              @InjectModel(Task)
              private task: typeof Task
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

  async findAll(currentUser: UserFromToken): Promise<ProjectType[]> {
    const userProjects = await this.usersProjectsModel.findAll({
      where: {
        userId: currentUser.id
      }
    });
    const projectIds = userProjects.map(userProject => userProject.projectId);
    return await this.projectModel.findAll({
      where: {
        id: projectIds
      },
      include: [
        {
          model: Iteration,
          as: "iterations"
        }
      ]
    }) as ProjectType[];
  }

  async findOne(id: number): Promise<ProjectType> {
    const project = await this.projectModel.findByPk(id, {
      include: [
        {
          model: Iteration,
          as: "iterations"
        }]
    });
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

  async getMembers(projectId: number, userId: number): Promise<DomainUserWithoutPassword[]> {
    await this.checkIfUserBelongsToProject(userId, projectId);

    const usersProjects = await this.usersProjectsModel.findAll({
      where: {
        projectId
      }
    });

    const userIds = usersProjects.map(userProject => userProject.userId);

    return await this.user.findAll({
      where: {
        id: userIds
      },
      attributes: {
        exclude: ["password", "ownerId", "creatorId", "executorId"]
      }
    }) as DomainUserWithoutPassword[];
  }


  async getMembersWithSalary(projectId: number, userId: number, numberOfDays: number): Promise<DomainUserWithSalary[]> {
    await this.checkIfUserBelongsToProject(userId, projectId);

    const usersProjects = await this.usersProjectsModel.findAll({
      where: {
        projectId
      }
    });

    const userIds = usersProjects.map(userProject => userProject.userId);

    const users = await this.user.findAll({
      where: {
        id: userIds
      },
      attributes: {
        exclude: ["password", "ownerId", "creatorId", "executorId"]
      }
    });

    const usersWithSalary: DomainUserWithSalary[] = [];
    users.forEach(user => {
      usersWithSalary.push({
        ...user.toJSON(),
        salary: 0,
        points: 0,
        expectedSalary: 0
      });
    });

    // add salary to users
    for (const user of usersWithSalary) {
      const salary = await this.salary.findOne({
        where: {
          userId: user.id
        }
      });
      user.salary = salary.amount;
    }

    // add points to users
    for (const user of usersWithSalary) {
      const tasks = await this.task.findAll({
        where: {
          executorId: user.id,
          status: "DONE",
          createdAt: {
            [Op.gte]: new Date(new Date().getTime() - (numberOfDays * 24 * 60 * 60 * 1000))
          }
        }
      });
      let points = 0;
      tasks.forEach(task => {
        points += task.points;
      });
      user.points = points;

      // user's expected salary should be calculated based on his salary and points,
      // where 100 points = 100% of salary, 50 points = 50% of salary, etc:
      user.expectedSalary = user.salary * (user.points / 100);
    }
    return usersWithSalary;
  }
}
