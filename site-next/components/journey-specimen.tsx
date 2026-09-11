"use client";

import { useState } from "react";
import { CircleCheck, FileCheck2, FileText, FolderOpen, Search, TriangleAlertIcon } from "lucide-react";

import documents from "@/lib/specimen-documents.json";

/**
 * The full-journey specimen: one fictitious client's file across four stages, read on
 * screen (Daren, 11 September 2026).
 *
 * NOT DOWNLOADABLE, AND ONLY THE CLIENT-FACING DOCUMENTS. A .docx is a reusable
 * template and a rendered page is not, and the adviser QA sheet, the pre-meeting
 * briefing and the suitability compliance check carry Quilter's checklist item
 * numbering, paraphrased requirement wording and the WealthSelect charge table. Those
 * three are not published in any form. What the QA sheet FOUND is quoted below instead,
 * and every quoted finding is about the engine's own drafts contradicting each other -
 * none of it reproduces anyone's checklist.
 *
 * The document text comes from lib/specimen-documents.json, produced by
 * scripts/extract-specimens.py, which refuses to write the file if any of that material
 * appears in it. Do not hand-edit the JSON.
 */

type Block =
  | { t: "h2" | "h3" | "h4" | "p" | "li"; text: string }
  | { t: "table"; rows: string[][] };

type SpecimenDoc = {
  id: string;
  stage: string;
  title: string;
  subtitle: string;
  blocks: Block[];
  counts: { blocks: number; words: number; tables: number };
};

// Two casts: the JSON import infers `t: string`, which does not overlap the block
// discriminated union closely enough for a direct assertion under `strict`.
const docs = documents as unknown as SpecimenDoc[];

const STAGES: { id: string; n: string; name: string; when: string; inputs: string }[] = [
  {
    id: "initial-meeting",
    n: "01",
    name: "Initial meeting",
    when: "08:49",
    inputs: "Meeting notes and the fact find",
  },
  {
    id: "suitability",
    n: "02",
    name: "Suitability report",
    when: "08:56",
    inputs: "The fact find alone",
  },
  {
    id: "progress-check",
    n: "03",
    name: "Progress check",
    when: "08:56",
    inputs: "Fact find, valuation summary, last year's outcome report",
  },
  {
    id: "outcome",
    n: "04",
    name: "Outcome report",
    when: "09:10",
    inputs: "All of the above, the meeting notes, and the progress check just written",
  },
];

/**
 * Why the drafts grade partial. The specimen case is written the way a real adviser's
 * file note is written: it says the paperwork is on file and quotes the percentages,
 * without reproducing the provider figures underneath. Checked against a freshly
 * generated pack, not asserted - see scripts in the engine repo.
 */
const WITHHELD = [
  "The illustration is referenced as on file, but its numbers are not. No reduction in yield in pounds, and no ex-ante costs and charges figures.",
  "Charges arrive as annual percentages only. The portfolio charge is never split into its fund and managed-portfolio service components, nor aggregated into pounds over the term.",
  "The existing pension has a value and a statement said to be on file. It has no provider, plan type, funds held or annual charges.",
  "Every date is relative: this month, twelve months ago, at outset. So no figure in any draft can carry a date.",
  "A signed fee authority is on file, but nothing explains why the minimum initial fee was waived.",
];

/**
 * Quoted from the adviser quality-check the same run produced. Each one is the engine
 * catching its own drafts, so none of it is anyone else's compliance material.
 */
const CAUGHT = [
  {
    what: "Two different answers to the same question",
    detail:
      "The report projects a maximum sustainable income of about £10,600 a year; the internal briefing projects about £12,100. The two runs differ on contributions, net real return and income basis. Fix one basis, rerun both documents, and report on the same basis throughout.",
  },
  {
    what: "A £1 error, found by re-adding the column",
    detail:
      "The report states net worth of £233,910. The components sum to £233,911. Correct the report.",
  },
  {
    what: "A document contradicting its own fee table",
    detail:
      "The report leaves the pension charges as a placeholder, then applies 1.96% a year of charges to the pension in its projection. Resolve before issue and make the fee table, the projection assumptions and the declaration agree.",
  },
  {
    what: "An email whose tone does not match the report",
    detail:
      "The report's overall status is needs discussion, with a shortfall of about £17,900 a year as the headline finding. The email says progressing well, with a few topics to discuss. Align the email's one-line answer with the report status.",
  },
  {
    what: "A table whose rows do not line up",
    detail:
      "In the agenda's standing topics, four rows carry three cells against a four-column header, so the time allocation renders in the wrong column. The allocations themselves are correct and sum to 60 minutes. Fix the rows.",
  },
  {
    what: "Sources that point at nothing",
    detail:
      "Sources are named throughout, which is good, but almost nothing is dated: around twenty source cells cite a valuation whose date is still a placeholder. Insert the valuation date and the report date.",
  },
];

function DocumentBody({ doc }: { doc: SpecimenDoc }) {
  return (
    <div className="spec-doc-body">
      {doc.blocks.map((block, i) => {
        if (block.t === "table") {
          const [head, ...rest] = block.rows;
          const cols = Math.max(...block.rows.map((r) => r.length));
          return (
            <div className="spec-table-wrap" key={i}>
              <table className="spec-table">
                <thead>
                  <tr>
                    {Array.from({ length: cols }, (_, c) => (
                      <th key={c}>{head[c] ?? ""}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rest.map((row, r) => (
                    <tr key={r}>
                      {Array.from({ length: cols }, (_, c) => (
                        <td key={c}>{row[c] ?? ""}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        const text = block.text;
        // The placeholders the engine could not fill are the point, so they are marked
        // rather than rendered as ordinary prose.
        const marked = text.includes("[TO CONFIRM") || text.includes("Information required");
        if (block.t === "h2") return <h4 key={i}>{text}</h4>;
        if (block.t === "h3") return <h5 key={i}>{text}</h5>;
        if (block.t === "h4") return <h6 key={i}>{text}</h6>;
        if (block.t === "li")
          return (
            <p className="spec-li" key={i}>
              {text}
            </p>
          );
        return (
          <p className={marked ? "spec-p marked" : "spec-p"} key={i}>
            {text}
          </p>
        );
      })}
    </div>
  );
}

export function JourneySpecimen() {
  const [openId, setOpenId] = useState(docs[0].id);
  const open = docs.find((d) => d.id === openId) ?? docs[0];
  const openStage = STAGES.find((s) => s.id === open.stage);
  const totalWords = docs.reduce((n, d) => n + d.counts.words, 0);

  return (
    <div className="journey-specimen">
      <div className="journey-case">
        <div>
          <span className="kicker">The case</span>
          <p>
            Avery Drafter, a fictitious client: age 45, £100,000 to invest, retirement at 67, a
            balanced attitude to risk. One generated case pack ran through four pipelines in the
            order a real client meets them, so the documents answer one another rather than
            standing alone. Produced in Ginkgo Financial&rsquo;s branding, because that is the
            firm view the run used.
          </p>
        </div>
        <dl>
          <div>
            <dt>Stages</dt>
            <dd>4</dd>
          </div>
          <div>
            <dt>Words</dt>
            <dd>{(totalWords / 1000).toFixed(1)}k</dd>
          </div>
          <div>
            <dt>One run</dt>
            <dd>21 min</dd>
          </div>
        </dl>
      </div>

      <div className="spec-reader">
        <nav className="spec-rail" aria-label="Choose a document to read">
          {STAGES.map((stage) => {
            const inStage = docs.filter((d) => d.stage === stage.id);
            return (
              <div className="spec-rail-stage" key={stage.id}>
                <span className="spec-rail-head">
                  <b>{stage.n}</b>
                  {stage.name}
                  <em>{stage.when}</em>
                </span>
                {inStage.map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    className={d.id === openId ? "spec-rail-doc current" : "spec-rail-doc"}
                    aria-current={d.id === openId ? "true" : undefined}
                    onClick={() => setOpenId(d.id)}
                  >
                    <FileText aria-hidden="true" />
                    <span>{d.title}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* No aria-live here: it would announce four thousand words on every
            switch. The rail buttons carry aria-current instead. */}
        <article className="spec-doc">
          <header className="spec-doc-head">
            <div className="spec-doc-chrome">
              <span className="mini-mark" />
              <b>Your firm</b>
              <em>Draft &middot; adviser review required</em>
            </div>
            <h3>{open.title}</h3>
            <p className="spec-doc-sub">{open.subtitle}</p>
            {openStage ? (
              <p className="spec-doc-meta">
                <FolderOpen aria-hidden="true" /> Stage {openStage.n}, {openStage.name}. In:{" "}
                {openStage.inputs}
              </p>
            ) : null}
          </header>
          <DocumentBody doc={open} />
          <footer className="spec-doc-foot">
            Fictitious specimen, shown in full and unedited. A draft in this state may not be
            issued to any client until a named adviser, and where required the firm&rsquo;s
            compliance function, has reviewed and signed it.
          </footer>
        </article>
      </div>

      <div className="spec-why">
        <div className="spec-why-col">
          <span className="kicker">Why the drafts grade partial</span>
          <h3>The case says the paperwork is on file. It never supplies the figures.</h3>
          <p>
            That is deliberate, and it is how most real files actually arrive. The specimen case
            is written like an adviser&rsquo;s file note: the illustration is on file, the fee
            authority is signed, the charges are quoted as annual percentages. What it never does
            is reproduce the numbers underneath. The engine will not promote
            &ldquo;on file&rdquo; into a figure it has not seen, so it writes the percentage it
            was given, leaves the monetary figure as a placeholder, and the compliance pass names
            every one of them instead of waving it through.
          </p>
          <ul className="spec-withheld">
            {WITHHELD.map((w) => (
              <li key={w}>
                <TriangleAlertIcon aria-hidden="true" />
                {w}
              </li>
            ))}
          </ul>
          <p className="spec-why-note">
            Six such items were named on the suitability report alone. A specimen pack of clean
            passes would only show you that a generated case can be made to agree with itself.
          </p>
        </div>

        <div className="spec-why-col">
          <span className="kicker">What the quality-check caught</span>
          <h3>The engine argues with its own drafts.</h3>
          <p>
            Every run ends with an adviser quality-check that reconciles the documents against
            each other before a human sees them. These are its findings on this run, quoted. The
            fifth is visible on screen in the agenda above.
          </p>
          <ol className="spec-caught">
            {CAUGHT.map((c) => (
              <li key={c.what}>
                <Search aria-hidden="true" />
                <span>
                  <strong>{c.what}</strong>
                  <small>{c.detail}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="spec-note">
        <div>
          <FileCheck2 aria-hidden="true" />
          <span>
            <strong>Read here, not downloaded.</strong> These are shown on screen rather than
            offered as Word files, so a firm&rsquo;s report structure does not leave as an
            editable template.
          </span>
        </div>
        <div>
          <CircleCheck aria-hidden="true" />
          <span>
            <strong>Three documents are not shown.</strong> The pre-meeting briefing, the fact
            find update and the adviser quality-check are internal records that no client
            receives. What the quality-check found is quoted above.
          </span>
        </div>
      </div>
    </div>
  );
}
