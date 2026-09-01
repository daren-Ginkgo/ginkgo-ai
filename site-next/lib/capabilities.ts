import type { Capability } from "@/components/capability-page";

const adviserPhoto = "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600";
const teamPhoto = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600";
const meetingPhoto = "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1600";

export const capabilities: Record<string, Capability> = {
  suitability: {
    eyebrow: "Suitability and review documents",
    title: "Start with the evidence, not an empty report.",
    copy: "Turn the client record, meeting evidence and calculations into a structured branded draft built around the relevant Quilter templates and challenged before the adviser sees it.",
    image: adviserPhoto,
    imageAlt: "Financial professional reviewing a report on a laptop",
    outcomeTitle: "A stronger first draft and a clearer final check.",
    outcomes: ["Built around relevant Quilter templates and report structure", "Initial sweep against applicable Q Business Assurance requirements", "Evidence-backed redraft plus a separate information-needed list", "Final review and sign-off retained by the adviser"],
    steps: [
      { title: "Select the case evidence", copy: "Use the relevant client documents, meeting material and calculation workings." },
      { title: "Sweep, recover and redraft", copy: "The workflow challenges the draft, uses confirmed case evidence to close supportable gaps and rebuilds the document." },
      { title: "Review and issue", copy: "The named adviser checks the branded Word draft, source evidence and remaining QA points before anything is issued." },
    ],
    specimenTitle: "Suitability report and adviser QA",
    specimenCopy: "See how source-backed facts, recommendations, calculations and unresolved items can be presented together without pretending the adviser’s judgement is automated.",
  },
  meetings: {
    eyebrow: "Meeting preparation and follow-up",
    title: "Arrive prepared. Leave with the file already moving.",
    copy: "Create focused meeting packs from the existing client record, then turn the meeting evidence into structured follow-up work.",
    image: meetingPhoto,
    imageAlt: "Professional team discussing work around a meeting table",
    outcomeTitle: "More useful meetings, with less reconstruction afterwards.",
    outcomes: ["Concise pre-meeting briefing from the current file", "Objectives, changes and open actions brought forward", "Structured meeting summary and follow-up list", "Clear audit trail back to the source material"],
    steps: [
      { title: "Prepare", copy: "Find the relevant client history and create an adviser-ready briefing." },
      { title: "Capture", copy: "Use the transcript or notes to structure what changed, what was agreed and what remains open." },
      { title: "Continue", copy: "Create the next tasks, draft client correspondence and preserve the evidence trail." },
    ],
    specimenTitle: "Annual review meeting pack",
    specimenCopy: "A concise picture of the client position, last agreed actions, likely discussion points and information still needed.",
  },
  compliance: {
    eyebrow: "Compliance support",
    title: "Make the file easier to review before it reaches review.",
    copy: "Run an initial sweep against the applicable Q Business Assurance requirements, recover supportable evidence and redraft before the work reaches the adviser’s first review.",
    image: teamPhoto,
    imageAlt: "Advice firm colleagues collaborating in a modern office",
    outcomeTitle: "Earlier visibility of the issues that create rework.",
    outcomes: ["Checks grounded in the Q Business Assurance Manual", "Available evidence used to resolve supportable gaps", "Redrafted output plus a separate adviser QA record", "No claim of Quilter approval, automated approval or guaranteed compliance"],
    steps: [
      { title: "Review the source pack", copy: "Identify the documents and facts that should support the proposed work." },
      { title: "Sweep and recover", copy: "Challenge the emerging draft and use confirmed case material to resolve gaps where the source supports it." },
      { title: "Redraft and record", copy: "Rebuild the draft, preserve the remaining QA points and keep the authorised firm’s responsibility clear." },
    ],
    specimenTitle: "Pre-submission QA review",
    specimenCopy: "A focused adviser-facing summary of what is strong, what is missing and what should be resolved before submission.",
  },
  finprom: {
    eyebrow: "Financial promotion support",
    title: "A disciplined first review for every promotion.",
    copy: "Check draft communications for balance, clarity, evidence and likely review points—without presenting software output as approval.",
    image: adviserPhoto,
    imageAlt: "Professional reviewing written material on a laptop",
    outcomeTitle: "Better-prepared promotions and a cleaner review trail.",
    outcomes: ["Structured checks against firm requirements", "Risk, balance and substantiation prompts", "Clear record of points requiring human review", "Final approval remains with the authorised firm"],
    steps: [
      { title: "Add the draft", copy: "Bring in the promotion, intended audience and channel context." },
      { title: "Run the review", copy: "Identify clarity, balance, evidence and disclosure points for consideration." },
      { title: "Resolve and approve", copy: "The firm addresses the findings and completes its normal approval process." },
    ],
    specimenTitle: "Financial promotion review note",
    specimenCopy: "A practical review record that helps the firm resolve issues; it is not a regulatory approval certificate.",
  },
  find: {
    eyebrow: "Advice Gap Scanner",
    title: "Find the client needs already hiding in the file.",
    copy: "Surface needs that were mentioned but never carried into advice or follow-up, with the original source quote attached for verification.",
    image: meetingPhoto,
    imageAlt: "Adviser and colleagues reviewing client information",
    outcomeTitle: "A better next conversation, grounded in evidence.",
    outcomes: ["Potential unmet needs linked to their source", "Original quote shown for adviser verification", "Conversation prompts rather than automated advice", "Practical follow-up actions for the next meeting"],
    steps: [
      { title: "Scan the selected evidence", copy: "Review meeting records and case material for needs, concerns and unfinished actions." },
      { title: "Verify the finding", copy: "Show the source wording so the adviser can confirm the context." },
      { title: "Prepare the conversation", copy: "Turn verified findings into agenda prompts and appropriate follow-up work." },
    ],
    specimenTitle: "Verified advice-gap summary",
    specimenCopy: "A fictitious legacy-pension finding, source quotation and suggested next conversation—all separated clearly from financial advice.",
  },
  organise: {
    eyebrow: "Organise client work",
    title: "Find the right evidence without opening every file.",
    copy: "Use OneDrive and SharePoint file names and dates to suggest the most relevant case material, then retrieve contents only after adviser confirmation.",
    image: teamPhoto,
    imageAlt: "Small professional services team collaborating",
    outcomeTitle: "Less file hunting and a more deliberate source pack.",
    outcomes: ["Likely relevant files suggested with a reason", "File names and dates considered before content retrieval", "Adviser confirms which files may be used", "Selected evidence carried into the workflow"],
    steps: [
      { title: "Choose the workflow", copy: "The job tells the engine what kinds of evidence are likely to matter." },
      { title: "Review suggestions", copy: "See relevant-looking files and why they were suggested before contents are fetched." },
      { title: "Confirm the source pack", copy: "The adviser selects the files that can be used for the task." },
    ],
    specimenTitle: "Relevant-file selection",
    specimenCopy: "A transparent selection stage showing file name, date, relevance reason and adviser confirmation before retrieval.",
  },
};
