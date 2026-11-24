import type { Metadata } from "next";
import { ArrowRight, Calculator, CalendarDays, FileCheck2, FileText, FolderSearch, MessagesSquare } from "lucide-react";
import { FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";
import { QuilterMethod } from "@/components/quilter-method";

export const metadata: Metadata = {
  title: "Product",
  description: "How The Advice Engine turns client case material into branded draft documents, adviser QA checks and auditable calculations for UK advice firms.",
};

const groups = [
  { icon: FolderSearch, title: "Pre-advice", copy: "Initial meeting, meeting notes, attitude to risk, fee paperwork, letters of authority, ceding scheme research and the fact find.", href: "/microsoft" },
  { icon: FileText, title: "Reports", copy: "Every suitability report from one upload, the full file check, and Improve a draft.", href: "/outputs" },
  { icon: CalendarDays, title: "Annual Advice", copy: "Progress check, meeting agenda, outcome report and fund switch report, in the order the work happens.", href: "/outputs" },
  { icon: Calculator, title: "Tools", copy: "Over 20 adviser calculators, the IHT and pensions tools, and the advice gap scanner.", href: "/gap-scanner" },
  { icon: FileCheck2, title: "Case assessment", copy: "Quilter's feedback on a report, sorted point by point, and Check a finished report.", href: "/evidence" },
  { icon: MessagesSquare, title: "Ask anything", copy: "Quilter compliance questions, answered from Quilter's own documents with the source quoted.", href: "/quilter-data" },
];

export default function ProductPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="The adviser workflow engine"
        title="Give it the client material. Confirm the report. Review the draft."
        copy="The Advice Engine turns transcripts, client documents and existing case data into branded drafts, calculations and QA packs built to match the Quilter templates your firm already uses and challenged against the COBS 9 suitability requirements before the adviser's first review."
      />
      <section className="section product-flow-section">
        <div className="shell product-flow-grid">
          <div>
            <span className="kicker light">Simple at the point of use</span>
            <h2>One familiar pattern across the whole engine.</h2>
            <p>Drag and drop the files, or select the relevant material from SharePoint or OneDrive. The engine reads the case, suggests the report and asks only for what is missing.</p>
          </div>
          <div className="product-flow-steps">
            <div><span>1</span><strong>Add the client material</strong><small>Transcripts, PDFs, Word files, spreadsheets and existing records</small></div>
            <div><span>2</span><strong>Check data</strong><small>The engine suggests the report and your advice intention. You confirm it.</small></div>
            <div><span>3</span><strong>Answer what is missing</strong><small>Type it, say it or add a document. A gap you leave stays visible in the draft.</small></div>
            <div><span>4</span><strong>Build the report</strong><small>Checked against COBS 9 suitability requirements and the file standards Quilter firms are reviewed against</small></div>
            <div><span>5</span><strong>Review the report and the adviser QA file</strong><small>A named adviser approves every draft</small></div>
          </div>
        </div>
      </section>
      <QuilterMethod rule="link" />
      {/* The adviser job table moved up to the homepage, 7 Sep 2026 (handover 2, task B). */}
      <section className="section product-directory">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">Over 40 focused workflows</span><h2>Six areas. One upload for every report.</h2></div><p>Each area asks for the right evidence, makes the relevant checks and produces a defined output.</p></div>
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
