/**
 * Exact monetary helpers. Amounts are always integer minor units (e.g.
 * cents for USD) stored as BigInt — never binary floating point — per
 * the PRICING FOUNDATION requirement.
 */
export const SUPPORTED_CURRENCIES = new Set(['USD', 'EUR', 'GBP', 'CAD', 'MXN', 'JPY']);

export function isValidCurrency(currency: string): boolean {
  return SUPPORTED_CURRENCIES.has(currency.toUpperCase());
}

export function isNonNegativeMinorUnits(amount: bigint): boolean {
  return amount >= 0n;
}
