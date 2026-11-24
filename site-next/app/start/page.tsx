import type { Metadata } from "next";
import { Check, KeyRound, LogIn, ShieldCheck } from "lucide-react";
import { BetaApplicationForm } from "@/components/beta-application-form";
import { SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Apply for access",
  description: "Quilter firms: apply for access. Pay as you go from 1 December 2026. Every firm starts with 150 free credits. No subscription, no contract.",
};

export default function StartPage() {
  return <main id="main-content"><SiteHeader />
    <section className="beta-application-hero"><div className="shell beta-application-hero-grid"><div><span className="kicker light">150 free credits</span><h1>Apply for access. Start with 150 free credits.</h1><p>Open to Quilter firms. Pay as you go from 1 December 2026. Every firm starts with 150 free credits. No subscription, no contract. Credit prices are shown in the app before anyone buys.</p><div className="beta-application-benefits"><span><Check />No card details to start</span><span><Check />No subscription</span><span><Check />Begin with a fictitious case</span></div></div><aside><ShieldCheck /><strong>Application only</strong><p>We check every firm on the FCA register before access is opened. Submitting this form does not create a contract or take a payment, and there is no subscription.</p></aside></div></section>
    <section className="section beta-form-section"><div className="shell beta-form-layout"><BetaApplicationForm /><aside className="beta-form-journey"><span>WHAT HAPPENS NEXT</span><h2>From application to first sign-in.</h2><ol><li><b>1</b><div><strong>We check your firm</strong><p>Your firm is checked on the FCA register, usually within two working days.</p></div></li><li><b>2</b><div><strong>Your access is opened</strong><p>You get an email with everything you need to sign in with your Microsoft 365 work account.</p></div></li><li><b>3</b><div><strong>Run the Test Drive</strong><p>Use a fictitious case before any live client workflow is considered.</p></div></li><li><b>4</b><div><strong>Your firm's 150 free credits</strong><p>Try it on real adviser work. Buy more credits only when you need them.</p></div></li></ol><div className="beta-existing-user"><KeyRound /><span><strong>Already approved?</strong>Use your existing Microsoft work account and MFA.</span><a href="https://app.theadviceengine.ai/"><LogIn />Sign in</a></div></aside></div></section>
    <SiteFooter /></main>;
}
