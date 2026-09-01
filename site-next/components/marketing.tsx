import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BetaAvailability } from "@/components/beta-availability";

export function Brand({ reversed = false }: { reversed?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="The Advice Engine, home">
      <img
        className={reversed ? "brand-logo brand-logo-reversed" : "brand-logo"}
        src="https://static.wixstatic.com/media/5e1be7_cae189f7d5a240af9c924d30e496c069~mv2.png"
        alt="The Advice Engine"
      />
    </Link>
  );
}

export function ArrowButton({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Button asChild size="lg" className={light ? "button button-light" : "button button-primary"}>
      <a href={href}>
        {children}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className="announcement">
        <span>For Quilter advisers, by a Quilter adviser</span>
        <span className="announcement-divider" />
        <BetaAvailability variant="announcement" />
      </div>
      <header className="site-header">
        <div className="shell nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/product">Product</a>
            <a href="/find.html">Gap Scanner</a>
            <a href="/microsoft">Microsoft 365</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">Daren &amp; Ginkgo</a>
          </nav>
          <div className="nav-actions">
            <a className="sign-in" href="https://app.theadviceengine.ai/">Sign in</a>
            <Button asChild className="button button-primary nav-cta">
              <a href="/start">Apply for the beta</a>
            </Button>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><Menu aria-hidden="true" /> Menu</summary>
            <div>
              <a href="/product">Product</a>
              <a href="/outputs">Outputs</a>
              <a href="/find.html">Advice Gap Scanner</a>
              <a href="/microsoft">Microsoft &amp; OneDrive</a>
              <a href="/security">Security</a>
              <a href="/pricing">Pricing</a>
              <a href="/about">Daren &amp; Ginkgo</a>
              <a href="/start">Apply for the beta</a>
              <a href="/demo">Book a demo</a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div><Brand reversed /><p>Advice paperwork, built around the evidence.</p></div>
        <div className="footer-links">
          <a href="/product">Product</a><a href="/outputs">Outputs</a>
          <a href="/security">Security</a><a href="/pricing">Pricing</a>
          <a href="/about">Daren &amp; Ginkgo</a><a href="/demo">Book a demo</a>
          <a href="mailto:hello@theadviceengine.ai">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
      <div className="shell footer-product-links">
        <span>Explore</span>
        <a href="/suitability.html">Suitability</a>
        <a href="/meetings.html">Meetings</a>
        <a href="/compliance.html">Compliance</a>
        <a href="/finprom.html">Financial promotions</a>
        <a href="/find.html">Advice Gap Scanner</a>
        <a href="/microsoft">Microsoft &amp; OneDrive</a>
        <a href="/organise.html">Organise work</a>
      </div>
      <div className="shell legal">
        <p>The Advice Engine is operated by The Advice Engine Ltd, a company registered in England and Wales, company number 17404907. The Advice Engine Ltd is not authorised or regulated by the Financial Conduct Authority: it supplies software, not advice.</p>
        <p>The Advice Engine is a document drafting and checking tool for authorised advice firms. It does not provide financial advice, approve financial promotions or certify compliance. Every output is a draft requiring review and sign-off by a named adviser at the using firm, which remains responsible for its advice and regulatory obligations.</p>
        <p>References to Quilter describe the network environment in which the engine was developed. Quilter is a trade mark of its owner; The Advice Engine is an independent product of The Advice Engine Ltd. Demonstrations and specimens are fictitious and labelled as such.</p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  primary = { href: "/start", label: "Apply for the beta" },
  secondary = { href: "/demo", label: "Book a demonstration" },
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div>
          <span className="kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy}</p>
          <div className="hero-actions">
            <ArrowButton href={primary.href}>{primary.label}</ArrowButton>
            <a className="text-link" href={secondary.href}>{secondary.label} <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        {image ? (
          <figure className="page-hero-photo">
            <img src={image} alt={imageAlt ?? "Financial advice professionals at work"} />
            <figcaption>Built for the way advice firms actually work.</figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section start-section">
      <div className="shell start-card">
        <div>
          <BetaAvailability variant="kicker" />
          <h2>Help shape The Advice Engine before launch.</h2>
          <p>Founding advisers receive free access throughout beta and 50% off their individual subscription for 12 months after launch.</p>
        </div>
        <div className="start-actions">
          <ArrowButton href="/start">Apply for the beta</ArrowButton>
          <a href="/demo">Book a demonstration</a>
        </div>
      </div>
    </section>
  );
}
