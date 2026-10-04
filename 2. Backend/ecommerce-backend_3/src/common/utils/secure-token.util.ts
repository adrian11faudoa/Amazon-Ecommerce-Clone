import { createHash, randomBytes } from 'crypto';

/**
 * Utility for opaque, high-entropy tokens (email verification, password
 * reset, refresh tokens).
 *
 * We only ever persist the SHA-256 hash of the token, never the raw value.
 * This means a database read (backup, replica, leaked dump) does not
 * disclose usable bearer tokens.
 */
export class SecureToken {
  private static readonly BYTE_LENGTH = 32; // 256 bits of entropy

  /** Generates a new URL-safe opaque token. Return this to the client once. */
  static generate(): string {
    return randomBytes(SecureToken.BYTE_LENGTH).toString('base64url');
  }

  /** Deterministic hash of a token for storage/lookup. Never reversible. */
  static hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
