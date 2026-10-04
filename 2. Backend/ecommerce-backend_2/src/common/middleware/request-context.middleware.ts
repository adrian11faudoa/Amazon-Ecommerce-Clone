import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { RequestContext } from '../context/request-context';

const REQUEST_ID_HEADER = 'x-request-id';
const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = randomUUID();
    // Correlation ID may be propagated by an upstream caller/gateway; trust it
    // only as an opaque grouping key, never as an authorization signal.
    const incomingCorrelationId = req.header(CORRELATION_ID_HEADER);
    const correlationId =
      incomingCorrelationId && incomingCorrelationId.length <= 128
        ? incomingCorrelationId
        : randomUUID();

    res.setHeader(REQUEST_ID_HEADER, requestId);
    res.setHeader(CORRELATION_ID_HEADER, correlationId);

    const context = {
      requestId,
      correlationId,
      ipAddress: req.ip,
      userAgent: req.header('user-agent'),
    };

    RequestContext.run(context, () => next());
  }
}
