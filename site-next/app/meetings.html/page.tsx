import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Meeting preparation and follow-up",
  description: "Arrive prepared and leave with the file already moving: briefings, structured capture and follow-up drafted from the meeting evidence.",
};

export default function Page() { return <CapabilityPage data={capabilities.meetings} />; }
