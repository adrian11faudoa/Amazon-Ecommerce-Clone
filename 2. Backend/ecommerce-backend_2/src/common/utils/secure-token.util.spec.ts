import { SecureToken } from './secure-token.util';
import { normalizeEmail } from './email.util';

describe('SecureToken', () => {
  it('generates high-entropy, URL-safe tokens that differ on each call', () => {
    const a = SecureToken.generate();
    const b = SecureToken.generate();
    expect(a).not.toEqual(b);
    expect(a.length).toBeGreaterThanOrEqual(32);
    expect(a).not.toMatch(/[+/=]/); // base64url has no +, /, or padding
  });

  it('hashes deterministically so the same token always produces the same lookup key', () => {
    const token = SecureToken.generate();
    expect(SecureToken.hash(token)).toEqual(SecureToken.hash(token));
  });

  it('produces different hashes for different tokens', () => {
    expect(SecureToken.hash(SecureToken.generate())).not.toEqual(
      SecureToken.hash(SecureToken.generate()),
    );
  });

  it('never returns the raw token as its own hash', () => {
    const token = SecureToken.generate();
    expect(SecureToken.hash(token)).not.toEqual(token);
  });
});

describe('normalizeEmail', () => {
  it('lower-cases and trims addresses so casing/whitespace cannot create duplicate accounts', () => {
    expect(normalizeEmail('  User@Example.com  ')).toEqual('user@example.com');
  });

  it('is idempotent', () => {
    const once = normalizeEmail('User@Example.com');
    expect(normalizeEmail(once)).toEqual(once);
  });
});
