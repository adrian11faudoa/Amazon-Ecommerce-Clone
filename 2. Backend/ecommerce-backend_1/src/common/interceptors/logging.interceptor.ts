import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestContext } from '../context/request-context';

/**
 * Structured request/response logging.
 *
 * Deliberately logs only method, path, status, duration, and correlation
 * identifiers — never bodies, headers, tokens, or query strings that may
 * carry sensitive data.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap({
        next: () => this.log(request, response, startedAt),
        error: () => this.log(request, response, startedAt),
      }),
    );
  }

  private log(request: Request, response: Response, startedAt: number): void {
    const durationMs = Date.now() - startedAt;
    const ctx = RequestContext.current();
    this.logger.log(
      JSON.stringify({
        method: request.method,
        path: request.originalUrl ?? request.url,
        statusCode: response.statusCode,
        durationMs,
        requestId: ctx?.requestId,
        correlationId: ctx?.correlationId,
        userId: ctx?.userId,
      }),
    );
  }
}
