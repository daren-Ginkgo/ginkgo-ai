import type { Metadata } from "next";
import { CalendarDays, Check, MessageSquareText } from "lucide-react";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Book a demonstration",
  description: "A practical session around a realistic advice-firm case: the evidence, the drafts, the checks and the adviser review.",
};

export default function DemoPage() {
  return <main id="main-content"><SiteHeader /><section className="conversion-page demo-conversion"><div className="shell conversion-grid"><div><span className="kicker">A focused firm demonstration</span><h1>Bring the workflow that costs your team the most time.</h1><p>We’ll show how The Advice Engine handles the evidence, draft, checks and adviser review around a realistic advice-firm case.</p><div className="conversion-points"><span><Check />Designed around your firm’s priorities</span><span><Check />See the actual output and QA process</span><span><Check />Commercial and due-diligence questions welcomed</span></div><ArrowButton href="https://meetings.hubspot.com/daren8/advice-engine-demo-">Choose a demonstration time</ArrowButton><a className="conversion-alt" href="mailto:hello@theadviceengine.ai?subject=Advice%20Engine%20demonstration">Or email the team directly</a></div><aside className="conversion-card"><CalendarDays /><span>What to expect</span><h2>A practical session, not an AI presentation.</h2><p>We focus on the jobs your advisers and support team actually complete.</p><div><MessageSquareText /><span><strong>Useful starting point</strong>Tell us which report, review or file task you want to improve.</span></div></aside></div></section><SiteFooter /></main>;
}
