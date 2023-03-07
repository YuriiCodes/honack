import {IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class CreateIterationDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}
