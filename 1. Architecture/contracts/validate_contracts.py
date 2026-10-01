#!/usr/bin/env python3
"""
Volume 2 contract-package validation script.

Chained after /architecture/validation/validate_architecture.py (Volume 1).
Performs mechanical consistency checks specific to the Volume 2 contract
package:

1. Every document referenced by contracts/00-index.md exists on disk.
2. Every JSON Schema under contracts/schemas/ parses as valid JSON.
3. Every ADR referenced by number in the contracts/ documents resolves to
   an actual file in ../adr/.
4. Every state machine defined in 02-state-machines.md names an event
   type that also appears in the event catalog in 05-events-and-queues.md
   (or is explicitly marked as not outboxed, e.g., low-criticality Cart
   events).
5. No document contains a disallowed placeholder token.
6. Every Redis namespace prefix in 06-redis-namespace-catalog.md has a
   non-empty "Failure Behavior" cell (no namespace may be introduced
   without documented degradation).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent  # /architecture/contracts
ARCH_ROOT = ROOT.parent  # /architecture

failures = []
warnings = []


def fail(msg):
    failures.append(msg)


def warn(msg):
    warnings.append(msg)


# ---------------------------------------------------------------------------
# 1. Index completeness
# ---------------------------------------------------------------------------
index_text = (ROOT / "00-index.md").read_text(encoding="utf-8")
doc_refs = re.findall(r"(?<!/)`(\d\d-[\w\-\.]+\.md)`", index_text)
for ref in set(doc_refs):
    target = ROOT / ref
    if not target.exists():
        fail(f"00-index.md references '{ref}' which does not exist on disk.")

# ---------------------------------------------------------------------------
# 2. JSON Schemas parse
# ---------------------------------------------------------------------------
schema_dir = ROOT / "schemas"
schema_files = sorted(schema_dir.glob("*.schema.json"))
if not schema_files:
    fail("No JSON schema files found in contracts/schemas/.")
for f in schema_files:
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        if "$schema" not in data or "type" not in data:
            warn(f"{f.name} is valid JSON but missing $schema or type keys.")
    except json.JSONDecodeError as e:
        fail(f"{f.name} is not valid JSON: {e}")

# ---------------------------------------------------------------------------
# 3. ADR references resolve
# ---------------------------------------------------------------------------
adr_dir = ARCH_ROOT / "adr"
adr_numbers_existing = set()
for f in adr_dir.glob("adr-*.md"):
    m = re.match(r"adr-(\d{4})", f.name)
    if m:
        adr_numbers_existing.add(m.group(1))

all_contract_text = ""
for f in ROOT.glob("*.md"):
    all_contract_text += f.read_text(encoding="utf-8")

referenced_adrs = set(re.findall(r"ADR-(\d{4})", all_contract_text))
missing_adrs = referenced_adrs - adr_numbers_existing
if missing_adrs:
    fail(f"ADRs referenced in contracts/ but not found in ../adr/: {sorted(missing_adrs)}")

# ---------------------------------------------------------------------------
# 4. State machine events appear in the event catalog
# ---------------------------------------------------------------------------
state_machines_text = (ROOT / "02-state-machines.md").read_text(encoding="utf-8")
events_text = (ROOT / "05-events-and-queues.md").read_text(encoding="utf-8")

state_machine_events = set(re.findall(r"`([a-z_]+\.[a-z_]+\.v\d+)`", state_machines_text))
catalog_events = set(re.findall(r"`([a-z_]+\.[a-z_]+\.v\d+)`", events_text))

# Volume 1's event catalog is also a valid source (some events are defined there and
# only referenced, not redefined, in Volume 2)
v1_events_text = (ARCH_ROOT / "09-event-architecture.md").read_text(encoding="utf-8")
catalog_events |= set(re.findall(r"`([a-z_]+\.[a-z_]+\.v\d+)`", v1_events_text))

missing_from_catalog = sorted(e for e in state_machine_events if e not in catalog_events)
if missing_from_catalog:
    warn(
        "Event types referenced in 02-state-machines.md but not found in the event "
        f"catalog (05-events-and-queues.md or ../09-event-architecture.md): {missing_from_catalog}. "
        "Verify manually — some may be intentionally uncataloged low-criticality signals."
    )

# ---------------------------------------------------------------------------
# 5. Disallowed placeholder tokens
# ---------------------------------------------------------------------------
disallowed_patterns = [
    r"\bTBD\b",
    r"\bTODO\b",
    r"to be determined later",
    r"implement similarly",
    r"for brevity",
    r"left as an exercise",
    r"remaining code omitted",
]
all_files = list(ROOT.glob("*.md"))
for f in all_files:
    text = f.read_text(encoding="utf-8")
    for pat in disallowed_patterns:
        if re.search(pat, text, re.IGNORECASE):
            fail(f"{f.relative_to(ARCH_ROOT)} contains a disallowed placeholder pattern: '{pat}'")

# ---------------------------------------------------------------------------
# 6. Redis namespace failure-behavior completeness
# ---------------------------------------------------------------------------
redis_text = (ROOT / "06-redis-namespace-catalog.md").read_text(encoding="utf-8")
table_rows = [
    line for line in redis_text.splitlines()
    if line.strip().startswith("| `") and line.count("|") >= 6
]
empty_failure_cells = []
for row in table_rows:
    cells = [c.strip() for c in row.strip().strip("|").split("|")]
    if len(cells) >= 6:
        failure_cell = cells[-1]
        if not failure_cell or failure_cell in ("—", "-"):
            empty_failure_cells.append(cells[0])
if empty_failure_cells:
    fail(f"Redis namespace rows with no documented failure behavior: {empty_failure_cells}")

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
print("=" * 70)
print("VOLUME 2 CONTRACT PACKAGE VALIDATION REPORT")
print("=" * 70)
print(f"Documents checked: {len(list(ROOT.glob('*.md')))}")
print(f"Schemas checked:   {len(schema_files)}")
print()

if warnings:
    print(f"WARNINGS ({len(warnings)}):")
    for w in warnings:
        print(f"  - {w}")
    print()

if failures:
    print(f"FAILURES ({len(failures)}):")
    for fmsg in failures:
        print(f"  - {fmsg}")
    print()
    print("RESULT: FAIL")
    sys.exit(1)
else:
    print("RESULT: PASS — no blocking inconsistencies detected.")
    sys.exit(0)
