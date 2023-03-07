import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { IterationService } from './iteration.service';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('iteration')
export class IterationController {
  constructor(private readonly iterationService: IterationService) {}

  @Post()
  create(@Body() createIterationDto: CreateIterationDto) {
    return this.iterationService.create(createIterationDto);
  }

  @Get()
  findAll() {
    return this.iterationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.iterationService.findOne(id);
  }

  @Get('project/:id')
  findAllByProjectId(@Param('id') id: number) {
    return this.iterationService.findAllByProjectId(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateIterationDto: UpdateIterationDto) {
    return this.iterationService.update(id, updateIterationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iterationService.remove(+id);
  }
}
