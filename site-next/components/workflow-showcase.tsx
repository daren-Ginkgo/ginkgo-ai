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

type Workflow = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  promise: string;
  inputs: { icon: typeof FileText; title: string; note: string }[];
  processing: string[];
  output: {
    label: string;
    title: string;
    client: string;
    metric?: string;
    metricNote?: string;
    sections: string[];
    flag: string;
  };
  pack: { icon: typeof FileText; title: string; note: string }[];
};

const workflows: Workflow[] = [
  {
    id: "suitability",
    tab: "Suitability report",
    eyebrow: "Transcript to branded recommendation",
    title: "Start with the conversation—not a blank report.",
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
      "Run the initial Q Business Assurance sweep",
      "Fill supportable gaps, then redraft and flag the rest",
    ],
    output: {
      label: "Your firm · Draft for adviser review",
      title: "Suitability Report",
      client: "Alex and Sam Taylor · Fictitious specimen",
      sections: ["Your circumstances and objectives", "Risk and capacity for loss", "Recommendation and why it is suitable", "Costs, charges and key risks"],
      flag: "Confirm the final provider illustration and cancellation wording before issue.",
    },
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
      "Run the initial compliance sweep and recover evidence",
      "Redraft the report and separate work still needed",
    ],
    output: {
      label: "Your firm · Draft for adviser review",
      title: "Annual Review Outcome",
      client: "Alex and Sam Taylor · Fictitious specimen",
      sections: ["What has changed", "Objectives and progress", "Risk and current arrangements", "Agreed actions and next steps"],
      flag: "Obtain the latest legacy pension value before confirming the final outcome.",
    },
    pack: [
      { icon: FileText, title: "Progress or outcome report", note: "The right document for the work completed" },
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
      "Run the initial compliance sweep, redraft and show gaps",
    ],
    output: {
      label: "Your firm · Lifetime cashflow",
      title: "Your cashflow plan",
      client: "Alex and Sam Taylor · Fictitious specimen",
      metric: "£48,000 a year",
      metricNote: "Illustrative target spending in today’s money",
      sections: ["The answer in plain English", "What moved and why", "Your two-phase spending plan", "Assumptions, ranges and points to confirm"],
      flag: "Confirm both State Pension forecasts before the final adviser review.",
    },
    pack: [
      { icon: FileText, title: "Cashflow report", note: "A client-ready narrative around the model" },
      { icon: Mail, title: "Client email draft", note: "The result explained without inventing figures" },
      { icon: Calculator, title: "25 adviser calculators", note: "Charges, CGT, critical yield, withdrawals and more" },
    ],
  },
];

function WorkflowPanel({ workflow }: { workflow: Workflow }) {
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

        <section className="showcase-output" aria-label="Example workflow output">
          <div className="showcase-column-label"><FileCheck2 /> What comes out</div>
          <div className="showcase-document">
            <div className="showcase-document-top"><span className="mini-mark" /><b>{workflow.output.label}</b><em>Draft</em></div>
            <h4>{workflow.output.title}</h4>
            <p>{workflow.output.client}</p>
            {workflow.output.metric ? <div className="showcase-metric"><strong>{workflow.output.metric}</strong><span>{workflow.output.metricNote}</span></div> : null}
            <div className="showcase-section-list">
              {workflow.output.sections.map((section, index) => <div key={section}><span>0{index + 1}</span><strong>{section}</strong></div>)}
            </div>
            <div className="showcase-flag"><strong>Information needed</strong><span>{workflow.output.flag}</span></div>
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
