#!/usr/bin/env bash
# Claim audit (build plan 15 Sep 2026, section 1.4 and the hard rules).
# HARD terms fail the run: they may never appear in site copy.
#   "fully compliant", "compliant report(s)", a firm described as Chartered,
#   Q Connect in any spelling, and competitor names (Augora, Marloo, Saturn,
#   Aveni, Otter). No exceptions.
# REVIEW terms are printed for a human to judge and do not fail the run:
#   "Chartered" (allowed for Daren personally, never for a firm), "API",
#   "integrat" (allowed for Microsoft 365, never for Quilter systems),
#   approval wording about Quilter, "audit-ready/proof", "zero retention".
set -u
cd "$(dirname "$0")/.."
SITE=site-next
# Site copy only. README.md documents these rules and therefore quotes the
# terms, so it is checked by check-em-dash.sh but not here.
SCOPE=("$SITE/app" "$SITE/components" "$SITE/lib")
# Vendored UI, API route handlers, the FCA/Anthropic clients and the storage
# layer are code, not copy.
EXCL=(--exclude-dir=ui --exclude-dir=api --exclude-dir=node_modules --exclude-dir=.next
      --exclude=fca.ts --exclude=chat.ts --exclude=azure-storage.ts --exclude=azure-auth.ts)

hard=0
echo "== Hard-rule terms (must be zero) =="
while IFS= read -r line; do
  [ -z "$line" ] && continue
  file=${line%%:*}
  text=${line#*:*:}
  echo "  $line"; hard=$((hard + 1))
done < <(grep -rniE "${EXCL[@]}" --include='*.tsx' --include='*.ts' --include='*.json' --include='*.md' \
  -e 'fully compliant' -e 'compliant reports?' -e 'chartered (firm|practice|business|company|planning firm)' \
  -e 'ginkgo[^.]{0,40}chartered' -e 'advice engine[^.]{0,40}chartered' \
  -e 'q[ -]?connect' -e '\baugora\b' -e '\bmarloo\b' -e '\bsaturn\b' -e '\baveni\b' -e '\botter\b' \
  "${SCOPE[@]}" 2>/dev/null)
[ "$hard" -eq 0 ] && echo "  none"

echo
echo "== Review terms (a human decides; these do not fail the run) =="
# Copy-bearing files only: pages and components, the docs, and the two lib files
# that hold prose (the chat knowledge and the capability copy). Lines that are
# route paths or fetch calls are code and are filtered out.
grep -rniE "${EXCL[@]}" --include='*.tsx' --include='*.md' \
  -e '\bchartered\b' -e '\bAPIs?\b' -e 'integrat' -e 'quilter[- ]approved' -e 'approved by quilter' \
  -e 'audit[- ](ready|proof)' -e 'due[- ]diligence[- ]ready' -e 'zero[- ]retention' -e 'not retained' \
  "${SCOPE[@]}" "$SITE/lib/chat-knowledge.ts" "$SITE/lib/capabilities.ts" 2>/dev/null \
  | grep -vE 'fetch\(|sendBeacon|"/api|`/api|/api/' | awk '!seen[$0]++' | sed 's/^/  /' || true

echo
if [ "$hard" -gt 0 ]; then
  echo "check-claims: FAIL, $hard hard-rule hit(s)."
  exit 1
fi
echo "check-claims: OK, no hard-rule terms in site copy."
