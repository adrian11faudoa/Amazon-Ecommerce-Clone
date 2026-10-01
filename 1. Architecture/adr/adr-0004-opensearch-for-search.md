# ADR-0004: OpenSearch for Product Search

## Status
Accepted

## Context
The Master Prompt and this architecture's technology direction specify "Elasticsearch or OpenSearch" for search.

## Decision
Use **OpenSearch** as the search engine.

## Rationale
- API-compatible with Elasticsearch for the query/indexing patterns this platform needs (full-text, filters, facets, sorting — `13-search-architecture.md` §5).
- Apache 2.0 licensing avoids the licensing-model uncertainty associated with recent Elasticsearch license changes, which matters for a platform intended for long-term independent operation.
- Managed AWS OpenSearch Service aligns with the platform's AWS-oriented infrastructure direction, simplifying operations relative to self-managing either option.

## Alternatives Considered
- **Elasticsearch:** functionally similar; rejected in favor of OpenSearch primarily for licensing predictability and native AWS managed-service alignment, not due to a technical capability gap.
- **Postgres full-text search only (no dedicated search engine):** rejected as the sole solution — insufficient faceting/relevance/scale characteristics for a catalog of the platform's targeted size, though it remains the documented degraded-mode fallback (`13-search-architecture.md` §7).

## Consequences
- All search-architecture documents (`13-search-architecture.md`) and later backend implementation must use OpenSearch's client/query DSL.
- Once established, switching search engines is a significant migration (full reindex, query DSL differences) — this decision should not be revisited without a strong justification captured in a superseding ADR.
