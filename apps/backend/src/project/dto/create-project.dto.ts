import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(50, 1000)
  description: string;
}
