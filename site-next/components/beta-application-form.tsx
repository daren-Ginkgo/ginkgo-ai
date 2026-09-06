"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { AvailabilityBadge, type Availability } from "@/components/availability-badge";
import { trackConversion } from "@/components/conversion-tracker";

type SubmissionResult = {
  received?: boolean;
  duplicate?: boolean;
  waitlist?: boolean;
  error?: string;
};

export function BetaApplicationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const remaining = availability?.remaining ?? 15;
  const started = useRef(false);

  useEffect(() => {
    fetch("/api/beta-availability", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data) setAvailability(data); })
      .catch(() => undefined);
  }, []);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackConversion("beta_form_started", "/start");
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: data.get("fullName"),
      workEmail: data.get("workEmail"),
      phone: data.get("phone"),
      firmName: data.get("firmName"),
      firmReference: data.get("firmReference"),
      adviserCount: data.get("adviserCount"),
      microsoft365: data.get("microsoft365"),
      bottleneck: data.get("bottleneck"),
      isQuilterAdviser: data.get("isQuilterAdviser") === "on",
      contactConsent: data.get("contactConsent") === "on",
      website: data.get("website"),
    };

    try {
      const response = await fetch("/api/beta-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json() as SubmissionResult & { availability?: Availability };
      if (!response.ok) throw new Error(body.error ?? "Please check the form and try again.");
      setResult(body);
      if (body.availability) setAvailability(body.availability);
      form.reset();
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.received) {
    return (
      <div className="beta-form-success" role="status">
        <CheckCircle2 />
        <span>{result.waitlist ? "Waiting list request received" : result.duplicate ? "Your application is already recorded" : "Application received"}</span>
        <h2>{result.waitlist ? "You are on the founding-adviser waiting list." : "Thank you. Daren will contact you personally."}</h2>
        <p>{result.waitlist ? "The 15 provisional places are currently allocated. If a place is released, Daren will contact applicants in order." : "There is no checkout and no payment is required. Daren will review your application, arrange a practical demonstration and confirm the Microsoft 365 onboarding route for your firm."}</p>
        <div><a className="button button-primary" href="/thank-you">See what happens next <ArrowRight /></a><a href="/microsoft">Explore the Microsoft workflow</a></div>
      </div>
    );
  }

  return (
    <form className="beta-application-form" onSubmit={submitApplication} onFocus={markStarted}>
      <div className="beta-form-head">
        <div><span>FOUNDING ADVISER BETA</span><h2>{remaining > 0 ? "Apply for a founding place" : "Join the waiting list"}</h2></div>
        <AvailabilityBadge availability={availability} />
      </div>

      <div className="beta-form-grid">
        <label><span>Full name *</span><input name="fullName" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" /></label>
        <label><span>Work email *</span><input name="workEmail" type="email" autoComplete="email" required maxLength={180} placeholder="you@yourfirm.co.uk" /></label>
        <label><span>Best number for Daren&apos;s call (optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Your direct number" /><small>Daren calls every Founding Adviser personally to set up your first sign-in.</small></label>
        <label><span>Firm name *</span><input name="firmName" autoComplete="organization" required minLength={2} maxLength={160} placeholder="Your advice firm" /></label>
        <label><span>Firm FCA reference (optional, or tell us on the call)</span><input name="firmReference" maxLength={80} placeholder="Firm reference number" /></label>
        <label><span>Number of advisers in the firm (optional)</span><select name="adviserCount" defaultValue=""><option value="">Select one</option><option value="1">1 adviser</option><option value="2-4">2–4 advisers</option><option value="5-10">5–10 advisers</option><option value="11+">11+ advisers</option></select></label>
        <label><span>Microsoft 365 work account (optional)</span><select name="microsoft365" defaultValue=""><option value="">Select one</option><option value="yes">Yes</option><option value="not-sure">Not sure</option><option value="no">No</option></select></label>
        <label className="beta-form-wide"><span>What is the paperwork job you most want to fix? (optional)</span><input name="bottleneck" maxLength={1800} placeholder="Tell Daren where adviser time is being lost or where files tend to come back for rework." /></label>
        <label className="beta-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="beta-form-checks">
        <label><input name="isQuilterAdviser" type="checkbox" required /><span><strong>I confirm that I am an individual Quilter adviser.</strong>The founding offer is currently limited to individual advisers in the Quilter network.</span></label>
        <label><input name="contactConsent" type="checkbox" required /><span><strong>I agree to be contacted about The Advice Engine beta.</strong>Your application details will be used only to assess and manage the beta relationship. See the <a href="/privacy">privacy notice</a>.</span></label>
      </div>

      {/* Persistent polite live region: present in the DOM before any error
          exists, so screen readers announce validation output when it arrives. */}
      <div className="beta-form-status" aria-live="polite">
        {result?.error ? <p className="beta-form-error">{result.error}</p> : null}
      </div>
      <div className="beta-form-submit">
        <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" />Submitting application</> : <>{remaining > 0 ? "Submit beta application" : "Join the waiting list"}<ArrowRight /></>}</button>
        <span><LockKeyhole />Application only: no client data, passwords or payment details.</span>
      </div>
    </form>
  );
}
