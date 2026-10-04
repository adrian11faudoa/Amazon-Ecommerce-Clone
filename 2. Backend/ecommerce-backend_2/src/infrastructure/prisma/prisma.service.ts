import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * Single managed Prisma client for the process lifetime.
 *
 * Nothing else in the codebase should call `new PrismaClient()` — always
 * inject this service, so connection lifecycle, logging, and shutdown are
 * handled in one place.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('database.url'),
        },
      },
      log: [
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).$on('warn', (event: { message: string }) => {
      this.logger.warn(event.message);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).$on('error', (_event: { message: string }) => {
      // Never log raw connection strings; Prisma error events do not
      // include credentials, but we still avoid echoing arbitrary content.
      this.logger.error('Database error event received');
    });

    try {
      await this.$connect();
      this.logger.log('Database connection established.');
    } catch (error) {
      this.logger.error('Failed to establish database connection at startup.');
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /** Enables Nest's shutdown hooks to disconnect Prisma cleanly on SIGTERM/SIGINT. */
  async enableShutdownHooks(app: INestApplication): Promise<void> {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
