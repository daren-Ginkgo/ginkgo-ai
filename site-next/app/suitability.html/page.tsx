import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Suitability and review documents",
  description: "Draft suitability reports and annual reviews that start with the evidence: branded Word drafts, source references and adviser QA points.",
};

export default function Page() { return <CapabilityPage data={capabilities.suitability} />; }
