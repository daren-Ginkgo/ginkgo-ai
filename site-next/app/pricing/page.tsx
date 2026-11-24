import type { Metadata } from "next";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { BetaAvailability } from "@/components/beta-availability";

// 17 Nov 2026: the published price cards, report allowance and commercial terms
// were taken down. 24 Nov 2026: pay as you go from 1 Dec 2026 (150 free credits
// per firm). Still NO prices on the site: credit prices are shown in the app.
// The route stays in the nav and the sitemap, and the /terms reference lands here.
export const metadata: Metadata = {
  title: "Pricing",
  description: "Pay as you go from 1 December 2026. Every firm starts with 150 free credits. No subscription, no contract.",
};

export default function PricingPage() {
  return <main id="main-content"><SiteHeader />
    <section className="pricing-page-hero"><div className="shell"><span className="kicker light">Pricing</span><h1>Pay as you go.</h1><p>Pay as you go from 1 December 2026. Every firm starts with 150 free credits. No subscription, no contract. Reports use credits. Tools, Pre-advice, Case assessment, Ask anything and Test drive do not. Before every report, the screen shows what it will use and what your firm has left.</p></div></section>
    <section className="section pricing-page"><div className="shell">
      <aside className="beta-offer"><BetaAvailability variant="kicker" /><h2>Start with 150 free credits.</h2><p>Apply for access and begin with a fictitious case in the Test drive. No card details are needed to start. Firm admins see the credit prices in the app before they buy.</p><ArrowButton href="/start" light>Apply for access</ArrowButton></aside>
      <div className="first-case"><div><span className="kicker">Talking to us about your firm?</span><h2>Weighing it up for several advisers?</h2><p>Book a demo and we will show you how it would work for your firm.</p></div><ArrowButton href="/demo">Book a demo</ArrowButton></div>
    </div></section>
    <SiteFooter /></main>;
}
