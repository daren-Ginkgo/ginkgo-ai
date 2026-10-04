// Unit tests for the applicant's acknowledgement email, with a mock sender.
// Run with: node --experimental-strip-types --test "tests/*.test.mjs"
// Fixture is the fictitious Alex Taylor household, never a real applicant.

import assert from "node:assert/strict";
import { test } from "node:test";
import { acknowledgeApplication, buildAcknowledgementEmail } from "../lib/acknowledgement-email.ts";

const BOOKING = "https://booking.example.test/daren-";

function application(overrides = {}) {
  return {
    id: "b".repeat(64),
    fullName: "Alex Taylor",
    workEmail: "alex.taylor@example-advice.co.uk",
    phone: "",
    firmName: "Taylor & Co",
    firmReference: "",
    adviserCount: "",
    microsoft365: "",
    bottleneck: "",
    status: "pending",
    isTest: false,
    suspectedSpam: false,
    createdAt: "2026-10-04T08:40:00.000Z",
    updatedAt: "2026-10-04T08:40:00.000Z",
    approvalEmailedAt: "",
    ...overrides,
  };
}

function mockSender(result = true) {
  const calls = [];
  const send = async (mail) => {
    calls.push(mail);
    if (result instanceof Error) throw result;
    return result;
  };
  return { calls, send };
}

test("a founding applicant is acknowledged at their work email, with no BCC", async () => {
  const { calls, send } = mockSender();
  const outcome = await acknowledgeApplication({ duplicate: false, application: application() }, BOOKING, send);

  assert.equal(outcome, "sent");
  assert.equal(calls.length, 1);
  const [mail] = calls;
  assert.equal(mail.to, "alex.taylor@example-advice.co.uk");
  assert.equal(mail.bcc, false);
  assert.equal(mail.subject, "We have your Advice Engine application");
  for (const expected of [
    "Alex,",
    "on behalf of Taylor &amp; Co",
    "FCA register",
    "within two working days",
    "Microsoft 365 work account",
    "client information",
    `href="${BOOKING}"`,
  ]) assert.ok(mail.html.includes(expected), `body should include ${expected}`);
});

test("a waiting-list applicant gets the waiting-list wording and no booking link", () => {
  const { subject, html } = buildAcknowledgementEmail(application({ status: "waitlist" }), BOOKING);
  assert.equal(subject, "You are on The Advice Engine waiting list");
  assert.ok(html.includes("waiting list"));
  assert.ok(!html.includes(BOOKING));
  assert.ok(!html.includes("two working days"));
});

test("names are escaped in the body", () => {
  const { html } = buildAcknowledgementEmail(application({ fullName: "<b>Alex</b> Taylor" }), BOOKING);
  assert.ok(html.includes("&lt;b&gt;Alex&lt;/b&gt;,"));
});

test("the copy carries no em dash", () => {
  for (const status of ["pending", "waitlist"]) {
    const { subject, html } = buildAcknowledgementEmail(application({ status }), BOOKING);
    assert.ok(!/—/.test(subject + html));
  }
});

test("no acknowledgement for a duplicate or a suspected-spam row", async () => {
  const { calls, send } = mockSender();
  assert.equal(await acknowledgeApplication({ duplicate: true, application: application() }, BOOKING, send), "skipped");
  const trapped = application({ suspectedSpam: true, isTest: true });
  assert.equal(await acknowledgeApplication({ duplicate: false, application: trapped }, BOOKING, send), "skipped");
  assert.equal(calls.length, 0);
});

test("a send failure is reported, never thrown", async () => {
  const failing = mockSender(false);
  assert.equal(await acknowledgeApplication({ duplicate: false, application: application() }, BOOKING, failing.send), "failed");
  const throwing = mockSender(new Error("Graph is down"));
  assert.equal(await acknowledgeApplication({ duplicate: false, application: application() }, BOOKING, throwing.send), "failed");
});
