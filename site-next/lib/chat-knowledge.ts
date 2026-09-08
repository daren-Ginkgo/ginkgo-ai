// The knowledge the public chat assistant answers from. Authored by hand from the
// live site copy (there is no FAQ page; this is effectively the site's FAQ).
// House rules apply here as everywhere: no em dashes, no superlatives, no invented
// numbers, no workflow counts (three pages currently quote three different counts,
// so the bot quotes none), and the Quilter position is factual context only - the
// bot must never state the engine is Quilter-approved and never state it is not.
// Compliance framing per README "Compliance guardrails": Daren signs off wording
// changes before this reaches production.

export const CHAT_KNOWLEDGE = `
WHAT THE ADVICE ENGINE IS
The Advice Engine is an AI document platform for UK financial advisers, built inside a
working advice firm (Ginkgo Financial) and operated by The Advice Engine Ltd (company
17404907). The adviser uploads case papers (or connects OneDrive / SharePoint), and the
engine drafts the documents the firm already writes: suitability reports, annual review
packs, initial meeting packs, meeting notes, letters of authority, fee paperwork, a fact
find extract, an advice gap scanner, plus a set of adviser calculators. Every output is
a DRAFT in the firm's own branding, with a separate QA sheet listing what a human still
needs to check. The engine supplies software: it does not give financial advice, it
never approves anything, and it never certifies compliance. The full list of workflows
is on the product page: /product.

HOW IT WORKS (five steps)
1. Sign in with the firm's normal Microsoft work account (Microsoft Entra - no separate
   password). 2. Add the case papers: upload, paste, or pull straight from the client's
OneDrive / SharePoint folder with a read-only picker that suggests the relevant files.
3. The engine checks the data against the process checklist and says what is missing.
4. It drafts the document(s) and grades them against a quality checklist before you see
them. 5. You download branded Word documents plus the adviser QA sheet. Drafts only: a
named adviser reviews and signs off everything.

DATA AND SECURITY (facts from the security page, /security)
Case material is processed in session memory only to generate the documents: it is not
stored after the session ends and it is never used to train AI. The AI subprocessor is
Anthropic (transfer safeguarded under SCCs and the UK IDTA); hosting is Microsoft Azure
in UK West; sign-in is Microsoft Entra. The only records kept are metadata (who used
which tool and when) and the firm's own settings. Advisers keep their files where they
already keep them (their own OneDrive / SharePoint); the engine holds no client
database. Details: /security and /microsoft.

QUILTER CONTEXT (factual only)
The engine was built inside a Quilter Appointed Representative firm and its report
workflows follow the Quilter network's documented processes and checklists, with the
sourcing rule: if the evidence is present, use it and show its source; if it is absent,
flag it for the adviser; do not guess. Say nothing about approval in either direction.

PRICING (from /pricing)
Standard pricing: 250 pounds per adviser per month for firms with 1 to 4 advisers, 200
pounds per adviser per month for 5 to 10 advisers, and firm-scale pricing for 11+
(book a call). Standard 12-month agreement; first month free for new firms outside the
founding beta. FOUNDING OFFER: fifteen individual Quilter advisers can join the
pre-launch beta free of charge, and if they continue after commercial launch their
individual subscription is discounted 50% for the first 12 months (this replaces the
first-month-free offer). Apply at /start.

GETTING STARTED AND CONTACT
Apply for a founding place: /start (Daren, the founder, calls every founding adviser
personally to set up their first sign-in). Book a walkthrough:
https://meetings.hubspot.com/daren8/advice-engine-demo- (the trailing hyphen is part of
the link). Email: hello@theadviceengine.ai. See example outputs: /outputs. The evidence
and QA approach: /evidence. The gap scanner: /gap-scanner.

LEGAL FOOTING
The Advice Engine Ltd supplies software to authorised financial advice firms. It is not
authorised by the Financial Conduct Authority and does not give financial advice,
handle client money or arrange products. Terms: /terms. Privacy: /privacy.
`;
