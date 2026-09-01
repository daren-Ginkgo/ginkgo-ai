import {
  ArrowRight,
  Calculator,
  Check,
  CircleCheck,
  Database,
  FileCheck2,
  FileText,
  FolderSearch,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";
import { BetaAvailability } from "@/components/beta-availability";

const outcomes = [
  {
    icon: FileText,
    number: "01",
    title: "Draft the work",
    copy: "Suitability reports, annual reviews, meeting packs and adviser correspondence—produced in your firm’s styling from the case material you already hold.",
  },
  {
    icon: FileCheck2,
    number: "02",
    title: "Strengthen the file",
    copy: "Before the first draft appears, the engine runs an initial compliance sweep against the applicable Q Business Assurance requirements, fills supportable gaps from the case evidence and redrafts.",
  },
  {
    icon: Search,
    number: "03",
    title: "Find the next conversation",
    copy: "The Advice Gap Scanner surfaces needs that were raised but never actioned—with the source quote verified before anything reaches the adviser.",
  },
];

const workflowGroups = [
  ["Draft", "Branded suitability reports", "Annual review progress and outcomes", "Cashflow reports and client emails"],
  ["Check", "Evidence and consistency review", "Missing-information flags", "Separate adviser QA sheet"],
  ["Find", "Advice gap scanner", "Client fact extraction", "Relevant SharePoint and OneDrive files"],
  ["Calculate", "25 adviser calculators", "Source-labelled workings", "Figures carried into the report"],
];

const adviserJourney = [
  {
    number: "01",
    title: "Drop in the case",
    copy: "Add the meeting transcript, fact-find, statements, illustrations, emails or existing reports—or select them from SharePoint and OneDrive.",
    detail: "PDF · Word · Excel · transcripts · client records",
  },
  {
    number: "02",
    title: "Choose what you need",
    copy: "Start a suitability report, annual review, cashflow, calculator, meeting pack or one of the engine’s other focused workflows.",
    detail: "A defined job—not a blank chat box",
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

const outputFamilies = [
  [FileText, "Suitability reports", "Turn transcripts and case evidence into a structured, branded draft without beginning from a blank page."],
  [FileCheck2, "Annual review reports", "Create progress-check or outcome reports from the meeting record, previous review and current client data."],
  [Calculator, "Cashflows and calculators", "Build client cashflow packs and source-labelled calculations for charges, tax, withdrawals, critical yield and more."],
  [FolderSearch, "Meeting and follow-up work", "Prepare meeting packs, actions, client correspondence and next-conversation prompts from the same source material."],
];

const securityItems = [
  [LockKeyhole, "Microsoft sign-in", "Your firm’s existing Entra account and MFA."],
  [Database, "Processed in the moment", "Client material is not written to disk or used to train models."],
  [ShieldCheck, "Adviser-controlled", "Every output remains a draft until a named adviser signs it off."],
  [FileCheck2, "Due-diligence ready", "DPIA, processing records and supplier assurance available for review."],
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero">
        <div className="hero-glow" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles aria-hidden="true" />For Quilter advisers, by a Quilter adviser</div>
            <h1>
              Client data in.<br />
              Professional advice work out.<br />
              <em>Without starting from scratch.</em>
            </h1>
            <p className="hero-lede">
              Drop in a meeting transcript and whatever client information you already hold. The Advice Engine
              organises the evidence, runs the relevant calculations and creates branded suitability, review and
              cashflow drafts—built around Quilter templates and challenged before you see the first draft.
            </p>
            <p className="founder-proof">Created by Daren Wallbank at Ginkgo Financial from the real work of running advice cases—not from a generic software brief.</p>
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
              <div className="document-client">Mrs Jane Smith · 14 March 2026</div>
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
              <div className="qa-score"><strong>A</strong><span>Strong draft<br />2 points to confirm</span></div>
              <div className="qa-row"><span>Evidence used</span><b>Shown</b></div>
              <div className="qa-row"><span>Missing facts</span><b className="amber">Flagged</b></div>
              <div className="qa-row"><span>Final decision</span><b>Adviser</b></div>
            </div>
            <div className="flow-line flow-line-one" />
            <div className="flow-line flow-line-two" />
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Product facts">
        <div className="shell proof-strip-grid">
          <div><strong>36</strong><span>named workflows and tools</span></div>
          <div><strong>25</strong><span>adviser calculators</span></div>
          <div><strong>0</strong><span>client files written to disk</span></div>
          <div><strong>UK</strong><span>Azure-region hosting</span></div>
        </div>
      </section>

      <section className="section workflow-sale" id="simple-workflow">
        <div className="shell">
          <div className="section-intro split-intro workflow-sale-intro">
            <div>
              <span className="kicker">Designed to save adviser time</span>
              <h2>Drag in the information.<br />Choose the work. Review the result.</h2>
            </div>
            <p>
              The engine is deliberately simple to use. It turns the client material already scattered across
              transcripts, documents and records into a professional starting point for the adviser—not another
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
          <div className="input-output-story">
            <div className="input-stack" aria-label="Examples of client information the engine can use">
              <span className="io-label">Bring what you already have</span>
              <div><Upload /><strong>Meeting transcript</strong><small>Conversation, objectives and agreed actions</small></div>
              <div><FileText /><strong>Client documents</strong><small>Fact-finds, statements, illustrations and existing reports</small></div>
              <div><FolderSearch /><strong>SharePoint or OneDrive</strong><small>Find and confirm the relevant case files</small></div>
            </div>
            <div className="io-arrow"><Sparkles /><span>The Advice Engine</span><ArrowRight /></div>
            <div className="output-stack">
              <span className="io-label">Receive work ready to review</span>
              <div><FileText /><strong>Branded Word draft</strong><small>Professional, editable and structured for the job</small></div>
              <div><Calculator /><strong>Calculations and workings</strong><small>Figures carried forward with their source visible</small></div>
              <div><ShieldCheck /><strong>Adviser QA</strong><small>Gaps, conflicts and decisions clearly separated</small></div>
            </div>
          </div>
          <div className="output-family-grid">
            {outputFamilies.map(([Icon, title, copy]) => {
              const OutputIcon = Icon as typeof FileText;
              return <article key={title as string}><OutputIcon /><div><h3>{title as string}</h3><p>{copy as string}</p></div></article>;
            })}
          </div>
          <div className="workflow-sale-action">
            <p><strong>One source pack can support several pieces of work.</strong> Reuse verified client facts rather than finding and typing them again for every document.</p>
            <a className="text-link" href="/outputs#workflow-demos">See three complete workflow demonstrations <ArrowRight /></a>
          </div>
        </div>
      </section>

      <QuilterMethod />

      <section className="human-section">
        <div className="shell human-grid">
          <figure className="human-photo">
            <img src="/daren-wallbank.webp" alt="Daren Wallbank at Ginkgo Financial" />
            <figcaption>Daren Wallbank · Founder, Chartered Financial Planner and practising adviser.</figcaption>
          </figure>
          <div className="human-copy">
            <span className="kicker">Built by an adviser who needed it</span>
            <h2>Created inside a Quilter advice firm—not a software lab.</h2>
            <p>Daren built the first workflows at Ginkgo Financial to reduce repeated preparation, surface missing information earlier and give advisers a stronger starting point.</p>
            <a className="text-link" href="/product">Explore the complete product <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="founder-promo">
        <div className="shell founder-promo-grid">
          <div className="founder-brand-lockup"><img src="/ginkgo-financial-logo.png" alt="Ginkgo Financial" /><span>Built in daily advice practice</span></div>
          <div>
            <span className="kicker light">Built inside Ginkgo Financial</span>
            <h2>Advice technology shaped by an adviser who needed it to work.</h2>
            <p>Daren Wallbank built The Advice Engine after seeing how much skilled adviser time disappears into gathering evidence, starting reports, checking files and retracing client needs.</p>
            <a className="text-link light-link" href="/about">Read Daren and Ginkgo’s story <ArrowRight aria-hidden="true" /></a>
          </div>
          <blockquote>“The idea was simple: give the adviser a stronger starting point, without pretending software should make the final decision.”<cite>Daren Wallbank · Founder</cite></blockquote>
        </div>
      </section>

      <section className="section outcomes" id="outcomes">
        <div className="shell">
          <div className="section-intro split-intro">
            <div>
              <span className="kicker">What it changes</span>
              <h2>The work still needs an adviser.<br />It no longer needs a blank page.</h2>
            </div>
            <p>
              This is not a general-purpose chat window. Each workflow is built around a specific
              job, the documents it needs and the evidence a reviewer expects to see.
            </p>
          </div>
          <div className="outcome-grid">
            {outcomes.map(({ icon: Icon, number, title, copy }) => (
              <article className="outcome-card" key={title}>
                <div className="outcome-meta"><span>{number}</span><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section specimen-section" id="proof">
        <div className="shell specimen-grid">
          <div className="specimen-copy">
            <span className="kicker light">What comes out</span>
            <h2>Judge the output.<br />Not the promise.</h2>
            <p>
              A finished Word draft in your firm’s own styling, paired with the QA sheet an adviser
              needs to review it properly. Missing facts are made visible rather than quietly invented.
            </p>
            <ul className="check-list">
              <li><Check aria-hidden="true" /> Firm branding and approved wording</li>
              <li><Check aria-hidden="true" /> Source-attributed facts and calculations</li>
              <li><Check aria-hidden="true" /> Separate adviser QA and information-needed list</li>
            </ul>
            <ArrowButton href="#start" light>Start with a fictitious case</ArrowButton>
          </div>
          <div className="specimen-window">
            <div className="window-toolbar">
              <div><i /><i /><i /></div><span>Annual-review-outcome.docx</span><span>100%</span>
            </div>
            <div className="report-page">
              <div className="report-brand"><span className="mini-mark" /> YOUR FIRM <small>FINANCIAL ADVICE</small></div>
              <span className="draft-pill">DRAFT · ADVISER REVIEW</span>
              <h3>Annual Review Outcome</h3>
              <p className="report-meta">Prepared for Mrs Jane Smith · 14 March 2026</p>
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

      <section className="section smart-files" id="how-it-works">
        <div className="shell smart-grid">
          <div className="file-browser">
            <div className="browser-head">
              <div><FolderSearch aria-hidden="true" /><strong>Suggest relevant files</strong></div>
              <span>Client / Jane Smith / Review 2026</span>
            </div>
            <div className="file-row selected"><span><FileText />Meeting transcript.pdf</span><b>Review objectives and agreed actions</b><Check /></div>
            <div className="file-row selected"><span><FileText />Platform statement.pdf</span><b>Current values and holdings</b><Check /></div>
            <div className="file-row"><span><FileText />ID verification.pdf</span><b>Not relevant to this workflow</b><i /></div>
            <div className="file-row selected"><span><FileText />Previous outcome report.docx</span><b>Compare changes since last review</b><Check /></div>
            <div className="browser-foot"><LockKeyhole /> File contents are fetched only after you confirm the selection.</div>
          </div>
          <div className="smart-copy">
            <span className="kicker">Built around your case files</span>
            <h2>It finds the right evidence before it starts writing.</h2>
            <p>
              Search the client’s OneDrive or SharePoint folder from inside the workflow. The engine
              scans names and dates, suggests the files most likely to matter and tells you why—before
              retrieving their contents.
            </p>
            <div className="step-list">
              <div><span>1</span><p><strong>Choose the job</strong>The workflow knows what evidence that job usually needs.</p></div>
              <div><span>2</span><p><strong>Confirm the source pack</strong>You stay in control of which files are actually used.</p></div>
              <div><span>3</span><p><strong>Review the output</strong>Word draft, QA sheet and workings arrive together.</p></div>
            </div>
            <a className="text-link smart-link" href="/microsoft">Explore the Microsoft 365 integration <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="section gap-section">
        <div className="shell gap-grid">
          <div className="gap-copy">
            <span className="kicker light">The Advice Gap Scanner</span>
            <h2>Your client files already contain the next conversation.</h2>
            <p>
              Find evidenced needs that were discussed but never carried into the review outcome.
              Every finding is quoted and verified against its source before it becomes an agenda item.
            </p>
            <a className="text-link light-link" href="/find.html">See how the Advice Gap Scanner works <ArrowRight /></a>
          </div>
          <div className="gap-evidence">
            <div className="quote-source">Meeting transcript · 14 March 2026</div>
            <blockquote>“There’s the little pension from my old job. I’ve honestly never touched it.”</blockquote>
            <div className="evidence-result">
              <div><span>Verified finding</span><strong>Legacy pension mentioned once, never traced.</strong></div>
              <CircleCheck />
            </div>
            <div className="next-action"><span>Suggested next step</span><strong>Add to the next meeting agenda. Draft an LOA and provider request.</strong></div>
            <p>Conversation prompt only · not advice · fictitious specimen</p>
          </div>
        </div>
      </section>

      <section className="section workflows" id="workflows">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker">One subscription</span><h2>From the first transcript to the annual review.</h2></div>
            <p>Thirty-six named workflows and 25 calculators. Use the client information you already hold to draft, check, calculate, find and organise the work around the case.</p>
          </div>
          <div className="workflow-grid">
            {workflowGroups.map(([group, ...items], index) => {
              const Icons = [FileText, FileCheck2, FolderSearch, Calculator];
              const Icon = Icons[index];
              return (
                <article key={group}>
                  <div className="workflow-icon"><Icon /></div>
                  <h3>{group}</h3>
                  <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              );
            })}
          </div>
          <div className="workflow-cta">
            <span>Plus meeting packs, letters of authority, fee paperwork, client emails, protection tools, fact extraction and more.</span>
            <a href="/product">See how the workflows fit together <ArrowRight /></a>
          </div>
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
            <a className="text-link" href="mailto:hello@theadviceengine.ai?subject=Advice%20Engine%20due%20diligence%20pack">
              Request the due-diligence pack <ArrowRight />
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

      <section className="section pricing" id="pricing">
        <div className="shell">
          <div className="pricing-head">
            <div><span className="kicker light">Simple pricing</span><h2>Clear firm pricing.<br />A founding-adviser advantage.</h2></div>
            <p>Fifteen individual Quilter advisers can join the pre-launch beta free of charge, then receive 50% off their individual subscription for 12 months after launch.</p>
          </div>
          <div className="pricing-grid">
            <article className="price-card featured">
              <span className="price-tag">Most firms</span>
              <p>1–4 advisers</p>
              <div className="price"><strong>£250</strong><span>per adviser<br />per month</span></div>
              <ul><li><Check />All workflows and tools</li><li><Check />Whole team included</li><li><Check />Branding and setup included</li></ul>
              <ArrowButton href="/start" light>Apply for the beta</ArrowButton>
            </article>
            <article className="price-card">
              <p>5–10 advisers</p>
              <div className="price"><strong>£200</strong><span>per adviser<br />per month</span></div>
              <ul><li><Check />All workflows and tools</li><li><Check />Whole team included</li><li><Check />New workflows included</li></ul>
              <a href="/start">Apply for the beta <ArrowRight /></a>
            </article>
            <article className="price-card">
              <p>11+ advisers</p>
              <div className="price"><strong>Let’s talk</strong><span>A commercial arrangement matched to scale.</span></div>
              <ul><li><Check />Firm-wide access</li><li><Check />Onboarding included</li><li><Check />Direct implementation support</li></ul>
              <a href="mailto:hello@theadviceengine.ai?subject=Pricing%20for%2011%2B%20advisers">Ask for pricing <ArrowRight /></a>
            </article>
          </div>
          <p className="pricing-note">Standard 12-month agreement. The founding offer replaces the normal first-month-free offer and cannot be combined with it.</p>
        </div>
      </section>

      <section className="section start-section" id="start">
        <div className="shell start-card">
          <div>
            <BetaAvailability variant="kicker" />
            <h2>Help shape an engine built around real adviser work.</h2>
            <p>Join free throughout beta, begin with a fictitious case and work directly with Daren before deciding whether to continue after launch.</p>
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
