import { AppErrorType } from 'src/common/exception/model/types/app-error.type';

export enum PqrsErrorCodes {
  CREATION_FAILED = 'VAPQR_0001',
  DELETE_FAILED = 'VAPQR_0002',
}

export const PqrsErrorCodesDefinitions: Record<PqrsErrorCodes, AppErrorType> = {
  [PqrsErrorCodes.CREATION_FAILED]: {
    httpCode: 422,
    appCode: PqrsErrorCodes.CREATION_FAILED,
    message: 'Failed to create a record',
    showLogs: true,
  },
  [PqrsErrorCodes.DELETE_FAILED]: {
    httpCode: 422,
    appCode: PqrsErrorCodes.DELETE_FAILED,
    message: 'Failed to delete a record',
    showLogs: false,
  },
};
