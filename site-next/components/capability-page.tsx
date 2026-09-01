import { Check, CircleCheck, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export type Capability = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  outcomeTitle: string;
  outcomes: string[];
  steps: { title: string; copy: string }[];
  specimenTitle: string;
  specimenCopy: string;
};

export function CapabilityPage({ data }: { data: Capability }) {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow={data.eyebrow} title={data.title} copy={data.copy} image={data.image} imageAlt={data.imageAlt} />
      <section className="section page-outcomes">
        <div className="shell narrow-shell">
          <span className="kicker">What your firm gets</span>
          <h2>{data.outcomeTitle}</h2>
          <div className="benefit-list">
            {data.outcomes.map((item) => <div key={item}><CircleCheck aria-hidden="true" /><span>{item}</span></div>)}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker light">A controlled workflow</span><h2>Evidence in. Adviser-reviewed work out.</h2></div>
            <p>The engine helps assemble and check the work; the adviser retains responsibility for the final decision and issue.</p>
          </div>
          <div className="process-grid">
            {data.steps.map((step, index) => (
              <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="section capability-specimen">
        <div className="shell capability-specimen-grid">
          <div>
            <span className="kicker">Fictitious specimen</span>
            <h2>{data.specimenTitle}</h2>
            <p>{data.specimenCopy}</p>
            <ul className="check-list dark-list">
              <li><Check />Source evidence remains visible</li>
              <li><Check />Missing facts are flagged, not invented</li>
              <li><Check />Named-adviser review is required</li>
            </ul>
          </div>
          <div className="mini-output-card">
            <div className="mini-output-top"><FileText /><span>Client output</span><b>Draft</b></div>
            <h3>{data.specimenTitle}</h3>
            <p>Prepared for Mrs Jane Smith · Fictitious specimen</p>
            <div className="mini-lines"><i /><i /><i /></div>
            <div className="mini-qa"><FileCheck2 /><div><strong>Adviser QA</strong><span>Evidence checked · items to confirm shown</span></div><ShieldCheck /></div>
          </div>
        </div>
      </section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
