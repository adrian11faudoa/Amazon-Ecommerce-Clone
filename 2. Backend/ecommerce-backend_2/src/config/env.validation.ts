import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

/**
 * Canonical, validated shape of process.env for this service.
 *
 * The application MUST fail to boot if required production configuration
 * is missing or malformed. We never fall back to insecure defaults for
 * secrets in production.
 */
export class EnvironmentVariables {
  @IsIn(['development', 'test', 'staging', 'production'])
  NODE_ENV: string = 'development';

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3000;

  @IsString()
  @MinLength(1)
  API_PREFIX: string = 'api/v1';

  @IsString()
  ALLOWED_ORIGINS: string = '';

  @IsString()
  @MinLength(1)
  DATABASE_URL!: string;

  @IsString()
  @MinLength(1)
  REDIS_URL!: string;

  @IsString()
  @MinLength(32, {
    message: 'JWT_ACCESS_SECRET must be at least 32 characters long',
  })
  JWT_ACCESS_SECRET!: string;

  @IsInt()
  @Min(60)
  JWT_ACCESS_TTL_SECONDS: number = 900;

  @IsInt()
  @Min(60)
  JWT_REFRESH_TTL_SECONDS: number = 2592000;

  @IsInt()
  @Min(60)
  EMAIL_VERIFICATION_TTL_SECONDS: number = 86400;

  @IsInt()
  @Min(60)
  PASSWORD_RESET_TTL_SECONDS: number = 3600;

  @IsInt()
  @Min(1)
  RATE_LIMIT_LOGIN_MAX: number = 10;

  @IsInt()
  @Min(1)
  RATE_LIMIT_LOGIN_WINDOW_SECONDS: number = 900;

  @IsInt()
  @Min(1)
  RATE_LIMIT_REGISTER_MAX: number = 5;

  @IsInt()
  @Min(1)
  RATE_LIMIT_REGISTER_WINDOW_SECONDS: number = 3600;

  @IsInt()
  @Min(1)
  RATE_LIMIT_PASSWORD_RESET_MAX: number = 5;

  @IsInt()
  @Min(1)
  RATE_LIMIT_PASSWORD_RESET_WINDOW_SECONDS: number = 3600;

  @IsInt()
  @Min(1)
  RATE_LIMIT_EMAIL_VERIFICATION_MAX: number = 5;

  @IsInt()
  @Min(1)
  RATE_LIMIT_EMAIL_VERIFICATION_WINDOW_SECONDS: number = 3600;

  @IsInt()
  @Min(1)
  RATE_LIMIT_TOKEN_REFRESH_MAX: number = 30;

  @IsInt()
  @Min(1)
  RATE_LIMIT_TOKEN_REFRESH_WINDOW_SECONDS: number = 900;

  @IsIn(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
  LOG_LEVEL: string = 'info';

  @IsOptional()
  @IsIn(['true', 'false'])
  OTEL_ENABLED: string = 'false';

  @IsOptional()
  @IsUrl({ require_tld: false })
  OTEL_EXPORTER_OTLP_ENDPOINT?: string;

  @IsOptional()
  @IsString()
  OTEL_SERVICE_NAME: string = 'marketplace-backend';

  @IsIn(['console', 'smtp'])
  EMAIL_PROVIDER: string = 'console';

  @IsString()
  EMAIL_FROM_ADDRESS: string = 'no-reply@example.com';

  // -------------------------------------------------------------------
  // Object storage (Volume 2 — media)
  // -------------------------------------------------------------------

  @IsIn(['local', 's3'])
  STORAGE_PROVIDER: string = 'local';

  @IsOptional()
  @IsString()
  STORAGE_BUCKET?: string;

  @IsOptional()
  @IsString()
  STORAGE_REGION?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  STORAGE_ENDPOINT?: string;

  @IsInt()
  @Min(1)
  MEDIA_MAX_UPLOAD_BYTES: number = 20_000_000;

  @IsInt()
  @Min(1)
  MEDIA_UPLOAD_TTL_SECONDS: number = 900;

  @IsString()
  MEDIA_ALLOWED_CONTENT_TYPES: string = 'image/jpeg,image/png,image/webp,video/mp4';
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .join('; ');
    throw new Error(`Invalid environment configuration: ${messages}`);
  }

  if (
    validatedConfig.NODE_ENV === 'production' &&
    validatedConfig.JWT_ACCESS_SECRET.startsWith('CHANGE_ME')
  ) {
    throw new Error(
      'Refusing to start in production with a placeholder JWT_ACCESS_SECRET. Set a real secret.',
    );
  }

  if (validatedConfig.STORAGE_PROVIDER === 's3' && !validatedConfig.STORAGE_BUCKET) {
    throw new Error('STORAGE_BUCKET is required when STORAGE_PROVIDER=s3.');
  }

  return validatedConfig;
}
