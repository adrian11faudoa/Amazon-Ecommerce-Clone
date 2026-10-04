/**
 * Central email normalization rule.
 *
 * Applied consistently everywhere an email is used as an identity key
 * (registration, login, password reset, verification) so that casing and
 * incidental whitespace never produce duplicate logical accounts.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
