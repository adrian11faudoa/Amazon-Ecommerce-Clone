# Event & API Deprecation Log

Records every deprecated event version or API version, its replacement, and its removal date. Empty at the time this architecture package was authored — this file exists so that the first real deprecation has a place to go without inventing a new process at that time.

| Deprecated Item | Replacement | Announced | Removal Date | Status |
|---|---|---|---|---|
| _(none yet — no event or API version has been deprecated as of this package's authoring date)_ | — | — | — | — |

## Process

1. A breaking change to an event or API version is announced here on the same day the dual-publish/dual-support window begins (`05-events-and-queues.md` §3).
2. The removal date is set no earlier than 90 days from the announcement date for events, and per the API versioning policy (`../07-api-architecture.md` §1) for API versions.
3. Before the removal date, the team confirms via consumer-side metrics that no active consumer still depends on the deprecated version.
4. On removal, this table's row is updated to `status: removed` with the actual removal date — rows are never deleted, preserving a full history.
