import { Database, FileCheck2, KeyRound, LockKeyhole, Server, ShieldCheck } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

const controls = [
  { icon: KeyRound, title: "Microsoft identity", copy: "Work-account sign-in with the firm’s existing Microsoft controls and MFA." },
  { icon: Server, title: "UK Azure", copy: "The service is hosted using UK Azure-region infrastructure." },
  { icon: Database, title: "No client files written to disk", copy: "Case material is processed for the workflow rather than stored as local client files by the engine." },
  { icon: LockKeyhole, title: "No training on client information", copy: "Client material is not used to train the underlying models." },
  { icon: FileCheck2, title: "Adviser QA", copy: "Missing evidence and unresolved points are surfaced in a separate review output." },
  { icon: ShieldCheck, title: "Human responsibility", copy: "The using firm and named adviser retain review, approval and regulatory responsibility." },
];

export default function SecurityPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Security and governance" title="Built to withstand sensible due-diligence questions." copy="Clear identity controls, conservative data-handling statements and a workflow that keeps adviser responsibility visible from input to final issue." />
      <section className="section controls-section">
        <div className="shell">
          <div className="control-grid">{controls.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><h2>{title}</h2><p>{copy}</p></article>)}</div>
        </div>
      </section>
      <section className="section responsibility-section"><div className="shell responsibility-grid"><div><span className="kicker light">A precise boundary</span><h2>The engine supports regulated work. It does not become the regulated adviser.</h2></div><div><p>It drafts, calculates, organises and challenges. It does not provide financial advice, approve financial promotions or certify compliance.</p><ArrowButton href="mailto:hello@theadviceengine.ai?subject=Advice%20Engine%20due%20diligence%20pack" light>Request the due-diligence pack</ArrowButton></div></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
