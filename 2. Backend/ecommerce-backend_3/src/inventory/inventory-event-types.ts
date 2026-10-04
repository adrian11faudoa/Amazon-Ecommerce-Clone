export enum InventoryEventType {
  INVENTORY_CREATED = 'inventory.item.created',
  INVENTORY_ADJUSTED = 'inventory.item.adjusted',
  INVENTORY_RESERVED = 'inventory.reservation.created',
  INVENTORY_RESERVATION_RELEASED = 'inventory.reservation.released',
  INVENTORY_RESERVATION_EXPIRED = 'inventory.reservation.expired',
  INVENTORY_RESERVATION_CONSUMED = 'inventory.reservation.consumed',
  INVENTORY_RECONCILED = 'inventory.reconciled',
}
