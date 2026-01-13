import { AppErrorType } from 'src/common/exception/model/types/app-error.type';

export enum AuthErrorCodes {
  USER_NOT_FOUND = 'VAA_0001',
  WRONG_PASSWORD = 'VAA_0002',
}

export const AuthErrorCodesDefinitions: Record<AuthErrorCodes, AppErrorType> = {
  [AuthErrorCodes.USER_NOT_FOUND]: {
    httpCode: 401,
    appCode: AuthErrorCodes.USER_NOT_FOUND,
    message: 'User with entered email not found',
  },
  [AuthErrorCodes.WRONG_PASSWORD]: {
    httpCode: 401,
    appCode: AuthErrorCodes.WRONG_PASSWORD,
    message: 'Wrong Password'
  }
};
