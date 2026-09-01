import { Check, CircleCheck } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";

export default function QuilterPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="For advisers in the Quilter network"
        title="Built from the ground up around Quilter advice work."
        copy="Reports, calculators and QA workflows are structured around the relevant Quilter templates, process documents and calculation logic, then challenged against the applicable requirements encoded from the Q Business Assurance Manual."
      />
      <QuilterMethod />
      <section className="section quilter-section">
        <div className="shell quilter-grid">
          <div>
            <span className="kicker">A better first draft</span>
            <h2>Find the gaps, use the available evidence and redraft before the adviser starts reviewing.</h2>
            <p>The initial sweep does more than produce a list of warnings. Where the confirmed source pack already answers a question, the engine carries that evidence into the draft and shows where it came from. Unresolved points remain separate and visible.</p>
          </div>
          <div className="quilter-points">
            <span><CircleCheck />Built around relevant Quilter templates and processes</span>
            <span><CircleCheck />Initial Business Assurance compliance sweep</span>
            <span><CircleCheck />Evidence-backed gap recovery and redraft</span>
            <span><CircleCheck />Branded Word document, workings and QA sheet</span>
            <span><Check />Independent software; adviser and firm retain responsibility</span>
          </div>
        </div>
      </section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
