import { PqrsStatus, PqrsType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { TableFilterRequestDto } from 'src/common/models/dtos/request/table-filter-request.dto';

export class PqrsListFiltersDto extends TableFilterRequestDto {
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsEnum(PqrsType)
  @IsOptional()
  type: PqrsType;

  @IsEnum(PqrsStatus)
  @IsOptional()
  status: PqrsStatus;
}
