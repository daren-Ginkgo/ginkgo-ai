#!/usr/bin/env bash
# Header, footer and legal wording must be identical on every public page.
# The site is Next.js, so the chrome is not duplicated per page: every public
# route renders the shared <SiteHeader /> and <SiteFooter /> from
# site-next/components/marketing.tsx (or <CapabilityPage />, which renders both).
# This script proves (1) there is exactly one definition of each, (2) every
# public page uses them, and (3) the one footer carries the required legal lines.
# The owner-only /funnel dashboard deliberately has its own header and is exempt.
set -u
cd "$(dirname "$0")/.."
SITE=site-next
fail=0

say_fail() { echo "  FAIL: $*"; fail=1; }

# 1. One header, one footer, defined once.
for fn in SiteHeader SiteFooter; do
  n=$(grep -rl --include='*.tsx' "export function $fn" "$SITE/components" "$SITE/app" | wc -l)
  [ "$n" -eq 1 ] || say_fail "$fn is defined $n times (expected exactly one, in components/marketing.tsx)"
done

# 2. Every public page renders both.
EXEMPT="$SITE/app/funnel/page.tsx"
while IFS= read -r page; do
  [ "$page" = "$EXEMPT" ] && continue
  if grep -q "<CapabilityPage" "$page"; then continue; fi
  grep -q "<SiteHeader" "$page" || say_fail "$page does not render <SiteHeader />"
  grep -q "<SiteFooter" "$page" || say_fail "$page does not render <SiteFooter />"
done < <(find "$SITE/app" -name 'page.tsx' | sort)

# 3. The footer carries the legal wording, once, in components/marketing.tsx.
FOOTER="$SITE/components/marketing.tsx"
for needle in \
  "The Advice Engine Ltd" \
  "company number 17404907" \
  "it supplies software, not advice" \
  "does not provide financial advice, approve financial promotions or certify compliance" \
  "Quilter is a trade mark of its owner" \
  "Demonstrations and specimens are fictitious"; do
  grep -qF "$needle" "$FOOTER" || say_fail "footer is missing: \"$needle\""
done

# 4. The company number in the structured data matches the footer.
grep -qF '"17404907"' "$SITE/app/layout.tsx" || say_fail "layout.tsx JSON-LD does not carry company number 17404907"

if [ "$fail" -ne 0 ]; then
  echo "check-chrome: FAIL"
  exit 1
fi
pages=$(find "$SITE/app" -name 'page.tsx' | wc -l)
echo "check-chrome: OK, one header and one footer, rendered on $((pages - 1)) public pages, legal lines and company number 17404907 present."
