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
is on the product page: /product. The published scale is over 40 workflows and tools,
including over 20 calculators; the calculators are counted within the 40, not on top of it.
No exact count is published.

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
BETA TERM: the founding beta runs until AT LEAST 1 November 2026, and there is no
commitment to take a licence when it ends. "At least" is the whole of it: that date is
the earliest the beta could close, not an announced end date, so never say the beta
ends on 1 November 2026 or that it runs until that date. No closing date is published. That is the whole of what is published about
commitment. Nothing is published about cancelling, giving notice, renewing or refunds
once a licence IS taken, beyond the standard 12-month agreement above, so do not
describe those terms: point at /terms and offer hello@theadviceengine.ai.

GETTING STARTED AND CONTACT
Apply for a founding place: /start (Daren, the founder, calls every founding adviser
personally to set up their first sign-in). Book a walkthrough:
https://meetings.hubspot.com/daren8/advice-engine-demo- (the trailing hyphen is part of
the link). Email: hello@theadviceengine.ai. See example outputs: /outputs. The evidence
and QA approach: /evidence. The gap scanner: /gap-scanner.

THE FULL-JOURNEY SPECIMEN, READABLE AT /outputs#full-journey
A complete fictitious client file, free to read on the page with no form and NO
DOWNLOAD. One client (Avery Drafter, 45, GBP 100,000, retirement at 67, balanced
risk) across four stages run back to back in one sitting: initial meeting,
suitability report, progress check, outcome report. Eight client-facing documents
are shown in full and unedited - follow-up email, introduction meeting record,
suitability report, progress check report and its covering email, meeting agenda,
outcome report and its covering email.
They are deliberately NOT offered as Word files: a .docx is a reusable template and
a firm's report structure should not leave as an editable file. If someone asks for
the documents as files, say they are read on the page by design and offer a
walkthrough at the meetings link instead. Do not promise to email them.
Three internal documents are NOT published in any form - the pre-meeting briefing,
the fact find update and the adviser quality-check - because they carry checklist
and internal-review material. What the quality-check FOUND is quoted on the page.
WHY THE DRAFTS GRADE PARTIAL: the specimen case supplies fact-find-level material
only. It withholds the provider illustration, any dated statement, the existing
pension plan record and the signed fee authority, because the engine must never
invent client data. So the drafts carry real gaps, the engine leaves them visible
as [TO CONFIRM] placeholders, and the compliance pass names each one. That is
designed in, not a defect. Every document is a draft requiring adviser sign-off,
and the client is fictitious.

LEGAL FOOTING
The Advice Engine Ltd supplies software to authorised financial advice firms. It is not
authorised by the Financial Conduct Authority and does not give financial advice,
handle client money or arrange products. Terms: /terms. Privacy: /privacy.
`;
