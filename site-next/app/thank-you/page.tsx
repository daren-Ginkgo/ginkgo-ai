import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText, KeyRound, ShieldCheck, TestTube2 } from "lucide-react";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Application received",
  description: "We check your firm on the FCA register, then email you everything you need to sign in.",
};

const steps = [
  { icon: ShieldCheck, number: "01", title: "Your firm is checked", copy: "We check your firm on the FCA register before access is opened, usually within two working days." },
  { icon: KeyRound, number: "02", title: "Your access is opened", copy: "You get an email with everything you need to sign in with your Microsoft 365 work account. There is no separate password." },
  { icon: TestTube2, number: "03", title: "Begin with the Test Drive", copy: "Run a fictitious client through the real pipeline so you can assess the workflow without using live client information." },
  { icon: FileText, number: "04", title: "Test one real adviser job", copy: "Once the access and data-handling route has been checked, choose the first suitability, review, cashflow or file-analysis workflow." },
];

export default function ThankYouPage() {
  return <main id="main-content"><SiteHeader /><section className="thank-you-hero"><div className="shell narrow-shell"><CheckCircle2 /><span>APPLICATION RECEIVED</span><h1>Thank you. Your application is in.</h1><p>There is no checkout and no payment is required. Once your firm is checked, you get an email with everything you need to sign in. Your 30 free days start at your first sign-in.</p></div></section><section className="section onboarding-section"><div className="shell"><div className="section-intro split-intro"><div><span className="kicker">What happens next</span><h2>From application to first useful workflow.</h2></div><p>Start with a fictitious case, then try the adviser job you most want to fix. If you would like a walkthrough first, <a href="/demo">book a demonstration</a>.</p></div><div className="onboarding-grid">{steps.map(({ icon: Icon, number, title, copy }) => <article key={number}><div><span>{number}</span><Icon /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="onboarding-actions"><ArrowButton href="/microsoft">Understand the Microsoft workflow</ArrowButton><a href="/gap-scanner">Explore the Gap Scanner <ArrowRight /></a></div></div></section><SiteFooter /></main>;
}
