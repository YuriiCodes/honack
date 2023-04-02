import { IsNotEmpty, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 250)
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  executorId: number;
  @IsNotEmpty()
  @Type(() => Number)
  points: number;
  @IsNotEmpty()
  @Type(() => Number)
  iterationId: number;

  @IsNotEmpty()
  @Type(() => Number)
  projectId: number;
}
