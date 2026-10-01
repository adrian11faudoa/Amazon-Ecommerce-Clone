# Notification Contract (Detail)

Extends `../15-notification-architecture.md` with quiet-hours, localization fallback, and provider-failure isolation made explicit and testable.

## 1. Notification Model (Fields)

| Field | Description |
|---|---|
| `NotificationEvent` (not persisted — the in-memory representation the Notification service builds from a consumed domain event) | `{ eventType, userId, category, templateData }` |
| `recipient` | Resolved at send time from `User`/`CustomerProfile` contact info — never carried in the domain event itself (`05-events-and-queues.md` §2 PII rule) |
| `channel` | `EMAIL \| SMS \| PUSH \| IN_APP` |
| `templateId` | `{category}.{eventType}.{locale}`, e.g. `order_updates.order_created.en-US` |
| `deliveryState` | `QUEUED → SENT → DELIVERED (if the provider reports it) | FAILED` |

## 2. Quiet Hours

- Applies only to non-critical categories (`marketing`, and any `order_updates` sub-category the platform designates as non-urgent, e.g., a "your item is back in stock" ping — never to `security_alerts` or transactional confirmations like payment/shipment updates, which are time-sensitive by nature and always send immediately).
- Quiet-hours window is a per-user preference (default: no quiet hours configured, i.e., feature is opt-in) stored alongside `NotificationPreference`; a job queued during quiet hours for an eligible category is delayed (BullMQ's built-in delayed-job scheduling) to the window's end rather than dropped.

## 3. Localization Fallback

Resolution order: `User`'s explicit locale preference → `CustomerProfile.locale` (if set from browser/device signal at signup) → platform default locale (`en-US`). If no template exists for the resolved locale, fall back to the platform default locale's template rather than failing the send — a missing-translation gap must never block a security-critical notification (e.g., password reset) from being delivered in *some* readable language.

## 4. Preference Evaluation Order

1. Is this category one that cannot be disabled (`security_alerts`, order/payment/shipment critical transactional categories per `../15-notification-architecture.md` §3)? If yes → always send via the mandatory always-on channel (email), regardless of stored preference.
2. Otherwise, check `NotificationPreference(userId, channel, category)`. Default (no row present) is **enabled** for transactional categories, **disabled** for `marketing` (opt-in), consistent with `../18-privacy-architecture.md` §5.
3. If disabled, no job is enqueued for that channel (but other enabled channels for the same event still proceed independently).

## 5. Provider Failure Isolation (Explicit Test Boundary)

The following must be demonstrable (and is a required item in `20-architecture-test-contract.md`): killing/blackholing the email provider mid-test still allows `POST /checkout-sessions/{id}/complete` to return `201` and `Order.status=PLACED` — the notification job fails and retries independently, with zero coupling back into the checkout request/response cycle. This is the concrete, testable form of `../15-notification-architecture.md` §5's "provider failure never blocks the originating transactional workflow."

## 6. Deduplication (Restated with the Concrete Key)

Dedup key `(eventId, channel)` against `NotificationLog`'s unique constraint (`../15-notification-architecture.md` §5) — this document adds that the check happens **before** the job is enqueued (in the Notification service's event-consumption step, not just inside the worker), so a redelivered domain event never even creates a duplicate queue job, reducing unnecessary queue churn on top of the correctness guarantee.

## 7. Recipient Address Changes Mid-Flight

If a `User` changes their email/phone between the time an event is consumed and the time the job executes (a narrow race), the job resolves the recipient **at execution time**, not at enqueue time — the job payload carries `userId`, never a denormalized snapshot of the address, so the notification always goes to the currently-correct address.
