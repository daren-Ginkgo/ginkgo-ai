import type { Metadata } from "next";
import { CapabilityPage } from "@/components/capability-page";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Organise client work",
  description: "Find the right evidence without opening every file: the engine suggests the documents likely to matter and the adviser confirms the source pack.",
};

export default function Page() { return <CapabilityPage data={capabilities.organise} />; }
