import { ArrowRight, Check, Lightbulb, Rocket, Settings2, Users } from "lucide-react";
import { ArrowButton, FinalCta, SiteFooter, SiteHeader } from "@/components/marketing";

const timeline = [
  { icon: Lightbulb, label: "The problem", title: "Too much expert time was being spent rebuilding the file.", copy: "Evidence sat across meeting notes, documents, calculations and previous correspondence. Starting the next piece of work often meant retracing the same ground." },
  { icon: Settings2, label: "The first workflows", title: "Turn repeatable advice work into controlled processes.", copy: "Instead of a blank AI chat, Daren shaped focused workflows around the job, the evidence it needed and the output an adviser could review." },
  { icon: Rocket, label: "The Advice Engine beta", title: "Draft, check, calculate, find and organise in one engine.", copy: "The workflows developed into a broader platform with branded Word outputs, QA sheets, calculators and source-backed opportunity finding." },
  { icon: Users, label: "Founding advisers", title: "The next stage is learning with 15 individual Quilter advisers.", copy: "The founding beta brings practising advisers into the development process before commercial launch." },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="founder-hero">
        <div className="shell founder-hero-grid">
          <div>
            <span className="kicker light">Daren, Ginkgo and The Advice Engine</span>
            <h1>Built inside an advice firm, not a software lab.</h1>
            <p>The Advice Engine began with a practising adviser asking a practical question: why should skilled people keep losing hours to the same preparation, drafting and checking work?</p>
            <div className="hero-actions"><ArrowButton href="/product" light>Explore the engine</ArrowButton><a className="text-link light-link" href="/demo">Talk to Daren <ArrowRight /></a></div>
          </div>
          <div className="founder-identity">
            <img className="founder-portrait" src="/daren-wallbank.webp" alt="Daren Wallbank at Ginkgo Financial" />
            <div><span>Founder</span><h2>Daren Wallbank</h2><p>Practising financial adviser<br />Ginkgo Financial</p></div>
          </div>
        </div>
      </section>

      <section className="section origin-section">
        <div className="shell origin-grid">
          <div><span className="kicker">The origin</span><h2>Ginkgo became the working environment for a better way to prepare advice.</h2></div>
          <div><p>The Advice Engine grew from the day-to-day reality of an advice business: client information held across different files, repeated document preparation, compliance checks that arrive late in the process, and valuable needs buried in the history.</p><p>Daren’s answer was not to ask AI to replace the adviser. It was to make the preparation more structured, the evidence easier to see and the draft easier to challenge.</p><div className="origin-principles"><span><Check />Adviser judgement stays central</span><span><Check />Evidence is shown, not obscured</span><span><Check />Missing information is flagged, not invented</span></div></div>
        </div>
      </section>

      <section className="section story-timeline">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker light">From frustration to working engine</span><h2>A product shaped one advice workflow at a time.</h2></div><p>No invented overnight-success story—just a practical sequence of problems, workflows, testing and improvement.</p></div>
          <div className="timeline-grid">{timeline.map(({ icon: Icon, label, title, copy }, index) => <article key={label}><div><Icon /><span>0{index + 1}</span></div><small>{label}</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section ginkgo-section">
        <div className="shell ginkgo-grid">
          <figure className="ginkgo-brand-card">
            <img src="/ginkgo-financial-logo.png" alt="Ginkgo Financial" />
            <figcaption>Where The Advice Engine was first conceived, built and tested in daily practice.</figcaption>
          </figure>
          <div><span className="kicker">The proving ground</span><h2>Why Ginkgo matters to the story.</h2><p>Ginkgo Financial provided the real operating context in which The Advice Engine’s workflows were conceived and shaped. That matters because the product starts with adviser work and adviser responsibility—not with a technology searching for a use.</p><p>The next chapter is to learn with 15 founding Quilter advisers and refine the engine around a wider range of genuine advice workflows.</p></div>
        </div>
      </section>

      <FinalCta />
      <SiteFooter />
    </main>
  );
}
