import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { RequestContext } from '../../common/context/request-context';

/**
 * Structured JSON logging via pino.
 *
 * Redaction: request/response bodies are never logged wholesale by this
 * module (see LoggingInterceptor, which logs only method/path/status/
 * duration). The `redact` list below is a defense-in-depth backstop in
 * case a raw header or body is ever passed to the logger directly.
 */
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('observability.logLevel') ?? 'info',
          autoLogging: false, // request logging is handled explicitly by LoggingInterceptor
          redact: {
            paths: [
              'req.headers.authorization',
              'req.headers.cookie',
              '*.password',
              '*.passwordHash',
              '*.token',
              '*.accessToken',
              '*.refreshToken',
            ],
            censor: '[REDACTED]',
          },
          formatters: {
            log: (object: Record<string, unknown>) => {
              const ctx = RequestContext.current();
              return {
                ...object,
                requestId: ctx?.requestId,
                correlationId: ctx?.correlationId,
                service: configService.get<string>('observability.otelServiceName'),
                environment: configService.get<string>('app.nodeEnv'),
              };
            },
          },
        },
      }),
    }),
  ],
  exports: [PinoLoggerModule],
})
export class ObservabilityLoggerModule {}
