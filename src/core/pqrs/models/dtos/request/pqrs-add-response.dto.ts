import { IsNumber, IsString } from "class-validator";

export class PqrsAddResponseDto {
  @IsString()
  message: string;
}