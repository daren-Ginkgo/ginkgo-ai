import type { Metadata } from "next";
import { CircleCheck, Hammer, Lightbulb } from "lucide-react";
import { PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What works today in The Advice Engine, what is being built next, and what is under consideration. Updated when something changes, not to a marketing calendar.",
};

// Copy: AE-roadmap-page-copy.md (Daren, 15 Sep 2026). Nothing in Next or Later
// is a commitment, and the date ranges are deliberately broad. The three
// notetaker names in Next are the ONLY place a competitor product may be named
// on the site, because the line describes compatibility, not comparison
// (scripts/check-claims.sh exempts this file for exactly those three names).
const LAST_UPDATED = "15 September 2026";

type Item = { title: string; copy: string; href?: string };

const now: Item[] = [
  { title: "Suitability report drafts", copy: "Transcript, fact-find and illustrations in. Branded Word draft, adviser QA sheet and information-needed list out. Matched to the Quilter templates firms already use." },
  { title: "Annual review drafts", copy: "Meeting record, previous report and current values in. Progress-check or outcome report and action list out." },
  { title: "Cashflow reports", copy: "Household data, objectives and agreed assumptions in. Professional cashflow report and client email draft out." },
  { title: "Calculators with workings", copy: "Charges, CGT, withdrawals, critical yield and more. Every figure shows its source and its arithmetic." },
  { title: "Gap Scanner", copy: "Checks a case pack for missing evidence, unevidenced risk ratings and drift between objectives and recommendation before anyone drafts.", href: "/gap-scanner" },
  { title: "Quilter data built in", copy: "WealthSelect and Cirilium portfolio charges and performance drawn from the current factsheets. Platform valuations cross-checked against the case pack. Quilter attitude-to-risk language used throughout.", href: "/quilter-data" },
  { title: "Forms from case data", copy: "Advice Fee Authority Forms and Quilter letters of authority generated from the case pack." },
  { title: "Outputs formatted for Quilter submission", copy: "Drafts and QA sheets are packaged in the form Quilter's processes expect, so nothing is re-keyed." },
  { title: "Microsoft 365 native", copy: "Sign in with your firm's Entra account and MFA. Select case files directly from SharePoint and OneDrive.", href: "/microsoft" },
  { title: "Nothing kept after the session", copy: "No case content is stored in the app. The audit log records who ran what and when, never client data.", href: "/compliance" },
];

const next: Item[] = [
  { title: "Pre-meeting brief", copy: "Previous report, current values and diary in. One-page brief and question list out, ready before the client arrives." },
  { title: "Works with your notetaker", copy: "Meeting summaries from Marloo, Fireflies or Saturn accepted as input alongside the case pack." },
  { title: "Firm view", copy: "For principals and compliance leads: cases drafted, QA grades, items outstanding, exportable. Designed so a network supervision team can see the same picture without seeing client content.", href: "/firm-view" },
  { title: "Founding firm feedback loop", copy: "Every beta firm's corrections feed back into the templates and checks. Faster than a release cycle." },
];

const later: Item[] = [
  { title: "Additional report types", copy: "Protection demands and needs, pension switch, mortgage. Built when a founding firm needs one, not before." },
  { title: "Network-level MI", copy: "Aggregated QA grades and evidence completeness across a group of firms, for networks that want oversight without opening files." },
  { title: "Targeted support evidence layer", copy: "Support for firms operating under the FCA's targeted support regime (PS25/22), providing the evidence trail beneath the firm's own advice framework." },
];

function Column({ icon: Icon, label, status, items, tone }: { icon: typeof CircleCheck; label: string; status: string; items: Item[]; tone: "now" | "next" | "later" }) {
  return (
    <section className={`roadmap-column roadmap-${tone}`} aria-labelledby={`roadmap-${tone}`}>
      <header>
        <Icon aria-hidden="true" />
        <h2 id={`roadmap-${tone}`}>{label}</h2>
        <p>{status}</p>
      </header>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <h3>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h3>
            <p>{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function RoadmapPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <PageHero
        eyebrow="Roadmap"
        title="Where the engine is going."
        copy="The Advice Engine is built one workflow at a time, from real cases, with the advisers using it. This page says what works today, what is being built next, and what is being considered. It is updated when something changes, not to a marketing calendar."
        secondary={{ href: "/outputs", label: "See the work as it stands today" }}
      />
      <section className="section roadmap-section">
        <div className="shell">
          <p className="roadmap-updated">Last updated {LAST_UPDATED}. Nothing under Next or Later is a commitment.</p>
          <div className="roadmap-grid">
            <Column icon={CircleCheck} label="Now" status="Available to every firm on the beta." items={now} tone="now" />
            <Column icon={Hammer} label="Next" status="Being built now. Target: October to December 2026." items={next} tone="next" />
            <Column icon={Lightbulb} label="Later" status="Under consideration. No dates." items={later} tone="later" />
          </div>
          <div className="roadmap-not">
            <strong>What we will not build</strong>
            <span>A CRM. A back-office system. A chat box. Firms already have those. The engine sits alongside them and does the drafting, checking and calculating that sits between a client conversation and a signed file.</span>
          </div>
        </div>
      </section>
      <section className="specimen-note"><div className="shell"><CircleCheck aria-hidden="true" /><p>Everything on this page is a draft-generation and checking tool for authorised advice firms. Every output requires review and sign-off by a named adviser. The Advice Engine Ltd supplies software, not advice.</p></div></section>
      <SiteFooter />
    </main>
  );
}
