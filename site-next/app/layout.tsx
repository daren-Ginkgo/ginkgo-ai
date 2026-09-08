import type { Metadata } from "next";
import "./globals.css";
import { ConversionTracker } from "@/components/conversion-tracker";
import { ChatWidget } from "@/components/chat-widget";

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
    locale: "en_GB",
    // No title or description here on purpose. Hardcoding them gave all
    // seventeen routes one identical share card, so the per-route metadata
    // only ever reached <title>. Left undefined, Next resolves og:title and
    // og:description from each page's own title and description.
    // The image resolves against metadataBase and is inherited everywhere,
    // since no page defines its own openGraph object.
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
        <ChatWidget />
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
