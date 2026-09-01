import type { Metadata } from "next";
import "./globals.css";
import { ConversionTracker } from "@/components/conversion-tracker";

export const metadata: Metadata = {
  title: "The Advice Engine | Advice paperwork, built around the evidence",
  description:
    "The Advice Engine turns client case material into branded draft documents, adviser QA checks and auditable calculations for UK advice firms.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body><ConversionTracker />{children}</body>
    </html>
  );
}
