# -*- coding: utf-8 -*-
"""Generates every page of theadviceengine.ai.

One source of truth: edit the PAGES dict below, run `python sitegen.py` from the
repo root, commit the regenerated HTML. Styling lives in assets/site.css.

House rules baked into the copy (do not loosen):
- Never claim the engine gives advice, approves promotions or certifies compliance.
- Every output is a draft until a named adviser signs it off.
- No superlatives, no guarantees. Ginkgo is not called Chartered.
- Quilter: describe the network environment factually. NEVER state that the
  engine is Quilter-approved, and NEVER state that it is not. Say nothing on
  approval in either direction.
- Specimens are fictitious and labelled as such.
"""
import io
import os

HERE = os.path.dirname(os.path.abspath(__file__))

AR_LINE = ("Ginkgo Financial Ltd is an appointed representative of Quilter Financial "
           "Services Limited, which is authorised and regulated by the Financial "
           "Conduct Authority.")

HEAD = '''<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>@@TITLE@@</title>
<meta name="description" content="@@DESC@@">
<link rel="canonical" href="https://theadviceengine.ai/@@CANON@@">
<meta name="theme-color" content="#141D26">
<link rel="stylesheet" href="/assets/site.css">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/favicon-180.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Advice Engine">
<meta property="og:url" content="https://theadviceengine.ai/@@CANON@@">
<meta property="og:title" content="@@TITLE@@">
<meta property="og:description" content="@@DESC@@">
<meta property="og:image" content="https://theadviceengine.ai/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Advice Engine - drafts the paperwork, checks the file, finds the business you already had.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="@@TITLE@@">
<meta name="twitter:description" content="@@DESC@@">
<meta name="twitter:image" content="https://theadviceengine.ai/assets/og.png">
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <symbol id="i-report" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></symbol>
  <symbol id="i-review" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/></symbol>
  <symbol id="i-meeting" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 20a5.5 5.5 0 0 1 5.5-5"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-promo" viewBox="0 0 24 24"><path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z"/><path d="M18 9a4 4 0 0 1 0 6"/></symbol>
  <symbol id="i-scan" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/><path d="M9 11h4"/></symbol>
  <symbol id="i-facts" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3"/><path d="M9 12h6M9 16h4"/></symbol>
  <symbol id="i-sign" viewBox="0 0 24 24"><path d="M4 18c3 0 3-9 6-9s3 6 5 6 2-3 5-3"/><path d="M4 21h16"/></symbol>
  <symbol id="i-door" viewBox="0 0 24 24"><path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z"/><path d="M18 15.5 19 18l2.5 1-2.5 1-1 2.5-1-2.5L14.5 19l2.5-1z"/></symbol>
  <symbol id="i-shieldheart" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6z"/><path d="M12 16s-3-2-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2-3 4-3 4z"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></symbol>
</defs></svg>
'''

MARK = '''<a class="mark" href="/" aria-label="The Advice Engine - home">
      <svg width="30" height="30" viewBox="0 0 30 30" role="img" aria-hidden="true" focusable="false">
        <rect x="0.75" y="0.75" width="28.5" height="28.5" rx="4" fill="none" stroke="var(--line-strong)" stroke-width="1.5"></rect>
        <rect x="7" y="9" width="16" height="2.2" rx="1.1" fill="var(--ink)"></rect>
        <rect x="7" y="13.9" width="16" height="2.2" rx="1.1" fill="var(--flag)"></rect>
        <rect x="7" y="18.8" width="10" height="2.2" rx="1.1" fill="var(--ink)"></rect>
      </svg>
      <span class="wm"><span class="t">The</span><span class="n">Advice Engine</span></span>
    </a>'''

NAV_ITEMS = [
    ("/quilter.html", "For Quilter advisers"),
    ("/#what", "What it does"),
    ("/find.html", "Gap scanner"),
    ("/#pricing", "Pricing"),
    ("/#governance", "Security"),
]


def header(current=None):
    links = []
    for href, label in NAV_ITEMS:
        cur = ' aria-current="page"' if href == current else ""
        links.append('      <a href="%s"%s>%s</a>' % (href, cur, label))
    return ('<header>\n  <div class="wrap bar">\n    ' + MARK +
            '\n    <nav class="links" aria-label="Main">\n' + "\n".join(links) +
            '\n    </nav>\n    <a class="btn" href="#book">Book a Test Drive</a>\n'
            '  </div>\n</header>\n')


CLOSE = '''<div class="close" id="book">
  <div class="wrap inner">
    <p class="eyebrow">Get started</p>
    <h2>See it on your own paperwork</h2>
    <p>We onboard a small number of firms at a time, set your branding and wording up with you, and stay close while your team gets comfortable. Start with a Test Drive: a specimen report through the real pipeline, with nothing of yours at stake.</p>
    <div class="cta-row">
      <a class="btn" href="mailto:hello@theadviceengine.ai?subject=The%20Advice%20Engine%20-%20Test%20Drive">Book a Test Drive</a>
      <a class="btn ghost" href="mailto:hello@theadviceengine.ai?subject=The%20Advice%20Engine%20-%20question">Ask a question</a>
    </div>
  </div>
</div>
'''

FOOTER = '''<footer>
  <div class="wrap">
    <div class="frow">
      ''' + MARK + '''
      <nav class="fnav" aria-label="Footer">
        <a href="/quilter.html">For Quilter advisers</a>
        <a href="/suitability.html">Suitability reports</a>
        <a href="/meetings.html">Client meetings</a>
        <a href="/compliance.html">Compliance check</a>
        <a href="/finprom.html">Financial promotions</a>
        <a href="/find.html">Gap scanner</a>
        <a href="/organise.html">Fees &amp; admin</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#governance">Security</a>
      </nav>
    </div>
    <div class="legal">
      <p><strong style="color:var(--ink)">The Advice Engine</strong> is built and operated by Ginkgo Financial Ltd. ''' + AR_LINE + '''</p>
      <p>The Advice Engine is a document drafting and checking tool for authorised advice firms. It does not provide financial advice, does not approve financial promotions and does not certify compliance. Every output is a draft requiring review and sign-off by a named adviser at the using firm, which remains responsible for its own advice and its own regulatory obligations.</p>
      <p>References to Quilter on this site describe the network environment the engine is built and operated in. Quilter is a trade mark of its owner; The Advice Engine is an independent product of Ginkgo Financial Ltd.</p>
      <p>Demonstrations and specimens on this site are fictitious and labelled as such.</p>
    </div>
  </div>
</footer>

</body>
</html>
'''


def crumbs(group):
    return ('<div class="crumbs"><a href="/">The Advice Engine</a>'
            '<span class="sep">/</span><span>%s</span></div>' % group)


DISCIPLINE = '''<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">The discipline</p>
      <h2>The same discipline on every workflow</h2>
      <p>These are not settings that can be switched off. They are built into every workflow and enforced in code.</p>
    </div>
    <div class="notdo">
      <div><span class="x">01</span><p><strong>Every output is a draft</strong> until a named adviser signs it off.</p></div>
      <div><span class="x">02</span><p><strong>It never gives advice</strong>, never approves a financial promotion and never marks a file compliant.</p></div>
      <div><span class="x">03</span><p><strong>It never invents missing client data.</strong> Gaps are flagged, not filled.</p></div>
      <div><span class="x">04</span><p><strong>It never writes to your systems.</strong> Nothing changes in your back office without a person doing it.</p></div>
    </div>
  </div>
</section>
'''

# ---------------------------------------------------------------- home page

INDEX_BODY = '''<section class="hero">
  <div class="wrap hero-grid">
    <div class="stack">
      <p class="eyebrow s">Built inside the Quilter network &middot; for UK advice firms</p>
      <h1>Drafts the paperwork. Checks the file. <span class="find">Finds the business you already had.</span></h1>
      <p class="lead">The Advice Engine drafts, checks and organises the documents your firm produces every day &mdash; in your brand, from your own client files. Built inside a regulated UK advice firm and used on real cases every day.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="#pricing">See the pricing</a>
      </div>
      <p class="cta-note">Four facts about a fictitious client in, a full specimen report out &mdash; through the real pipeline, before any live case goes near it.</p>
      <div class="badges">
        <span class="badge">Built and used daily inside a Quilter-network firm</span>
        <span class="badge">Your brand, your approved wording</span>
        <span class="badge">No client data retained</span>
        <span class="badge">UK-hosted &middot; Microsoft sign-in &middot; MFA</span>
      </div>
    </div>

    <div class="app" aria-label="The Advice Engine showing a specimen advice gap scan">
    <div class="app-bar">
      <span class="who">
        <svg width="18" height="18" viewBox="0 0 30 30" aria-hidden="true" focusable="false">
          <rect width="30" height="30" rx="5" fill="var(--ink)"></rect>
          <rect x="7" y="9" width="16" height="2.4" rx="1.2" fill="var(--paper)"></rect>
          <rect x="7" y="13.8" width="16" height="2.4" rx="1.2" fill="var(--flag)"></rect>
          <rect x="7" y="18.6" width="10" height="2.4" rx="1.2" fill="var(--paper)"></rect>
        </svg>
        <span class="nm">The Advice Engine</span>
      </span>
      <span class="user">signed in &middot; your firm</span>
    </div>
    <div class="panel" aria-label="Example of an advice gap scanner finding">
      <div class="panel-head">
        <span class="ttl">Advice gap scan &middot; specimen</span>
        <span class="chip flag">1 gap flagged</span>
      </div>
      <div class="panel-body">
        <p class="src">Source &mdash; annual review meeting transcript, 14 Mar 2026</p>
        <blockquote class="quote verbatim">&ldquo;&hellip;and there's the little pension from the Marconi days, I've honestly never touched it, I couldn't tell you what's in it.&rdquo;</blockquote>
        <div class="finding">
          <span class="h">Legacy scheme mentioned once, never traced</span>
          <p class="d">Raised by the client in March, not recorded on the file and not carried into the review outcome. No letter of authority on record for this provider.</p>
        </div>
        <div class="finding">
          <span class="h">Suggested next step</span>
          <p class="d">Add to the agenda for the next meeting. An LOA and provider information request can be drafted from this file.</p>
        </div>
      </div>
      <div class="panel-foot">
        <span class="chip ok">Quote verified</span>
        <span>Every quote is checked against the source document in code. This is an agenda for a conversation &mdash; not advice, and not a review of past advice.</span>
      </div>
    </div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">For Quilter advisers</p>
      <h2>If your firm answers to the Quilter network, this was built for you</h2>
      <p>The Advice Engine is built and used daily inside an appointed representative firm in the Quilter network &mdash; and every firm live on it today sits in the network. It drafts against full and shortened advice processes, produces the allowances position reviewers ask for, reads reports the way a file check reads them, and pre-vets financial promotions before they reach the approvals team.</p>
      <p><a href="/quilter.html"><strong>What network-native actually means &rarr;</strong></a></p>
    </div>
    <div class="notdo">
      <div><span class="x">&#10003;</span><p><strong>Your advice processes</strong> &mdash; full and shortened, across 19 case types.</p></div>
      <div><span class="x">&#10003;</span><p><strong>The allowances table reviewers ask for</strong>, evidenced per client.</p></div>
      <div><span class="x">&#10003;</span><p><strong>File-check-shaped review</strong> &mdash; grade, commentary, completed checklist.</p></div>
      <div><span class="x">&#10003;</span><p><strong>Promotions pre-vetted</strong> before they reach the network approvals team.</p></div>
    </div>
  </div>
</section>

<section id="what">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow s">What it does</p>
      <h2>Twelve workflows, from first meeting to annual review</h2>
      <p>All of them included, for every adviser, paraplanner and administrator in the firm. No per-seat maths.</p>
    </div>

    <div class="group">
      <div class="group-label"><h3>Draft</h3><span class="g-sub">Documents produced from your case pack, in your firm's own styling</span></div>
      <div class="cards">
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-report"></use></svg></span><h4>Suitability reports</h4><p>Full and shortened advice processes across 19 case types, drafted from your case pack and checked against the compliance framework before you ever see them.</p><p class="more"><a href="/suitability.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-review"></use></svg></span><h4>Annual advice meetings</h4><p>Pre-meeting briefing and the complete post-meeting pack, with the allowances position &mdash; ISA, pension, CGT, dividend &mdash; evidenced per client.</p><p class="more"><a href="/meetings.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-meeting"></use></svg></span><h4>First-meeting packs</h4><p>Briefings before, follow-up packs after: agenda, introduction report, disclosure summary and initial fact find, clearly flagged as pre-advice.</p><p class="more"><a href="/meetings.html">In detail &rarr;</a></p></div>
      </div>
    </div>

    <div class="group">
      <div class="group-label"><h3>Check</h3><span class="g-sub">A second pair of eyes before anything leaves the firm</span></div>
      <div class="cards">
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-shield"></use></svg></span><h4>Compliance check</h4><p>Reviews an existing report the way a file checker would: grade, commentary and a completed checklist. It flags gaps; it never certifies anything.</p><p class="more"><a href="/compliance.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-promo"></use></svg></span><h4>Financial promotions</h4><p>Pre-vets marketing material, web pages and stationery before submission to your network's approval team, cutting resubmission round trips. It never approves.</p><p class="more"><a href="/finprom.html">In detail &rarr;</a></p></div>
      </div>
    </div>

    <div class="group">
      <div class="group-label"><h3>Find</h3><span class="g-sub">What is already sitting in the files you hold</span></div>
      <div class="cards">
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-scan"></use></svg></span><h4>Advice gap scanner</h4><p>Reads a client's own file &mdash; meeting transcripts especially &mdash; and surfaces needs that were raised but never actioned, quoting the file verbatim.</p><p class="more"><a href="/find.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-facts"></use></svg></span><h4>Client facts extract</h4><p>Turns a case pack into a source-attributed update sheet: every fact carries its document and a confirmed, estimated or unclear status.</p><p class="more"><a href="/find.html">In detail &rarr;</a></p></div>
      </div>
    </div>

    <div class="group">
      <div class="group-label"><h3>Organise</h3><span class="g-sub">The administrative work around the advice</span></div>
      <div class="cards">
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-sign"></use></svg></span><h4>Fee and authority paperwork</h4><p>Fee authority forms pre-filled from your own terms of business, and letters of authority with one information request per provider, validated before download.</p><p class="more"><a href="/organise.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-door"></use></svg></span><h4>One front door</h4><p>Not sure which workflow you need? Put the file in with a line of context. The engine picks, tells you why it picked, and lets you overrule it in one click.</p><p class="more"><a href="/organise.html">In detail &rarr;</a></p></div>
        <div class="wcard"><span class="ic-wrap"><svg class="ic" aria-hidden="true" focusable="false"><use href="#i-shieldheart"></use></svg></span><h4>Protection tools</h4><p>A whole-of-life ready-reckoner and an IHT cover affordability calculator, both indicative and clearly labelled as not advice.</p><p class="more"><a href="/organise.html">In detail &rarr;</a></p></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">What comes out</p>
      <h2>A finished document in your firm's own styling</h2>
      <p>Not a chat window and not a wall of text to tidy up afterwards. Every workflow produces a branded Word document, laid out the way your firm lays it out, with your logo, your regulatory footer and your approved wording.</p>
      <p>Alongside it comes an adviser QA sheet: what the engine relied on, what it could not evidence, and every point it wants you to look at before you sign. Anything it could not find in the file is flagged in the margin rather than quietly invented.</p>
      <p>If your network expects a particular house template, the engine can produce in that styling too.</p>
    </div>
    <div class="docs">
      <div class="sheet back" aria-hidden="true">
        <div class="brandrow"><span class="logo"></span><span class="firm">Adviser QA sheet</span></div>
        <div class="lines"><i class="w88"></i><i class="w95"></i><i class="w70"></i><i class="w60"></i></div>
      </div>
      <div class="sheet front" role="img" aria-label="Mockup of a branded suitability report with a flagged item and a draft stamp">
        <div class="brandrow">
          <span class="logo"></span>
          <span class="firm">Your firm Ltd</span>
        </div>
        <span class="dtitle">Suitability Report</span>
        <div class="lines"><i class="w95"></i><i class="w88"></i><i class="w95"></i><i class="w70"></i></div>
        <div class="hl">
          <span>Flagged for adviser</span>
          <div class="lines"><i class="w88"></i><i class="w45"></i></div>
        </div>
        <div class="lines"><i class="w95"></i><i class="w60"></i></div>
        <span class="stamp">Draft &mdash; awaiting sign-off</span>
      </div>
    </div>
  </div>
</section>

<section id="gap" class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">The difference</p>
      <h2>Everyone else sells you time. We can also show you revenue.</h2>
      <p>Every AI tool in this market is sold on hours saved. Useful &mdash; and hard to put in front of a board. The advice gap scanner does something different: it reads the files you already hold and finds the needs that were raised and never actioned.</p>
      <p>It quotes the file word for word, and every quote is verified in code against the source document. What comes out is a prioritised agenda for your next conversation, with a tracking sheet. It is not advice, and it is not a review of past advice.</p>
      <p><a href="/find.html"><strong>How the gap scanner works &rarr;</strong></a></p>
    </div>
    <div class="stack">
      <div class="panel">
        <div class="panel-head"><span class="ttl">What it reads</span></div>
        <div class="panel-body">
          <div class="finding"><span class="h">Meeting transcripts</span><p class="d">The richest source by far &mdash; clients say things in meetings that never reach the file.</p></div>
          <div class="finding"><span class="h">The client file</span><p class="d">Fact finds, previous reports, review notes, correspondence, provider paperwork.</p></div>
          <div class="finding"><span class="h">Pulled from your own library</span><p class="d">Pick files straight from your firm's SharePoint with your own Microsoft sign-in, or upload them.</p></div>
        </div>
        <div class="panel-foot"><span>Processed in the moment. Nothing is retained after the run.</span></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Why firms pick it</p>
      <h2>Built by advisers who file the same paperwork you do</h2>
      <p>The Advice Engine is not a technology company's guess at what advice work looks like. It is built inside Ginkgo Financial, a regulated UK advice firm, and shaped every week by the advisers, paraplanners and administrators using it on real cases.</p>
      <p>When a network reviewer wants something evidenced differently, the engine learns it &mdash; and every firm on the engine gets that improvement. It is white-label from the ground up: your logo, your document styling, your fee schedule, your approved wording and your regulatory details, read from your firm's own configuration and never from another firm's.</p>
    </div>
    <div class="stack">
      <p class="eyebrow">The discipline that makes it safe</p>
      <div class="notdo">
        <div><span class="x">01</span><p><strong>Every output is a draft</strong> until a named adviser signs it off.</p></div>
        <div><span class="x">02</span><p><strong>It never gives advice</strong>, never approves a financial promotion and never marks a file compliant.</p></div>
        <div><span class="x">03</span><p><strong>It never invents missing client data.</strong> Gaps are flagged, not filled.</p></div>
        <div><span class="x">04</span><p><strong>It never writes to your systems.</strong> Nothing changes in your back office without a person doing it.</p></div>
      </div>
      <p style="font-size:.92rem;color:var(--muted)">These are not settings that can be switched off. They are built into every workflow and enforced in code.</p>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow s">How it works</p>
      <h2>Four steps, with the adviser in control throughout</h2>
    </div>
    <div class="steps col">
      <div class="stepx"><div class="sb"><h3>Give it the case</h3><p>Upload documents, paste a transcript, or pick files straight from your firm's own client library using your Microsoft sign-in.</p></div></div>
      <div class="stepx"><div class="sb"><h3>It drafts and data-checks</h3><p>The engine reviews the material for gaps and inconsistencies first, then drafts against your firm's standards.</p></div></div>
      <div class="stepx"><div class="sb"><h3>It checks its own work</h3><p>Every draft is graded against the compliance framework and revised before it reaches you, with the working shown.</p></div></div>
      <div class="stepx"><div class="sb"><h3>You review and sign off</h3><p>Documents arrive as branded Word files with an adviser QA sheet. Nothing goes near a client without a named adviser's approval.</p></div></div>
    </div>
  </div>
</section>

<section id="pricing">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow s">Pricing</p>
      <h2>One price for the firm. Every workflow, every seat.</h2>
      <p>Most tools in this market charge per adviser, per month, per module &mdash; and won't tell you the number until you've had a call. We would rather you could just work it out.</p>
    </div>
    <div class="split">
      <div class="price">
        <div>
          <p class="eyebrow">Typical firm &middot; up to 5 advisers</p>
          <div class="amt"><span class="n">&pound;995</span><span class="per">per firm, per month</span></div>
        </div>
        <div class="incl">
          <div><span class="t">&#10003;</span><span>All twelve workflows</span></div>
          <div><span class="t">&#10003;</span><span>Unlimited documents</span></div>
          <div><span class="t">&#10003;</span><span>Every adviser, paraplanner and administrator</span></div>
          <div><span class="t">&#10003;</span><span>Your branding and wording configured with you</span></div>
          <div><span class="t">&#10003;</span><span>Onboarding and setup included</span></div>
          <div><span class="t">&#10003;</span><span>New workflows as they ship</span></div>
        </div>
        <p class="compare">Larger firms are banded. Ask us for the band that fits &mdash; we will tell you the number on the first call.</p>
      </div>
      <div class="stack">
        <p class="eyebrow">For comparison</p>
        <p>Priced per adviser, a single tool for suitability reports alone is commonly around &pound;299 per user per month. At five advisers, the Advice Engine works out at roughly &pound;199 per adviser for all twelve workflows. At twenty advisers it is a fraction of that, because the price is set for the firm and not the seat.</p>
        <p style="font-size:.93rem;color:var(--muted)">No per-document charges. No per-module upsell. No charge for the people in your back office who do most of the work.</p>
      </div>
    </div>
  </div>
</section>

<section id="governance" class="tint">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow s">Security and governance</p>
      <h2>Built for firms that answer to a network</h2>
      <p>Most tools in this category need to hold your client data to work. This one does not, which makes your data protection impact assessment a considerably shorter conversation.</p>
    </div>

    <div class="flow" role="img" aria-label="Client material goes in, is processed in memory, documents come out, and nothing is retained afterwards">
      <div class="fnode">
        <h4>Your material goes in</h4>
        <p>Uploaded, pasted, or picked from your own SharePoint library using your Microsoft sign-in.</p>
      </div>
      <div class="farrow"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></div>
      <div class="fnode mid">
        <h4>Processed in the moment</h4>
        <p>Held in memory for the length of the run only. Never written to disk, never used to train a model.</p>
      </div>
      <div class="farrow"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></div>
      <div class="fnode">
        <h4>Documents come back</h4>
        <p>Branded Word files and a QA sheet, downloaded to your machine and your systems.</p>
      </div>
    </div>
    <div class="flow-note">
      <span aria-hidden="true">&#10003;</span>
      <span><strong>Then nothing is left.</strong> No client record on our side, nothing to delete if you leave, and no copy of your files sitting in a vendor's database. All we keep is a metadata line saying who ran which workflow and when &mdash; never the content.</span>
    </div>

    <div class="gov" style="margin-top:30px">
      <div><h4>No client data retained</h4><p>Client material is processed in the moment and not written to disk. Nothing is stranded with us if you leave.</p></div>
      <div><h4>Not used to train models</h4><p>Your data is never used to train any model &mdash; ours or our suppliers'.</p></div>
      <div><h4>UK-region hosting</h4><p>Microsoft Azure, UK region, so data residency is satisfied by default.</p></div>
      <div><h4>Your own Microsoft sign-in</h4><p>Entra single sign-on with MFA. Named users only, and unknown domains are refused by default.</p></div>
      <div><h4>Per-firm isolation</h4><p>Each firm sees only its own configuration, branding and wording. Never another firm's.</p></div>
      <div><h4>Metadata-only audit log</h4><p>Who used the engine, when and for what workflow &mdash; never the content of a case.</p></div>
      <div><h4>Due diligence pack</h4><p>DPIA, records of processing and data processing agreements available for your review.</p></div>
      <div><h4>Supplier assurance on file</h4><p>Our AI supplier's SOC 2 Type II, ISO 27001 and ISO 42001 reports are held and can be shared under NDA.</p></div>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------- quilter page

QUILTER_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("For Quilter advisers") + '''
    <div class="stack col">
      <p class="eyebrow s">For Quilter advisers</p>
      <h1>Built inside the network you answer to</h1>
      <p class="lead">The Advice Engine is not a general tool adapted for network firms. It is built and used daily inside Ginkgo Financial, an appointed representative in the Quilter network &mdash; and every firm live on the engine today sits in the network. The paperwork it produces is shaped by the same file checks, the same approvals process and the same review meetings your firm faces.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/#pricing">See the pricing</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Network-native</p>
      <h2>What that means in practice</h2>
      <p>Anyone can say &ldquo;compliance-aware&rdquo;. Here is what the engine actually produces, named the way your network names it.</p>
    </div>
    <div class="proof">
      <div><span class="tick">&#10003;</span><h4>Your advice processes, not generic templates</h4><p>Drafts against full and shortened advice processes across 19 case types &mdash; the distinction your file reviews actually turn on.</p></div>
      <div><span class="tick">&#10003;</span><h4>The allowances table reviewers ask for</h4><p>ISA subscription, pension annual allowance with taper and MPAA notes, CGT exemption and dividend allowance &mdash; used and remaining per client, evidenced from the case material or flagged to confirm. Never guessed.</p></div>
      <div><span class="tick">&#10003;</span><h4>Reports read the way your file checks read them</h4><p>The compliance check grades a report, writes commentary and completes a checklist &mdash; the way a file reviewer works through one. It flags gaps; it never marks a file compliant.</p></div>
      <div><span class="tick">&#10003;</span><h4>Promotions arrive at the approvals team cleaner</h4><p>Marketing material, stationery and live web pages pre-vetted against the financial promotion rules before submission, cutting resubmission round trips. It never approves &mdash; approval stays where it belongs.</p></div>
      <div><span class="tick">&#10003;</span><h4>Documents that look right</h4><p>Your firm's own branding and approved wording &mdash; or a house-template styling &mdash; read from your firm's configuration, never from another firm's.</p></div>
      <div><span class="tick">&#10003;</span><h4>Fee and authority paperwork from your own terms</h4><p>Fee authority forms (AFAF) pre-filled from your firm's own terms of business, and letters of authority validated before download.</p></div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">The loop</p>
      <h2>One firm's file review makes every firm's paperwork better</h2>
      <p>Because the engine is used on real cases inside network firms every week, it learns from the sharpest possible teacher: what reviewers actually push back on. When a reviewer wants something evidenced differently &mdash; an allowances position laid out per client, a disclosure worded a particular way &mdash; that goes into the engine once, and every firm on it benefits from then on.</p>
      <p>No generic AI vendor has that feedback loop, because no generic AI vendor files this paperwork.</p>
    </div>
    <div class="panel">
      <div class="panel-head"><span class="ttl">Recent examples of the loop</span></div>
      <div class="panel-body">
        <div class="finding"><span class="h">Annual allowances table</span><p class="d">An adviser's reviewer expected the allowances position per client in review packs. Now produced in every annual review output, evidenced or flagged to confirm.</p></div>
        <div class="finding"><span class="h">Scope-of-advice footers</span><p class="d">Regulatory footers follow each firm's actual permissions &mdash; a firm that does not advise on mortgages does not get a mortgage footer.</p></div>
        <div class="finding"><span class="h">Directness over waffle</span><p class="d">Advisers told us review reports from legacy tools bury the point. The engine's outputs put the position and the recommendation first.</p></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Responsibility</p>
      <h2>Your obligations stay exactly where they are</h2>
      <p>The engine is a drafting and checking tool. Your firm remains responsible for its advice and its regulatory obligations, and every document requires a named adviser's review and sign-off before it goes anywhere near a client &mdash; which is precisely how a network firm should want it to work.</p>
      <p>For your due diligence: no client data is retained, nothing is used to train models, hosting is UK-region Azure with your own Microsoft sign-in and MFA, and a DPIA, records of processing and data processing agreements are available on request. <a href="/#governance">The full security picture &rarr;</a></p>
    </div>
    <div class="notdo">
      <div><span class="x">01</span><p><strong>Every output is a draft</strong> until a named adviser signs it off.</p></div>
      <div><span class="x">02</span><p><strong>It never gives advice</strong>, never approves a financial promotion and never marks a file compliant.</p></div>
      <div><span class="x">03</span><p><strong>It never invents missing client data.</strong> Gaps are flagged, not filled.</p></div>
      <div><span class="x">04</span><p><strong>It never writes to your systems.</strong> Nothing changes in your back office without a person doing it.</p></div>
    </div>
  </div>
</section>
'''

# --------------------------------------------------------- suitability page

SUITABILITY_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Draft") + '''
    <div class="stack col">
      <p class="eyebrow s">Draft &middot; suitability reports</p>
      <h1>Suitability reports that arrive already checked</h1>
      <p class="lead">Full and shortened advice processes across 19 case types, drafted from your case pack, graded against the compliance framework and revised &mdash; before you ever see them. What lands on your desk is a branded Word document and an adviser QA sheet, ready for your review and sign-off.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">How a report gets made</p>
      <h2>Data-checked first, drafted second, self-checked third</h2>
      <div class="steps">
        <div class="stepx"><div class="sb"><h3>The case pack goes in</h3><p>Fact find, risk profile, illustrations, provider paperwork, meeting transcripts &mdash; uploaded, pasted, or picked from your firm's own library with your Microsoft sign-in.</p></div></div>
        <div class="stepx"><div class="sb"><h3>The engine checks the data before writing a word</h3><p>Gaps and inconsistencies in the case material are flagged up front &mdash; a missing attitude to risk, an illustration that doesn't match the recommendation &mdash; so you find out at the start, not on page nine.</p></div></div>
        <div class="stepx"><div class="sb"><h3>It drafts, then checks its own work</h3><p>The draft is graded against the compliance framework and revised before it reaches you, with the working shown on the QA sheet.</p></div></div>
        <div class="stepx"><div class="sb"><h3>You review and sign off</h3><p>Anything the engine could not evidence is flagged in the margin, never invented. The report is a draft until a named adviser signs it off.</p></div></div>
      </div>
    </div>
    <div class="docs">
      <div class="sheet back" aria-hidden="true">
        <div class="brandrow"><span class="logo"></span><span class="firm">Adviser QA sheet</span></div>
        <div class="lines"><i class="w88"></i><i class="w95"></i><i class="w70"></i><i class="w60"></i></div>
      </div>
      <div class="sheet front" role="img" aria-label="Mockup of a branded suitability report with a flagged item and a draft stamp">
        <div class="brandrow">
          <span class="logo"></span>
          <span class="firm">Your firm Ltd</span>
        </div>
        <span class="dtitle">Suitability Report</span>
        <div class="lines"><i class="w95"></i><i class="w88"></i><i class="w95"></i><i class="w70"></i></div>
        <div class="hl">
          <span>Flagged for adviser</span>
          <div class="lines"><i class="w88"></i><i class="w45"></i></div>
        </div>
        <div class="lines"><i class="w95"></i><i class="w60"></i></div>
        <span class="stamp">Draft &mdash; awaiting sign-off</span>
      </div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Coverage</p>
      <h2>19 case types, full and shortened processes</h2>
      <p>Pensions, investments and protection cases, on both the full advice process and the shortened process where it applies &mdash; the distinction a network file review actually turns on. Replacement business is handled with the comparison evidence a reviewer expects to see.</p>
      <p>The report carries your firm's regulatory details, fee schedule and approved wording from your own configuration. If your network expects a particular house template, the engine can produce in that styling too.</p>
    </div>
    <div class="stack">
      <p class="eyebrow">What the QA sheet tells you</p>
      <div class="notdo">
        <div><span class="x">&#8250;</span><p><strong>What the engine relied on</strong> &mdash; the documents behind each material statement.</p></div>
        <div><span class="x">&#8250;</span><p><strong>What it could not evidence</strong> &mdash; flagged to confirm, never filled in.</p></div>
        <div><span class="x">&#8250;</span><p><strong>What to look at before signing</strong> &mdash; the points a checker would query, surfaced first.</p></div>
      </div>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------ meetings page

MEETINGS_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Draft") + '''
    <div class="stack col">
      <p class="eyebrow s">Draft &middot; client meetings</p>
      <h1>Every client meeting, papered before and after</h1>
      <p class="lead">First meetings and annual advice reviews both produce paperwork nobody enjoys writing. The engine drafts the pack before the meeting and the record after it &mdash; from the client's own file, in your firm's styling.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Annual advice meetings</p>
      <h2>The review pack, with the allowances position reviewers ask for</h2>
      <p>Before the meeting: a briefing drawn from the client's file &mdash; what changed, what was promised last time, what needs raising. After it: the complete post-meeting pack, drafted from your notes or the meeting transcript.</p>
      <p>Every review output includes the annual allowances position &mdash; ISA, pension annual allowance with taper and MPAA notes where relevant, CGT exemption and dividend allowance &mdash; used and remaining per client. Each figure is evidenced from the case material or flagged to confirm. The engine never guesses a number.</p>
    </div>
    <div class="alw" role="img" aria-label="Specimen allowances table showing ISA, pension, CGT and dividend positions">
      <div class="panel-head"><span class="ttl">Allowances position &middot; specimen client</span><span class="chip ok">Evidenced per client</span></div>
      <div class="tscroll">
      <table>
        <thead><tr><th>Allowance 2026/27</th><th style="text-align:right">Used</th><th style="text-align:right">Remaining</th></tr></thead>
        <tbody>
          <tr><td><strong>ISA subscription</strong> &pound;20,000</td><td class="num">&pound;13,400</td><td class="num">&pound;6,600</td></tr>
          <tr><td><strong>Pension annual allowance</strong> &pound;60,000<span class="note">No taper indicated; MPAA not triggered</span></td><td class="num">&pound;24,000</td><td class="num">&pound;36,000</td></tr>
          <tr><td><strong>CGT annual exempt amount</strong> &pound;3,000</td><td class="num">&pound;0</td><td class="num">&pound;3,000</td></tr>
          <tr><td><strong>Dividend allowance</strong> &pound;500</td><td class="num">&pound;500<span class="note">Confirm against latest statement</span></td><td class="num">&pound;0</td></tr>
        </tbody>
      </table>
      </div>
      <div class="panel-foot"><span>Specimen data for a fictitious client. Figures are evidenced from the file or flagged to confirm &mdash; never invented.</span></div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">First meetings</p>
      <h2>Before: the briefing. After: the follow-up pack.</h2>
      <p>For a first meeting the engine prepares the agenda and briefing beforehand, then turns your notes or transcript into the follow-up pack: an introduction report, a disclosure summary and an initial fact find &mdash; all clearly flagged as pre-advice, because no advice has been given yet.</p>
      <p>Advisers who work transcript-first get the most out of this: record the meeting, hand the transcript to the engine, and the paperwork starts from what the client actually said rather than what anyone remembered.</p>
    </div>
    <div class="panel">
      <div class="panel-head"><span class="ttl">First-meeting pack &middot; contents</span></div>
      <div class="panel-body">
        <div class="finding"><span class="h">Meeting agenda</span><p class="d">Prepared beforehand from whatever is already known.</p></div>
        <div class="finding"><span class="h">Introduction report</span><p class="d">Who you are, how you work, what happens next &mdash; in your firm's wording.</p></div>
        <div class="finding"><span class="h">Disclosure summary</span><p class="d">Your firm's regulatory and fee disclosures, from your own configuration.</p></div>
        <div class="finding"><span class="h">Initial fact find</span><p class="d">Everything the client told you, structured &mdash; and clearly flagged pre-advice.</p></div>
      </div>
    </div>
  </div>
</section>
'''

# ---------------------------------------------------------- compliance page

COMPLIANCE_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Check") + '''
    <div class="stack col">
      <p class="eyebrow s">Check &middot; compliance check</p>
      <h1>A file check before the file check</h1>
      <p class="lead">Give the engine an existing report and it reviews it the way a compliance file checker would: a grade, written commentary, and a completed checklist. You fix the gaps before the file is ever submitted &mdash; not after it comes back.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">What comes back</p>
      <h2>Grade, commentary, completed checklist</h2>
      <p>The check works through the report the way a reviewer works through one: is the objective evidenced, does the risk profile support the recommendation, are charges disclosed properly, is replacement business compared fairly, is capacity for loss addressed &mdash; item by item, with the reasoning written out.</p>
      <p>Where something is missing or inconsistent, it is flagged with a pointer to where in the report the problem sits. Where something passes, you can see why it passes. The commentary is direct &mdash; the point first, not buried under boilerplate.</p>
      <p><strong style="color:var(--ink)">It flags; it never certifies.</strong> A clean run is not a compliance opinion and is never presented as one. What it gives you is a report that has already survived one hostile read before a human checker gives it another.</p>
    </div>
    <div class="clist" role="img" aria-label="Specimen compliance checklist with passed and flagged items">
      <div class="panel-head"><span class="ttl">Compliance check &middot; specimen report</span><span class="chip flag">2 items flagged</span></div>
      <div class="row"><span class="st ok">PASS</span><span>Client objectives stated and evidenced from the fact find</span></div>
      <div class="row"><span class="st ok">PASS</span><span>Recommendation consistent with the recorded attitude to risk</span></div>
      <div class="row"><span class="st ok">PASS</span><span>Charges disclosed with effect on returns</span></div>
      <div class="row flagged"><span class="st fl">FLAG</span><span>Capacity for loss asserted but not evidenced &mdash; see section 4</span></div>
      <div class="row"><span class="st ok">PASS</span><span>Ongoing service and review commitment stated</span></div>
      <div class="row flagged"><span class="st fl">FLAG</span><span>Replacement comparison missing exit-charge confirmation</span></div>
      <div class="panel-foot"><span>Specimen output. The check flags gaps for the adviser to resolve &mdash; it never marks a file compliant.</span></div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Why it reads like a reviewer</p>
      <h2>Because it was built where the reviews happen</h2>
      <p>The check is shaped inside network advice firms, against real file reviews. When a reviewer somewhere on the engine wants a point evidenced differently, the check learns it &mdash; and every firm's next report is measured against the sharper standard.</p>
      <p>Use it two ways: on the engine's own drafts, where it runs automatically before you see the document &mdash; and on reports written by anyone, or anything, else.</p>
    </div>
    <div class="stack">
      <p class="eyebrow">Works on</p>
      <div class="notdo">
        <div><span class="x">&#8250;</span><p><strong>The engine's own drafts</strong> &mdash; run automatically before you see them.</p></div>
        <div><span class="x">&#8250;</span><p><strong>Reports your team wrote</strong> &mdash; a second pair of eyes before submission.</p></div>
        <div><span class="x">&#8250;</span><p><strong>Legacy and third-party reports</strong> &mdash; anything you can upload as a document.</p></div>
      </div>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------- finprom page

FINPROM_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Check") + '''
    <div class="stack col">
      <p class="eyebrow s">Check &middot; financial promotions</p>
      <h1>Cleaner promotions, fewer round trips</h1>
      <p class="lead">Every piece of marketing an AR firm produces has to pass the network's approvals process &mdash; and every rejection costs a round trip measured in days. The engine pre-vets your material against the financial promotion rules before you submit, so what you send is right the first time.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">What it checks</p>
      <h2>Flyers, letters, stationery &mdash; and live web pages by URL</h2>
      <p>Upload the draft, or point the engine at a web page by its address and it checks the live page. Each finding quotes the exact wording at issue, names the concern &mdash; a performance claim without the required context, a benefit stated without the balancing risk, a required disclosure missing &mdash; and shows where it sits in the document.</p>
      <p>The rules it checks against are a fixed, sealed framework aligned to the financial promotion rules &mdash; not something that drifts run to run. You fix the flagged items, re-run if you want the reassurance, and submit to your approvals team with the round trips already taken out.</p>
      <p><strong style="color:var(--ink)">It never approves.</strong> Approval belongs to your network's approvals team and nothing about this tool changes that. What changes is how often they send your material back.</p>
    </div>
    <div class="clist" role="img" aria-label="Specimen financial promotion check with flagged wording">
      <div class="panel-head"><span class="ttl">Fin prom check &middot; specimen flyer</span><span class="chip flag">3 items flagged</span></div>
      <div class="row flagged"><span class="st fl">FLAG</span><span>&ldquo;Grow your money faster&rdquo; &mdash; comparative performance claim without basis or context</span></div>
      <div class="row flagged"><span class="st fl">FLAG</span><span>Investment benefits stated with no balancing risk statement on the same page</span></div>
      <div class="row"><span class="st ok">PASS</span><span>Firm status and regulatory attribution present and correct</span></div>
      <div class="row flagged"><span class="st fl">FLAG</span><span>&ldquo;Capital at risk&rdquo; wording present but not proximate to the claim it qualifies</span></div>
      <div class="row"><span class="st ok">PASS</span><span>No implication of guaranteed returns</span></div>
      <div class="panel-foot"><span>Specimen output. Findings quote the wording at issue. The check informs your submission &mdash; it never approves.</span></div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">The economics</p>
      <h2>Round trips are the real cost</h2>
      <p>A rejected promotion isn't just a delay to one flyer &mdash; it's your campaign date slipping, your event undated, your website change parked. Catching the problems in the five minutes before submission, rather than the week after, is the entire value of this workflow.</p>
      <p>It also works the other way: material that comes back from the approvals team with comments can be re-checked after your edits, before it goes in again.</p>
    </div>
    <div class="stack">
      <p class="eyebrow">Typical material</p>
      <div class="notdo">
        <div><span class="x">&#8250;</span><p><strong>Flyers, brochures and adverts</strong> before first submission.</p></div>
        <div><span class="x">&#8250;</span><p><strong>Web pages by URL</strong> &mdash; the engine reads the live page.</p></div>
        <div><span class="x">&#8250;</span><p><strong>Letters and stationery</strong> carrying regulated statements.</p></div>
        <div><span class="x">&#8250;</span><p><strong>Resubmissions</strong> &mdash; re-checked after edits, before they go back in.</p></div>
      </div>
    </div>
  </div>
</section>
'''

# ---------------------------------------------------------------- find page

FIND_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Find") + '''
    <div class="stack col">
      <p class="eyebrow s">Find &middot; advice gap scanner</p>
      <h1>The business already sitting in your filing system</h1>
      <p class="lead">Every adviser has clients who mentioned something in a meeting that never became a piece of advice &mdash; the old pension nobody traced, the protection need everyone agreed to come back to. The gap scanner reads the client's own file and finds them, quoting the file word for word.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">What it finds</p>
      <h2>Four kinds of gap, all evidenced</h2>
      <div class="notdo">
        <div><span class="x">01</span><p><strong>Open promises</strong> &mdash; &ldquo;we'll look at that at the next review&rdquo;, and then nobody did.</p></div>
        <div><span class="x">02</span><p><strong>Assets mentioned once and never traced</strong> &mdash; the legacy pension, the inherited shares, the endowment nobody has a statement for.</p></div>
        <div><span class="x">03</span><p><strong>Exposures visible only in combination</strong> &mdash; two facts on the file that together point at a need neither shows alone.</p></div>
        <div><span class="x">04</span><p><strong>Conflicting signals</strong> &mdash; what the client said in a meeting versus what the file records.</p></div>
      </div>
      <p>Every finding quotes the source verbatim, and every quote is verified in code against the supplied text. Anything that cannot be verified is tagged and demoted &mdash; never silently dropped, never silently kept.</p>
      <p>What comes out is a prioritised agenda for your next client conversation, as a Word document plus a tracking sheet. It is not advice, and it is not a review of past advice &mdash; it is the list of conversations your files say are worth having.</p>
    </div>
    <div class="panel" aria-label="Example of an advice gap scanner finding">
      <div class="panel-head">
        <span class="ttl">Advice gap scan &middot; specimen</span>
        <span class="chip flag">1 gap flagged</span>
      </div>
      <div class="panel-body">
        <p class="src">Source &mdash; annual review meeting transcript, 14 Mar 2026</p>
        <blockquote class="quote verbatim">&ldquo;&hellip;and there's the little pension from the Marconi days, I've honestly never touched it, I couldn't tell you what's in it.&rdquo;</blockquote>
        <div class="finding">
          <span class="h">Legacy scheme mentioned once, never traced</span>
          <p class="d">Raised by the client in March, not recorded on the file and not carried into the review outcome. No letter of authority on record for this provider.</p>
        </div>
        <div class="finding">
          <span class="h">Suggested next step</span>
          <p class="d">Add to the agenda for the next meeting. An LOA and provider information request can be drafted from this file.</p>
        </div>
      </div>
      <div class="panel-foot">
        <span class="chip ok">Quote verified</span>
        <span>Checked against the source document in code. Unverifiable quotes are tagged and demoted, never silently dropped.</span>
      </div>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Why transcripts matter</p>
      <h2>Clients say things in meetings that never reach the file</h2>
      <p>The richest source for the scanner is the meeting transcript &mdash; the unedited record of what the client actually said, before anyone summarised it. Firms that record review meetings are sitting on years of these. Run before an annual review, the scan turns the client's own history into the agenda for the meeting.</p>
      <p>The scanner also reads the rest of the file: fact finds, previous reports, review notes, correspondence, provider paperwork &mdash; uploaded or pulled straight from your firm's own library.</p>
    </div>
    <div class="stack">
      <p class="eyebrow s">Also in Find</p>
      <h2 style="font-size:1.3rem">Client facts extract</h2>
      <p>Turns a case pack into a source-attributed update sheet for your CRM: every fact carries the document it came from and a confirmed, estimated or unclear status. It never writes to your systems &mdash; your back office stays yours.</p>
      <div class="panel">
        <div class="panel-head"><span class="ttl">Facts extract &middot; specimen</span></div>
        <div class="factrows">
          <div class="row"><span class="f">Employer pension: 8% matched contribution</span><span class="chip ok">Confirmed</span><span class="s">Source &mdash; payslip, Apr 2026</span></div>
          <div class="row"><span class="f">Mortgage balance &pound;168,000, fixed to 2028</span><span class="chip ok">Confirmed</span><span class="s">Source &mdash; mortgage statement, Jan 2026</span></div>
          <div class="row"><span class="f">Expected inheritance &ldquo;around &pound;100k&rdquo;</span><span class="chip dim">Estimated</span><span class="s">Source &mdash; review transcript, Mar 2026</span></div>
          <div class="row"><span class="f">Endowment policy provider</span><span class="chip flag">Unclear</span><span class="s">Mentioned in 2024 note; no document on file</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------ organise page

ORGANISE_BODY = '''<section class="page-hero">
  <div class="wrap">
    ''' + crumbs("Organise") + '''
    <div class="stack col">
      <p class="eyebrow s">Organise &middot; fees, authorities and admin</p>
      <h1>The admin around the advice</h1>
      <p class="lead">Fee paperwork, letters of authority, working out which workflow you even need &mdash; the small jobs that eat afternoons. The engine does the assembly; your team does the checking.</p>
      <div class="cta-row">
        <a class="btn" href="#book">Book a Test Drive</a>
        <a class="btn ghost" href="/quilter.html">Built for Quilter advisers &rarr;</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap split">
    <div class="stack">
      <p class="eyebrow s">Fee &amp; authority paperwork</p>
      <h2>Pre-filled from your own terms of business</h2>
      <p><strong style="color:var(--ink)">Fee authority forms (AFAF).</strong> Generated from your firm's own terms of business and fee schedule &mdash; the right service line, the right rates, the client's details in the right places &mdash; then validated before download so a missing field is caught by the engine, not by the client.</p>
      <p><strong style="color:var(--ink)">Letters of authority.</strong> One LOA per provider, each paired with an information-request letter asking that provider for exactly what a review of that product needs. Validated before download.</p>
    </div>
    <div class="stack">
      <p class="eyebrow s">Protection tools</p>
      <h2>Instant, indicative, clearly labelled</h2>
      <p>A whole-of-life ready-reckoner and an IHT cover affordability calculator &mdash; including the question every estate-planning conversation reaches: can the pension fund the cover? Both produce indicative figures for a conversation, clearly labelled as not advice and not a quotation.</p>
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow s">One front door</p>
      <h2>Not sure which workflow? Throw the file at the engine.</h2>
      <p>Drop in whatever you have &mdash; a case pack, a transcript, a half-written report &mdash; with a line of context if you like. One pass decides the most applicable workflow, quotes the exact words that decided it, and offers up to three alternatives. Your explicit ask always beats the shape of the material, and you can overrule it in one click.</p>
    </div>
    <div class="route">
      <div class="fnode">
        <h4>What you dropped in</h4>
        <p>&ldquo;Annual review for the Hartleys next week &mdash; here's last year's file and the meeting transcript.&rdquo;</p>
      </div>
      <div class="farrow"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-arrow"></use></svg></div>
      <div class="fnode mid">
        <h4>Routed: Annual advice meeting <span class="chip ok" style="margin-left:6px">High confidence</span></h4>
        <p>Deciding words: <em>&ldquo;annual review&hellip; next week&rdquo;</em> plus last year's review pack in the material.</p>
        <p style="margin-top:6px">Alternatives offered: gap scan the transcript &middot; extract client facts &middot; one click to overrule.</p>
      </div>
    </div>
  </div>
</section>
'''

PAGES = {
    "index.html": {
        "title": "The Advice Engine - AI-drafted advice paperwork for UK advice firms, in your own brand",
        "desc": "The Advice Engine drafts, checks and organises advice paperwork for UK financial advice firms - suitability reports, annual review packs, advice gap scanning and more - in each firm's own brand, from its own client files. Built inside a regulated UK advice firm. Every output is a draft until a named adviser signs it off.",
        "canon": "",
        "nav": None,
        "body": INDEX_BODY,
    },
    "quilter.html": {
        "title": "For Quilter advisers | The Advice Engine",
        "desc": "The Advice Engine is built and used daily inside an appointed representative firm in the Quilter network. Advice-process drafting, the allowances position reviewers ask for, file-check-shaped review and financial promotion pre-vetting - built where the file checks happen.",
        "canon": "quilter.html",
        "nav": "/quilter.html",
        "body": QUILTER_BODY,
    },
    "suitability.html": {
        "title": "Suitability reports | The Advice Engine",
        "desc": "Suitability reports drafted from your case pack across 19 case types, full and shortened advice processes, graded against the compliance framework and revised before you see them. Branded Word output with an adviser QA sheet.",
        "canon": "suitability.html",
        "nav": None,
        "body": SUITABILITY_BODY,
    },
    "meetings.html": {
        "title": "Client meetings | The Advice Engine",
        "desc": "First-meeting packs and annual advice review packs drafted from the client's own file - including the annual allowances position, evidenced per client. Briefings before the meeting, the record after it.",
        "canon": "meetings.html",
        "nav": None,
        "body": MEETINGS_BODY,
    },
    "compliance.html": {
        "title": "Compliance check | The Advice Engine",
        "desc": "A file check before the file check: the engine reviews an existing report the way a compliance file checker would - grade, commentary and a completed checklist. It flags gaps; it never certifies.",
        "canon": "compliance.html",
        "nav": None,
        "body": COMPLIANCE_BODY,
    },
    "finprom.html": {
        "title": "Financial promotions | The Advice Engine",
        "desc": "Pre-vet marketing material, stationery and live web pages against the financial promotion rules before submission to your network's approvals team. Fewer resubmission round trips. It never approves.",
        "canon": "finprom.html",
        "nav": None,
        "body": FINPROM_BODY,
    },
    "find.html": {
        "title": "Advice gap scanner | The Advice Engine",
        "desc": "The advice gap scanner reads a client's own file - meeting transcripts especially - and surfaces needs raised but never actioned, quoting the file verbatim with quotes verified in code. Plus the client facts extract.",
        "canon": "find.html",
        "nav": "/find.html",
        "body": FIND_BODY,
    },
    "organise.html": {
        "title": "Fees, authorities and admin | The Advice Engine",
        "desc": "Fee authority forms pre-filled from your own terms of business, letters of authority validated before download, protection ready-reckoners, and a front door that routes any file to the right workflow.",
        "canon": "organise.html",
        "nav": None,
        "body": ORGANISE_BODY,
    },
}


def build():
    for fname, page in PAGES.items():
        html = (HEAD
                .replace("@@TITLE@@", page["title"])
                .replace("@@DESC@@", page["desc"])
                .replace("@@CANON@@", page["canon"]))
        html += header(page["nav"])
        html += '\n<main id="main">\n'
        html += page["body"]
        html += "\n</main>\n\n"
        html += CLOSE
        html += "\n"
        html += FOOTER
        path = os.path.join(HERE, fname)
        with io.open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print("wrote", fname, len(html), "bytes")


if __name__ == "__main__":
    build()
