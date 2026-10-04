import 'reflect-metadata';
import { initializeTracing } from './observability/tracing/tracing';

async function bootstrap(): Promise<void> {
  // Must run before any Nest/HTTP modules are imported so auto-instrumentation
  // can patch them at load time.
  await initializeTracing();

  const { NestFactory } = await import('@nestjs/core');
  const { ValidationPipe } = await import('@nestjs/common');
  const { ConfigService } = await import('@nestjs/config');
  const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
  const helmet = (await import('helmet')).default;
  const { Logger } = await import('nestjs-pino');
  const { AppModule } = await import('./app.module');
  const { PrismaService } = await import('./infrastructure/prisma/prisma.service');

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger));

  const isProduction = configService.get<boolean>('app.isProduction');
  const allowedOrigins = configService.get<string[]>('app.allowedOrigins') ?? [];

  app.use(
    helmet({
      // Adjust to serve API responses only; no inline HTML is rendered here.
      contentSecurityPolicy: isProduction ? undefined : false,
    }),
  );

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // Validation failures surface as VALIDATION_FAILED via the global
      // exception filter (see HttpExceptionFilter.extractValidationMessage).
    }),
  );

  const apiPrefix = configService.get<string>('app.apiPrefix') ?? 'api/v1';
  app.setGlobalPrefix(apiPrefix, { exclude: ['health/live', 'health/ready'] });

  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Marketplace Backend — Identity & Access Foundation')
      .setDescription('Volume 1: backend foundation, authentication, sessions, and authorization.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableShutdownHooks();

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Fatal error during application bootstrap:', error);
  process.exit(1);
});
