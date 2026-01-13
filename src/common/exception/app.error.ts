import { HttpException, HttpStatus } from '@nestjs/common';
import { AppErrorType } from './model/types/app-error.type';

export class AppError extends HttpException {
  public readonly error: AppErrorType;
  public readonly data: Record<string, unknown> | undefined;

  constructor(error: AppErrorType, data?: Record<string, unknown>) {
    const httpStatus = error.httpCode || HttpStatus.INTERNAL_SERVER_ERROR;

    super(error.message || 'Unknown error', httpStatus);

    Object.setPrototypeOf(this, new.target.prototype);

    this.error = error;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  getResponse() {
    return {
      error: this.error,
      data: this.data,
    };
  }

  getStatus() {
    return this.error.httpCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
