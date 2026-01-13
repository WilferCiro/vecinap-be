import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';
import { HTTPError } from 'got';
import { AppError } from '../app.error';
import {
  CommonErrorCodes,
  CommonErrorCodesDefinitions,
} from '../constants/common.error';

interface ErrorResponse {
  msg: string;
  httpCode: HttpStatus;
  appCode: number | string;
  data?: Record<string, unknown>;
  showLogs?: boolean;
  returnData?: boolean;
}

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AnyExceptionFilter.name);

  private errorHandlers = {
    [typeof Prisma.PrismaClientKnownRequestError]: this.handlePrismaError,
    PrismaClientValidationError: this.handlePrismaError,
    PrismaClientKnownRequestError: this.handlePrismaError,
    HTTPError: this.handleHttpError,
    BadRequestException: this.handleBadRequestException,
    AppError: this.handleAppError,
  };

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const handledErrorData =
      this.errorHandlers[exception.constructor.name]?.call(this, exception) ||
      this.handleUnknownError(exception);

    if (handledErrorData.showLogs) {
      this.logger.error({
        msg: handledErrorData.msg,
        error: handledErrorData,
      });
    }

    const responseData = {
      ...handledErrorData,
      httpCode: undefined,
      showLogs: undefined,
      returnData: undefined,
      data: handledErrorData.returnData ? handledErrorData.data : undefined,
    };

    response.status(handledErrorData.httpCode).send({ ...responseData });
  }

  private handleHttpError(error: HTTPError): ErrorResponse {
    const commonError =
      CommonErrorCodesDefinitions[CommonErrorCodes.HTTP_ERROR];
    const message = `${error.response.statusMessage || commonError.message}: ${error.response.url}`;

    return {
      appCode: commonError.appCode,
      msg: message,
      httpCode: error.response?.statusCode,
      data: { response: error.response?.body || error.response },
      returnData: true,
    };
  }

  private handlePrismaError(
    error: Prisma.PrismaClientKnownRequestError,
  ): ErrorResponse {
    const commonError =
      CommonErrorCodesDefinitions[CommonErrorCodes.PRISMA_ERROR];
    return {
      msg: `${commonError.message}`,
      appCode: commonError.appCode,
      httpCode: commonError.httpCode ?? HttpStatus.BAD_REQUEST,
      showLogs: true,
      data: {
        prismaError: error?.message,
        code: error?.code,
        clientVersion: error?.clientVersion,
        meta: error?.meta,
      },
    };
  }

  private handleUnknownError(error: any): ErrorResponse {
    const commonError =
      CommonErrorCodesDefinitions[CommonErrorCodes.UNKNOWN_ERROR];

    return {
      msg: `${commonError.message}: ${error?.message}`,
      appCode: CommonErrorCodes.UNKNOWN_ERROR,
      httpCode: error?.status || commonError?.httpCode,
      data: { stack: error?.stack, error },
      showLogs: true,
      returnData: false,
    };
  }

  private handleBadRequestException(error: BadRequestException): ErrorResponse {
    const response = error.getResponse();
    const httpCode = error.getStatus();
    const commonError =
      CommonErrorCodesDefinitions[CommonErrorCodes.BAD_REQUEST];

    if (typeof response === 'string') {
      return {
        msg: response || commonError.message,
        appCode: commonError.appCode,
        httpCode: httpCode || commonError.httpCode,
        showLogs: true,
        returnData: false,
      };
    }

    return {
      msg: `${commonError.message}: ${response['error']} (${response['statusCode']})`,
      appCode: commonError.appCode,
      data: response['message'],
      httpCode: httpCode || commonError.httpCode,
      showLogs: true,
      returnData: true,
    };
  }

  private handleAppError(errorObj: AppError): ErrorResponse {
    const response = errorObj.getResponse();

    if (typeof response === 'object' && response.error) {
      const { error, data } = response;
      return {
        msg: error.message,
        appCode: error.appCode,
        httpCode: error.httpCode,
        data,
        showLogs: error.showLogs,
        returnData: error.returnErrorData,
      };
    }

    const { error, data } = errorObj;
    return {
      msg: error.message,
      appCode: error.appCode,
      httpCode: error.httpCode,
      data,
      showLogs: error.showLogs,
      returnData: error.returnErrorData,
    };
  }
}
