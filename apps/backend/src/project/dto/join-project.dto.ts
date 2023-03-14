import { IsNotEmpty, IsString } from "class-validator";

export class JoinProjectDto {
  @IsString()
  @IsNotEmpty()
  joinCode: string;
}
