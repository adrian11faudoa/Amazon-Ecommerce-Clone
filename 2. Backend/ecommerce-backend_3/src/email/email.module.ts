import { Module } from '@nestjs/common';
import { ConsoleEmailProvider } from './console-email.provider';
import { EMAIL_PROVIDER } from './email.constants';
import { EmailService } from './email.service';

/**
 * Provider selection is configuration-driven (EMAIL_PROVIDER env var).
 * Only "console" is implemented in this milestone; a real SMTP/API
 * provider is a later, explicitly-scoped addition — we do not fabricate
 * one here.
 */
@Module({
  providers: [
    {
      provide: EMAIL_PROVIDER,
      useClass: ConsoleEmailProvider,
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
