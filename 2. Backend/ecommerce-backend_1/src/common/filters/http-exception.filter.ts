import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorCode } from '../errors/api-error-codes';
import { AppException } from '../errors/app-exception';
import { RequestContext } from '../context/request-context';

interface ErrorResponseBody {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, unknown>;
    requestId?: string;
    correlationId?: string;
  };
}

/**
 * Canonical, project-wide HTTP exception filter.
 *
 * Guarantees:
 *  - stable machine-readable `code`
 *  - a request/correlation ID for support and log correlation
 *  - never leaks stack traces, SQL, file paths, or provider internals
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestContext = RequestContext.current();

    const { status, body } = this.translate(exception);

    body.error.requestId = requestContext?.requestId;
    body.error.correlationId = requestContext?.correlationId;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}: ${this.safeMessage(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(status).json(body);
  }

  private translate(exception: unknown): { status: number; body: ErrorResponseBody } {
    if (exception instanceof AppException) {
      const httpBody = exception.getResponse() as {
        code: ApiErrorCode;
        message: string;
        details?: Record<string, unknown>;
      };
      return {
        status: exception.getStatus(),
        body: {
          error: {
            code: httpBody.code,
            message: httpBody.message,
            details: httpBody.details,
          },
        },
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const httpResponse = exception.getResponse();
      const message = this.extractValidationMessage(httpResponse) ?? exception.message;
      return {
        status,
        body: {
          error: {
            code: this.codeForHttpStatus(status),
            message,
          },
        },
      };
    }

    // Unknown/unexpected error: never leak internals to the client.
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        error: {
          code: ApiErrorCode.INTERNAL_ERROR,
          message: 'An unexpected error occurred.',
        },
      },
    };
  }

  private extractValidationMessage(httpResponse: unknown): string | undefined {
    if (typeof httpResponse === 'object' && httpResponse !== null && 'message' in httpResponse) {
      const message = (httpResponse as { message: unknown }).message;
      if (Array.isArray(message)) {
        return message.join('; ');
      }
      if (typeof message === 'string') {
        return message;
      }
    }
    return undefined;
  }

  private codeForHttpStatus(status: number): ApiErrorCode {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return ApiErrorCode.VALIDATION_FAILED;
      case HttpStatus.UNAUTHORIZED:
        return ApiErrorCode.AUTHENTICATION_REQUIRED;
      case HttpStatus.FORBIDDEN:
        return ApiErrorCode.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return ApiErrorCode.RESOURCE_NOT_FOUND;
      case HttpStatus.CONFLICT:
        return ApiErrorCode.RESOURCE_CONFLICT;
      case HttpStatus.TOO_MANY_REQUESTS:
        return ApiErrorCode.RATE_LIMITED;
      default:
        return ApiErrorCode.INTERNAL_ERROR;
    }
  }

  private safeMessage(exception: unknown): string {
    if (exception instanceof Error) {
      return exception.message;
    }
    return 'Unknown error';
  }
}
