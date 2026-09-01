import { Calculator, Check, FileCheck2, FileText, Mail, ShieldCheck } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { WorkflowShowcase } from "@/components/workflow-showcase";

export default function OutputsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Outputs and workflow demonstrations" title="Judge the work, not the promise." copy="See how transcripts, client documents and household data become branded Word drafts, adviser QA sheets, cashflow reports and calculation workings." primary={{ href: "#workflow-demos", label: "See the workflows" }} />
      <section className="section workflow-demo-section" id="workflow-demos">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker light">Three flagship demonstrations</span><h2>What goes in.<br />What the engine does.<br />What comes out.</h2></div>
            <p>These fictitious specimens are grounded in the actual Advice Engine workflow definitions, annual-review templates, cashflow outputs and calculator workbooks. They contain no real-client information.</p>
          </div>
          <WorkflowShowcase />
        </div>
      </section>
      <section className="section output-range">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">Professional work, not AI chat</span><h2>Outputs designed for the adviser’s next step.</h2></div><p>The engine can use the same verified client material across connected tasks, so your team spends less time finding, retyping and reformatting the same facts.</p></div>
          <div className="output-range-grid">
            <article><FileText /><span>Branded Word</span><h3>Suitability report</h3><p>A structured, editable draft built from the transcript, fact-find, illustrations and supporting evidence.</p></article>
            <article><FileCheck2 /><span>Review pack</span><h3>Annual review progress or outcome</h3><p>Turn the review meeting, prior record and current position into a clear client report and adviser action list.</p></article>
            <article><Calculator /><span>Planning output</span><h3>Cashflow and calculations</h3><p>Produce a professional cashflow pack and source-labelled workings for charges, tax, withdrawals, critical yield and more.</p></article>
            <article><Mail /><span>Follow-up</span><h3>Client emails and meeting work</h3><p>Draft clear correspondence, meeting packs and follow-up actions from the result without rewriting the case again.</p></article>
          </div>
        </div>
      </section>
      <section className="section output-story" id="specimen">
        <div className="shell output-story-grid">
          <div className="output-document">
            <div className="output-document-top"><span>Your firm</span><b>Draft · adviser review</b></div>
            <h2>Annual Review Outcome</h2>
            <p>Prepared for Alex and Sam Taylor · Fictitious specimen</p>
            <div className="output-rule" />
            <h3>Executive summary</h3>
            <p className="output-body">Your arrangements remain aligned with the objectives and risk position recorded at this review. The actions agreed are set out below.</p>
            <div className="output-table"><div><b>Action</b><b>Evidence</b><b>Status</b></div><div><span>Review legacy pension</span><span>Transcript p.4</span><strong>Confirm</strong></div><div><span>Use ISA allowance</span><span>Platform statement</span><strong className="good">Complete</strong></div></div>
            <div className="output-warning"><strong>Information needed before issue</strong><span>Confirm the current value and plan number of the legacy pension.</span></div>
            <small>Fictitious specimen · adviser review required</small>
          </div>
          <div>
            <span className="kicker">The complete review pack</span>
            <h2>A client-facing draft and an adviser-facing challenge.</h2>
            <p>The two outputs serve different purposes. The Word document communicates clearly; the QA sheet makes the unresolved work impossible to miss.</p>
            <div className="output-features">
              <div><FileText /><span><strong>Branded Word draft</strong>Editable, structured and ready for the firm’s final review.</span></div>
              <div><FileCheck2 /><span><strong>Adviser QA sheet</strong>Evidence, gaps, conflicts and points requiring judgement.</span></div>
              <div><ShieldCheck /><span><strong>Clear responsibility</strong>Every specimen and live output remains a draft until adviser sign-off.</span></div>
            </div>
            <ArrowButton href="/start">Try a fictitious case</ArrowButton>
          </div>
        </div>
      </section>
      <section className="section specimen-note"><div className="shell"><Check /><p>All client names, values and circumstances shown on this page are fictitious specimens created to demonstrate the workflow.</p></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
