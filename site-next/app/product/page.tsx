import type { Metadata } from "next";
import { ArrowRight, Calculator, FileCheck2, FileText, FolderSearch, Search, ShieldCheck } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";

export const metadata: Metadata = {
  title: "Product",
  description: "How The Advice Engine turns client case material into branded draft documents, adviser QA checks and auditable calculations for UK advice firms.",
};

const groups = [
  { icon: FileText, title: "Draft", copy: "Create branded suitability reports, annual-review progress and outcome reports, cashflow packs, meeting packs and client correspondence.", href: "/outputs" },
  { icon: FileCheck2, title: "Check", copy: "Review the source evidence, structure, consistency and missing facts before a document reaches formal adviser review.", href: "/evidence" },
  { icon: Search, title: "Gap Scanner", copy: "Surface evidenced client needs that were discussed but never carried forward, ready for the next adviser conversation.", href: "/gap-scanner" },
  { icon: FolderSearch, title: "Organise", copy: "Use uploaded material or select relevant OneDrive and SharePoint files without rebuilding the case by hand.", href: "/microsoft" },
  { icon: Calculator, title: "Calculate", copy: "Run 25 adviser calculators and carry source-labelled figures and workings into the wider case output.", href: "/outputs" },
  { icon: ShieldCheck, title: "Govern", copy: "Keep the client draft, unresolved information, calculation workings and named-adviser decisions clearly separated.", href: "/security" },
];

export default function ProductPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="The adviser workflow engine"
        title="Give it the client material. Tell it the job. Review professional work."
        copy="The Advice Engine turns transcripts, client documents and existing case data into branded drafts, calculations and QA packs built to match the Quilter templates your firm already uses and challenged against the COBS 9 suitability requirements before the adviser's first review."
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
            <div><span>3</span><strong>Run the pre-review file check</strong><small>Challenge the evidence and draft against COBS 9 suitability requirements and the file standards Quilter firms are reviewed against</small></div>
            <div><span>4</span><strong>Fill supportable gaps and redraft</strong><small>Use confirmed case evidence where it exists; visibly flag what cannot be resolved</small></div>
            <div><span>5</span><strong>Review the complete pack</strong><small>Branded draft, QA points, evidence and calculation workings</small></div>
          </div>
        </div>
      </section>
      <QuilterMethod />
      {/* The adviser job table moved up to the homepage, 7 Sep 2026 (handover 2, task B). */}
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
