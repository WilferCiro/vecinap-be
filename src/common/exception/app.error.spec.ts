import { AppError } from './app.error';
import { AppErrorType } from './model/types/app-error.type';

describe('AppError', () => {
  it('should create an instance with the provided error and data', () => {
    const error = {
      message: 'Test error',
      code: 'TEST_ERROR',
    } as unknown as AppErrorType;
    const data = { key: 'value' };

    const appError = new AppError(error, data);

    expect(appError).toBeInstanceOf(AppError);
    expect(appError.error).toBe(error);
    expect(appError.data).toBe(data);
    expect(appError.message).toBe(error.message);
  });

  it('should create an instance with undefined data if not provided', () => {
    const error = {
      message: 'Test error',
      code: 'TEST_ERROR',
    } as unknown as AppErrorType;

    const appError = new AppError(error);

    expect(appError).toBeInstanceOf(AppError);
    expect(appError.error).toBe(error);
    expect(appError.data).toBeUndefined();
    expect(appError.message).toBe(error.message);
  });

  it('should set the message to "Unknown error" if error message is not provided', () => {
    const error = { code: 'TEST_ERROR' } as unknown as AppErrorType;

    const appError = new AppError(error);

    expect(appError.message).toBe('Unknown error');
  });

  it('should capture the stack trace', () => {
    const error = {
      message: 'Test error',
      code: 'TEST_ERROR',
    } as unknown as AppErrorType;

    const appError = new AppError(error);

    expect(appError.stack).toBeDefined();
  });

  it('should return status correctly', () => {
    const error = {
      message: 'Test error',
      code: 'TEST_ERROR',
    } as unknown as AppErrorType;
    const data = { key: 'value' };

    const appError = new AppError(error, data);

    expect(appError.getResponse()).toEqual({
      error,
      data,
    });
    expect(appError.getStatus()).toEqual(500);
  });
  it('should return functional code with methods', () => {
    const error = {
      message: 'Test error',
      code: 'TEST_ERROR',
      httpCode: 404,
      functional: true,
    } as unknown as AppErrorType;
    const data = { key: 'value' };

    const appError = new AppError(error, data);
    expect(appError.getStatus()).toEqual(404);
  });
});
