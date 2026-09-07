import type { Metadata } from "next";
import { FileCheck2, FileText } from "lucide-react";
import { ArrowButton, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Evidence",
  description: "Every figure in an Advice Engine draft points back to the document it came from. Every gap is flagged rather than filled. The named adviser reviews, approves and issues.",
};

// Assembled, not authored (handover 2, task C): every sentence on this page
// already exists elsewhere on the site. Do not add claims here, and never any
// "audit-ready", "audit-proof" or "due-diligence ready" language: the page
// describes a method, not a promise.
export default function EvidencePage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="Can you defend it?"
        title="Written to survive a file review."
        copy="A draft is only useful if you can stand behind it. Every figure in an Advice Engine draft points back to the document it came from. Every gap is flagged rather than filled. The named adviser reviews, approves and issues, and the file shows that they did."
        primary={{ href: "/start", label: "Apply for a founding place" }}
        secondary={{ href: "/outputs", label: "See the specimen outputs" }}
      />

      {/* 1. The sourcing rule, verbatim from /product */}
      <section className="section evidence-rule-section">
        <div className="shell narrow-shell">
          <span className="kicker">The sourcing rule</span>
          <div className="quilter-method-rule evidence-rule">
            <strong>The rule is simple</strong>
            <span>If the evidence is present, use it and show its source. If it is absent, flag it for the adviser. Do not guess.</span>
          </div>
        </div>
      </section>

      {/* 2. What a flagged gap looks like: the live specimen component, shown not described */}
      <section className="section evidence-gap-section">
        <div className="shell output-story-grid">
          <div className="output-document">
            <div className="output-document-top"><span>Your firm</span><b>Draft · adviser review</b></div>
            <h2>Annual Review Outcome</h2>
            <p>Prepared for Alex and Sam Taylor · Fictitious specimen</p>
            <div className="output-rule" />
            <div className="output-table"><div><b>Action</b><b>Evidence</b><b>Status</b></div><div><span>Review legacy pension</span><span>Transcript p.4</span><strong>Confirm</strong></div><div><span>Use ISA allowance</span><span>Platform statement</span><strong className="good">Complete</strong></div></div>
            <div className="output-warning"><strong>Information needed before issue</strong><span>Confirm the existing employer pension details before issue.</span></div>
            <small>Fictitious specimen · adviser review required</small>
          </div>
          <div>
            <span className="kicker">What a flagged gap looks like</span>
            <h2>Missing facts are made visible rather than quietly invented.</h2>
            <p>Where the case evidence cannot answer a question, the draft says so in the document itself, and the flag stays there until the adviser resolves it.</p>
            <div className="output-features">
              <div><FileText /><span><strong>Source-attributed facts and calculations</strong>Every figure carried forward with its source visible.</span></div>
              <div><FileCheck2 /><span><strong>Separate information-needed list</strong>The unresolved work is impossible to miss.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The adviser QA sheet, rendered as its own artefact */}
      <section className="section evidence-qa-section">
        <div className="shell output-story-grid">
          <div>
            <span className="kicker">The adviser QA sheet</span>
            <h2>A client-facing draft and an adviser-facing challenge.</h2>
            <p>The two outputs serve different purposes. The Word document communicates clearly; the QA sheet makes the unresolved work impossible to miss: evidence, gaps, conflicts and points requiring judgement.</p>
          </div>
          <div className="output-document">
            <div className="output-document-top"><span>Adviser QA sheet</span><b>Separate from the client draft</b></div>
            <h2>Adviser QA</h2>
            <p>Annual Review Outcome · Alex and Sam Taylor · Fictitious specimen</p>
            <div className="output-rule" />
            <div className="output-table qa-two-col">
              <div><b>Check</b><b>Result</b></div>
              <div><span>Framework review</span><strong className="good">Complete</strong></div>
              <div><span>Source checks</span><strong className="good">Complete</strong></div>
              <div><span>Evidence used</span><strong>Shown</strong></div>
              <div><span>Missing facts</span><strong>Flagged</strong></div>
              <div><span>Items to confirm</span><strong>2</strong></div>
              <div><span>Final decision</span><strong>Adviser</strong></div>
            </div>
            {/* PLACEHOLDER: abbreviated specimen assembled from the live QA
                fragments. Daren to supply the full QA sheet example content. */}
            <small>Abbreviated specimen · the full QA sheet example is to follow</small>
          </div>
        </div>
      </section>

      {/* 4. Where the line sits: boundary paragraph shared with /security */}
      <section className="section responsibility-section">
        <div className="shell responsibility-grid">
          <div>
            <span className="kicker light">Where the line sits</span>
            <h2>The engine supports regulated work. It does not become the regulated adviser.</h2>
          </div>
          <div>
            <p>It drafts, calculates, organises and challenges. It does not provide financial advice, approve financial promotions or certify compliance.</p>
            <p>Check your network&apos;s position on third party AI tools before you run live client material. We will support your notification, and the Test Drive uses a fictitious case so you can assess the work before that conversation.</p>
            <ArrowButton href="/demo" light>Talk to Daren</ArrowButton>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
