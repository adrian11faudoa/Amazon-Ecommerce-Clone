export interface EmailMessage {
  to: string;
  subject: string;
  textBody: string;
}

/** Provider boundary. A real SMTP/API-based provider would implement this. */
export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}
