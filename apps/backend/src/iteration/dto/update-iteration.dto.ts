import { PartialType } from '@nestjs/mapped-types';
import { CreateIterationDto } from './create-iteration.dto';

export class UpdateIterationDto extends PartialType(CreateIterationDto) {}
