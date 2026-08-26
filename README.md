# The Advice Engine — public website

Marketing site for **The Advice Engine**, the AI document engine for UK financial
advice firms, built and operated by Ginkgo Financial Ltd.

- **Live:** https://theadviceengine.ai
- **Redirect:** adviceengine.co.uk → theadviceengine.ai (forwarded at the registrar)
- **Hosting:** GitHub Pages from `main`. Pushing to `main` publishes. **No build step** —
  plain HTML/CSS/JS, deliberately, so anyone can edit it.

## How this site is maintained

The design and page structure came from an approved external build (Aug 2026).
Shared navigation/footer markup is intentionally duplicated in each HTML file so
GitHub Pages can serve it with no build step — **if you change the header, footer
or legal wording, change it in every page**. There is no generator any more
(`sitegen.py` was retired when this design landed; it lives in git history).

```
index.html                    homepage
tools.html                    the full inventory: 36 workflows and tools (GENERATED - see below)
trial.html                    the free month: self-serve signup for Quilter FS AR firms
demo.html                     book a demo: the route in for firms outside the Quilter network
quilter.html                  For Quilter advisers (flagship positioning page)
suitability.html              suitability reports in detail
meetings.html                 first meetings + annual advice reviews
compliance.html               compliance check in detail
finprom.html                  financial promotions pre-vet in detail
find.html                     advice gap scanner + client facts extract
organise.html                 fees, authorities, front door, protection tools
404.html                      not-found page (GitHub Pages serves it automatically)
styles.css                    all styling (palette variables at the top)
script.js                     mobile navigation toggle only
CNAME                         custom domain — DO NOT DELETE, the domain breaks
favicon.ico + assets/favicon* icons (navy/indigo brand palette)
assets/og.png                 1200x630 social card
assets/make_brand_assets.py   regenerates the raster icons + social card
assets/incoming/              drop real screenshots/photos here for placement
```

Regenerate the images after any palette or headline change:

```bash
python assets/make_brand_assets.py
```

## Pricing currently encoded (Daren's figures, Aug 2026)

- 1–4 advisers: £250 per adviser per month
- 5–10 advisers: £200 per adviser per month
- 11+ advisers: price on application
- One free trial month for all new firms; minimum one-year contract after the trial

## Compliance rules for this site

These are not style preferences. Anything added here must hold to them:

- No claim that the engine gives advice, approves financial promotions, or
  certifies compliance. It drafts and it flags.
- Quilter: describe the network environment factually. NEVER state the engine is
  Quilter-approved and NEVER state it is not — silence on approval, in both
  directions. The footer carries a neutral trade-mark line only.
- Keep the footer regulatory wording unchanged unless Daren provides replacement
  wording. It must appear on every page.
- Supplier SOC 2 Type II / ISO 27001 / ISO 42001 reports are described only as
  supplier assurance. Do not badge The Advice Engine itself with certifications.
- No superlatives, no guarantees, no invented customers, numbers or testimonials.
- Ginkgo is not described as Chartered.
- Contact address: `hello@theadviceengine.ai`.
- Demonstrations and specimens are fictitious and labelled as such.

## Known gaps

- **No customer testimonials yet.** The biggest remaining credibility gap.
  Needs one attributable line each from beta firms.
- **No real product screenshots.** The interface mockups are hand-built HTML.
  Real screenshots go in `assets/incoming/` for placement.
- **CTAs are `mailto:`.** Should become a booking form plus calendar link.
- **No analytics.**

## The three ways in

The site points at three destinations and they are not interchangeable:

- **trial.html** then `https://app.theadviceengine.ai/` - the self-serve free month. It only
  works while `SELF_SIGNUP_ENABLED` is set on the live web app; without it a new visitor signs
  in and is refused. Firms are vetted live against the FCA register and must be a current
  Quilter Financial Services appointed representative.
- **Sign in**, in the header of every page - the same URL. There is no separate password: the
  engine uses Microsoft Entra sign-in, so an existing customer who has lost the link simply
  signs in with the work account they already have.
- **demo.html** - the booking route, for firms the register cannot verify automatically.

"Test Drive" means the in-app fictitious-client run and nothing else. The booking route for
non-Quilter firms is a **demo** (Daren, 26 August 2026). Do not reintroduce "Book a Test Drive"
as a booking CTA - the two were being used for different things on the same site.

The demo booking destination is set in ONE place per page, the `BOOK_URL` at the top of
`demo.html`'s generator and the `href` on `demo.html` itself. Change it there.

## tools.html is generated

`tools.html` is built from the engine's own `WORKFLOW_CARDS` registry so the public list cannot
drift from the product. When workflows are added or renamed in the engine, regenerate it rather
than hand-editing. Quilter's internal calculator references (RAP-xxxx and PRF-xxxx) are stripped
on the way out: they are Quilter's own, and the selling point is that the calculators are
replicated, not their internal codes.
