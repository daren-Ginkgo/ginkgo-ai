#!/usr/bin/env python3
"""Turn the full-journey specimen .docx files into the JSON the /outputs viewer renders.

The documents are shown ON SCREEN and are not downloadable, so the .docx files never
enter this repo: only the extracted text does (Daren, 11 September 2026). Two reasons,
and the second is the one that settled it:

  * a .docx is a reusable template; a rendered page is not, and Quilter advisers'
    report structure should not leave as an editable file.
  * the adviser QA sheet, the pre-meeting briefing and the suitability compliance
    check carry Quilter's checklist item numbering, paraphrased requirement wording
    and the WealthSelect charge table. None of those three is published, in any form.

So ONLY_CLIENT_FACING below is the whole publishable set: the documents a client of the
firm would actually receive. The initial-meeting .docx bundles four documents together
with their quality-check results, so it is sliced by heading and only its two
client-facing parts are taken.

Usage (from site-next/, with the specimen .docx files in a directory of your choosing):
    python scripts/extract-specimens.py <docx-dir> lib/specimen-documents.json
"""
import json
import os
import re
import sys
import zipfile

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

# Anything matching these must never reach the JSON. Belt and braces: the document
# selection below already excludes the QA material, and this refuses to write the file
# if a future re-run of the pack puts it somewhere unexpected.
FORBIDDEN = {
    "Quilter checklist item numbering": r"Item \d+ \[",
    "'requirements (sourced)'": r"requirements \(sourced\)",
    # The CHARGE TABLE, not portfolio names. "Managed Passive 4" is the name of the
    # fund a client holds and appears in their own meeting note and suitability
    # report as a matter of course; it is not confidential and matching on it made
    # this refuse perfectly publishable documents (12 Sep 2026). What must never
    # appear is the level-by-level charge breakdown.
    "WealthSelect charge table": r"0\.54%|0\.15%",
    "checklist or QA scaffolding": r"checklist applied|quality-check result|Graded checklist",
}

# (output id, source filename, stage, title, subtitle, slice-from, slice-to)
# The slice bounds are Heading1 texts, used only for the bundled initial-meeting pack.
ONLY_CLIENT_FACING = [
    ("initial-follow-up-email", "ginkgo-financial-ltd-initial-meeting-post-meeting-specimen.docx",
     "initial-meeting", "Follow-up email",
     "Sent after the first meeting. No advice was given and the email says so.",
     "follow-up-email", "follow-up-email: quality-check result"),
    ("initial-meeting-record", "ginkgo-financial-ltd-initial-meeting-post-meeting-specimen.docx",
     "initial-meeting", "Introduction Meeting Record",
     "The written record of what was discussed, and what still has to be confirmed.",
     "Introduction Meeting Record", "introduction-report: quality-check result"),
    ("suitability-report", "DEMO-ginkgo-financial-ltd-specimen-report.docx",
     "suitability", "Suitability report",
     "The recommendation, its costs and the risks, in the firm's house section order.",
     None, None),
    ("progress-check-report", "Drafter_AAM_ProgressCheckReport.docx",
     "progress-check", "Progress Check Report",
     "Twelve months reported back: performance, net worth, projection and allowances.",
     None, None),
    ("progress-check-covering-email", "Drafter_AAM_PCRCoveringEmail.docx",
     "progress-check", "Covering email",
     "The report in six sentences, with the two items for the meeting named.",
     None, None),
    ("meeting-agenda", "Drafter_AAM_Agenda.docx",
     "progress-check", "Meeting agenda",
     "The client's own questions first, then the standing topics, timed to the hour.",
     None, None),
    ("outcome-report", "Drafter_AAM_OutcomeReport.docx",
     "outcome", "Outcome Report",
     "What was agreed, and the contribution question answered with figures.",
     None, None),
    ("outcome-covering-email", "Drafter_AAM_CoveringEmail.docx",
     "outcome", "Covering email",
     "The outcome in plain language, with the charges in pounds as well as percentages.",
     None, None),
]


# The three workflow demonstrations on /outputs used to show INVENTED output panels:
# made-up section lists and a made-up headline figure, on a page whose whole claim is
# "judge the work, not the promise". These two documents replace the invented panels
# with real extracted text (Daren, 12 September 2026).
#
# They are a different fictitious case from the four-stage journey, which is why they
# are not in the journey reader: that reader is deliberately ONE client across ONE
# year. The suitability panel needs nothing here - it reads the journey's own
# suitability report.
#
# The meeting note is sliced to its client-facing sections. The rest of that .docx is
# an adviser-only quality-check reproducing an eleven-item checklist, which is exactly
# the material FORBIDDEN above refuses.
SHOWCASE = [
    {
        "id": "annual-review-meeting-note",
        "workflow": "annual-review",
        "file": "specimen-meeting-note-annual-review.docx",
        "title": "Meeting note: annual advice meeting",
        "firm": "Ginkgo Financial",
        "client": "Ashworth household",
        "slice": ("Annual Advice Meeting Note - Ashworth Household",
                  "Quality-check result (adviser only)"),
        # Must appear verbatim in the sliced document, or the build fails.
        "flag": ("Capacity for loss: Information required: whether capacity for loss was "
                 "revisited. The transcript does not record it."),
    },
    {
        "id": "cashflow-client-email",
        "workflow": "cashflow",
        "file": "specimen-draft-client-email-alex-and-sam.docx",
        "title": "Draft client email: the cash flow plan",
        # A different firm on purpose: this one specimen is the only thing on the site
        # that shows the white-label switch, the same engine writing as another firm.
        "firm": "Example Wealth",
        "client": "Alex and Sam",
        "slice": (None, None),
        "flag": ("The State Pension for Alex and Sam is included from the gov.uk timetable. "
                 "Please check your own forecast at gov.uk/check-state-pension and send it "
                 "over, so the plan rests on your figure rather than the standard one."),
    },
]


def build_showcase(src):
    """Headings, gap lines and an opening excerpt for each showcase document."""
    out = []
    for spec in SHOWCASE:
        blocks = strip_boilerplate(
            slice_blocks(read_blocks(os.path.join(src, spec["file"])), *spec["slice"]))
        headings = [b["text"] for b in blocks if b["t"].startswith("h")]
        gaps = [b["text"] for b in blocks if b["t"] != "table"
                and ("Information required" in b["text"] or "[TO CONFIRM" in b["text"])]
        body = [b["text"] for b in blocks if b["t"] in ("p", "li")]
        flat = " ".join(b.get("text", "") for b in blocks)
        if spec["flag"] not in flat:
            raise SystemExit(f"{spec['id']}: the configured flag is not in the document "
                             "verbatim, so it would be a claim rather than a quotation")
        out.append({
            "id": spec["id"], "workflow": spec["workflow"], "title": spec["title"],
            "firm": spec["firm"], "client": spec["client"],
            "headings": headings, "gaps": gaps, "excerpt": body[:6],
            "counts": {"words": sum(len(t.split()) for t in body), "headings": len(headings),
                       "gaps": len(gaps)},
            "flag": spec["flag"],
        })
        print(f"  {spec['id']:28} {len(headings):3} headings, {len(gaps):3} gap lines, "
              f"{out[-1]['counts']['words']:5} words")
    return out


def para_text(p):
    """Visible text of one paragraph, tabs included as spaces."""
    out = []
    for node in p.iter():
        if node.tag == W + "t":
            out.append(node.text or "")
        elif node.tag == W + "tab":
            out.append(" ")
        elif node.tag in (W + "br", W + "cr"):
            out.append(" ")
    # The renderer produces a literal pound sign; mojibake here means a bad read.
    return re.sub(r"[ \t]+", " ", "".join(out)).strip()


def para_kind(p):
    """h2 / h3 / h4 / li / p, from the paragraph style and numbering."""
    style = ""
    ppr = p.find(W + "pPr")
    if ppr is not None:
        st = ppr.find(W + "pStyle")
        if st is not None:
            style = st.get(W + "val") or ""
        if ppr.find(W + "numPr") is not None:
            return "li"
    m = re.fullmatch(r"Heading(\d)", style)
    if m:
        return {"1": "h2", "2": "h3", "3": "h4"}.get(m.group(1), "h4")
    if style == "Title":
        return "h2"
    if style in ("ListParagraph", "ListBullet", "ListNumber"):
        return "li"
    return "p"


def read_blocks(path):
    """Body of a .docx as an ordered list of blocks, tables included."""
    import xml.etree.ElementTree as ET
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    body = root.find(W + "body")
    blocks = []
    for child in body:
        if child.tag == W + "p":
            t = para_text(child)
            if t:
                blocks.append({"t": para_kind(child), "text": t})
        elif child.tag == W + "tbl":
            rows = []
            for tr in child.findall(W + "tr"):
                cells = []
                for tc in tr.findall(W + "tc"):
                    cells.append(" ".join(
                        x for x in (para_text(p) for p in tc.findall(W + "p")) if x).strip())
                if any(c for c in cells):
                    rows.append(cells)
            if rows:
                blocks.append({"t": "table", "rows": rows})
    return blocks


def slice_blocks(blocks, start, end):
    """Take the run of blocks from the heading `start` up to the heading `end`."""
    if start is None:
        return blocks
    out, on = [], False
    for b in blocks:
        text = b.get("text", "")
        if not on:
            if b["t"].startswith("h") and text.strip() == start:
                on = True
                continue
            continue
        if b["t"].startswith("h") and text.strip() == end:
            break
        out.append(b)
    if not out:
        raise SystemExit(f"slice {start!r} -> {end!r} produced nothing")
    return out


def strip_boilerplate(blocks):
    """Drop the repeated page furniture: the firm line, the run metadata and the two
    status banners, all of which the viewer states once in its own chrome instead of
    eight times down the page."""
    drop = (
        r"^Ginkgo Financial Ltd$",
        r"\|\s*Generated:",
        r"^Stage: ",
        r"^DRAFT - for adviser review only",
        r"^DRAFT for adviser review\. Not for client issue",
        r"^Internal record\. Not a client-facing issue",
        r"^SPECIMEN - fictitious client\. This is a demonstration",
        r"^Automated pre-issue checks",
        r"^Status: SPECIMEN\.",
        # Horizontal rules. The renderer writes these as "---" paragraphs, which in a
        # .docx read as section breaks and on the page read as stray text. The viewer
        # separates sections with a rule under each heading instead (43 of these were
        # rendering as literal dashes on /outputs, 12 September 2026).
        r"^[-_*–—\s]{3,}$",
    )
    # The banners are laid out as one-cell tables in the renderer's output, and the
    # .docx title line repeats what the viewer already puts in its own chrome, so
    # neither can be filtered on paragraph text alone.
    title_line = (r"^(SPECIMEN )?(Suitability report|Adviser QA)|"
                  r"\((SPECIMEN|PARTIAL|PASS)\)\s*$|"
                  r"^SPECIMEN initial-meeting pack")

    def junk(b):
        if b["t"] == "table":
            flat = " ".join(c for row in b["rows"] for c in row).strip()
            one_cell = sum(len(row) for row in b["rows"]) == 1
            return one_cell and any(re.search(pat, flat) for pat in drop)
        text = b.get("text", "")
        return (any(re.search(pat, text) for pat in drop)
                or (b["t"] != "table" and re.search(title_line, text)))

    out = [b for b in blocks if not junk(b)]
    # A leading bare heading that merely restates the title goes too.
    while out and out[0]["t"].startswith("h") and len(out[0].get("text", "")) < 60             and re.search(r"report|email|agenda|record", out[0]["text"], re.I)             and not re.match(r"\d", out[0]["text"]):
        out.pop(0)
    return out


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    src, dest = sys.argv[1], sys.argv[2]
    docs = []
    for did, fname, stage, title, subtitle, start, end in ONLY_CLIENT_FACING:
        path = os.path.join(src, fname)
        blocks = strip_boilerplate(slice_blocks(read_blocks(path), start, end))
        words = sum(len(b.get("text", "").split()) for b in blocks if b["t"] != "table")
        docs.append({"id": did, "stage": stage, "title": title, "subtitle": subtitle,
                     "blocks": blocks,
                     "counts": {"blocks": len(blocks), "words": words,
                                "tables": sum(1 for b in blocks if b["t"] == "table")}})
        print(f"  {did:32} {len(blocks):4} blocks, {words:5} words, "
              f"{docs[-1]['counts']['tables']} tables")

    payload = json.dumps(docs, ensure_ascii=False, indent=1)
    bad = {k: len(re.findall(v, payload, re.I)) for k, v in FORBIDDEN.items()}
    bad = {k: n for k, n in bad.items() if n}
    if bad:
        raise SystemExit("REFUSING TO WRITE - material that must not be published: "
                         + "; ".join(f"{k} x{n}" for k, n in bad.items()))
    if "�" in payload:
        raise SystemExit("REFUSING TO WRITE - replacement characters in the text")
    with open(dest, "w", encoding="utf-8", newline="\n") as f:
        f.write(payload + "\n")
    print(f"\n{len(docs)} client-facing documents -> {dest} ({len(payload):,} bytes)")
    print("none of the QA, briefing or compliance-check material is included")

    # The workflow-demonstration panels, written beside the journey reader's data.
    print("\nworkflow showcase:")
    show = build_showcase(src)
    show_payload = json.dumps(show, ensure_ascii=False, indent=1)
    bad = {k: len(re.findall(v, show_payload, re.I)) for k, v in FORBIDDEN.items()}
    bad = {k: n for k, n in bad.items() if n}
    if bad:
        raise SystemExit("REFUSING TO WRITE showcase - material that must not be published: "
                         + "; ".join(f"{k} x{n}" for k, n in bad.items()))
    if "\ufffd" in show_payload:
        raise SystemExit("REFUSING TO WRITE showcase - replacement characters in the text")
    show_dest = os.path.join(os.path.dirname(dest), "specimen-showcase.json")
    with open(show_dest, "w", encoding="utf-8", newline="\n") as f:
        f.write(show_payload + "\n")
    print(f"{len(show)} showcase documents -> {show_dest} ({len(show_payload):,} bytes)")


if __name__ == "__main__":
    main()
