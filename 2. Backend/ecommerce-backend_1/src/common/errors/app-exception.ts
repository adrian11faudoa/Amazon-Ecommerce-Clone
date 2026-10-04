import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from './api-error-codes';

/**
 * Canonical application exception. Every domain-thrown error should use
 * this (or a subclass) so the global exception filter can produce a
 * consistent, safe API error envelope.
 */
export class AppException extends HttpException {
  public readonly code: ApiErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    code: ApiErrorCode,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: Record<string, unknown>,
  ) {
    super({ code, message, details }, status);
    this.code = code;
    this.details = details;
  }

  static validationFailed(message: string, details?: Record<string, unknown>): AppException {
    return new AppException(
      ApiErrorCode.VALIDATION_FAILED,
      message,
      HttpStatus.BAD_REQUEST,
      details,
    );
  }

  static authenticationRequired(message = 'Authentication is required.'): AppException {
    return new AppException(ApiErrorCode.AUTHENTICATION_REQUIRED, message, HttpStatus.UNAUTHORIZED);
  }

  static invalidCredentials(message = 'Invalid email or password.'): AppException {
    return new AppException(ApiErrorCode.INVALID_CREDENTIALS, message, HttpStatus.UNAUTHORIZED);
  }

  static accountSuspended(message = 'This account is suspended.'): AppException {
    return new AppException(ApiErrorCode.ACCOUNT_SUSPENDED, message, HttpStatus.FORBIDDEN);
  }

  static tokenExpired(message = 'The provided token has expired.'): AppException {
    return new AppException(ApiErrorCode.TOKEN_EXPIRED, message, HttpStatus.UNAUTHORIZED);
  }

  static tokenInvalid(message = 'The provided token is invalid.'): AppException {
    return new AppException(ApiErrorCode.TOKEN_INVALID, message, HttpStatus.UNAUTHORIZED);
  }

  static tokenReused(message = 'This token has already been used.'): AppException {
    return new AppException(ApiErrorCode.TOKEN_REUSED, message, HttpStatus.UNAUTHORIZED);
  }

  static sessionRevoked(message = 'This session has been revoked.'): AppException {
    return new AppException(ApiErrorCode.SESSION_REVOKED, message, HttpStatus.UNAUTHORIZED);
  }

  static forbidden(message = 'You do not have permission to perform this action.'): AppException {
    return new AppException(ApiErrorCode.FORBIDDEN, message, HttpStatus.FORBIDDEN);
  }

  static organizationAccessDenied(
    message = 'You do not have access to this organization.',
  ): AppException {
    return new AppException(ApiErrorCode.ORGANIZATION_ACCESS_DENIED, message, HttpStatus.FORBIDDEN);
  }

  static notFound(message = 'The requested resource was not found.'): AppException {
    return new AppException(ApiErrorCode.RESOURCE_NOT_FOUND, message, HttpStatus.NOT_FOUND);
  }

  static conflict(message: string, details?: Record<string, unknown>): AppException {
    return new AppException(ApiErrorCode.RESOURCE_CONFLICT, message, HttpStatus.CONFLICT, details);
  }

  static rateLimited(message = 'Too many requests. Please try again later.'): AppException {
    return new AppException(ApiErrorCode.RATE_LIMITED, message, HttpStatus.TOO_MANY_REQUESTS);
  }

  static dependencyUnavailable(message = 'A required dependency is unavailable.'): AppException {
    return new AppException(
      ApiErrorCode.DEPENDENCY_UNAVAILABLE,
      message,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
