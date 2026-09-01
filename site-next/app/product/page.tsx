import { ArrowRight, Calculator, FileCheck2, FileText, FolderSearch, Search, ShieldCheck } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";

const groups = [
  { icon: FileText, title: "Draft", copy: "Create branded suitability reports, annual-review progress and outcome reports, cashflow packs, meeting packs and client correspondence.", href: "/suitability.html" },
  { icon: FileCheck2, title: "Check", copy: "Review the source evidence, structure, consistency and missing facts before a document reaches formal adviser review.", href: "/compliance.html" },
  { icon: Search, title: "Find", copy: "Surface evidenced client needs that were discussed but never carried forward, ready for the next adviser conversation.", href: "/find.html" },
  { icon: FolderSearch, title: "Organise", copy: "Use uploaded material or select relevant OneDrive and SharePoint files without rebuilding the case by hand.", href: "/organise.html" },
  { icon: Calculator, title: "Calculate", copy: "Run 25 adviser calculators and carry source-labelled figures and workings into the wider case output.", href: "/outputs" },
  { icon: ShieldCheck, title: "Govern", copy: "Keep the client draft, unresolved information, calculation workings and named-adviser decisions clearly separated.", href: "/security" },
];

const jobs = [
  ["Suitability", "Transcript + fact-find + illustrations", "Branded suitability-report draft + adviser QA"],
  ["Annual review", "Meeting record + previous report + current values", "Progress-check or outcome report + action list"],
  ["Cashflow", "Household data + objectives + agreed assumptions", "Professional cashflow report + client email draft"],
  ["Calculators", "Case figures + source documents", "Workings for charges, CGT, withdrawals, critical yield and more"],
];

export default function ProductPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="The adviser workflow engine"
        title="Give it the client material. Tell it the job. Review professional work."
        copy="The Advice Engine turns transcripts, client documents and existing case data into branded drafts, calculations and QA packs built around Quilter templates and challenged against applicable Q Business Assurance requirements."
      />
      <section className="section product-flow-section">
        <div className="shell product-flow-grid">
          <div>
            <span className="kicker light">Simple at the point of use</span>
            <h2>One familiar pattern across the whole engine.</h2>
            <p>Drag and drop the files, or select the relevant material from SharePoint or OneDrive. The chosen workflow knows what evidence it needs, what checks to make and what output to create.</p>
          </div>
          <div className="product-flow-steps">
            <div><span>1</span><strong>Add the client material</strong><small>Transcripts, PDFs, Word files, spreadsheets and existing records</small></div>
            <div><span>2</span><strong>Select the adviser job</strong><small>Suitability, review, cashflow, calculator, meeting or file task</small></div>
            <div><span>3</span><strong>Run the initial compliance sweep</strong><small>Challenge the evidence and draft against the applicable Business Assurance requirements</small></div>
            <div><span>4</span><strong>Fill supportable gaps and redraft</strong><small>Use confirmed case evidence where it exists; visibly flag what cannot be resolved</small></div>
            <div><span>5</span><strong>Review the complete pack</strong><small>Branded draft, QA points, evidence and calculation workings</small></div>
          </div>
        </div>
      </section>
      <QuilterMethod />
      <section className="section job-map-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">From source material to useful work</span><h2>Show the engine the case once. Put it to work in different ways.</h2></div><p>The value is not a single report. It is the time saved across the repeated drafting, checking, calculating and follow-up work surrounding the same client.</p></div>
          <div className="job-map">
            <div className="job-map-head"><span>Adviser job</span><span>What goes in</span><span>What comes out</span></div>
            {jobs.map(([job, input, output]) => <div className="job-map-row" key={job}><strong>{job}</strong><span>{input}</span><span>{output}</span></div>)}
          </div>
        </div>
      </section>
      <section className="section product-directory">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">36 focused workflows</span><h2>Choose the job. The engine structures the work.</h2></div><p>Each workflow asks for the right evidence, performs the relevant checks and produces a defined output. The simple interface stays familiar while the task changes.</p></div>
          <div className="directory-grid">
            {groups.map(({ icon: Icon, title, copy, href }) => (
              <a href={href} className="directory-card" key={title}><Icon /><span>{title}</span><h3>{copy}</h3><b>Explore <ArrowRight /></b></a>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
