import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IterationService } from './iteration.service';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';

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
  findOne(@Param('id') id: string) {
    return this.iterationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIterationDto: UpdateIterationDto) {
    return this.iterationService.update(+id, updateIterationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iterationService.remove(+id);
  }
}
