// Unit tests for the approval email copy.
// Run with: node --experimental-strip-types --test "tests/*.test.mjs"
// Fixture is the fictitious Alex Taylor household, never a real applicant.

import assert from "node:assert/strict";
import { test } from "node:test";
import { buildApprovalEmail } from "../lib/approval-email.ts";

function application(overrides = {}) {
  return {
    id: "c".repeat(64),
    fullName: "Alex Taylor",
    workEmail: "alex.taylor@example-advice.co.uk",
    phone: "",
    firmName: "Taylor & Co",
    firmReference: "",
    adviserCount: "",
    microsoft365: "",
    bottleneck: "",
    status: "approved",
    isTest: false,
    suspectedSpam: false,
    createdAt: "2026-10-04T08:40:00.000Z",
    updatedAt: "2026-10-04T08:40:00.000Z",
    approvalEmailedAt: "",
    ...overrides,
  };
}

test("the approval email no longer says there is nothing to accept", () => {
  const { html } = buildApprovalEmail(application());
  assert.ok(!/nothing to accept/i.test(html), "the user agreement gate is on, so there is something to accept");
});

test("the approval email tells the adviser about the user agreement at first sign-in", () => {
  const { subject, html } = buildApprovalEmail(application());
  assert.equal(subject, "Your Advice Engine access is open");
  for (const expected of [
    "Alex,",
    "@example-advice.co.uk",
    "confirm our user",
    "belong to The Advice Engine Ltd",
    "reverse engineer or recreate it",
    "is confidential",
    "Your log-in is yours alone",
    "We monitor use to protect the service",
    "full terms are on screen when you sign in",
    'href="https://theadviceengine.ai/terms"',
    "<strong>draft</strong>",
  ]) assert.ok(html.includes(expected), `body should include ${expected}`);
});

test("the approval email has no em dashes", () => {
  const { subject, html } = buildApprovalEmail(application());
  assert.ok(!subject.includes("—") && !html.includes("—"));
});
