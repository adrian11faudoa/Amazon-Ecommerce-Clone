# Client Architecture

## 1. Web Application (Next.js)

| Concern | Decision |
|---|---|
| Authentication | Access token in memory (JS runtime state), refresh token in HttpOnly cookie (`08-auth-architecture.md` §3) |
| API communication | TanStack Query for all server-state fetching/mutation; typed API client generated from the OpenAPI contract |
| Server state | TanStack Query cache, keyed by resource + params, invalidated on relevant mutations |
| Local/UI state | Zustand for client-only state (UI toggles, multi-step form progress) — never used for data that also lives server-side |
| Forms | React Hook Form + Zod schemas mirroring backend DTOs, so client-side validation errors match server error `code`s |
| Rendering | Next.js App Router: server components for SEO-critical, mostly-static pages (product detail, category browse); client components for interactive flows (cart, checkout, seller portal dashboards) |
| Realtime | WebSocket/SSE client for order-status/notification feed, notify-then-refetch pattern (never treated as authoritative state by itself) |
| Caching | HTTP-level caching for public catalog pages at the CDN/edge where safe (published, non-personalized content only); TanStack Query cache for personalized/authenticated data |
| Error handling | Centralized API-client error mapping from the canonical error `code` (`07-api-architecture.md` §6) to user-facing messaging; network/5xx errors show retry affordances, never silent failure |
| Accessibility | WCAG 2.1 AA target: semantic HTML, keyboard navigation, ARIA labeling on custom components (shadcn/ui base helps here), color-contrast-checked design tokens |
| Analytics | Client-side event capture (page views, funnel steps) sent to the Analytics ingestion endpoint, never conflated with business-transactional API calls |
| Security boundary | Never trusts its own authorization-based UI hiding as a security control (`17-security-architecture.md` §3); all sensitive actions re-validated server-side |

## 2. Mobile Applications (React Native/Expo)

| Concern | Decision |
|---|---|
| Authentication | Tokens in Expo SecureStore (device keystore-backed) |
| API communication | Same typed API client / OpenAPI contract as web, shared where practical |
| Offline strategy | Read-through cache for catalog browsing (last-known product/category data shown with a "may be outdated" affordance when offline); writes (cart/checkout) require connectivity — never queued-and-replayed blindly for financially significant actions, to avoid stale-price/stale-inventory submission |
| Network resilience | Automatic retry with backoff for idempotent reads; mutations surface explicit failure rather than silent local-only success |
| Push notifications | FCM/APNs device token registered post-login, tied to `User.id` server-side |
| Deep links | Universal/App Links routing directly to product/order detail screens, validated against the same authorization rules as the equivalent API route |
| Device permissions | Requested contextually (camera for review photos, notifications) with clear purpose strings, never requested en masse at first launch |
| Lifecycle | Background/foreground transitions trigger a lightweight session-validity check (not a full re-login) before resuming sensitive flows (checkout) |
| Accessibility | Platform accessibility APIs (VoiceOver/TalkBack) supported via RN's accessibility props |
| iOS/Android parity | Shared business logic/API layer; platform-specific UI only where native conventions materially differ (navigation patterns, permission dialogs) |

## 3. Administrative Interface

| Concern | Decision |
|---|---|
| Authentication | Same token model as Web, shorter absolute session lifetime, MFA mandatory |
| Authorization-aware UI | Renders only actions the current role's permission set includes, purely for UX clarity — every action still independently authorized server-side |
| Audit visibility | Every admin action's outcome is visible in-context (e.g., a refund action shows the resulting `AuditLogEntry` reference) |

## 4. Client vs. Server Authority

| Decision | Belongs To |
|---|---|
| Price shown before checkout | Client displays a cached/last-known value; server (Pricing domain, re-read at checkout) is authoritative |
| Inventory availability shown while browsing | Client displays a derived Search-index value; server (Inventory domain) is authoritative and re-checked at checkout |
| Form validation | Client validates for UX responsiveness; server re-validates identically and is authoritative |
| Authorization to perform an action | Client hides/disables controls for UX; server is the sole authority |
| Order/payment/fulfillment status | Client subscribes to realtime updates for freshness; server's projection (`04-domain-ownership-matrix.md`) is authoritative |
