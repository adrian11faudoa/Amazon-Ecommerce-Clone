import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

/**
 * Password hashing boundary.
 *
 * Uses argon2id via the maintained `argon2` library — no custom
 * cryptography. Work factors are the library's vetted defaults, which are
 * appropriate for interactive login; do not weaken them to chase
 * throughput without an explicit, documented security decision.
 */
@Injectable()
export class PasswordService {
  private static readonly HASH_OPTIONS: argon2.Options & { type: typeof argon2.argon2id } = {
    type: argon2.argon2id,
    memoryCost: 19456, // ~19 MB, OWASP-recommended minimum for argon2id
    timeCost: 2,
    parallelism: 1,
  };

  async hash(plainTextPassword: string): Promise<string> {
    return argon2.hash(plainTextPassword, PasswordService.HASH_OPTIONS);
  }

  async verify(hash: string, plainTextPassword: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plainTextPassword);
    } catch {
      // Malformed hash or verification error — treat as a non-match rather
      // than throwing, so callers have one simple boolean success path.
      return false;
    }
  }

  /**
   * Minimum viable password policy for this milestone. Intentionally does
   * not disclose granular rule failures beyond what's needed for UX, to
   * avoid turning this into a policy-probing oracle.
   */
  static readonly MIN_LENGTH = 10;
  static readonly MAX_LENGTH = 128;

  meetsPolicy(plainTextPassword: string): boolean {
    return (
      plainTextPassword.length >= PasswordService.MIN_LENGTH &&
      plainTextPassword.length <= PasswordService.MAX_LENGTH
    );
  }
}
