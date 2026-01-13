import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { AppError } from 'src/common/exception/app.error';
import {
  CommonErrorCodes,
  CommonErrorCodesDefinitions,
} from 'src/common/exception/constants/common.error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new AppError(
        CommonErrorCodesDefinitions[CommonErrorCodes.AUTH_TOKEN_ERROR],
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as any).user = payload;
      return true;
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        throw new AppError(
          CommonErrorCodesDefinitions[CommonErrorCodes.AUTH_TOKEN_EXPIRED],
        );
      }
      throw new AppError(
        CommonErrorCodesDefinitions[CommonErrorCodes.AUTH_TOKEN_ERROR],
      );
    }
  }

  private extractTokenFromCookie(request: FastifyRequest): string | undefined {
    return request.cookies?.['access_token'];
  }
}
