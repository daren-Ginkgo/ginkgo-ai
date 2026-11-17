import type { Metadata } from "next";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { BetaAvailability } from "@/components/beta-availability";

// 17 Nov 2026: the published price cards, report allowance and commercial terms
// were taken down while launch pricing is finalised. The route stays so old
// links (and the /terms reference) land on this holding page, not a 404. It stays
// in the nav and the sitemap so visitors can find the launch message.
export const metadata: Metadata = {
  title: "Launch pricing",
  description: "Final pricing, launch offers, usage allowances and terms for The Advice Engine are being finalised ahead of launch. Try it free for 30 days in the meantime.",
};

export default function PricingPage() {
  return <main id="main-content"><SiteHeader />
    <section className="pricing-page-hero"><div className="shell"><span className="kicker light">Launch pricing</span><h1>Final pricing{" "}<br />is on its way.</h1><p>As we approach launch, we are finalising our pricing, launch offers, usage allowances and commercial terms. We will publish them here before launch, and firms already using the engine will hear from us directly before anything changes for them.</p></div></section>
    <section className="section pricing-page"><div className="shell">
      <aside className="beta-offer"><BetaAvailability variant="kicker" /><h2>Try it now, free for 30 days.</h2><p>Open to individual Quilter advisers. Apply for access and use the full engine free for 30 days from your first sign-in. No card details are taken and there is no commitment, so you can judge it on real adviser work while the final pricing is settled.</p><ArrowButton href="/start" light>Apply for access</ArrowButton></aside>
      <div className="first-case"><div><span className="kicker">Talking to us about your firm?</span><h2>We are happy to discuss launch terms for your firm.</h2><p>If you are weighing up The Advice Engine for several advisers, book a demo and we will talk through how it would work for your firm and what launch terms are likely to look like.</p></div><ArrowButton href="/demo">Book a demo</ArrowButton></div>
    </div></section>
    <SiteFooter /></main>;
}
