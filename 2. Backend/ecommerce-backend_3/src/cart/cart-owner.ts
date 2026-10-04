export type CartOwner = { customerId: string } | { anonymousToken: string };

export function isCustomerOwner(owner: CartOwner): owner is { customerId: string } {
  return 'customerId' in owner;
}
