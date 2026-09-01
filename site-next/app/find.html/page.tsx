import { ArrowRight, Check, CircleCheck, FileSearch, FileText, MessagesSquare, ScanSearch } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

const scannerBenefits = [
  { icon: MessagesSquare, title: "Meeting transcripts first", copy: "Clients often mention an old pension, protection concern or unfinished objective in conversation long before it reaches the structured record." },
  { icon: FileSearch, title: "Source quote attached", copy: "Every surfaced finding carries the wording and source file the adviser can use to check the context." },
  { icon: ScanSearch, title: "Unfinished needs prioritised", copy: "The scanner distinguishes a passing reference from a need that appears to have been raised but not carried into the recorded outcome." },
  { icon: Check, title: "Next conversation prepared", copy: "Verified findings become agenda prompts and possible follow-up work—not automated advice or a judgement on earlier advice." },
];

export default function AdviceGapPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="The Advice Gap Scanner"
        title="Find the client needs already hiding in the file."
        copy="Point the engine at the evidence you already hold—especially meeting transcripts—and surface needs, concerns and agreed actions that were discussed but never carried forward. Every finding is tied back to its source for adviser verification."
        primary={{ href: "/start", label: "Apply for the founding beta" }}
        secondary={{ href: "/microsoft", label: "See the OneDrive workflow" }}
      />

      <section className="section gap-story-section">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker">Fictitious specimen</span><h2>From one overlooked sentence to a useful next conversation.</h2></div>
            <p>The value is not an AI guess. It is the ability to search the client’s own words at scale, verify the evidence and put an unfinished matter back in front of the adviser.</p>
          </div>
          <div className="gap-story-flow">
            <article>
              <div className="gap-story-label"><FileText />Source evidence</div>
              <span>Annual review transcript · 14 March 2026</span>
              <blockquote>“I still have an old pension from my previous job. I’m not sure what it’s doing now.”</blockquote>
              <small>Meeting_2026-03-14.pdf · source verified</small>
            </article>
            <div className="gap-story-arrow"><ArrowRight /></div>
            <article className="gap-story-result">
              <div className="gap-story-label"><ScanSearch />Scanner finding</div>
              <span>Potential missed opportunity</span>
              <h3>Legacy pension mentioned, but no later action located.</h3>
              <small><CircleCheck />Verified source · adviser to confirm context</small>
            </article>
            <div className="gap-story-arrow"><ArrowRight /></div>
            <article>
              <div className="gap-story-label"><MessagesSquare />Next conversation</div>
              <span>Suggested agenda item</span>
              <h3>Ask whether the client wants the scheme traced and reviewed.</h3>
              <small>Possible follow-up: draft LOA and provider request</small>
            </article>
          </div>
          <p className="specimen-disclaimer">Fictitious example · conversation prompt only · not advice · not a review of past advice</p>
        </div>
      </section>

      <section className="section scanner-benefits-section">
        <div className="shell scanner-benefits-grid">
          {scannerBenefits.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><h2>{title}</h2><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section two-gap-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker light">Two different questions</span><h2>Find missing evidence—and find missed opportunity.</h2></div><p>The same client folder can support two distinct checks. Keeping them separate makes each result clearer and safer for the adviser to use.</p></div>
          <div className="two-gap-grid">
            <article><span>01 · Before an output</span><h3>Case-readiness gap analysis</h3><p>Does the selected source pack contain the evidence needed for this suitability report, review or cashflow?</p><ul><li><Check />Suggest the likely relevant files</li><li><Check />Flag missing, stale or conflicting information</li><li><Check />Add new evidence and recheck before drafting</li></ul></article>
            <article><span>02 · Across the relationship</span><h3>Advice Gap Scanner</h3><p>Did the client raise a need, concern or objective that never appeared in the recorded action or outcome?</p><ul><li><Check />Quote and verify the original source</li><li><Check />Surface the unfinished conversation</li><li><Check />Prepare an adviser-owned next step</li></ul></article>
          </div>
          <div className="gap-control-note"><strong>The adviser remains in control.</strong><span>The scanner does not invent facts, provide advice or make a judgement about earlier advice. It finds evidence and prepares a conversation for a named adviser to assess.</span><ArrowButton href="/start" light>Apply for a founding place</ArrowButton></div>
        </div>
      </section>

      <FinalCta />
      <SiteFooter />
    </main>
  );
}
