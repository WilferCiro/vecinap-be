import { PqrsType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class PqrsCreateRequestDto {
  @IsString()
  description: string;

  @IsString()
  subject: string;

  @IsString()
  @IsEnum(PqrsType)
  type: PqrsType;
}