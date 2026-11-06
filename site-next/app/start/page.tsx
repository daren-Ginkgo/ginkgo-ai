import type { Metadata } from "next";
import { Check, KeyRound, LogIn, ShieldCheck } from "lucide-react";
import { BetaApplicationForm } from "@/components/beta-application-form";
import { SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Apply for access",
  description: "Individual Quilter advisers: 30 days free from your first sign-in, with no card details and no commitment. Then a rolling 3-month term.",
};

export default function StartPage() {
  return <main id="main-content"><SiteHeader />
    <section className="beta-application-hero"><div className="shell beta-application-hero-grid"><div><span className="kicker light">30-day free trial</span><h1>Apply for access. Use it free for 30 days.</h1><p>Open to individual Quilter advisers. Use the full engine free for 30 days from your first sign-in, with no card details and no commitment. If you carry on after that, pricing runs from £250 per adviser per month on a rolling 3-month term.</p><div className="beta-application-benefits"><span><Check />No card details</span><span><Check />No commitment</span><span><Check />Begin with a fictitious case</span></div></div><aside><ShieldCheck /><strong>Application only</strong><p>We check every firm on the FCA register before access is opened. Submitting this form does not create a contract or take a payment, and the trial does not commit you to a subscription.</p></aside></div></section>
    <section className="section beta-form-section"><div className="shell beta-form-layout"><BetaApplicationForm /><aside className="beta-form-journey"><span>WHAT HAPPENS NEXT</span><h2>From application to first sign-in.</h2><ol><li><b>1</b><div><strong>We check your firm</strong><p>Your firm is checked on the FCA register, usually within two working days.</p></div></li><li><b>2</b><div><strong>Your access is opened</strong><p>You get an email with everything you need to sign in with your Microsoft 365 work account.</p></div></li><li><b>3</b><div><strong>Run the Test Drive</strong><p>Use a fictitious case before any live client workflow is considered.</p></div></li><li><b>4</b><div><strong>Your 30 days start at first sign-in</strong><p>Try it on real adviser work. If it earns its place, subscribe on a rolling 3-month term. If not, it simply stops.</p></div></li></ol><div className="beta-existing-user"><KeyRound /><span><strong>Already approved?</strong>Use your existing Microsoft work account and MFA.</span><a href="https://app.theadviceengine.ai/"><LogIn />Sign in</a></div></aside></div></section>
    <SiteFooter /></main>;
}
