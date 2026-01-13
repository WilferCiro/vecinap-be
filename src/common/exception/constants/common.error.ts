import { AppErrorType } from '../model/types/app-error.type';

export enum CommonErrorCodes {
  UNKNOWN_ERROR = 'VA_0001',
  BAD_REQUEST = 'VA_0002',
  HTTP_ERROR = 'VA_0003',
  PRISMA_ERROR = 'VA_0004',
  AUTH_TOKEN_EXPIRED = 'VA_0005',
  AUTH_TOKEN_ERROR = 'VA_0006',
}

export const CommonErrorCodesDefinitions: Record<
  CommonErrorCodes,
  AppErrorType
> = {
  [CommonErrorCodes.UNKNOWN_ERROR]: {
    httpCode: 500,
    appCode: CommonErrorCodes.UNKNOWN_ERROR,
    message: 'Common error application',
    showLogs: true,
    returnErrorData: true,
  },
  [CommonErrorCodes.BAD_REQUEST]: {
    httpCode: 400,
    appCode: CommonErrorCodes.BAD_REQUEST,
    message: 'Bad request error',
    showLogs: true,
  },
  [CommonErrorCodes.HTTP_ERROR]: {
    httpCode: 502,
    appCode: CommonErrorCodes.HTTP_ERROR,
    message: 'Http error',
    showLogs: true,
  },
  [CommonErrorCodes.PRISMA_ERROR]: {
    httpCode: 500,
    appCode: CommonErrorCodes.PRISMA_ERROR,
    message: 'Prisma error',
    showLogs: true,
  },
  [CommonErrorCodes.AUTH_TOKEN_EXPIRED]: {
    httpCode: 401,
    appCode: CommonErrorCodes.AUTH_TOKEN_EXPIRED,
    message: 'Token expired',
  },
  [CommonErrorCodes.AUTH_TOKEN_ERROR]: {
    httpCode: 401,
    appCode: CommonErrorCodes.AUTH_TOKEN_ERROR,
    message: 'Token error',
  }
};
