# ADR-0006: JWT Access Tokens + Rotated Opaque Refresh Tokens

## Status
Accepted

## Context
The platform needs a session model that scales statelessly across horizontally-scaled API replicas (`21-scalability-architecture.md`) while supporting immediate revocation for security incidents.

## Decision
Short-lived (15 min) signed JWT access tokens for stateless verification, combined with long-lived, rotated-on-use opaque refresh tokens stored hashed server-side, plus a short-TTL Redis revocation cache for near-immediate access-token invalidation (`08-auth-architecture.md` §2).

## Rationale
- Pure stateless JWT-only sessions cannot be revoked before natural expiry without a server-side check on every request (defeating statelessness) or an unacceptably long revocation-exposure window; the hybrid model bounds exposure to the Redis-cache-miss case (a few seconds) while keeping the common-path check cheap.
- Refresh-token rotation-with-reuse-detection (`08-auth-architecture.md` §2) allows detecting and responding to token theft.

## Alternatives Considered
- **Server-side session store checked on every request (no JWT):** rejected as the default — adds a mandatory Redis/DB round-trip to every authenticated request, working against the stateless horizontal-scaling goal (`21-scalability-architecture.md` §2), though the platform still performs this exact check on refresh and on the revocation-cache path, so the tradeoff is deliberate, not avoided entirely.
- **Long-lived JWTs with no refresh mechanism:** rejected — unacceptably long exposure window on token theft, no clean revocation story.

## Consequences
- Access-token lifetime (15 min) is a fixed upper bound on "worst case" revocation delay when the Redis revocation cache is unavailable (`08-auth-architecture.md` §2, `20-reliability-architecture.md` fail-open note) — this tradeoff is explicit and accepted, not accidental.
