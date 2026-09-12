"use client";

import { useState } from "react";
import { CircleCheck, FileText, FolderOpen } from "lucide-react";

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
            standing alone. Shown here as text, because these came out of the test window. A
            live run hands the adviser branded Word documents in the firm&rsquo;s own styling,
            ready for final editing.
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

      <div className="spec-note">
        <div>
          <FileText aria-hidden="true" />
          <span>
            <strong>Live outputs are branded Word documents.</strong> These specimens came out
            of the test window, so they are shown here as text. A real run hands the adviser a
            Word document in the firm&rsquo;s own styling, ready for final editing.
          </span>
        </div>
        <div>
          <CircleCheck aria-hidden="true" />
          <span>
            <strong>Some facts are missing from this case on purpose.</strong> Watch what the
            drafts do with them: anything the engine could not confirm stays marked in the text
            rather than quietly filled in, so it cannot slip past the adviser.
          </span>
        </div>
      </div>
    </div>
  );
}
