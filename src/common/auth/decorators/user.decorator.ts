import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../models/interfaces/auth.interface';

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);