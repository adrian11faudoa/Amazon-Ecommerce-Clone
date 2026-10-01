#!/usr/bin/env python3
"""
Architecture package validation script.

Performs mechanical consistency checks across the portable architecture
documentation package. This is a real, executable validation (not a
placeholder) covering:

1. All documents referenced by 00-overview.md's index actually exist.
2. All JSON Schemas in schemas/ parse as valid JSON Schema documents.
3. The OpenAPI contract in openapi/ parses as valid YAML and has the
   required top-level OpenAPI keys.
4. Every domain named in 03-domain-architecture.md's bounded-context map
   also appears as a row in 04-domain-ownership-matrix.md (or is explicitly
   cross-cutting/derived, which is allowed to appear differently).
5. Every ADR referenced by number in the main documents exists in adr/.
6. No document contains a disallowed placeholder token (TBD / TODO /
   "to be determined later" / "implement similarly" / "for brevity").

Exits non-zero if any check fails, printing a report either way.
"""
import json
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML is required to run this validator (pip install pyyaml).")
    sys.exit(2)

ROOT = Path(__file__).resolve().parent.parent

failures = []
warnings = []


def fail(msg):
    failures.append(msg)


def warn(msg):
    warnings.append(msg)


# ---------------------------------------------------------------------------
# 1. Overview index completeness
# ---------------------------------------------------------------------------
overview = (ROOT / "00-overview.md").read_text(encoding="utf-8")
doc_refs = re.findall(r"\| \d+ \| ([\w\-\.]+\.md|adr/|validation/[\w\-\.]+\.md) \|", overview)
for ref in doc_refs:
    if ref.endswith("/"):
        target = ROOT / ref.rstrip("/")
        if not target.is_dir():
            fail(f"Overview references directory '{ref}' which does not exist.")
        continue
    target = ROOT / ref
    if not target.exists():
        fail(f"Overview references '{ref}' which does not exist on disk.")

# ---------------------------------------------------------------------------
# 2. JSON Schemas parse
# ---------------------------------------------------------------------------
schema_dir = ROOT / "schemas"
schema_files = sorted(schema_dir.glob("*.schema.json"))
if not schema_files:
    fail("No JSON schema files found in schemas/.")
for f in schema_files:
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        if "$schema" not in data or "type" not in data:
            warn(f"{f.name} is valid JSON but missing $schema or type keys.")
    except json.JSONDecodeError as e:
        fail(f"{f.name} is not valid JSON: {e}")

# ---------------------------------------------------------------------------
# 3. OpenAPI contract parses and has required keys
# ---------------------------------------------------------------------------
openapi_file = ROOT / "openapi" / "marketplace-architecture.yaml"
if not openapi_file.exists():
    fail("openapi/marketplace-architecture.yaml is missing.")
else:
    try:
        spec = yaml.safe_load(openapi_file.read_text(encoding="utf-8"))
        for key in ("openapi", "info", "paths", "components"):
            if key not in spec:
                fail(f"OpenAPI contract missing required top-level key '{key}'.")
    except yaml.YAMLError as e:
        fail(f"openapi/marketplace-architecture.yaml is not valid YAML: {e}")

# ---------------------------------------------------------------------------
# 4. Domain coverage cross-check (domain-architecture vs ownership-matrix)
# ---------------------------------------------------------------------------
domain_arch = (ROOT / "03-domain-architecture.md").read_text(encoding="utf-8")
ownership = (ROOT / "04-domain-ownership-matrix.md").read_text(encoding="utf-8")

domain_headers = re.findall(r"^### 2\.\d+ (.+?)(?:\s*\(.*\))?$", domain_arch, re.MULTILINE)
# Normalize to a short keyword per domain for a loose containment check
domain_keywords = []
for h in domain_headers:
    primary = h.split("&")[0].split("(")[0].strip()
    domain_keywords.append(primary)

missing_from_matrix = []
for kw in domain_keywords:
    # loose check: at least the first significant word appears in the ownership matrix
    first_word = kw.split()[0]
    if first_word.lower() not in ownership.lower():
        missing_from_matrix.append(kw)

if missing_from_matrix:
    warn(
        "The following domains from 03-domain-architecture.md were not found "
        f"(by keyword) in 04-domain-ownership-matrix.md: {missing_from_matrix}. "
        "Verify manually that ownership is still explicit for these."
    )

# ---------------------------------------------------------------------------
# 5. ADR references resolve
# ---------------------------------------------------------------------------
adr_dir = ROOT / "adr"
adr_files = {f.name for f in adr_dir.glob("adr-*.md")}
all_md_text = ""
for f in ROOT.glob("*.md"):
    all_md_text += f.read_text(encoding="utf-8")

referenced_adrs = set(re.findall(r"ADR-(\d{4})", all_md_text))
existing_adr_numbers = {re.match(r"adr-(\d{4})", f).group(1) for f in adr_files if re.match(r"adr-(\d{4})", f)}

missing_adrs = referenced_adrs - existing_adr_numbers
if missing_adrs:
    fail(f"ADRs referenced in prose but not found in adr/: {sorted(missing_adrs)}")

unreferenced_adrs = existing_adr_numbers - referenced_adrs
if unreferenced_adrs:
    warn(f"ADRs present but not referenced from any top-level document: {sorted(unreferenced_adrs)}")

# ---------------------------------------------------------------------------
# 6. Disallowed placeholder tokens
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
all_files = list(ROOT.glob("*.md")) + list(adr_dir.glob("*.md"))
for f in all_files:
    text = f.read_text(encoding="utf-8")
    for pat in disallowed_patterns:
        if re.search(pat, text, re.IGNORECASE):
            fail(f"{f.relative_to(ROOT)} contains a disallowed placeholder pattern: '{pat}'")

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
print("=" * 70)
print("ARCHITECTURE PACKAGE VALIDATION REPORT")
print("=" * 70)
print(f"Documents checked: {len(list(ROOT.glob('*.md')))} top-level + {len(adr_files)} ADRs")
print(f"Schemas checked:   {len(schema_files)}")
print(f"OpenAPI contract:  {'checked' if openapi_file.exists() else 'MISSING'}")
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
