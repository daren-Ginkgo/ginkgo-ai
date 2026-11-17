import type { Metadata } from "next";
import { Calendar, Check, LogIn, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/marketing";

// 17 Nov 2026 (Daren): firms now register inside the engine and are approved there, so this page
// sends people to the engine's sign-in instead of collecting an application. The Founding
// Adviser form and /funnel are retired (the engine plan "Firm sign-up in the engine, funnel
// retired"). Ship this only AFTER SELF_SIGNUP_ENABLED is on in the engine, or a new firm signing
// in is told it is not enabled.
const SIGN_IN = "https://app.theadviceengine.ai/";

export const metadata: Metadata = {
  title: "Register your firm",
  description: "Quilter advisers: sign in with your Microsoft 365 work account to register your firm. 30 days free from your first sign-in, with no card details and no commitment.",
};

export default function StartPage() {
  return <main id="main-content"><SiteHeader />
    <section className="beta-application-hero"><div className="shell beta-application-hero-grid"><div><span className="kicker light">30-day free trial</span><h1>Register your firm. Use it free for 30 days.</h1><p>Open to advisers at Quilter Appointed Representative firms. Sign in with your Microsoft 365 work account and register your firm in a couple of minutes. Use the full engine free for 30 days from your first sign-in, with no card details and no commitment. Final pricing, launch offers and terms are being finalised as we approach launch, and you will see them before you are asked to commit to anything.</p><div className="beta-application-benefits"><span><Check />No card details</span><span><Check />No commitment</span><span><Check />Begin with a fictitious case</span></div></div><aside><ShieldCheck /><strong>Approved firms only</strong><p>We check every firm on the FCA register before access is opened. Registering does not create a contract or take a payment, and the trial does not commit you to a subscription.</p></aside></div></section>
    <section className="section beta-form-section"><div className="shell beta-form-layout"><div className="start-register-card"><span>REGISTER</span><h2>Sign in to register your firm.</h2><p>Use the Microsoft 365 work account you use for email. There is no separate password. You will be asked for your firm&apos;s FCA reference number, and the engine checks it on the FCA register straight away.</p><a className="start-register-button" href={SIGN_IN}><LogIn />Sign in and register</a><p className="start-register-note">Already approved? The same button signs you in.</p><a className="start-register-demo" href="/demo"><Calendar />Prefer a walkthrough first? Book a demo</a></div><aside className="beta-form-journey"><span>WHAT HAPPENS NEXT</span><h2>From registration to first sign-in.</h2><ol><li><b>1</b><div><strong>Register your firm</strong><p>Sign in, enter your firm&apos;s FCA reference number and accept the trial terms.</p></div></li><li><b>2</b><div><strong>We approve your firm</strong><p>We check every registration, usually within one working day, and email you when your firm is approved.</p></div></li><li><b>3</b><div><strong>Run the Test Drive</strong><p>Use a fictitious case before any live client workflow is considered.</p></div></li><li><b>4</b><div><strong>Your 30 days start at first sign-in</strong><p>Try it on real adviser work. If it earns its place, you can carry on once launch pricing is confirmed. If not, it simply stops.</p></div></li></ol></aside></div></section>
    <SiteFooter /></main>;
}
