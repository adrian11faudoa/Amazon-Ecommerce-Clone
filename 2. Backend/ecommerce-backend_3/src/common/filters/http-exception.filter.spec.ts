import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { AppException } from '../errors/app-exception';
import { ApiErrorCode } from '../errors/api-error-codes';

function buildHost() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const response = { status };
  const request = { method: 'GET', url: '/test' };
  const host = {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => request,
    }),
  };
  return { host: host as any, status, json };
}

describe('HttpExceptionFilter', () => {
  it('translates an AppException into its stable code and declared HTTP status', () => {
    const filter = new HttpExceptionFilter();
    const { host, status, json } = buildHost();

    filter.catch(AppException.invalidCredentials(), host);

    expect(status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({ code: ApiErrorCode.INVALID_CREDENTIALS }),
      }),
    );
  });

  it('maps a generic NestJS HttpException by status to a stable code', () => {
    const filter = new HttpExceptionFilter();
    const { host, status, json } = buildHost();

    filter.catch(new HttpException('Not Found', HttpStatus.NOT_FOUND), host);

    expect(status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({ code: ApiErrorCode.RESOURCE_NOT_FOUND }),
      }),
    );
  });

  it('never leaks internal details for an unknown/unexpected error', () => {
    const filter = new HttpExceptionFilter();
    const { host, status, json } = buildHost();

    filter.catch(new Error('leaked stack trace / sql / secret'), host);

    expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    const body = json.mock.calls[0][0];
    expect(body.error.code).toEqual(ApiErrorCode.INTERNAL_ERROR);
    expect(JSON.stringify(body)).not.toContain('leaked stack trace');
  });

  it('joins array-form class-validator messages into a single readable string', () => {
    const filter = new HttpExceptionFilter();
    const { host, json } = buildHost();

    filter.catch(
      new HttpException({ message: ['email must be an email', 'password too short'] }, 400),
      host,
    );

    expect(json.mock.calls[0][0].error.message).toEqual(
      'email must be an email; password too short',
    );
  });
});
