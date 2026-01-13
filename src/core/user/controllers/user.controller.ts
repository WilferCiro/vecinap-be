import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/auth/guards/auth.guard";
import { UserService } from "../services/user.service";
import { User } from "src/common/auth/decorators/user.decorator";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("/")
  async list() {

  }

  @UseGuards(AuthGuard)
  @Get("/me")
  async meData(@User('sub') userId: string) {
    return this.userService.getMeProfile(userId)
  }
}