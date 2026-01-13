import { Injectable } from '@nestjs/common';
import { AppError } from 'src/common/exception/app.error';
import { ORM } from 'src/common/orm/prisma.orm.context';
import {
  UserErrorCodes,
  UserErrorCodesDefinitions,
} from '../constants/user-error.constants';

@Injectable()
export class UserService {
  constructor(private readonly orm: ORM) {}

  public async getbyEmail(email: string) {
    const user = await this.orm.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new AppError(UserErrorCodesDefinitions[UserErrorCodes.NOT_FOUND], {
        email,
      });
    }
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password,
      firstName: user.firstName,
    };
  }

  public async getMeProfile(id: string) {
    const user = await this.orm.user.findUnique({
      where: { id }
    });
    if (!user) {
      throw new AppError(UserErrorCodesDefinitions[UserErrorCodes.NOT_FOUND], {
        id,
      });
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'admin',
      residentials: [
        {
          id: "1",
          name: "Los Pinos",
          role: "admin"
        },
        {
          id: "2",
          name: "La herencia",
          role: "resident"
        }
      ]
    };
  }
}
