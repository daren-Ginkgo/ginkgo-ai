# Claude handover: Advice Engine marketing site

Last updated: 1 September 2026

## Objective

Deploy the finished replacement marketing site to an isolated Azure staging Web
App, test it with a friendly Quilter adviser, and only then prepare the production
domain cutover. Do not change the existing Advice Engine application or the live
website while staging is being completed.

## Current state

- Repository: `daren-Ginkgo/ginkgo-ai` (public)
- Working branch: `new-marketing-site`
- Remote handover commit: `a2df9edc1d886026e2ff10ac38e16877686041b0`
- New application directory: `site-next/`
- Deployment workflow: `.github/workflows/deploy-marketing-staging.yml`
- Current production branch: `main`
- Current public domain: `https://theadviceengine.ai`
- Product login/domain: `https://app.theadviceengine.ai`
- Private product repository/Web App: `ginkgo-advice-engine-demo`

The branch is one commit ahead of `main`. All 121 replacement-site files are in
GitHub. The existing root-level HTML website, `main`, GitHub Pages configuration,
DNS and production domain have not been altered.

The replacement passed these local checks before handover:

- `npm test` (ESLint with no errors, followed by a full production build)
- Next.js standalone build assembly
- standalone Node server start
- `GET /api/health`
- public home-page response

There are six non-blocking ESLint warnings for deliberate `<img>` use. There are
no lint errors or TypeScript/build errors.

## Product and site scope

This is the sales and beta-acquisition website for The Advice Engine. It includes:

- sales-led Home, Product and Tools, Microsoft integration, Outputs, About,
  Security and Governance, Plans and Pricing, Privacy and application pages;
- clear workflow messaging for drag-and-drop evidence, suitability reports,
  annual-review and outcome reports, cashflows, calculators and compliance gaps;
- Quilter-specific positioning and the founder/Ginkgo story;
- a Founding Adviser offer for 15 individual Quilter advisers: free during beta,
  followed by 50% off each founding adviser's individual subscription for the
  first 12 months after launch;
- a beta application form, live place counter, first-party conversion events and
  private owner funnel dashboard;
- legacy `.html` routes to protect existing bookmarks and search links.

Treat the GitHub branch as the source of truth. The previous ChatGPT Sites and Wix
versions are visual/content references only and should not become parallel live
deployments.

## Technical architecture

- Next.js `16.2.6`, React `19`, TypeScript and Node 22
- `output: "standalone"` in `site-next/next.config.ts`
- Azure Linux App Service runs `node server.js`
- Azure Table Storage persists beta applications and aggregate conversion events
- Azure App Service Authentication (Easy Auth) supplies Microsoft identity headers
  for `/funnel`
- GitHub Actions authenticates to Azure using OIDC; no Azure password or publish
  profile belongs in the repository

Azure tables are created automatically on first use:

| Table | Purpose |
| --- | --- |
| `BetaApplications` | Application data and pipeline status |
| `ConversionEvents` | Aggregate page/action events without visitor IDs or IPs |

Application email addresses are normalised and SHA-256 hashed to create the row
key, preventing duplicate applications for the same email. `pending`, `contacted`
and `approved` records hold one of the 15 places. `declined`, `withdrawn` and
`waitlist` records do not. New applications automatically enter the waitlist when
no place remains.

## Critical safety boundaries

1. Do not modify, redeploy or reuse the existing `ginkgo-advice-engine-demo` Web
   App or private repository for the marketing site.
2. Do not alter `app.theadviceengine.ai` or its DNS record.
3. Do not merge to `main`, change GitHub Pages, or alter the root/`www` DNS records
   before adviser acceptance testing and Daren's explicit approval.
4. Use a separate marketing Web App and preferably a dedicated Storage Account.
5. The `ginkgo-ai` repository is public. Never commit credentials, connection
   strings, client records or unredacted test cases.
6. Only dummy-client examples may be published. If an image is derived from the
   Advice Engine test-case folder, blur/remove every real client name and other
   identifying data before it enters this repository or the website.
7. Keep `DEV_ADMIN_EMAIL` out of Azure. It exists only for local development.

## Azure staging setup

First inspect the existing Azure subscription, resource group and App Service
plan. Reuse the existing Linux plan only if it has sufficient capacity; otherwise
tell Daren the expected cost before creating a new paid plan.

Recommended staging resource name: `advice-engine-marketing-staging` (use another
globally unique name if unavailable).

1. Create a separate Linux Web App using Node 22.
2. Set its startup command to `node server.js`.
3. Create/select a dedicated Storage Account and obtain a connection string.
4. Add these App Service application settings:

   | Setting | Value |
   | --- | --- |
   | `AZURE_STORAGE_CONNECTION_STRING` | Dedicated Storage Account connection string |
   | `FUNNEL_ADMIN_EMAIL` | `daren@ginkgofinancial.com` |
   | `WEBSITE_NODE_DEFAULT_VERSION` | `~22` |

5. Enable Microsoft Entra ID in App Service Authentication.
6. Set unauthenticated requests to **Allow anonymous access** because the marketing
   site is public. The application itself redirects `/funnel` to
   `/.auth/login/aad` and permits only `FUNNEL_ADMIN_EMAIL`.
7. Ensure the authenticated principal supplies `x-ms-client-principal-name` and
   `x-ms-client-principal-id` to the application.

## GitHub OIDC and deployment

The workflow uses the GitHub environment `marketing-staging`. Because the job is
environment-scoped, the Entra federated credential subject should be:

```text
repo:daren-Ginkgo/ginkgo-ai:environment:marketing-staging
```

Grant the service principal only the Azure scope required to deploy the staging
Web App (resource-group or Web-App scope; avoid subscription-wide Contributor if
it is unnecessary).

Configure the following in `daren-Ginkgo/ginkgo-ai` under Actions secrets and
variables:

| Type | Name | Value |
| --- | --- | --- |
| Variable | `AZURE_MARKETING_APP_NAME` | Exact staging Web App name |
| Secret | `AZURE_MARKETING_CLIENT_ID` | Entra application/client ID |
| Secret | `AZURE_TENANT_ID` | Azure tenant ID |
| Secret | `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |

The deployment job is deliberately skipped while `AZURE_MARKETING_APP_NAME` is
absent. Once Azure and the GitHub values are configured, run **Deploy marketing
site to Azure staging** with `workflow_dispatch`, or push a safe change under
`site-next/`.

The workflow:

1. installs with `npm ci`;
2. builds the Next.js standalone server;
3. assembles `server.js`, `.next/static` and `public` into the deployment package;
4. signs into Azure using OIDC;
5. deploys with `azure/webapps-deploy@v3`;
6. checks the public `/api/health` endpoint.

## Staging acceptance checklist

Do not proceed to DNS until all checks pass.

- `GET /api/health` returns `ok: true` and `storageConfigured: true`.
- Home, Product, Microsoft, Outputs, About, Security, Pricing and Privacy pages
  work on desktop and mobile.
- All “Apply” buttons reach `/start`; engine-login buttons still reach the intended
  Advice Engine login and not a Wix/Sites/paywall route.
- A dummy beta application saves successfully and reaches `/thank-you`.
- A duplicate email does not allocate a second place.
- `/api/beta-availability` and the visible counter agree.
- Daren can authenticate with Microsoft and open `/funnel`.
- Another/anonymous user cannot access `/funnel`.
- Daren can change an application status and the place counter updates correctly.
- First-party page/action counts appear in `/funnel`.
- No checkout, Wix pricing-plan, restricted-paywall or obsolete membership links
  remain.
- No real client names or identifying information are visible in imagery, example
  reports, metadata or downloadable assets.
- Complete a friendly Quilter adviser walkthrough covering comprehension, trust,
  application flow and mobile usability.

## Production cutover (not yet authorised)

After Daren approves the staging result:

1. Record the current GitHub Pages deployment and back up all DNS records.
2. Add `theadviceengine.ai` and `www.theadviceengine.ai` to the marketing Web App
   and complete Azure domain validation before changing traffic.
3. Lower DNS TTL, then change only the root and `www` records to Azure.
4. Do not change `app.theadviceengine.ai`.
5. Enable an Azure managed certificate and force HTTPS.
6. Repeat the full acceptance checklist on the production domain.
7. Retain the current GitHub Pages site and DNS values as the rollback route until
   post-launch checks are complete.

Current DNS at handover still points the root to GitHub Pages and `www` to
`daren-ginkgo.github.io`. That is intentional.

## Relevant files

| Path | Purpose |
| --- | --- |
| `site-next/app/page.tsx` | Main sales page |
| `site-next/app/start/page.tsx` | Founding Adviser application page |
| `site-next/app/funnel/page.tsx` | Private owner dashboard |
| `site-next/app/azure-auth.ts` | Easy Auth identity and owner check |
| `site-next/lib/azure-storage.ts` | Tables, applications, counter and events |
| `site-next/lib/beta.ts` | 15-place offer, statuses and form schema |
| `site-next/app/api/health/route.ts` | Deployment health check |
| `site-next/.env.example` | Non-secret configuration template |
| `.github/workflows/deploy-marketing-staging.yml` | Azure staging deployment |
| `MARKETING_SITE_MIGRATION.md` | Short migration/cutover summary |

## Immediate next action

Complete the Azure staging and GitHub OIDC setup above, run the workflow manually,
and return the verified `*.azurewebsites.net` staging URL to Daren. Do not change
production DNS or merge the branch as part of that action.
