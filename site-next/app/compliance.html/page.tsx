import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Compliance support",
  description: "Make the file easier to review before it reaches review: source-pack checks, evidence-backed gap recovery and a clear QA trail for the authorised firm.",
};

export default function Page() { return <CapabilityPage data={capabilities.compliance} />; }
