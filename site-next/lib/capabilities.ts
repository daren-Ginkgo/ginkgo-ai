import type { Capability } from "@/components/capability-page";

const adviserPhoto = "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600";

// Site restructure, 7 Sep 2026 (handover 2, task E): the suitability, meetings
// and organise capability pages were retired (308 redirects to /outputs and
// /microsoft) and their entries removed with them; the compliance entry went
// on 7 Sep with copy deck Part A; the Gap Scanner has its own page at
// /gap-scanner and never used this table. Only finprom.html renders from here.
export const capabilities: Record<string, Capability> = {
  finprom: {
    eyebrow: "Financial promotion support",
    title: "A disciplined first review for every promotion.",
    copy: "Check draft communications for balance, clarity, evidence and likely review points, without presenting software output as approval.",
    image: adviserPhoto,
    imageAlt: "Professional reviewing written material on a laptop",
    outcomeTitle: "Better-prepared promotions and a cleaner review trail.",
    outcomes: ["Structured checks against firm requirements", "Risk, balance and substantiation prompts", "Clear record of points requiring human review", "Approval remains with your principal firm, through your normal process"],
    steps: [
      { title: "Add the draft", copy: "Bring in the promotion, intended audience and channel context." },
      { title: "Run the review", copy: "Identify clarity, balance, evidence and disclosure points for consideration." },
      { title: "Resolve, then send for approval", copy: "The firm addresses the findings and completes its normal approval process." },
    ],
    specimenTitle: "Financial promotion review note",
    specimenCopy: "A practical review record that helps the firm resolve issues; it is not a regulatory approval certificate.",
  },
};
