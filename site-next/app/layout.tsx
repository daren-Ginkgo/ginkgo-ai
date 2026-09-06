import type { Metadata } from "next";
import "./globals.css";
import { ConversionTracker } from "@/components/conversion-tracker";

const SITE_NAME = "The Advice Engine";
const DEFAULT_TITLE = "The Advice Engine | Advice paperwork, built around the evidence";
const DEFAULT_DESCRIPTION =
  "The Advice Engine turns client case material into branded draft documents, adviser QA checks and auditable calculations for UK advice firms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theadviceengine.ai"),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    // Resolves per route against metadataBase, so every page gets its own canonical.
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

// Company number verified against Companies House on 6 September 2026.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Advice Engine Ltd",
  url: "https://theadviceengine.ai",
  email: "hello@theadviceengine.ai",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: "17404907",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: "https://theadviceengine.ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DEFAULT_DESCRIPTION,
  publisher: { "@type": "Organization", name: "The Advice Engine Ltd" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ConversionTracker />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </body>
    </html>
  );
}
