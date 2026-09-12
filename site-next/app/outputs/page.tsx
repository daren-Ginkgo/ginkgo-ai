import type { Metadata } from "next";
import { Calculator, Check, FileCheck2, FileText, Mail, ShieldCheck } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { JourneySpecimen } from "@/components/journey-specimen";
import { WorkflowShowcase } from "@/components/workflow-showcase";

export const metadata: Metadata = {
  title: "Outputs",
  description: "Specimen outputs from The Advice Engine: read a complete fictitious client file across four stages, on screen and in full, alongside three workflow demonstrations. All specimens are built on fictitious client data and labelled as such.",
};

export default function OutputsPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero eyebrow="Outputs and workflow demonstrations" title="Judge the work, not the promise." copy="See how transcripts, client documents and household data become branded Word drafts, adviser QA sheets, cashflow reports and calculation workings. The engine covers every advice area, initial and ongoing, with the single exception of defined benefit transfer advice." primary={{ href: "#full-journey", label: "Read a complete client file" }} secondary={{ href: "#workflow-demos", label: "See the workflows" }} />
      {/* The specimens sit at the top of this page, where the download list used to
          be (the 8 September decision to lead with the work, not the promise). What
          changed on 12 September is the form: they are READ ON SCREEN and there is
          no file to take away. A .docx is a reusable template and a rendered page is
          not, and a firm's report structure should not leave theadviceengine.ai as
          an editable file. The three internal documents from the same run - the
          adviser quality-check, the pre-meeting briefing and the fact find update -
          are not published in any form; what the quality-check FOUND is quoted
          instead. See the note at the top of components/journey-specimen.tsx before
          changing any of this, and do not turn it back into a download. */}
      <span id="specimen-pack" aria-hidden="true" />
      <section className="section full-journey-section" id="full-journey">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker light">Built on fictitious client data</span><h2>One client.<br />Four stages.<br />A full year of the file.</h2></div>
            <p>Real engine output on invented people, invented holdings and invented circumstances, with no real client involved. One client&apos;s file across a full year: four pipelines run back to back in a single sitting, then published unedited. Read them in order and the year reads as a year, because the outcome report answers the progress check and the progress check is measured against the report that opened the case.</p>
          </div>
          <JourneySpecimen />
          {/* The calculator workings stay as files, and that is not a contradiction of
              the reader above. What the reader protects is a firm's REPORT STRUCTURE:
              a .docx suitability report is a template someone can fill in. A PDF of
              arithmetic with its sources named is not a template, cannot be edited
              into a house style, and the workings are only useful if the reader can
              follow the numbers down the page. Both files have been public since
              8 September 2026, so linking them changes discoverability, not exposure.
              Checked 12 Sep 2026: the bond encashment workings carry no provider
              material at all; the cost and charges workings cite "Quilter RAP-1080
              formula" as the source of each figure, which is source-labelling rather
              than a reproduced requirement set. */}
          <div className="spec-calcs">
            <div>
              <span className="kicker">Calculation workings</span>
              <h3>The arithmetic, with every figure showing where it came from.</h3>
              <p>These two stay as files, because a page of workings is meant to be followed line by line and a PDF of arithmetic is not a template anyone can fill in. Same fictitious basis as everything else here.</p>
            </div>
            <div className="spec-calc-links">
              <a href="/specimens/specimen-bond-encashment-workings.pdf">
                <strong>Bond encashment workings</strong>
                <span>Options on &pound;50,000 from an onshore bond, every figure shown with its source. PDF, 256 KB</span>
              </a>
              <a href="/specimens/specimen-cost-and-charges-workings.pdf">
                <strong>Cost and charges workings</strong>
                <span>First-year costs on a single premium, input by input. PDF, 223 KB</span>
              </a>
            </div>
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
      <section className="section specimen-note"><div className="shell"><Check /><p>All client names, values and circumstances shown on this page are fictitious specimens created to demonstrate the workflow.</p></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
