# Security Architecture

## 1. Security Boundaries

| Boundary | Trust | Enforcement |
|---|---|---|
| Public internet ↔ Web/Mobile clients | None | TLS everywhere; CSP, standard secure headers |
| Clients ↔ Backend API | Crossing point | AuthN (token) + AuthZ (RBAC + ownership) on every non-public route |
| Backend ↔ PostgreSQL/Redis/OpenSearch | Trusted, private | VPC-private networking, no public endpoints, least-privilege DB roles |
| Backend/Workers ↔ External providers | Outbound trusted, inbound verified | Provider SDKs with least-privilege keys; inbound webhooks signature-verified |
| Admin Web ↔ Backend | Trusted operator, zero-trust API | Same AuthN/AuthZ pipeline, stricter role checks, full audit |
| Object storage | Signed access | No public write; public read only for published media via CDN |

## 2. Threats and Mitigations

| Threat | Mitigation |
|---|---|
| Authentication bypass | Centralized `AuthGuard`, short-lived signed access tokens, mandatory MFA for internal roles, rate-limited login |
| Authorization bypass / IDOR | Ownership checks resolved server-side from token claims, never from client-supplied IDs (`08-auth-architecture.md` §7); resource lookups always scoped by owner in the query itself (`WHERE ownerId = :tokenOwnerId`), not filtered after fetch |
| Privilege escalation (vertical) | Role assignment mutation restricted to PlatformAdmin, audited; role checks re-evaluated per request from the current token, not cached client state |
| Cross-seller data access (horizontal) | Every seller-scoped query filtered server-side by token `sellerOrgId` (`08-auth-architecture.md` §7) |
| Injection (SQL/NoSQL) | Prisma parameterized queries exclusively; no raw string-concatenated queries; OpenSearch queries built via the client's query DSL builder, not string interpolation |
| XSS | React/Next.js default output escaping; strict CSP; no `dangerouslySetInnerHTML` with unsanitized user content |
| CSRF | SameSite=Strict cookies for refresh token; state-changing requests require the bearer access token (not solely cookie-based), which is not automatically attached cross-site |
| SSRF | Outbound HTTP calls from the backend restricted to an explicit allowlist of provider domains; no user-supplied URL is ever fetched server-side without allowlisting (e.g., no arbitrary "import product image from URL" without domain validation) |
| Malicious file upload | Content-type + magic-byte validation, size limits, malware scanning before publish (`14-media-architecture.md`) |
| Credential stuffing / brute force | Redis-backed rate limiting per (account, IP); progressive lockout with user notification |
| Replay attacks | Idempotency keys for mutating requests; webhook signature includes timestamp checked against a tolerance window |
| API abuse / rate-limit bypass | Rate limiting keyed by authenticated actor where available, falling back to IP; multiple limit tiers (per-endpoint-class, global) |
| Secret exposure | Secrets only in the secret manager/environment, never in source control, logs, or client bundles; `.env` files excluded from VCS; CI secret scanning |
| Sensitive-data leakage | Response DTOs are explicit allowlists of fields (never `return entity` directly) so new sensitive columns cannot leak by accident |
| Webhook forgery | Every inbound webhook (Stripe, shipping, tax) requires signature verification before any state change |

## 3. Defense in Depth

Authorization is enforced at the API layer (guards) as the actual security boundary. Frontend/mobile UI hiding of controls based on role is a UX convenience only and must never be treated as a security control by any implementer — every sensitive backend route independently re-checks authorization regardless of what the client displayed.

## 4. Secure Defaults

- Deny-by-default authorization: a route with no explicit permission grant is inaccessible, not implicitly public.
- New database columns default to excluded from API response DTOs until explicitly added.
- New external outbound domains require an explicit allowlist entry, not implicit access.

## 5. Dependency & Configuration Security

- Automated dependency vulnerability scanning in CI (blocking on high/critical).
- No custom cryptography — TLS, argon2id, and provider SDKs' built-in signing/verification are used exclusively.
- Principle of least privilege for every service credential (DB role, IAM role, provider API key) scoped to only the operations that component needs.
