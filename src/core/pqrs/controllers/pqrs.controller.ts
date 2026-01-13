import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { UserResidentialRole } from "@prisma/client";
import { Roles } from "src/common/auth/decorators/roles.decorator";
import { AuthGuard } from "src/common/auth/guards/auth.guard";
import { RolesGuard } from "src/common/auth/guards/roles.guard";
import { PqrsCreateRequestDto } from "../models/dtos/request/pqrs-create.dto";
import { User } from "src/common/auth/decorators/user.decorator";
import { JwtPayload } from "src/common/auth/models/interfaces/auth.interface";
import { PqrsService } from "../services/pqrs.service";
import { PqrsListFiltersDto } from "../models/dtos/request/pqrs-list.dto";

@Controller('pqrs')
export class PqrsController {
  constructor(private readonly pqrsService: PqrsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserResidentialRole.RESIDENT)
  @Post("")
  async createPqrs(@Body() body: PqrsCreateRequestDto, @User() user: JwtPayload) {
    return this.pqrsService.create(body, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserResidentialRole.RESIDENT, UserResidentialRole.ADMIN)
  @Get("")
  async listPqrs(@Query() filters: PqrsListFiltersDto, @User() user: JwtPayload) {
    return this.pqrsService.list(filters, user);
  }
}