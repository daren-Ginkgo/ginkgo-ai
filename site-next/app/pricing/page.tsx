import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { BetaAvailability } from "@/components/beta-availability";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Founding adviser beta: free access throughout the beta and 50% off an individual subscription for 12 months after launch. No payment details required.",
};

const prices = [
  { name: "1–4 advisers", price: "£250", note: "per adviser, per month", cta: "Apply for a founding place", href: "/start", featured: true },
  { name: "5–10 advisers", price: "£200", note: "per adviser, per month", cta: "Apply for a founding place", href: "/start" },
  { name: "11+ advisers", price: "Let’s talk", note: "pricing matched to firm scale", cta: "Discuss firm pricing", href: "/demo" },
];

export default function PricingPage() {
  return <main id="main-content"><SiteHeader />
    <section className="pricing-page-hero"><div className="shell"><span className="kicker light">Clear firm pricing</span><h1>Simple pricing.{" "}<br />A valuable founding offer.</h1><p>Standard pricing runs from £200 per adviser per month. Fifteen individual Quilter advisers can join the pre-launch beta free of charge. The beta runs until at least 1 November 2026, and there is no commitment to take a licence when it ends.</p></div></section>
    <section className="section pricing-page"><div className="shell"><div className="pricing-grid">{prices.map((item) => <article className={`price-card ${item.featured ? "featured" : ""}`} key={item.name}>{item.featured && <span className="price-tag">Most firms</span>}<p>{item.name}</p><div className="price"><strong>{item.price}</strong><span>{item.note}</span></div><span className="price-from">From November 2026</span><ul><li><Check />Over 40 workflows and tools</li><li><Check />Including over 20 calculators</li><li><Check />Firm branding and setup</li><li><Check />New workflows included</li></ul>{item.featured ? <ArrowButton href={item.href}>{item.cta}</ArrowButton> : <a href={item.href}>{item.cta}</a>}</article>)}</div><aside className="beta-offer"><BetaAvailability variant="kicker" /><h2>Free throughout beta. Half price for 12 months after launch.</h2><p>We are inviting 15 individual Quilter advisers to test the engine, challenge the workflows and help shape what comes next. The beta runs until at least 1 November 2026. If you choose to continue after commercial launch, your individual subscription is discounted by 50% for the first 12 months, and if you would rather not, there is no commitment to take a licence at the end of the beta.</p><ArrowButton href="/start" light>Apply for a founding place</ArrowButton></aside><div className="pricing-terms"><strong>Commercial terms</strong><span>Standard 12-month agreement. First month free for new firms outside the founding beta.</span><span>The founding offer replaces the first-month-free offer and cannot be combined with it.</span><span>Founding beta access runs until at least 1 November 2026 and carries no commitment to take a licence when it ends.</span></div></div></section>
    <SiteFooter /></main>;
}
