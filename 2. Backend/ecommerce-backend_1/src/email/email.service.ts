import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailProvider } from './email-provider.interface';
import { EMAIL_PROVIDER } from './email.constants';

/**
 * Domain-facing email service. Callers (auth flows) depend on this, not
 * on a specific provider, so swapping providers never touches domain code.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    @Inject(EMAIL_PROVIDER) private readonly provider: EmailProvider,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailVerification(to: string, verificationToken: string): Promise<void> {
    await this.dispatch({
      to,
      subject: 'Verify your email address',
      textBody: `Use this token to verify your email: ${verificationToken}\n\nThis token expires soon and can only be used once.`,
    });
  }

  async sendPasswordReset(to: string, resetToken: string): Promise<void> {
    await this.dispatch({
      to,
      subject: 'Reset your password',
      textBody: `Use this token to reset your password: ${resetToken}\n\nIf you did not request this, you can ignore this email.`,
    });
  }

  private async dispatch(message: {
    to: string;
    subject: string;
    textBody: string;
  }): Promise<void> {
    try {
      await this.provider.send(message);
    } catch (error) {
      // Delivery failures must not silently disappear, but they also must
      // not be reported to the API caller as if the token issuance itself
      // failed — the token is already valid and persisted.
      this.logger.error(`Email dispatch failed for subject="${message.subject}"`);
    }
  }
}
