import { Injectable, Logger } from '@nestjs/common';
import { EmailMessage, EmailProvider } from './email-provider.interface';

/**
 * Default development/test provider: logs the message instead of sending
 * it. This is the honest behavior when no real provider is configured —
 * it never claims a message was actually delivered externally.
 */
@Injectable()
export class ConsoleEmailProvider implements EmailProvider {
  private readonly logger = new Logger('EmailProvider(console)');

  async send(message: EmailMessage): Promise<void> {
    this.logger.log(
      `[NOT ACTUALLY SENT — console provider] to=${message.to} subject="${message.subject}"`,
    );
  }
}
