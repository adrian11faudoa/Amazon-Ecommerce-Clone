import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    service = new PasswordService();
  });

  it('hashes a password and verifies the correct plaintext against it', async () => {
    const hash = await service.hash('correct-horse-battery');
    expect(hash).not.toEqual('correct-horse-battery');
    await expect(service.verify(hash, 'correct-horse-battery')).resolves.toBe(true);
  });

  it('rejects an incorrect plaintext against a valid hash', async () => {
    const hash = await service.hash('correct-horse-battery');
    await expect(service.verify(hash, 'wrong-password')).resolves.toBe(false);
  });

  it('returns false rather than throwing for a malformed hash', async () => {
    await expect(service.verify('not-a-real-hash', 'anything')).resolves.toBe(false);
  });

  it('enforces the minimum password length', () => {
    expect(service.meetsPolicy('short')).toBe(false);
    expect(service.meetsPolicy('longenoughpassword')).toBe(true);
  });

  it('enforces the maximum password length', () => {
    expect(service.meetsPolicy('a'.repeat(129))).toBe(false);
    expect(service.meetsPolicy('a'.repeat(128))).toBe(true);
  });

  it('produces a different hash each time even for the same input (random salt)', async () => {
    const hashA = await service.hash('same-password-value');
    const hashB = await service.hash('same-password-value');
    expect(hashA).not.toEqual(hashB);
  });
});
