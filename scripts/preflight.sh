#!/usr/bin/env bash
# Required before every deploy (staging and production run this in CI too).
# Three checks, no Node needed:
#   1. no em dashes anywhere in site copy, docs or workflows
#   2. one shared header and footer on every public page, legal lines present
#   3. no prohibited claims in site copy
# Then, if Node is available, the site's own lint (ESLint plus its em-dash lint).
# Run from anywhere:  bash scripts/preflight.sh
set -u
cd "$(dirname "$0")/.."
status=0
for check in check-em-dash check-chrome check-claims; do
  echo "--- $check"
  bash "scripts/$check.sh" || status=1
  echo
done
if [ "${PREFLIGHT_SKIP_LINT:-}" != "1" ] && command -v npm >/dev/null 2>&1 && [ -d site-next/node_modules ]; then
  echo "--- npm run lint (site-next)"
  (cd site-next && npm run lint) || status=1
  echo
fi
if [ "$status" -ne 0 ]; then
  echo "PREFLIGHT FAILED. Fix every line above before deploying."
  exit 1
fi
echo "PREFLIGHT PASSED."
