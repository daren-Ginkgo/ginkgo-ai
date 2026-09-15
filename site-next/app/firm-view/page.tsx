import type { Metadata } from "next";
import { BarChart3, Download, FileCheck2, Hammer, ListChecks, Users } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Firm view (in development)",
  description: "The principal's view of The Advice Engine, in development for Q4 2026: cases drafted, QA grades by adviser, items outstanding and exportable MI, without exposing client content.",
  // A placeholder for a screen that does not exist yet. Linked only from the
  // roadmap, kept out of the sitemap and out of search until it is live.
  robots: { index: false, follow: true },
};

// Build plan 15 Sep 2026, section 2.4: a labelled placeholder. Every number and
// name below is fictitious and the mock is marked as a mock. Nothing here may
// be presented as live until the screen exists.
const advisers = [
  { name: "A. Morgan", drafted: 14, a: 9, b: 4, c: 1, outstanding: 2 },
  { name: "S. Okafor", drafted: 11, a: 8, b: 3, c: 0, outstanding: 1 },
  { name: "R. Hughes", drafted: 9, a: 5, b: 3, c: 1, outstanding: 3 },
  { name: "J. Whitfield", drafted: 8, a: 6, b: 2, c: 0, outstanding: 1 },
];

export default function FirmViewPage() {
  const totals = advisers.reduce((acc, row) => ({ drafted: acc.drafted + row.drafted, outstanding: acc.outstanding + row.outstanding }), { drafted: 0, outstanding: 0 });
  return (
    <main id="main-content">
      <SiteHeader />
      <div className="dev-banner" role="status"><Hammer aria-hidden="true" /><span><strong>In development.</strong> Target: Q4 2026. This page describes a screen that is being built. Nothing on it is live, and the mock below uses fictitious data.</span></div>
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="kicker">Firm view</span>
            <h1>The principal&apos;s picture of the work, without the client content.</h1>
            <p>For principals, compliance leads and network supervision teams: how many cases have been drafted, how the adviser QA grades are distributed by adviser, what is still outstanding, and an export for your own MI. Designed so a supervision team can see the same picture as the firm without opening a single client file.</p>
            <div className="hero-actions"><a className="text-link" href="/roadmap">Back to the roadmap</a></div>
          </div>
        </div>
      </section>

      <section className="section firm-view-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker">What the view will show</span><h2>Four things a principal asks on a Monday morning.</h2></div><p>The view reads the audit log and the QA grades. It never reads the case packs or the drafts, because the engine does not keep them.</p></div>
          <div className="firm-view-points">
            <article><FileCheck2 aria-hidden="true" /><h3>Cases drafted</h3><p>By workflow, by adviser and by period.</p></article>
            <article><BarChart3 aria-hidden="true" /><h3>QA grades by adviser</h3><p>How the adviser QA sheet graded each draft on first pass, and the trend.</p></article>
            <article><ListChecks aria-hidden="true" /><h3>Items outstanding</h3><p>Information-needed items not yet resolved, so nothing is issued with a gap still open.</p></article>
            <article><Download aria-hidden="true" /><h3>Exportable MI</h3><p>The same figures as a spreadsheet, for the firm&apos;s own board and network reporting.</p></article>
          </div>

          <figure className="firm-view-mock" aria-label="Illustrative mock of the firm view, fictitious data">
            <div className="firm-view-mock-label">Illustrative mock · in development · fictitious data · not a live screen</div>
            <div className="firm-view-mock-head"><div><Users aria-hidden="true" /><strong>Your firm</strong><span>September 2026</span></div><span className="firm-view-mock-export"><Download aria-hidden="true" />Export MI</span></div>
            <div className="firm-view-mock-metrics">
              <div><span>Cases drafted</span><strong>{totals.drafted}</strong><small>this month</small></div>
              <div><span>Graded A on first pass</span><strong>{advisers.reduce((n, r) => n + r.a, 0)}</strong><small>of {totals.drafted}</small></div>
              <div><span>Items outstanding</span><strong>{totals.outstanding}</strong><small>information needed</small></div>
              <div><span>Advisers active</span><strong>{advisers.length}</strong><small>this month</small></div>
            </div>
            <div className="firm-view-mock-table">
              <div><b>Adviser</b><b>Drafted</b><b>A</b><b>B</b><b>C</b><b>Outstanding</b></div>
              {advisers.map((row) => <div key={row.name}><span>{row.name}</span><span>{row.drafted}</span><span className="grade-a">{row.a}</span><span className="grade-b">{row.b}</span><span className="grade-c">{row.c}</span><span>{row.outstanding}</span></div>)}
            </div>
            <figcaption>Fictitious advisers and figures, shown to indicate the shape of the screen. No client content appears in the firm view by design.</figcaption>
          </figure>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
