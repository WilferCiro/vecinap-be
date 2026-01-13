import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthLoginRequestDto } from '../models/dtos/request/auth-login-request.dto';
import { AuthService } from '../services/auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.login(body.email, body.password, res);
  }

  @Post('refresh')
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) reply: FastifyReply) {
    reply.clearCookie('access_token', { path: '/' });
    reply.clearCookie('refresh_token', { path: '/auth/refresh' });
    return { ok: true };
  }
}
