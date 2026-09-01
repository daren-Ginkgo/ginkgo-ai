import { ArrowRight, CheckCircle2, FileText, KeyRound, MessagesSquare, TestTube2 } from "lucide-react";
import { ArrowButton, SiteFooter, SiteHeader } from "@/components/marketing";

const steps = [
  { icon: MessagesSquare, number: "01", title: "A conversation with Daren", copy: "Daren will review your application, understand your firm and identify the workflow that will make the most useful first test." },
  { icon: KeyRound, number: "02", title: "Microsoft access is agreed", copy: "Your firm’s Microsoft 365 route is checked and enabled before you use the existing Advice Engine sign-in." },
  { icon: TestTube2, number: "03", title: "Begin with the Test Drive", copy: "Run a fictitious client through the real pipeline so you can assess the workflow without using live client information." },
  { icon: FileText, number: "04", title: "Test one real adviser job", copy: "Once the access and data-handling route has been checked, choose the first suitability, review, cashflow or file-analysis workflow." },
];

export default function ThankYouPage() {
  return <main><SiteHeader /><section className="thank-you-hero"><div className="shell narrow-shell"><CheckCircle2 /><span>APPLICATION RECEIVED</span><h1>Thank you. Daren will contact you personally.</h1><p>There is no checkout and no payment is required. The next step is a short practical conversation to confirm whether the founding beta is right for you and your firm.</p></div></section><section className="section onboarding-section"><div className="shell"><div className="section-intro split-intro"><div><span className="kicker">The founding-adviser route</span><h2>From application to first useful workflow.</h2></div><p>The beta is deliberately supported. The purpose is not simply to issue a login—it is to learn which workflows save advisers the most time and where the engine should improve.</p></div><div className="onboarding-grid">{steps.map(({ icon: Icon, number, title, copy }) => <article key={number}><div><span>{number}</span><Icon /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="onboarding-actions"><ArrowButton href="/microsoft">Understand the Microsoft workflow</ArrowButton><a href="/find.html">Explore the Advice Gap Scanner <ArrowRight /></a></div></div></section><SiteFooter /></main>;
}
