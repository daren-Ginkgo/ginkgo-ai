#!/usr/bin/env bash
# House rule: no em dashes (U+2014) anywhere in the site's copy or docs.
# Scope: the live Next.js site under site-next/ (app, components, lib, public,
# scripts), the repository docs and workflows, and this scripts/ folder.
# Out of scope: the frozen GitHub Pages rollback at the repo root (*.html,
# styles.css, script.js), node_modules, .next and the vendored shadcn CSS.
# Exit 1 with file:line for every hit so it cannot regress.
set -u
cd "$(dirname "$0")/.."

EM=$'\xe2\x80\x94'
hits=0

scan() {
  # $1 = path, rest = grep include globs
  local path="$1"; shift
  [ -e "$path" ] || return 0
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    # The lint itself and the specimen extractor spell the character out in code.
    case "$line" in
      site-next/scripts/check-em-dash.mjs:*|site-next/scripts/extract-specimens.py:*) continue ;;
    esac
    echo "  $line"
    hits=$((hits + 1))
  done < <(grep -rnH --binary-files=without-match "$@" \
      --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=vendor \
      -e "$EM" "$path" 2>/dev/null)
}

scan site-next/app        --include='*.ts' --include='*.tsx' --include='*.css' --include='*.md' --include='*.mdx' --include='*.json'
scan site-next/components --include='*.ts' --include='*.tsx' --include='*.css' --include='*.md'
scan site-next/lib        --include='*.ts' --include='*.tsx' --include='*.json' --include='*.md'
scan site-next/scripts    --include='*.mjs' --include='*.js' --include='*.py'
scan site-next/public     --include='*.txt' --include='*.json' --include='*.svg' --include='*.webmanifest'
scan site-next/README.md  --include='*.md'
scan scripts              --include='*.sh' --include='*.ps1' --include='*.md'
scan .github              --include='*.yml' --include='*.yaml' --include='*.md'
for f in README.md CLAUDE_HANDOVER.md MARKETING_SITE_MIGRATION.md; do
  scan "$f" --include='*.md'
done

if [ "$hits" -gt 0 ]; then
  echo "check-em-dash: FAIL, $hits em dash(es) found. Use a spaced en dash, a colon, a comma or a full stop."
  exit 1
fi
echo "check-em-dash: OK, no em dashes in the site source, docs or workflows."
