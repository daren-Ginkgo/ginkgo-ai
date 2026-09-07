import Link from "next/link";
import { BarChart3, CheckCircle2, ClipboardList, LogIn, MousePointerClick, Users } from "lucide-react";
import { requireFunnelAdmin } from "../azure-auth";
import { conversionSummary, holdsPlace, listApplications } from "@/lib/azure-storage";
import { BetaAdminTable } from "@/components/beta-admin-table";
import { FOUNDING_PLACES, remainingPlaces } from "@/lib/beta";

export const dynamic = "force-dynamic";

export default async function FunnelPage() {
  await requireFunnelAdmin("/funnel");
  const [applications, analytics] = await Promise.all([listApplications(), conversionSummary()]);
  const eventCounts = new Map(analytics.events.map((row) => [row.eventName, row.count]));
  const active = applications.filter(holdsPlace).length;
  const testRows = applications.filter((row) => row.isTest).length;
  const approved = applications.filter((row) => row.status === "approved" && !row.isTest).length;
  const metrics = [
    { icon: Users, label: "Places remaining", value: remainingPlaces(active), note: `${active} of ${FOUNDING_PLACES} provisionally allocated${testRows ? `, ${testRows} test ${testRows === 1 ? "row" : "rows"} excluded` : ""}` },
    { icon: CheckCircle2, label: "Approved advisers", value: approved, note: "Confirmed founding advisers" },
    { icon: ClipboardList, label: "Applications", value: eventCounts.get("beta_application_submitted") ?? applications.length, note: `${eventCounts.get("beta_form_started") ?? 0} form starts` },
    { icon: LogIn, label: "Engine sign-in clicks", value: eventCounts.get("engine_signin_click") ?? 0, note: "Clicks through to the engine" },
  ];

  return <main id="main-content" className="funnel-page">
    <header className="funnel-header"><div className="shell"><div><span>PRIVATE · OWNER ONLY</span><h1>Founding adviser funnel</h1><p>Review applications, manage the 15 places and see which parts of the site are driving action.</p></div><Link href="/">View website</Link></div></header>
    <section className="shell funnel-body">
      <div className="funnel-metrics">{metrics.map(({ icon: Icon, label, value, note }) => <article key={label}><Icon /><span>{label}</span><strong>{value}</strong><p>{note}</p></article>)}</div>
      <div className="funnel-panel"><div className="funnel-panel-head"><div><span>APPLICATIONS</span><h2>Founding adviser pipeline</h2></div><p>Pending, contacted and approved applications hold a place. Declined, withdrawn, waiting-list and test-flagged records do not. Mark internal submissions as test rows to keep the public counter honest without deleting anything.</p></div><BetaAdminTable initialApplications={applications} /></div>
      <div className="funnel-panel funnel-analytics"><div className="funnel-panel-head"><div><span>FIRST-PARTY MEASUREMENT</span><h2>Conversion signals</h2></div><p>Aggregate events only: no advertising profile, visitor ID or IP address is stored in this dashboard.</p></div><div className="funnel-analytics-grid"><div><h3><BarChart3 />Key actions</h3>{Array.from(eventCounts.entries()).sort((a, b) => b[1] - a[1]).map(([event, count]) => <p key={event}><span>{event.replaceAll("_", " ")}</span><strong>{count}</strong></p>)}</div><div><h3><MousePointerClick />Most-viewed pages</h3>{analytics.pages.map((row) => <p key={row.path}><span>{row.path}</span><strong>{row.count}</strong></p>)}</div></div></div>
    </section>
  </main>;
}
