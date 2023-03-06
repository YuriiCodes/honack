import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import GetUserEmail from "../../decorators/GetUserEmail";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {InjectModel} from "@nestjs/sequelize";
import User from "../../models/User.entity";
import Project from "../../models/Project.entity";
import GetCurrentUser from "../../decorators/GetCurrentUser";

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }


  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetUserEmail() email : string) {
    return this.projectService.create(createProjectDto, email);
  }

  @Get()
  findAll(@GetUserEmail() user, @Req() req, @GetCurrentUser() currentUser) {
    return currentUser;
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
}
