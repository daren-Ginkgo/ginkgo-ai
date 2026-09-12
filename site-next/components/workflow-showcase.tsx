"use client";

import {
  Calculator,
  Check,
  CircleCheck,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Mail,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import journeyDocuments from "@/lib/specimen-documents.json";
import showcaseDocuments from "@/lib/specimen-showcase.json";

/**
 * The "What comes out" panels are REAL OUTPUT, not illustrations. Every title,
 * client, section heading, figure and information-needed line below is lifted from a
 * document the engine produced, via scripts/extract-specimens.py. Nothing in the
 * output column is written by hand (Daren, 12 September 2026).
 *
 * If you change a string here, check it still matches the document. The extractor
 * refuses to write its JSON if the quoted gap line is not in the source verbatim, so
 * that much cannot drift silently; the section headings are read straight from the
 * document at render time and cannot drift at all.
 */

type JourneyBlock = { t: string; text?: string };
type JourneyDoc = { id: string; title: string; blocks: JourneyBlock[] };
type ShowcaseDoc = {
  id: string;
  workflow: string;
  title: string;
  firm: string;
  client: string;
  headings: string[];
  gaps: string[];
  excerpt: string[];
  flag: string;
};

const journey = journeyDocuments as unknown as JourneyDoc[];
const showcase = showcaseDocuments as unknown as ShowcaseDoc[];

/** Real output for one demonstration: what the panel renders instead of a mock-up. */
type RealOutput = {
  firm: string;
  title: string;
  client: string;
  sections: string[];
  excerpt?: string[];
  metric?: { value: string; note: string };
  flag: string;
  readMore?: { href: string; label: string };
};

function fromJourney(id: string): JourneyDoc {
  const doc = journey.find((d) => d.id === id);
  if (!doc) throw new Error(`specimen-documents.json has no document "${id}"`);
  return doc;
}

function fromShowcase(id: string): ShowcaseDoc {
  const doc = showcase.find((d) => d.id === id);
  if (!doc) throw new Error(`specimen-showcase.json has no document "${id}"`);
  return doc;
}

const suitability = fromJourney("suitability-report");
const meetingNote = fromShowcase("annual-review-meeting-note");
const cashflowEmail = fromShowcase("cashflow-client-email");

/** The document's own top-level headings, in document order. */
function headingsOf(doc: JourneyDoc, level: string, take: number) {
  return doc.blocks.filter((b) => b.t === level).map((b) => b.text ?? "").slice(0, take);
}

/** The first gap the engine could not close, quoted. */
function firstGap(doc: JourneyDoc, contains: string) {
  const hit = doc.blocks.find(
    (b) => b.t !== "table" && (b.text ?? "").includes(contains) && (b.text ?? "").length > 60,
  );
  if (!hit) throw new Error("no gap line found; the specimen data has changed");
  return hit.text ?? "";
}

const REAL: Record<string, RealOutput> = {
  suitability: {
    // Not a firm name: these came out of the test window unbranded, and a live
    // run renders into the subscribing firm's own styling (Daren, 12 Sep 2026).
    firm: "Your firm",
    title: suitability.title,
    client: "Avery Drafter, fictitious specimen",
    sections: headingsOf(suitability, "h3", 4),
    flag: firstGap(suitability, "[TO CONFIRM"),
    readMore: { href: "#full-journey", label: "Read this report in full" },
  },
  "annual-review": {
    firm: "Your firm",
    title: meetingNote.title,
    client: `${meetingNote.client}, fictitious specimen`,
    sections: meetingNote.headings.slice(0, 4),
    flag: meetingNote.flag,
  },
  cashflow: {
    // The document itself is branded Example Wealth, and specimen-showcase.json still
    // records that. It is not shown: a firm name in this panel invites the reader to
    // think the output arrives in someone else's styling, when a live run renders into
    // the subscribing firm's own (Daren, 12 Sep 2026).
    firm: "Your firm",
    title: cashflowEmail.title,
    client: `${cashflowEmail.client}, fictitious specimen`,
    sections: [],
    excerpt: [
      "Alex and Sam: your lifetime cash flow plan",
      "On the central basis the money lasts to age 100 with about £1,176,950 left in today's money. Even on the cautious basis it holds.",
    ],
    metric: { value: "£1,176,950", note: "Left at age 100 on the central basis, in today's money" },
    flag: cashflowEmail.flag,
  },
};

type Workflow = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  promise: string;
  inputs: { icon: typeof FileText; title: string; note: string }[];
  processing: string[];
  pack: { icon: typeof FileText; title: string; note: string }[];
};

const workflows: Workflow[] = [
  {
    id: "suitability",
    tab: "Suitability report",
    eyebrow: "Transcript to branded recommendation",
    title: "Start with the conversation – not a blank report.",
    promise:
      "The engine brings the client’s circumstances, objectives, risk position, existing arrangements and recommendation evidence into one structured draft.",
    inputs: [
      { icon: FileText, title: "Meeting transcript", note: "Objectives, priorities and client language" },
      { icon: FolderOpen, title: "Fact-find and existing plans", note: "Circumstances, assets, liabilities and arrangements" },
      { icon: FileSpreadsheet, title: "Illustrations and charges", note: "Provider figures and calculation inputs" },
    ],
    processing: [
      "Extract and organise client facts",
      "Link statements to their source",
      "Build from the relevant Quilter report structure",
      "Run the pre-review file check",
      "Fill supportable gaps, then redraft and flag the rest",
    ],
    pack: [
      { icon: FileText, title: "Branded Word draft", note: "Editable and ready for adviser review" },
      { icon: FileCheck2, title: "Adviser QA sheet", note: "Evidence, omissions and judgement points" },
      { icon: Calculator, title: "Calculation workings", note: "Source-labelled figures carried into the case" },
    ],
  },
  {
    id: "annual-review",
    tab: "Annual review",
    eyebrow: "Meeting record to progress or outcome report",
    title: "Turn the annual-review meeting into completed follow-up work.",
    promise:
      "The engine compares the new conversation with the previous record, current values and risk information, then builds the appropriate progress-check or outcome report.",
    inputs: [
      { icon: FileText, title: "Review transcript", note: "What changed, what matters and what was agreed" },
      { icon: FolderOpen, title: "Previous review", note: "Existing objectives, actions and recommendations" },
      { icon: FileSpreadsheet, title: "Current client data", note: "Values, cash position, ATR and plan information" },
    ],
    processing: [
      "Compare circumstances and objectives",
      "Identify changes since the last review",
      "Check against the relevant Quilter review requirements",
      "Run the pre-review file check and recover evidence",
      "Redraft the report and separate work still needed",
    ],
    pack: [
      { icon: FileText, title: "Progress or outcome report", note: "The right document for the work completed" },
      { icon: FileText, title: "Meeting note", note: "The file record of the meeting, written up from the recording" },
      { icon: Check, title: "Action list", note: "Owner, evidence and status made visible" },
      { icon: Mail, title: "Client follow-up", note: "Clear email draft based on the reviewed result" },
    ],
  },
  {
    id: "cashflow",
    tab: "Cashflow & calculators",
    eyebrow: "Household data to professional planning pack",
    title: "Make the calculation understandable as well as correct.",
    promise:
      "The engine turns the household’s income, assets, spending phases and agreed assumptions into a cashflow report, client explanation and reusable calculation workings.",
    inputs: [
      { icon: FileSpreadsheet, title: "Household figures", note: "Income, expenditure, assets, debts and pensions" },
      { icon: FileText, title: "Objectives and assumptions", note: "Retirement dates, spending phases and priorities" },
      { icon: FolderOpen, title: "Supporting documents", note: "Statements, forecasts and source evidence" },
    ],
    processing: [
      "Build the household timeline",
      "Model spending phases and income sources",
      "Run cautious, central and stronger growth bases",
      "Check the workings against the applicable template logic",
      "Run the pre-review file check, redraft and show gaps",
    ],
    pack: [
      { icon: FileText, title: "Cashflow report", note: "A client-ready narrative around the model" },
      { icon: Mail, title: "Client email draft", note: "The result explained without inventing figures" },
      { icon: Calculator, title: "Over 20 adviser calculators", note: "Charges, CGT, critical yield, withdrawals and more" },
    ],
  },
];

function WorkflowPanel({ workflow }: { workflow: Workflow }) {
  const out = REAL[workflow.id];
  if (!out) throw new Error(`no real output wired for workflow "${workflow.id}"`);
  return (
    <div className="showcase-panel">
      <div className="showcase-heading">
        <div>
          <span>{workflow.eyebrow}</span>
          <h3>{workflow.title}</h3>
        </div>
        <p>{workflow.promise}</p>
      </div>

      <div className="showcase-flow">
        <section className="showcase-inputs" aria-label="Workflow inputs">
          <div className="showcase-column-label"><Upload /> What goes in</div>
          {workflow.inputs.map(({ icon: Icon, title, note }) => (
            <div className="showcase-file" key={title}>
              <Icon />
              <span><strong>{title}</strong><small>{note}</small></span>
              <CircleCheck />
            </div>
          ))}
          <div className="showcase-dropzone"><Upload /><span><strong>Drag and drop more case material</strong><small>Or select the relevant files from SharePoint or OneDrive</small></span></div>
        </section>

        <section className="showcase-engine" aria-label="What the Advice Engine does">
          <div className="engine-badge"><Sparkles /> The Advice Engine</div>
          <ol>
            {workflow.processing.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
          </ol>
          <div className="engine-control"><ShieldCheck /><span><strong>Compliance challenged before first draft</strong><small>Supportable gaps are filled from confirmed evidence; unresolved points remain visible for adviser review.</small></span></div>
        </section>

        <section className="showcase-output" aria-label="Real workflow output">
          <div className="showcase-column-label"><FileCheck2 /> What comes out</div>
          <div className="showcase-document">
            <div className="showcase-document-top"><span className="mini-mark" /><b>{out.firm} &middot; draft for adviser review</b><em>Real output</em></div>
            <h4>{out.title}</h4>
            <p>{out.client}</p>
            {out.metric ? <div className="showcase-metric"><strong>{out.metric.value}</strong><span>{out.metric.note}</span></div> : null}
            {out.sections.length ? (
              <div className="showcase-section-list">
                {out.sections.map((section, index) => <div key={section}><span>0{index + 1}</span><strong>{section}</strong></div>)}
              </div>
            ) : null}
            {out.excerpt ? (
              <div className="showcase-excerpt">
                {out.excerpt.map((line, index) => <p key={index}>{line}</p>)}
              </div>
            ) : null}
            <div className="showcase-flag"><strong>Information needed</strong><span>{out.flag}</span></div>
            {out.readMore ? <a className="showcase-readmore" href={out.readMore.href}>{out.readMore.label}</a> : null}
          </div>
        </section>
      </div>

      <div className="showcase-pack">
        <span>The complete adviser pack</span>
        {workflow.pack.map(({ icon: Icon, title, note }) => (
          <div key={title}><Icon /><p><strong>{title}</strong><small>{note}</small></p></div>
        ))}
      </div>
    </div>
  );
}

export function WorkflowShowcase() {
  return (
    <Tabs defaultValue="suitability" className="workflow-showcase">
      <TabsList aria-label="Choose a workflow demonstration" className="showcase-tabs">
        {workflows.map((workflow) => <TabsTrigger value={workflow.id} key={workflow.id}>{workflow.tab}</TabsTrigger>)}
      </TabsList>
      {workflows.map((workflow) => (
        <TabsContent value={workflow.id} key={workflow.id}>
          <WorkflowPanel workflow={workflow} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
