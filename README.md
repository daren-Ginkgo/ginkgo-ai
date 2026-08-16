# The Advice Engine — public website

Marketing site for **The Advice Engine**, the AI document engine for UK financial
advice firms, built and operated by Ginkgo Financial Ltd.

- **Live:** https://theadviceengine.ai
- **Redirect:** adviceengine.co.uk → theadviceengine.ai (forwarded at the registrar)
- **Hosting:** GitHub Pages from `main`. Pushing to `main` publishes.
- **The app itself** lives in a separate repo (`ginkgo-advice-engine-demo`) on Azure.

## Brand

The Advice Engine has its own identity, deliberately separate from the Ginkgo
Financial brand — Ginkgo appears as the credibility line in the footer, not as the
logo in the header.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--ink` | `#141D26` | `#E8EDF1` | Headings, wordmark |
| `--paper` | `#F4F5F3` | `#0D1319` | Page ground |
| `--sign` | `#1D4E89` | `#79ABE0` | Primary accent — sign-off blue |
| `--flag` | `#A96B10` | `#E0A94D` | **Flagged gaps only.** Never decoration. |
| `--confirm` | `#2F6F4F` | `#71BE95` | Verified / confirmed states |

**Typography rule:** the sans face is the engine's voice. The serif (`.verbatim`)
is reserved for text quoted word-for-word from a client's file — nowhere else.
That distinction is the point, so don't spend it on pull quotes.

## Files

```
index.html                    the whole site — single page, no build step, no dependencies
CNAME                         custom domain for GitHub Pages
favicon.ico                   root favicon for older clients
assets/favicon.svg            primary favicon
assets/favicon-32/180/512.png raster favicons + apple-touch-icon
assets/og.png                 1200x630 social card
assets/make_brand_assets.py   regenerates every raster asset above
```

Regenerate the images after any wordmark, palette or headline change:

```bash
python assets/make_brand_assets.py
```

## Compliance rules for this site

These are not style preferences. Anything added here must hold to them:

- No claim that the engine gives advice, approves financial promotions, or
  certifies compliance. It drafts and it flags.
- No superlatives, no guarantees, no performance promises.
- Ginkgo is not described as Chartered.
- The engine-as-tool disclaimer stays in the footer.
- Any example or specimen is fictitious and labelled as such.

## Known gaps

- **Pricing is provisional.** The £995 figure needs Daren's sign-off against the
  real bands before it can be treated as published.
- **No customer testimonials yet.** The biggest remaining credibility gap against
  Saturn and Aveni. Needs one attributable line each from beta firms.
- **No product screenshots or Test Drive video.** The hero panel is a hand-built
  specimen standing in for a real screen recording.
- **CTAs are `mailto:`.** Should become a booking form plus calendar link.
