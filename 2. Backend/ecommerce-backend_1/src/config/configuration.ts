export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  allowedOrigins: string[];
  isProduction: boolean;
}

export interface DatabaseConfig {
  url: string;
}

export interface RedisConfig {
  url: string;
}

export interface AuthConfig {
  accessTokenSecret: string;
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
  emailVerificationTtlSeconds: number;
  passwordResetTtlSeconds: number;
}

export interface RateLimitRule {
  max: number;
  windowSeconds: number;
}

export interface RateLimitConfig {
  login: RateLimitRule;
  register: RateLimitRule;
  passwordReset: RateLimitRule;
  emailVerification: RateLimitRule;
  tokenRefresh: RateLimitRule;
}

export interface ObservabilityConfig {
  logLevel: string;
  otelEnabled: boolean;
  otelExporterEndpoint?: string;
  otelServiceName: string;
}

export interface EmailConfig {
  provider: string;
  fromAddress: string;
}

export interface RootConfig {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  auth: AuthConfig;
  rateLimit: RateLimitConfig;
  observability: ObservabilityConfig;
  email: EmailConfig;
}

export default (): RootConfig => ({
  app: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    apiPrefix: process.env.API_PREFIX ?? 'api/v1',
    allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0),
    isProduction: (process.env.NODE_ENV ?? 'development') === 'production',
  },
  database: {
    url: process.env.DATABASE_URL ?? '',
  },
  redis: {
    url: process.env.REDIS_URL ?? '',
  },
  auth: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET ?? '',
    accessTokenTtlSeconds: parseInt(process.env.JWT_ACCESS_TTL_SECONDS ?? '900', 10),
    refreshTokenTtlSeconds: parseInt(process.env.JWT_REFRESH_TTL_SECONDS ?? '2592000', 10),
    emailVerificationTtlSeconds: parseInt(
      process.env.EMAIL_VERIFICATION_TTL_SECONDS ?? '86400',
      10,
    ),
    passwordResetTtlSeconds: parseInt(process.env.PASSWORD_RESET_TTL_SECONDS ?? '3600', 10),
  },
  rateLimit: {
    login: {
      max: parseInt(process.env.RATE_LIMIT_LOGIN_MAX ?? '10', 10),
      windowSeconds: parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW_SECONDS ?? '900', 10),
    },
    register: {
      max: parseInt(process.env.RATE_LIMIT_REGISTER_MAX ?? '5', 10),
      windowSeconds: parseInt(process.env.RATE_LIMIT_REGISTER_WINDOW_SECONDS ?? '3600', 10),
    },
    passwordReset: {
      max: parseInt(process.env.RATE_LIMIT_PASSWORD_RESET_MAX ?? '5', 10),
      windowSeconds: parseInt(process.env.RATE_LIMIT_PASSWORD_RESET_WINDOW_SECONDS ?? '3600', 10),
    },
    emailVerification: {
      max: parseInt(process.env.RATE_LIMIT_EMAIL_VERIFICATION_MAX ?? '5', 10),
      windowSeconds: parseInt(
        process.env.RATE_LIMIT_EMAIL_VERIFICATION_WINDOW_SECONDS ?? '3600',
        10,
      ),
    },
    tokenRefresh: {
      max: parseInt(process.env.RATE_LIMIT_TOKEN_REFRESH_MAX ?? '30', 10),
      windowSeconds: parseInt(process.env.RATE_LIMIT_TOKEN_REFRESH_WINDOW_SECONDS ?? '900', 10),
    },
  },
  observability: {
    logLevel: process.env.LOG_LEVEL ?? 'info',
    otelEnabled: (process.env.OTEL_ENABLED ?? 'false') === 'true',
    otelExporterEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    otelServiceName: process.env.OTEL_SERVICE_NAME ?? 'marketplace-backend',
  },
  email: {
    provider: process.env.EMAIL_PROVIDER ?? 'console',
    fromAddress: process.env.EMAIL_FROM_ADDRESS ?? 'no-reply@example.com',
  },
});
