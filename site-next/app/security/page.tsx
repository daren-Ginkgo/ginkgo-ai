import type { Metadata } from "next";
import { Database, FileCheck2, KeyRound, LockKeyhole, Server, ShieldCheck } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Security",
  description: "UK processing on Microsoft Azure, sign-in with your firm's own Microsoft work account and MFA, and client material never used to train AI models.",
};

const controls = [
  { icon: KeyRound, title: "Microsoft identity", copy: "Work-account sign-in with the firm’s existing Microsoft controls and MFA." },
  { icon: Server, title: "UK Azure", copy: "The service is hosted using UK Azure-region infrastructure." },
  { icon: Database, title: "Nothing kept after your session", copy: "Nothing is kept in The Advice Engine after your session. The audit log records who ran what and when, never client content." },
  { icon: LockKeyhole, title: "Never used to train AI models", copy: "Your material is never used to train any AI model. That is a binding term of our agreement with our AI provider." },
  { icon: FileCheck2, title: "Adviser QA", copy: "Missing evidence and unresolved points are surfaced in a separate review output." },
  { icon: ShieldCheck, title: "Human responsibility", copy: "The using firm and named adviser retain review, approval and regulatory responsibility." },
];

export default function SecurityPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero eyebrow="Security and governance" title="Built to withstand sensible due-diligence questions." copy="Clear identity controls, conservative data-handling statements and a workflow that keeps adviser responsibility visible from input to final issue." />
      <section className="section controls-section">
        <div className="shell">
          <div className="control-grid">{controls.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><h2>{title}</h2><p>{copy}</p></article>)}</div>
        </div>
      </section>
      {/* Wording approved by Daren on 6 Sep 2026. Verbatim from the approved
          copy, consistent with the ROPA: do not paraphrase or "improve" it.
          Staging only until the DPIA sign-off is recorded. */}
      <section className="section privacy-section">
        <div className="shell narrow-shell privacy-copy">
          <h2>Where your client material goes</h2>
          <p>Your material is processed in the UK on Microsoft Azure, and you sign in with your own firm&apos;s Microsoft work account and MFA.</p>
          <p>To generate a draft, the relevant material is sent to our AI provider, Anthropic. That is a transfer to the United States, covered by EU Standard Contractual Clauses and the UK International Data Transfer Addendum under our commercial agreement with them.</p>
          <p>Your material is never used to train any AI model. That is a binding term of that agreement, not a setting we switch on.</p>
          <p>Nothing is kept in The Advice Engine after your session. The audit log records who ran what and when, never client content. Anthropic holds inputs and outputs briefly for trust and safety purposes and then deletes them: not indefinitely, and never for training.</p>
          <p>Your firm remains the data controller. Anthropic and Microsoft are processors.</p>
          <p>Check your network&apos;s position on third party AI tools before you run live client material. We will support your notification, and the Test Drive uses a fictitious case so you can assess the work before that conversation.</p>
        </div>
      </section>
      {/* Published subprocessor list: keep in step with the DPA's Annex C and
          AEL_Subprocessor_List in the governance folder. Any change here is a
          change there, with 15 days' notice to customer firms. */}
      <section className="section privacy-section">
        <div className="shell narrow-shell privacy-copy">
          <h2>Subprocessors</h2>
          <p>The Advice Engine Ltd (company number 17404907) uses the following subprocessors to provide The Advice Engine. We give customer firms at least 15 days&apos; notice before adding or replacing a subprocessor, and remain fully responsible for our subprocessors&apos; data protection performance.</p>
          <p><strong>Anthropic PBC.</strong> AI drafting (the Claude model): case material relevant to a draft is sent to Anthropic, in the United States, to generate it. The transfer is covered by EU Standard Contractual Clauses and the UK International Data Transfer Addendum under our commercial agreement. Client material is never used to train any AI model, a binding term rather than a setting, and inputs and outputs are held briefly for trust and safety purposes and then deleted. Anthropic holds SOC 2 Type II, SOC 3, ISO 27001, ISO 42001 and CSA STAR L2 certifications, and publishes its own subprocessor list with an objection window.</p>
          <p><strong>Microsoft Corporation.</strong> Cloud hosting: the application, transient session processing and the metadata-only audit log run on Microsoft Azure in the United Kingdom (UK West), under Microsoft&apos;s Products and Services Data Protection Addendum, with platform encryption in transit and at rest.</p>
          <p>No other party processes client personal data on our behalf. Questions or objections: <a href="mailto:hello@theadviceengine.ai">hello@theadviceengine.ai</a>. Last updated 7 September 2026.</p>
        </div>
      </section>
      <section className="section responsibility-section"><div className="shell responsibility-grid"><div><span className="kicker light">A precise boundary</span><h2>The engine supports regulated work. It does not become the regulated adviser.</h2></div><div><p>It drafts, calculates, organises and challenges. It does not provide financial advice, approve financial promotions or certify compliance.</p><ArrowButton href="mailto:hello@theadviceengine.ai?subject=Advice%20Engine%20due%20diligence%20pack" light>Request the due-diligence pack</ArrowButton></div></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
