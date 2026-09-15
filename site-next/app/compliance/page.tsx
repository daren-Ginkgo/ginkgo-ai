import type { Metadata } from "next";
import { Check, ClipboardList, Database, FileCheck2, FileText, KeyRound, ShieldCheck, X } from "lucide-react";
import { ArrowButton, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "For compliance officers and file-check teams",
  description: "What The Advice Engine does and does not do, the evidence trail behind every draft, how client material is handled, and where adviser accountability sits. Written for the person who has to approve the tool.",
};

// Written for the reader who approves the tool, not the adviser who wants it
// (build plan 15 Sep 2026, section 2.3). The data-handling wording is the
// retention wording Daren approved on 6 Sep 2026 and already published on
// /security: it is repeated verbatim here, not paraphrased. The FAQ is
// assembled from copy already on /security, /evidence, /microsoft and /terms.
const does = [
  "Drafts suitability reports, annual reviews, cashflow reports and client correspondence from the case pack, in the firm's own templates.",
  "Checks the case pack for missing evidence, unevidenced risk ratings and drift between objectives and recommendation.",
  "Calculates charges, CGT, withdrawals, critical yield and more, and shows the arithmetic and the source of every input.",
  "Flags every gap in the document itself and lists it on a separate information-needed list.",
];

const doesNot = [
  "Give financial advice, or decide what the recommendation should be.",
  "Sign, issue or approve anything. Every output is a draft until a named adviser has reviewed it.",
  "Approve financial promotions or certify compliance.",
  "Keep client content after the session, or use it to train any AI model.",
];

const trail = [
  { icon: FileText, title: "Every figure traced to a source", copy: "Each figure in a draft points back to the document and page it came from. If the evidence is absent, the draft says so rather than filling the gap." },
  { icon: FileCheck2, title: "The adviser QA sheet", copy: "A separate, adviser-facing document listing the evidence used, the gaps, the conflicts and the points requiring judgement. It is part of the file, not an afterthought." },
  { icon: ClipboardList, title: "The information-needed list", copy: "The unresolved items, in one place, so the adviser and the file-checker are looking at the same list before anything is issued." },
];

const faq = [
  { q: "Does the engine give advice?", a: "No. It drafts, calculates, organises and challenges. It does not provide financial advice, approve financial promotions or certify compliance. The using firm and the named adviser retain review, approval and regulatory responsibility." },
  { q: "Where is client material processed?", a: "In the UK on Microsoft Azure (UK West). To generate a draft, the relevant material is sent to our AI provider, Anthropic, in the United States, under EU Standard Contractual Clauses and the UK International Data Transfer Addendum. Your firm remains the data controller; Anthropic and Microsoft are processors." },
  { q: "Is client material used to train AI models?", a: "No. That is a binding term of our agreement with our AI provider, not a setting we switch on." },
  { q: "What is kept after a session?", a: "Nothing from the case. The audit log records who ran what and when, never client content. Anthropic holds inputs and outputs briefly for trust and safety purposes and then deletes them: not indefinitely, and never for training." },
  { q: "How do advisers sign in?", a: "With the firm's own Microsoft 365 work account and MFA. There is no separate Advice Engine password, and the existing Microsoft identity controls continue to apply." },
  { q: "How does the engine reach the case files?", a: "Advisers upload files, or select them from an approved OneDrive or SharePoint folder. Folder access is delegated and read-only, as the signed-in adviser, within the permission the firm has granted. Suggested files are shown with a reason and the adviser confirms the source pack before anything is read." },
  { q: "Can we see what the checks are before we run live client material?", a: "Yes. The Test Drive runs a fictitious case through the real pipeline, so the compliance team can assess the drafts, the QA sheet and the information-needed list before any live material is involved. Check your network's position on third party AI tools first; we will support your notification." },
  { q: "Who are the subprocessors?", a: "Anthropic PBC for AI drafting and Microsoft Corporation for cloud hosting. No other party processes client personal data on our behalf. We give customer firms at least 15 days' notice before adding or replacing a subprocessor. The list is published on the security page." },
  { q: "Where can I read the terms?", a: "The terms of use are published at /terms and the privacy notice at /privacy. A due-diligence pack is available on request from hello@theadviceengine.ai." },
];

export default function CompliancePage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="For compliance officers and file-check teams"
        title="Written for the person who has to approve the tool."
        copy="Evidence-led advice drafting that already knows Quilter. The adviser reviews, the adviser signs, and the file shows it. This page sets out what the engine does and does not do, what it keeps and what it never keeps, and where accountability sits."
        primary={{ href: "/demo", label: "Book a demonstration" }}
        secondary={{ href: "/security", label: "Read the security detail" }}
      />

      <section className="section two-gap-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker light">The boundary</span><h2>What the engine does.{" "}<br />What it does not do.</h2></div><p>It drafts, checks and calculates. It does not advise, does not decide and does not sign. The line is drawn in the design, not left to the user.</p></div>
          <div className="two-gap-grid">
            <article><span>Does</span><h3>Drafts, checks, calculates</h3><ul>{does.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
            <article><span>Does not</span><h3>Advise, decide, sign</h3><ul>{doesNot.map((item) => <li key={item}><X aria-hidden="true" />{item}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="section controls-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">The evidence trail</span><h2>Every draft arrives with its own working.</h2></div><p>A file-checker should be able to follow any figure back to its source without asking the adviser. That is what the three outputs below are for.</p></div>
          <div className="control-grid">
            {trail.map(({ icon: Icon, title, copy }) => <article key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{copy}</p></article>)}
          </div>
          <p className="compliance-link"><a className="text-link" href="/evidence">See a specimen against the sourcing rule</a></p>
        </div>
      </section>

      {/* Retention wording approved by Daren on 6 Sep 2026, verbatim from
          /security. Do not paraphrase or "improve" it: it is an assertion to a
          regulator and is kept consistent with the firm's ROPA. */}
      <section className="section privacy-section">
        <div className="shell narrow-shell privacy-copy">
          <span className="kicker">Data handling</span>
          <h2>Where your client material goes</h2>
          <p>Your material is processed in the UK on Microsoft Azure, and you sign in with your own firm&apos;s Microsoft work account and MFA.</p>
          <p>To generate a draft, the relevant material is sent to our AI provider, Anthropic. That is a transfer to the United States, covered by EU Standard Contractual Clauses and the UK International Data Transfer Addendum under our commercial agreement with them.</p>
          <p>Your material is never used to train any AI model. That is a binding term of that agreement, not a setting we switch on.</p>
          <p>Nothing is kept in The Advice Engine after your session. The audit log records who ran what and when, never client content. Anthropic holds inputs and outputs briefly for trust and safety purposes and then deletes them: not indefinitely, and never for training.</p>
          <p>Your firm remains the data controller. Anthropic and Microsoft are processors.</p>
          <h2>The access model</h2>
          <p>Advisers sign in with the firm&apos;s existing Microsoft 365 work account and MFA. No separate password is created or held. Where a firm enables it, case files are selected from an approved OneDrive or SharePoint folder through delegated, read-only access as the signed-in adviser, within the permission the firm has granted. Suggested files are shown with a reason, and the adviser confirms the source pack before the workflow reads anything.</p>
          <h2>What the audit log holds, and what it never holds</h2>
          <p><strong>Holds:</strong> which user ran which workflow, and when.</p>
          <p><strong>Never holds:</strong> the case pack, the transcript, the draft, the figures, or any other client content.</p>
        </div>
      </section>

      <section className="section responsibility-section">
        <div className="shell responsibility-grid">
          <div>
            <span className="kicker light">Adviser accountability</span>
            <h2>A named adviser reviews and signs every output. The file shows it.</h2>
          </div>
          <div>
            <p>Every output is a draft until the named adviser at the using firm has reviewed it. The adviser QA sheet sits in the file alongside the document, so the review is visible to the file-checker, not assumed.</p>
            <p>The engine supports regulated work. It does not become the regulated adviser, and the firm remains responsible for its advice and its regulatory obligations.</p>
            <ArrowButton href="mailto:hello@theadviceengine.ai?subject=Advice%20Engine%20due%20diligence%20pack" light>Request the due-diligence pack</ArrowButton>
          </div>
        </div>
      </section>

      <section className="section memory-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">Firm memory, not client memory</span><h2>The engine remembers your firm.{" "}<br />It does not remember your clients.</h2></div><p>The distinction matters to a data protection officer, so it is stated plainly: settings about the firm persist, and content about clients does not.</p></div>
          <div className="memory-grid">
            <article className="memory-firm"><Database aria-hidden="true" /><span>Remembered</span><h3>Your firm</h3><ul><li>Report templates and house style</li><li>Attitude-to-risk wording</li><li>Fee structure and standard disclosures</li><li>Who may use which workflow</li></ul></article>
            <article className="memory-client"><KeyRound aria-hidden="true" /><span>Never remembered</span><h3>Your clients</h3><ul><li>Case packs and transcripts</li><li>Drafts and QA sheets</li><li>Valuations, figures and calculations</li><li>Anything about a named individual</li></ul></article>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell narrow-shell">
          <span className="kicker">Questions a compliance team asks</span>
          <h2>Answers, in the words already published on this site.</h2>
          <div className="faq-list">
            {faq.map(({ q, a }) => (
              <details key={q}>
                <summary><ShieldCheck aria-hidden="true" />{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <div className="faq-actions">
            <ArrowButton href="/demo">Book a demonstration</ArrowButton>
            <a className="text-link" href="/security">Security and subprocessors</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
