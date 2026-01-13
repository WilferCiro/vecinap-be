import { HttpStatus } from '@nestjs/common';

export type AppErrorType = {
  message: string;
  appCode: string;
  httpCode: HttpStatus;
  showLogs?: boolean;
  returnErrorData?: boolean;
};
