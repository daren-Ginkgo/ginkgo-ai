# theadviceengine.ai

The public website for **The Advice Engine**, evidence-led advice drafting software for UK
financial advice firms. The site and this repository are owned and operated by
**The Advice Engine Ltd**, a company registered in England and Wales, company number 17404907.
The Advice Engine Ltd supplies software, not advice.

## What is in this repository

| Path | What it is |
| --- | --- |
| `site-next/` | The live site. A Next.js 16 application (Node 22, `output: "standalone"`) served from Azure App Service. Branch `new-marketing-site`. |
| `scripts/` | The preflight checks that run before every deploy (see below). |
| `.github/workflows/` | The two deploy workflows: staging and production. |
| `*.html`, `styles.css`, `script.js`, `assets/` at the root | The retired static site (August 2026), kept frozen as the rollback route. Not served, not edited. |

Header, footer and legal wording live in one place, `site-next/components/marketing.tsx`, and
every public page renders them. Change them there and nowhere else.

## How to deploy

- **Staging** deploys automatically on every push to `new-marketing-site` that touches
  `site-next/**`. It is the review surface.
- **Production** deploys only when a person runs the workflow
  `deploy-marketing-production.yml` (Actions tab, or `gh workflow run`). It builds the same
  branch. Nobody promotes to production without the site owner's say-so.
- Both workflows run the preflight checks first and stop if any check fails.
- A green deploy can serve stale content for a minute or two. Verify by looking for the new
  copy, not the workflow tick.
- Removing a file from `site-next/public/` does not unpublish it, because the deploy never
  cleans the web root. Close a withdrawn URL with a permanent redirect in
  `site-next/next.config.ts`.

### Local build

```bash
cd site-next
npm ci
npm test        # ESLint, the em-dash lint, then a full production build
npx next start  # serve the build locally
```

## Preflight: required before deploy

```bash
bash scripts/preflight.sh
```

Runs three checks, no Node required, then the site's own lint if Node is present:

1. **`scripts/check-em-dash.sh`**: fails on any em dash (U+2014) in site source, documentation
   or workflows. Use a spaced en dash, a colon, a comma or a full stop instead. The site build
   runs the same rule over `app/`, `components/` and `lib/` through
   `site-next/scripts/check-em-dash.mjs`.
2. **`scripts/check-chrome.sh`**: proves there is exactly one header and one footer, that every
   public page renders both, and that the footer carries the legal lines: The Advice Engine
   Ltd, company number 17404907, the software-not-advice line and the Quilter trade mark
   acknowledgement.
3. **`scripts/check-claims.sh`**: fails on prohibited claims ("fully compliant", a firm described
   as Chartered, Q Connect, competitor names) and prints borderline terms for a person to judge.

## Rules the checks enforce

- No em dashes.
- The engine drafts, checks and calculates. It does not advise, decide or sign. Never describe
  its output as compliant or approved.
- No firm is described as Chartered.
- No integration with Quilter systems is described. The only permitted wording is
  "Outputs formatted for Quilter submission."
- The engine is not described as approved by Quilter, and not described as not approved.
- Competitors are not named, except notetaker compatibility on the roadmap.
- Nothing that is not live is presented as live. Future work sits on `/roadmap` under Next or
  Later, or on `/firm-view`, each labelled as in development.
- Every specimen and screenshot uses fictitious client data and says so.

Contact: `hello@theadviceengine.ai`.
