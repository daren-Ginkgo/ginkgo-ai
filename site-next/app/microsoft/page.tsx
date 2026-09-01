import { ArrowRight, Check, CircleCheck, Cloud, Database, FileCheck2, FileSearch, FileText, FolderSearch, KeyRound, LockKeyhole, LogIn, ScanSearch, ShieldCheck, Upload } from "lucide-react";
import { ArrowButton, FinalCta, PageHero, SiteFooter, SiteHeader } from "@/components/marketing";

const accessFacts = [
  { icon: KeyRound, title: "Your Microsoft work account", copy: "No separate Advice Engine password to create or remember." },
  { icon: ShieldCheck, title: "Your firm’s MFA", copy: "The existing Microsoft identity controls continue to apply." },
  { icon: LockKeyhole, title: "Delegated, read-only access", copy: "The folder connection reads files as the signed-in adviser, within the permission granted by the firm." },
  { icon: CircleCheck, title: "Adviser confirms the source pack", copy: "Suggested files are shown with a reason before the workflow uses them." },
];

const fileExamples = [
  ["Meeting transcript.pdf", "Objectives, concerns and agreed actions", true],
  ["Current fact-find.docx", "Client facts and circumstances", true],
  ["Platform statement.pdf", "Values, holdings and plan details", true],
  ["Previous review outcome.docx", "Changes and unfinished actions", true],
  ["Old marketing brochure.pdf", "Not relevant to this task", false],
];

export default function MicrosoftPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Microsoft 365 and OneDrive"
        title="Your client folder becomes the starting point—not another database to maintain."
        copy="Sign in with the Microsoft 365 work account your firm already uses. The Advice Engine can then help locate the relevant evidence in an approved OneDrive or SharePoint client folder, run gap analysis and build the selected adviser output."
        primary={{ href: "/start", label: "Apply for the founding beta" }}
        secondary={{ href: "https://app.theadviceengine.ai/", label: "Approved adviser sign in" }}
      />

      <section className="microsoft-proof" aria-label="Microsoft integration facts">
        <div className="shell microsoft-proof-grid">
          {accessFacts.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><div><strong>{title}</strong><span>{copy}</span></div></article>)}
        </div>
      </section>

      <section className="section microsoft-flow-section">
        <div className="shell">
          <div className="section-intro split-intro">
            <div><span className="kicker">The connected workflow</span><h2>From Microsoft sign-in to a review-ready output.</h2></div>
            <p>For founding advisers whose firm connection is enabled, the familiar sign-in becomes the front door to the client evidence they already hold. Upload remains available when folder access is not enabled.</p>
          </div>
          <div className="microsoft-flow-grid">
            <div className="microsoft-steps">
              <article><span>01</span><LogIn /><div><h3>Sign in with Microsoft</h3><p>Use the adviser’s Microsoft 365 work account and normal MFA. No Advice Engine password is held.</p></div></article>
              <article><span>02</span><FolderSearch /><div><h3>Choose the client folder</h3><p>Select the approved OneDrive or SharePoint location that already contains the case record.</p></div></article>
              <article><span>03</span><FileSearch /><div><h3>Ask for the work</h3><p>Choose suitability, annual review, cashflow, compliance or gap analysis. The workflow knows the evidence it is likely to need.</p></div></article>
              <article><span>04</span><FileCheck2 /><div><h3>Confirm and run</h3><p>Review the suggested files, approve the source pack and receive the draft, QA points and workings.</p></div></article>
            </div>
            <div className="connected-browser" aria-label="Fictitious OneDrive file selection example">
              <div className="connected-browser-head"><div><Cloud /><strong>OneDrive · Client folder</strong></div><span>Fictitious example</span></div>
              <div className="connected-path">Clients / Jane Smith / Annual review 2026</div>
              <div className="connected-task"><ScanSearch /><div><strong>Annual review outcome</strong><span>Suggest the evidence needed for this workflow</span></div><b>5 files found</b></div>
              <div className="connected-files">
                {fileExamples.map(([name, reason, selected]) => <div className={selected ? "selected" : ""} key={name as string}><FileText /><span><strong>{name as string}</strong><small>{reason as string}</small></span>{selected ? <Check /> : <i />}</div>)}
              </div>
              <div className="connected-browser-foot"><LockKeyhole /><span>Confirm the files before the workflow reads the selected content.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section microsoft-analysis-section">
        <div className="shell">
          <div className="section-intro split-intro"><div><span className="kicker light">More than file selection</span><h2>Two analyses from the same client evidence.</h2></div><p>One asks whether the file is ready for a particular output. The other looks across the relationship for a client need that may have been left behind.</p></div>
          <div className="microsoft-analysis-grid">
            <article><FileCheck2 /><span>Case-readiness analysis</span><h3>Do we have enough to create this report properly?</h3><p>The engine checks the selected material against what the workflow needs, flags stale, missing or conflicting evidence, and tells the adviser what else may be required.</p><ul><li><Check />Relevant documents suggested</li><li><Check />Missing evidence made visible</li><li><Check />New information can be added and rechecked</li></ul></article>
            <article><ScanSearch /><span>Advice Gap Scanner</span><h3>What did the client raise that the file never carried forward?</h3><p>The scanner searches selected meeting evidence for unfinished needs, verifies the source wording and prepares an agenda item for adviser consideration.</p><ul><li><Check />Source quote attached</li><li><Check />Potential opportunity clearly labelled</li><li><Check />Conversation prompt—not automated advice</li></ul><a href="/find.html">Explore the Advice Gap Scanner <ArrowRight /></a></article>
          </div>
        </div>
      </section>

      <section className="section microsoft-data-section">
        <div className="shell microsoft-data-grid">
          <div><span className="kicker">Your Microsoft 365 remains the source</span><h2>Use the client library you already maintain.</h2><p>The integration is designed to reduce file hunting and re-keying, not to create a second permanent client database inside The Advice Engine. Selected material is processed for the chosen workflow and the adviser remains responsible for the source pack and final output.</p></div>
          <div className="microsoft-data-points">
            <span><Database /><strong>Existing data source</strong><small>OneDrive or SharePoint remains the client-file location.</small></span>
            <span><Upload /><strong>Upload alternative</strong><small>Advisers can add files manually where folder scanning is not enabled.</small></span>
            <span><ShieldCheck /><strong>Firm permission required</strong><small>Folder scanning requires a Microsoft 365 business account and the appropriate organisational consent.</small></span>
          </div>
        </div>
        <div className="shell microsoft-account-note"><strong>Important account requirement</strong><span>The connected folder scan is a Microsoft 365 business feature. A personal Microsoft account may be used only through separately arranged access and does not provide the same organisational OneDrive connection.</span></div>
      </section>

      <section className="section founding-login-section">
        <div className="shell founding-login-card">
          <div><span className="kicker light">Founding adviser access</span><h2>Apply once. Then use the same Microsoft sign-in every time.</h2><p>After Daren confirms your place and enables your firm’s access, the existing Advice Engine sign-in takes you straight to the product with your normal work identity and MFA.</p></div>
          <div className="founding-login-actions"><ArrowButton href="/start" light>Apply for one of 15 places</ArrowButton><a href="https://app.theadviceengine.ai/"><LogIn />Approved adviser sign in</a></div>
        </div>
      </section>

      <FinalCta />
      <SiteFooter />
    </main>
  );
}
