import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class TableFilterRequestDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  count: number;
}