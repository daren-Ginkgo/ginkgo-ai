# The Advice Engine marketing site

This is the replacement marketing and beta-acquisition site for The Advice
Engine. It is a Next.js application deployed independently from the private
Advice Engine product.

## Included

- Sales-led Home, Product, Microsoft integration, About, Security and Pricing pages.
- Founding Adviser beta application flow and live 15-place availability counter.
- Azure Table Storage persistence for applications and first-party conversion events.
- Private `/funnel` dashboard protected by Azure App Service Microsoft authentication.
- Legacy `.html` routes so existing bookmarks and search links keep working.

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Use a development-only Azure Storage connection string in `.env.local`. Set
`DEV_ADMIN_EMAIL` only when the local `/funnel` page needs to be tested.

## Required Azure settings

| Setting | Purpose |
| --- | --- |
| `AZURE_STORAGE_CONNECTION_STRING` | Dedicated Table Storage for beta applications and events |
| `FUNNEL_ADMIN_EMAIL` | Microsoft identity allowed to access `/funnel` |
| `WEBSITE_NODE_DEFAULT_VERSION` | Set to `~22` |

The App Service startup command is `node server.js`. App Service Authentication
must allow anonymous access to the public site while enabling Microsoft Entra ID;
the application itself redirects and authorises `/funnel`.

## Deployment

Pushing this directory to the `new-marketing-site` branch runs
`deploy-marketing-staging.yml`. The workflow expects:

- repository variable `AZURE_MARKETING_APP_NAME`;
- repository secrets `AZURE_MARKETING_CLIENT_ID`, `AZURE_TENANT_ID`, and
  `AZURE_SUBSCRIPTION_ID` for an Azure federated identity.

No production domain is changed by this workflow.
