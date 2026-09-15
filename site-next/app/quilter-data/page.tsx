import type { Metadata } from "next";
import { BookOpenCheck, Check, FileText, Landmark, LineChart } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Quilter data, built in",
  description: "WealthSelect and Cirilium charges and performance from the current factsheets, Quilter Investment Platform valuations cross-checked against the case pack, and Quilter attitude-to-risk terminology throughout.",
};

// Every statement here is on the verified-facts list of the 15 Sep 2026 build
// plan: the Quilter data layer is live inside the app. No Quilter logo is used;
// the acknowledgement is text only, matching the footer. The worked example is a
// fictitious client with illustrative figures, and says so on the page.
const layers = [
  { icon: LineChart, title: "WealthSelect and Cirilium", copy: "Portfolio charges and performance are drawn from the current factsheets and pulled into the draft automatically. Each figure is cited to the factsheet it came from and the date of that factsheet." },
  { icon: Landmark, title: "Platform valuations", copy: "Quilter Investment Platform values are cross-checked against the case pack. Where the case pack and the platform disagree, the discrepancy is flagged on the adviser QA sheet rather than resolved silently." },
  { icon: BookOpenCheck, title: "Quilter language", copy: "Attitude-to-risk terminology and the report structure match what Quilter's file-check team expects to read. The draft speaks the network's language from the first page." },
];

export default function QuilterDataPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="Quilter data, built in"
        title="Knows Quilter's platform, portfolios and charges out of the box."
        copy="WealthSelect and Cirilium charges and performance, Quilter Investment Platform valuations and Quilter attitude-to-risk terminology are part of the engine's own data layer. Nothing is re-keyed, and every figure is cited to the document it came from."
        secondary={{ href: "/compliance", label: "Read the compliance page" }}
      />

      <section className="section controls-section">
        <div className="shell">
          <div className="control-grid quilter-data-grid">
            {layers.map(({ icon: Icon, title, copy }) => <article key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section output-story" id="worked-example">
        <div className="shell output-story-grid">
          <div>
            <span className="kicker">A worked example</span>
            <h2>A factsheet figure lands in the report with its source attached.</h2>
            <p>The adviser selects the case pack. The engine identifies the portfolio, reads the current factsheet, and writes the charge into the draft with the factsheet date beside it. The adviser QA sheet records the same source, so the file-checker can follow the figure back without asking.</p>
            <div className="output-features">
              <div><FileText aria-hidden="true" /><span><strong>Cited in the draft</strong>The paragraph names the factsheet and its date, not just the number.</span></div>
              <div><Check aria-hidden="true" /><span><strong>Checked on the QA sheet</strong>The same figure and source appear on the adviser QA sheet for review.</span></div>
            </div>
            <ArrowButton href="/outputs">See the specimen outputs</ArrowButton>
          </div>
          <div className="output-document quilter-example">
            <div className="output-document-top"><span>Your firm</span><b>Draft · adviser review</b></div>
            <h2>Suitability Report</h2>
            <p>Prepared for Alex and Sam Taylor · Fictitious specimen</p>
            <div className="output-rule" />
            <h3>Costs and charges</h3>
            <p className="output-body">
              The ongoing charge for the recommended WealthSelect Managed Portfolio (Balanced) is{" "}
              <mark className="source-figure">0.58% a year<small>WealthSelect factsheet, 31 July 2026</small></mark>, in addition to the platform charge set out in your illustration.
            </p>
            <div className="output-table quilter-source-table">
              <div><b>Figure</b><b>Source</b><b>Status</b></div>
              <div><span>Ongoing charge 0.58%</span><span>WealthSelect factsheet, 31 Jul 2026</span><strong className="good">Cited</strong></div>
              <div><span>Platform value £186,420</span><span>QIP valuation, 12 Aug 2026</span><strong className="good">Matches case pack</strong></div>
              <div><span>Risk profile</span><span>Quilter ATR: Balanced</span><strong className="good">Quilter term</strong></div>
            </div>
            <small>Fictitious client, illustrative figures. The live engine reads the current factsheet and cites its date.</small>
          </div>
        </div>
      </section>

      <section className="specimen-note"><div className="shell"><Check aria-hidden="true" /><p>WealthSelect and Cirilium are Quilter product names, used here to describe the data the engine reads. Quilter is a trade mark of its owner; The Advice Engine is an independent product of The Advice Engine Ltd. No Quilter logo is used and all client data on this page is fictitious.</p></div></section>
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
