import type { Metadata } from "next";
import { Calculator, Check, FileCheck2, FileText, Mail, ShieldCheck } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { WorkflowShowcase } from "@/components/workflow-showcase";

export const metadata: Metadata = {
  title: "Outputs",
  description: "Specimen outputs from The Advice Engine: branded draft documents, adviser QA sheets and calculation workings. All specimens are fictitious and labelled as such.",
};

export default function OutputsPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero eyebrow="Outputs and workflow demonstrations" title="Judge the work, not the promise." copy="See how transcripts, client documents and household data become branded Word drafts, adviser QA sheets, cashflow reports and calculation workings. The engine covers every advice area, initial and ongoing, with the single exception of defined benefit transfer advice." primary={{ href: "#workflow-demos", label: "See the workflows" }} />
      <section className="section specimen-pack-slot" id="specimen-pack">
        <div className="shell start-card">
          <div>
            <span className="kicker light">Built on fictitious client data</span>
            <h2>Seven specimens you can open now.</h2>
            <p>Every one is real engine output built on fictitious client data: invented people, invented holdings, invented circumstances, with no real client involved. Each arrives in a firm&apos;s own branding as a draft carrying the review markers an adviser signs off against, and the compliance check and QA sheet are the unedited results for the same case as the report, including the points they raised against it.</p>
          </div>
          <div className="specimen-downloads">
            <a href="/specimens/specimen-suitability-report-draft-investment.docx">
              <strong>Suitability report (draft)</strong>
              <span>A new ISA and collective investment account for a fictitious client. Word, 75 KB</span>
            </a>
            <a href="/specimens/specimen-draft-client-email-alex-and-sam.docx">
              <strong>Draft client email</strong>
              <span>The covering note for a lifetime cashflow plan, with no figure the model did not compute. Word, 50 KB</span>
            </a>
            <a href="/specimens/specimen-meeting-note-annual-review.docx">
              <strong>Meeting note</strong>
              <span>An annual review meeting written up from the recording: summary, action points, advice areas and fact find updates. Word, 74 KB</span>
            </a>
            <a href="/specimens/specimen-adviser-qa-sheet-investment.docx">
              <strong>Adviser QA sheet</strong>
              <span>The checks run against that same report, with the outstanding items listed for the adviser. Word, 73 KB</span>
            </a>
            <a href="/specimens/specimen-compliance-check-investment.docx">
              <strong>Compliance check</strong>
              <span>The file check on the same case, graded partial, with the reasons stated. Word, 73 KB</span>
            </a>
            <a href="/specimens/specimen-bond-encashment-workings.pdf">
              <strong>Bond encashment workings</strong>
              <span>Options on £50,000 from an onshore bond, every figure shown with its source. PDF, 256 KB</span>
            </a>
            <a href="/specimens/specimen-cost-and-charges-workings.pdf">
              <strong>Cost and charges workings</strong>
              <span>First-year costs on a single premium, input by input. PDF, 223 KB</span>
            </a>
            <p className="specimen-downloads-note">
              Prefer to ask? <a href="mailto:hello@theadviceengine.ai?subject=Specimen%20pack%20request">Email for the full pack</a>.
            </p>
          </div>
        </div>
      </section>
      <section className="section workflow-demo-section" id="workflow-demos">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker light">Three flagship demonstrations</span><h2>What goes in.{" "}<br />What the engine does.{" "}<br />What comes out.</h2></div>
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
      {/* SLOT: downloadable specimen pack. Daren is producing the files; when
          they exist, replace the mailto with the download links. Do not
          fabricate specimen documents. */}
      <section className="section specimen-note"><div className="shell"><Check /><p>All client names, values and circumstances shown on this page are fictitious specimens created to demonstrate the workflow.</p></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
