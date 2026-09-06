import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Financial promotion support",
  description: "A disciplined first review for every promotion: clarity, balance, evidence and disclosure points for the firm's own approval process.",
};

export default function Page() { return <CapabilityPage data={capabilities.finprom} />; }
