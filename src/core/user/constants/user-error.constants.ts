import { AppErrorType } from 'src/common/exception/model/types/app-error.type';

export enum UserErrorCodes {
  NOT_FOUND = 'VAU_0001',
}

export const UserErrorCodesDefinitions: Record<UserErrorCodes, AppErrorType> = {
  [UserErrorCodes.NOT_FOUND]: {
    httpCode: 404,
    appCode: UserErrorCodes.NOT_FOUND,
    message: 'User not found',
  },
};
