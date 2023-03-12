import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSalaryDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
