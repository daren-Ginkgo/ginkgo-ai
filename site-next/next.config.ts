import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure App Service runs the self-contained Node server produced here.
  output: "standalone",
  async redirects() {
    return [
      // The 5 September 2026 cutover from the GitHub Pages site dropped these
      // root .html URLs. Permanent redirects to the closest live equivalent.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/demo.html", destination: "/demo", permanent: true },
      // Targets confirmed by Daren, 7 Sep 2026: terms restored at /terms; the
      // old "Tools and calculators" and "Start your free month" pages map to
      // their successors.
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/tools.html", destination: "/product", permanent: true },
      { source: "/trial.html", destination: "/start", permanent: true },
      // Retired 7 Sep 2026 (copy deck Part A): the compliance page positioned
      // the software as a compliance function and named the Q Business
      // Assurance Manual. /product owns this ground now.
      { source: "/compliance.html", destination: "/product", permanent: true },
      // Site restructure, 7 Sep 2026 (handover 2, task E): eighteen URLs to
      // six public pages. The legacy capability shells fold into /outputs and
      // /microsoft; the Gap Scanner keeps its page under a clean URL.
      { source: "/suitability.html", destination: "/outputs", permanent: true },
      { source: "/meetings.html", destination: "/outputs", permanent: true },
      { source: "/organise.html", destination: "/microsoft", permanent: true },
      { source: "/find.html", destination: "/gap-scanner", permanent: true },
      // 8 Sep 2026: the two calculator specimens ship as PDF so the workbook
      // itself is not handed over. Deleting them from public/ does NOT remove
      // them from the live site, because the App Service deploy does not clean
      // wwwroot, so both .xlsx URLs still served 200 after the change. These
      // redirects run ahead of the filesystem and close them.
      {
        source: "/specimens/specimen-bond-encashment-workings.xlsx",
        destination: "/specimens/specimen-bond-encashment-workings.pdf",
        permanent: true,
      },
      {
        source: "/specimens/specimen-cost-and-charges-workings.xlsx",
        destination: "/specimens/specimen-cost-and-charges-workings.pdf",
        permanent: true,
      },
      // 12 Sep 2026: the adviser QA sheet and the compliance check are withdrawn.
      // Both reproduced twenty-six Quilter investment-advice requirements verbatim
      // and carried WealthSelect charge figures. Removing them from public/ and
      // unlinking them was NOT enough - the same trap as the .xlsx URLs above: the
      // App Service deploy does not clean wwwroot, and both files still answered
      // 200 after a successful deploy. These redirects run ahead of the filesystem
      // and close them for good. There is no replacement document by design; the
      // quality-check is represented on /outputs by quoting what it found.
      {
        source: "/specimens/specimen-adviser-qa-sheet-investment.docx",
        destination: "/outputs",
        permanent: true,
      },
      {
        source: "/specimens/specimen-compliance-check-investment.docx",
        destination: "/outputs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
