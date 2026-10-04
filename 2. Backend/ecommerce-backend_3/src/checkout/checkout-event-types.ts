export enum CheckoutEventType {
  CHECKOUT_CREATED = 'checkout.created',
  CHECKOUT_VALIDATION_FAILED = 'checkout.validation_failed',
  CHECKOUT_READY_FOR_PAYMENT = 'checkout.ready_for_payment',
  CHECKOUT_CANCELLED = 'checkout.cancelled',
  CHECKOUT_EXPIRED = 'checkout.expired',
}
