# Advice Engine marketing-site migration

## Safety boundary

The existing GitHub Pages website remains at the repository root and continues
to be served from `main`. The replacement is isolated in `site-next/` and is
deployed from `new-marketing-site` to a separate Azure Web App.

The private `ginkgo-advice-engine-demo` repository and its Azure Web App are not
changed or shared with this marketing deployment. `app.theadviceengine.ai`
continues to point to the product.

## Staging release

1. Create a dedicated Linux Web App on the existing App Service plan where
   capacity permits.
2. Create or select a dedicated Storage Account and copy one of its connection
   strings into the Web App setting `AZURE_STORAGE_CONNECTION_STRING`.
3. Set `FUNNEL_ADMIN_EMAIL=daren@ginkgofinancial.com` and the startup command to
   `node server.js`.
4. Enable Microsoft Entra authentication while allowing unauthenticated access
   to the public site.
5. Configure GitHub OIDC and the repository variable/secrets listed in
   `site-next/README.md`.
6. Push `new-marketing-site`; verify `/api/health`, submit a test beta application,
   check the place counter and sign in to `/funnel`.

## Production cutover (only after adviser acceptance testing)

1. Back up the DNS records and record the current GitHub Pages deployment.
2. Add `theadviceengine.ai` and `www.theadviceengine.ai` to the marketing Web App
   and complete Azure domain validation.
3. Lower DNS TTL, then replace only the root and `www` records with the Azure
   targets. Do not alter `app.theadviceengine.ai`.
4. Enable the managed certificate and force HTTPS.
5. Verify navigation, forms, counter, analytics and Microsoft `/funnel` login.
6. Keep the prior GitHub Pages site available for rollback until the new site has
   completed its post-launch checks.

The domain is intentionally not changed as part of staging deployment.
