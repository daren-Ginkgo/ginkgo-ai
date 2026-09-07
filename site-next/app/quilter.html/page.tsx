import type { Metadata } from "next";
import { Check, CircleCheck } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";

export const metadata: Metadata = {
  title: "For advisers in the Quilter network",
  description: "How The Advice Engine was built around Quilter advice work. Independent software: the adviser and authorised firm retain responsibility.",
};

export default function QuilterPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="For advisers in the Quilter network"
        title="Built from the ground up around Quilter advice work."
        copy="Reports, calculators and QA workflows are built to match the Quilter templates and processes your firm already uses, then challenged against a structured file check built from the COBS 9 suitability requirements and the file standards Quilter firms are typically reviewed against."
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
            <span><CircleCheck />Built to match the Quilter templates and processes your firm already uses</span>
            <span><CircleCheck />Initial pre-review file check on every draft</span>
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
