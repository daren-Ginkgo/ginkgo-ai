import { BookOpenCheck, FileCheck2, FolderCheck, RefreshCw, ScanSearch, ShieldCheck } from "lucide-react";

const stages = [
  {
    icon: BookOpenCheck,
    number: "01",
    title: "Built on the Quilter foundation",
    copy: "Reports and calculators are designed from the ground up around the relevant Quilter templates, process documents and calculation logic used by advice firms.",
  },
  {
    icon: ScanSearch,
    number: "02",
    title: "Initial compliance sweep",
    copy: "Before presenting a first draft, the workflow challenges the case against the applicable requirements encoded from the Q Business Assurance Manual.",
  },
  {
    icon: FolderCheck,
    number: "03",
    title: "Recover what the file already contains",
    copy: "Where supporting evidence exists in the confirmed case material, the engine brings it into the right section and preserves its source.",
  },
  {
    icon: RefreshCw,
    number: "04",
    title: "Redraft after the challenge",
    copy: "The document is rebuilt after the initial sweep so the adviser receives a more complete starting point, rather than a draft that merely lists its own failures.",
  },
  {
    icon: FileCheck2,
    number: "05",
    title: "Show what still needs judgement",
    copy: "Anything the evidence cannot safely resolve remains visible in the adviser QA sheet and information-needed list—never silently invented.",
  },
];

export function QuilterMethod() {
  return (
    <section className="section quilter-method-section" id="quilter-method">
      <div className="shell">
        <div className="section-intro split-intro">
          <div>
            <span className="kicker light">Built for Quilter advice work</span>
            <h2>Compliance is the first pass.<br />Not the final obstacle.</h2>
          </div>
          <div className="quilter-method-intro">
            <p>Every workflow is designed to improve the draft before the adviser sees it: structured around Quilter material, challenged against Business Assurance requirements, then redrafted using the evidence already available.</p>
            <div><ShieldCheck /><span><strong>Independent software—not Quilter approval</strong>References describe the framework the engine is built and checked against. The authorised firm and named adviser retain responsibility.</span></div>
          </div>
        </div>
        <div className="quilter-method-flow">
          {stages.map(({ icon: Icon, number, title, copy }) => (
            <article key={number}>
              <div><span>{number}</span><Icon /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="quilter-method-rule">
          <strong>The rule is simple</strong>
          <span>If the evidence is present, use it and show its source. If it is absent, flag it for the adviser. Do not guess.</span>
        </div>
      </div>
    </section>
  );
}
