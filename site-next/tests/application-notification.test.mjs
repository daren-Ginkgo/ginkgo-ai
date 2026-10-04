// Unit tests for the new-application email to Daren, with a mock sender.
// No Next toolchain or network: run with
//   node --experimental-strip-types --test tests/
// Fixture is the fictitious Alex Taylor household, never a real applicant.

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildApplicationNotification,
  londonTime,
  notifyNewApplication,
} from "../lib/application-notification.ts";

const OWNER = "owner@example.test";

function application(overrides = {}) {
  return {
    id: "a".repeat(64),
    fullName: "Alex Taylor",
    workEmail: "alex.taylor@example-advice.co.uk",
    phone: "",
    firmName: "Taylor & Co <Advice>",
    firmReference: "123456",
    adviserCount: "2-4",
    microsoft365: "not-sure",
    bottleneck: "Suitability reports\ncome back for rework.",
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

test("a new founding application emails the owner with every field", async () => {
  const { calls, send } = mockSender();
  const outcome = await notifyNewApplication({ duplicate: false, application: application() }, OWNER, send);

  assert.equal(outcome, "sent");
  assert.equal(calls.length, 1);
  const [mail] = calls;
  assert.equal(mail.to, OWNER);
  assert.equal(mail.bcc, false);
  assert.equal(mail.subject, "New founding application: Alex Taylor, Taylor & Co <Advice>");
  for (const expected of [
    "alex.taylor@example-advice.co.uk",
    "Taylor &amp; Co &lt;Advice&gt;",
    "123456",
    "2-4",
    "Not sure",
    "Suitability reports<br>come back for rework.",
    "not supplied",
    "Founding place",
    "https://theadviceengine.ai/funnel",
    londonTime("2026-10-04T08:40:00.000Z"),
  ]) assert.ok(mail.html.includes(expected), `body should include ${expected}`);
});

test("submission time is shown in London time", () => {
  assert.match(londonTime("2026-10-04T08:40:00.000Z"), /09:40/);
  assert.match(londonTime("2026-12-04T08:40:00.000Z"), /08:40/);
});

test("a waiting-list request says so", () => {
  const { subject, html } = buildApplicationNotification(application({ status: "waitlist" }));
  assert.equal(subject, "New waiting-list request: Alex Taylor, Taylor & Co <Advice>");
  assert.ok(html.includes("Waiting list"));
});

test("a line break in a name never reaches the subject", () => {
  const { subject } = buildApplicationNotification(application({ fullName: "Alex\r\nBcc: x@example.test" }));
  assert.ok(!/[\r\n]/.test(subject));
});

test("no email for a duplicate", async () => {
  const { calls, send } = mockSender();
  assert.equal(await notifyNewApplication({ duplicate: true, application: application() }, OWNER, send), "skipped");
  assert.equal(calls.length, 0);
});

test("no email for a suspected-spam row", async () => {
  const { calls, send } = mockSender();
  const result = { duplicate: false, application: application({ suspectedSpam: true, isTest: true }) };
  assert.equal(await notifyNewApplication(result, OWNER, send), "skipped");
  assert.equal(calls.length, 0);
});

test("no email when no owner address is configured", async () => {
  const { calls, send } = mockSender();
  assert.equal(await notifyNewApplication({ duplicate: false, application: application() }, "", send), "skipped");
  assert.equal(calls.length, 0);
});

test("a send failure is reported, never thrown", async () => {
  const failing = mockSender(false);
  assert.equal(await notifyNewApplication({ duplicate: false, application: application() }, OWNER, failing.send), "failed");
  const throwing = mockSender(new Error("Graph is down"));
  assert.equal(await notifyNewApplication({ duplicate: false, application: application() }, OWNER, throwing.send), "failed");
});
