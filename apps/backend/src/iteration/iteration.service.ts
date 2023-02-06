import { Injectable } from '@nestjs/common';
import { CreateIterationDto } from './dto/create-iteration.dto';
import { UpdateIterationDto } from './dto/update-iteration.dto';

@Injectable()
export class IterationService {
  create(createIterationDto: CreateIterationDto) {
    return 'This action adds a new iteration';
  }

  findAll() {
    return `This action returns all iteration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iteration`;
  }

  update(id: number, updateIterationDto: UpdateIterationDto) {
    return `This action updates a #${id} iteration`;
  }

  remove(id: number) {
    return `This action removes a #${id} iteration`;
  }
}
