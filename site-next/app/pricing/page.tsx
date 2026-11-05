import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";
import { BetaAvailability } from "@/components/beta-availability";

export const metadata: Metadata = {
  title: "Pricing",
  description: "30 days free for individual Quilter advisers, then from £200 per adviser per month on a rolling 3-month term. No card details to start.",
};

const prices = [
  { name: "1–4 advisers", price: "£250", note: "per adviser, per month", cta: "Apply for access", href: "/start", featured: true },
  { name: "5–10 advisers", price: "£200", note: "per adviser, per month", cta: "Apply for access", href: "/start" },
  { name: "11+ advisers", price: "Let’s talk", note: "pricing matched to firm scale", cta: "Discuss firm pricing", href: "/demo" },
];

export default function PricingPage() {
  return <main id="main-content"><SiteHeader />
    <section className="pricing-page-hero"><div className="shell"><span className="kicker light">Clear firm pricing</span><h1>Simple pricing.{" "}<br />30 days free to start.</h1><p>Apply for access and use the engine free for 30 days. After that, pricing runs from £200 per adviser per month on a rolling 3-month term. No card details are needed to start, and the trial carries no commitment.</p></div></section>
    <section className="section pricing-page"><div className="shell"><div className="pricing-grid">{prices.map((item) => <article className={`price-card ${item.featured ? "featured" : ""}`} key={item.name}>{item.featured && <span className="price-tag">Most firms</span>}<p>{item.name}</p><div className="price"><strong>{item.price}</strong><span>{item.note}</span></div><span className="price-from">After your 30 free days</span><ul><li><Check />Over 40 workflows and tools</li><li><Check />Including over 20 calculators</li><li><Check />Firm branding and setup</li><li><Check />New workflows included</li></ul>{item.featured ? <ArrowButton href={item.href}>{item.cta}</ArrowButton> : <a href={item.href}>{item.cta}</a>}</article>)}</div><aside className="beta-offer"><BetaAvailability variant="kicker" /><h2>30 days free. Then a rolling 3-month term.</h2><p>Open to individual Quilter advisers. Your 30 days start at your first sign-in, so nothing is counting down while you get set up. If the engine earns its place, you subscribe at the standard price on a rolling 3-month term, which either side can end at the end of the current 3 months with at least 30 days’ notice. If not, the trial simply stops: no card details were taken and there is nothing to cancel.</p><ArrowButton href="/start" light>Apply for access</ArrowButton></aside>
    {/* Build plan 15 Sep 2026, 3.2. The seat policy line ("Paraplanners and
        support staff are not counted as seats") is NOT here yet: Daren confirms
        the exact policy first, then it goes prominently above the cards. The
        first-case offer links to /demo until the booking form replaces the
        mailto and calendar links (3.3, also awaiting his decision on the form). */}
    <div className="first-case"><div><span className="kicker">Your first case is free</span><h2>Send us a redacted case and get the draft and QA sheet back.</h2><p>No set-up, no payment details. The redacted case runs through the real pipeline and you receive the branded draft, the adviser QA sheet and the information-needed list to judge for yourself.</p></div><ArrowButton href="/demo">Arrange your first case</ArrowButton></div>
    <div className="pricing-terms"><strong>Commercial terms</strong><span>Rolling 3-month term from the date you join, charged up front for each 3-month term. Either side can end it at the end of the current term by giving at least 30 days’ notice before that term ends.</span><span>Prices are shown excluding VAT. VAT will be added once we are VAT registered.</span><span>Fair use: 15 reports a month for each account, pooled across your firm, building to 45 per account over any rolling 3 months. Two accounts share 30 a month, building to 90. A report is each suitability report or annual review build, rebuilds included. Re-downloads, Test Drive specimens, calculators and chat do not count.</span><span>The engine never stops you mid-case. You get a heads-up at 80% of the allowance, and extra reports are £10 each on the next quarterly invoice. Firms expecting heavy use can agree a higher allowance.</span><span>The allowance and the extra-report charge may change if the AI costs behind each report change. Any change is notified in writing at least 30 days ahead and applies from the start of the next 3-month term, never part way through one.</span><span>Every new firm gets 30 days free from its first sign-in. No card details are taken, and the trial simply stops unless you choose to subscribe.</span><span>Founder firms have their own agreed terms. These terms apply to every other firm.</span></div></div></section>
    <SiteFooter /></main>;
}
