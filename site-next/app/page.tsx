import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Database,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { BetaAvailability } from "@/components/beta-availability";

export const metadata: Metadata = {
  title: { absolute: "The Advice Engine | Advice paperwork, built around the evidence" },
  description: "The Advice Engine turns client case material into branded draft documents, adviser QA checks and auditable calculations for UK advice firms.",
};

// Restructured 7 Sep 2026 (handover 2, task B): eleven sections became six
// plus the retained security strip. The removed sections live on /product,
// /outputs, /gap-scanner, /about and /pricing.

const adviserJourney = [
  {
    number: "01",
    title: "Drop in the case",
    copy: "Add the meeting transcript, fact-find, statements, illustrations, emails or existing reports, or select them from SharePoint and OneDrive.",
    detail: "PDF · Word · Excel · transcripts · client records",
  },
  {
    number: "02",
    title: "Choose what you need",
    copy: "Start a suitability report, annual review, cashflow, calculator, meeting pack or one of the engine’s other focused workflows.",
    detail: "A defined job, not a blank chat box",
  },
  {
    number: "03",
    title: "The engine does the groundwork",
    copy: "It organises the evidence, extracts the facts, runs the relevant calculations and flags contradictions or missing information.",
    detail: "Evidence · calculations · checks · audit trail",
  },
  {
    number: "04",
    title: "Review professional drafts",
    copy: "Receive an editable document in your firm’s branding, together with the adviser QA sheet and workings needed to review it properly.",
    detail: "Word draft · QA sheet · calculation workings",
  },
];

// The adviser job table, moved up from /product (handover 2, task B item 2).
const jobs = [
  ["Suitability", "Transcript + fact-find + illustrations", "Branded suitability-report draft + adviser QA"],
  ["Annual review", "Meeting record + previous report + current values", "Progress-check or outcome report + action list"],
  ["Cashflow", "Household data + objectives + agreed assumptions", "Professional cashflow report + client email draft"],
  ["Calculators", "Case figures + source documents", "Workings for charges, CGT, withdrawals, critical yield and more"],
];

// Retention wording approved by Daren on 6 Sep 2026. Do not reintroduce
// "written to disk", "processed in the moment" or any zero-retention claim.
const securityItems = [
  [LockKeyhole, "UK hosted, your own Microsoft sign-in", "UK Azure-region hosting, with your firm’s existing Entra account and MFA."],
  [ShieldCheck, "Never used to train AI models", "A binding term of our agreement with our AI provider, not a setting we switch on."],
  [Database, "Nothing kept in the app after your session", "The audit log records who ran what and when, never client content."],
];

export default function Home() {
  return (
    <main id="main-content">
      <SiteHeader />

      <section className="hero">
        <div className="hero-glow" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles aria-hidden="true" />Built by a Chartered Financial Planner in the Quilter network</div>
            <h1>
              Client data in.{" "}<br />
              Professional advice work out.{" "}<br />
              <em>Without starting from scratch.</em>
            </h1>
            <p className="hero-lede">
              Drop in a meeting transcript and whatever client information you already hold. The Advice Engine
              organises the evidence, runs the relevant calculations and creates branded suitability, review and
              cashflow drafts, built to match the Quilter templates you already use and challenged before you see the first draft.
            </p>
            <p className="founder-proof">Created by Daren Wallbank at Ginkgo Financial from the real work of running advice cases, not from a generic software brief.</p>
            <div className="hero-actions">
              <ArrowButton href="/start">Apply for a founding place</ArrowButton>
              <a className="text-link" href="#simple-workflow">See the simple workflow <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="hero-assurance" aria-label="Trial assurances">
              <span><Check aria-hidden="true" /> Free throughout beta</span>
              <span><Check aria-hidden="true" /> No card details</span>
              <span><Check aria-hidden="true" /> Microsoft sign-in</span>
            </div>
          </div>

          <div className="product-stage" aria-label="Illustration of the Advice Engine workflow">
            <div className="stage-label">Fictitious specimen · real workflow</div>
            <div className="source-card source-one">
              <div className="file-icon"><FileText aria-hidden="true" /></div>
              <div><strong>Meeting transcript</strong><span>14 March 2026 · verified</span></div>
              <CircleCheck aria-hidden="true" />
            </div>
            <div className="source-card source-two">
              <div className="file-icon"><Upload aria-hidden="true" /></div>
              <div><strong>Client case pack</strong><span>8 relevant files selected</span></div>
              <CircleCheck aria-hidden="true" />
            </div>
            <div className="document-card">
              <div className="document-topline">
                <div><span className="mini-mark" /> Your Firm</div>
                <span>Draft</span>
              </div>
              <div className="document-title">Annual Review Outcome</div>
              <div className="document-client">Alex and Sam Taylor · 14 March 2026</div>
              <div className="document-section"><span>01</span><div><strong>Your position</strong><i /></div></div>
              <div className="document-lines"><i /><i /><i /><i /></div>
              <div className="document-note">
                <strong>Information needed</strong>
                Confirm the existing employer pension details before issue.
              </div>
              <div className="document-footer">Adviser review required <CircleCheck aria-hidden="true" /></div>
            </div>
            <div className="qa-card">
              <div className="qa-heading"><ShieldCheck aria-hidden="true" /> Adviser QA</div>
              <div className="qa-score"><strong>A</strong><span>Strong draft{" "}<br />2 points to confirm</span></div>
              <div className="qa-row"><span>Evidence used</span><b>Shown</b></div>
              <div className="qa-row"><span>Missing facts</span><b className="amber">Flagged</b></div>
              <div className="qa-row"><span>Final decision</span><b>Adviser</b></div>
            </div>
            <div className="flow-line flow-line-one" />
            <div className="flow-line flow-line-two" />
          </div>
        </div>
      </section>

      <section className="section job-map-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">From source material to useful work</span><h2>Show the engine the case once. Put it to work in different ways.</h2></div><p>The value is not a single report. It is the time saved across the repeated drafting, checking, calculating and follow-up work surrounding the same client.</p></div>
          <div className="job-map">
            <div className="job-map-head"><span>Adviser job</span><span>What goes in</span><span>What comes out</span></div>
            {jobs.map(([job, input, output]) => <div className="job-map-row" key={job}><strong>{job}</strong><span>{input}</span><span>{output}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section workflow-sale" id="simple-workflow">
        <div className="shell">
          <div className="section-intro split-intro workflow-sale-intro">
            <div>
              <span className="kicker">Designed to save adviser time</span>
              <h2>Drag in the information.{" "}<br />Choose the work. Review the result.</h2>
            </div>
            <p>
              The engine is deliberately simple to use. It turns the client material already scattered across
              transcripts, documents and records into a professional starting point for the adviser, not another
              system that needs everything re-keyed.
            </p>
          </div>
          <div className="adviser-journey">
            {adviserJourney.map((step) => (
              <article key={step.number}>
                <div className="journey-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span>{step.detail}</span>
              </article>
            ))}
          </div>
          <div className="workflow-sale-action">
            <p><strong>One source pack can support several pieces of work.</strong> Reuse verified client facts rather than finding and typing them again for every document.</p>
            <a className="text-link" href="/outputs#workflow-demos">See three complete workflow demonstrations <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="section specimen-section" id="proof">
        <div className="shell specimen-grid">
          <div className="specimen-copy">
            <span className="kicker light">What comes out</span>
            <h2>Judge the output.{" "}<br />Not the promise.</h2>
            <p>
              A finished Word draft in your firm’s own styling, paired with the QA sheet an adviser
              needs to review it properly. Missing facts are made visible rather than quietly invented.
            </p>
            <ul className="check-list">
              <li><Check aria-hidden="true" /> Firm branding and approved wording</li>
              <li><Check aria-hidden="true" /> Source-attributed facts and calculations</li>
              <li><Check aria-hidden="true" /> Separate adviser QA and information-needed list</li>
            </ul>
            <div className="specimen-copy-actions">
              <ArrowButton href="#start" light>Start with a fictitious case</ArrowButton>
              <a className="text-link" href="/outputs#full-journey">Read a complete client file, end to end <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="specimen-window">
            <div className="window-toolbar">
              <div><i /><i /><i /></div><span>Annual-review-outcome.docx</span><span>100%</span>
            </div>
            <div className="report-page">
              <div className="report-brand"><span className="mini-mark" /> YOUR FIRM <small>FINANCIAL ADVICE</small></div>
              <span className="draft-pill">DRAFT · ADVISER REVIEW</span>
              <h3>Annual Review Outcome</h3>
              <p className="report-meta">Prepared for Alex and Sam Taylor · 14 March 2026</p>
              <div className="report-rule" />
              <h4>Executive summary</h4>
              <p>Your arrangements remain aligned with the objectives and risk position recorded at this review. The actions agreed are set out below.</p>
              <div className="report-table">
                <div><strong>Action</strong><strong>Evidence</strong><strong>Status</strong></div>
                <div><span>Review existing pension</span><span>Meeting transcript, p.4</span><b>Confirm</b></div>
                <div><span>Use ISA allowance</span><span>Platform statement</span><b className="complete">Complete</b></div>
              </div>
              <div className="report-callout"><strong>Information needed before issue</strong><span>Confirm the plan number and current value of the legacy employer pension.</span></div>
              <div className="report-signoff">Prepared by The Advice Engine · Draft for named adviser review</div>
            </div>
            <div className="qa-overlay">
              <div className="qa-overlay-head"><ShieldCheck aria-hidden="true" /><span>Adviser QA sheet</span><strong>A</strong></div>
              <div><span>Framework review</span><b>Complete</b></div>
              <div><span>Source checks</span><b>Complete</b></div>
              <div><span>Items to confirm</span><b className="amber">2</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section evidence-teaser">
        <div className="shell narrow-shell">
          <span className="kicker">Can you defend it?</span>
          <h2>Every figure points back to the document it came from.</h2>
          <p>Every gap is flagged rather than filled. The named adviser reviews, approves and issues, and the file shows that they did.</p>
          <a className="text-link" href="/evidence">See how a draft survives a file review <ArrowRight /></a>
        </div>
      </section>

      <section className="section security" id="security">
        <div className="shell security-grid">
          <div className="security-copy">
            <span className="kicker">Security and governance</span>
            <h2>Built for firms that have to answer sensible questions.</h2>
            <p>
              The safeguards are part of the workflow, not an appendix. Your team keeps its existing
              Microsoft identity controls and every output preserves a clear line of adviser responsibility.
            </p>
            <a className="text-link" href="/security">
              Read the security page <ArrowRight />
            </a>
          </div>
          <div className="security-list">
            {securityItems.map(([Icon, title, copy]) => {
              const SecurityIcon = Icon as typeof ShieldCheck;
              return <article key={title as string}><SecurityIcon /><div><h3>{title as string}</h3><p>{copy as string}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section start-section" id="start">
        <div className="shell start-card">
          <div>
            <BetaAvailability variant="kicker" />
            <h2>Help shape an engine built around real adviser work.</h2>
            <p>Join free throughout beta, begin with a fictitious case and work directly with Daren. The beta runs until at least 1 November 2026, with no commitment to take a licence when it ends. Standard pricing runs from £200 per adviser per month: <a href="/pricing">see the pricing page</a>.</p>
          </div>
          <div className="start-actions">
            <ArrowButton href="/start">Apply for a founding place</ArrowButton>
            <a href="/demo">Prefer a conversation? Book a demonstration.</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
