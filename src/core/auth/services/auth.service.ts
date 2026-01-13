import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/core/user/services/user.service';
import { AppError } from 'src/common/exception/app.error';
import {
  AuthErrorCodes,
  AuthErrorCodesDefinitions,
} from '../constants/auth-error.constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtPayload } from 'src/common/auth/models/interfaces/auth.interface';

// TODO: add casl for roles

@Injectable()
export class AuthService {
  private readonly saltOrRounds: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.saltOrRounds = +this.configService.get<number>('AUTH_SALT');
  }

  public async login(
    email: string,
    password: string,
    reply: FastifyReply,
  ): Promise<{ ok: true }> {
    const user = await this.userService.getbyEmail(email);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError(
        AuthErrorCodesDefinitions[AuthErrorCodes.WRONG_PASSWORD],
      );
    }

    const payload: JwtPayload = { sub: user.id, residential: {id: "00dfa03c-989f-4a28-81f1-0e07961e4b51", role: "RESIDENT"} };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    reply.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 60,
    });

    reply.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60,
    });

    return { ok: true };
  }

  async refresh(req: FastifyRequest, reply: FastifyReply): Promise<{ ok: true }> {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    const newAccessToken = await this.jwtService.signAsync(
      { sub: payload.sub },
      { expiresIn: '15m' },
    );

    reply.setCookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 60,
    });

    return { ok: true };
  }
}
