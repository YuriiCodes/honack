import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import GetCurrentUser from "../../decorators/GetCurrentUser";
import {UserFromToken} from "@honack/util-shared-types";
import { JoinProjectDto } from "./dto/join-project.dto";

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetCurrentUser() currentUser: UserFromToken) {
    return this.projectService.create(createProjectDto, currentUser.sub);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Post("/join")
  joinProject(@Body()joinProjectDto: JoinProjectDto, @GetCurrentUser() user: UserFromToken) {
    return this.projectService.addUserToProject(user.sub, joinProjectDto.joinCode);
  }

}
