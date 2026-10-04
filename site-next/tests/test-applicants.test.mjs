// Unit tests for test addresses and self-deleting rows.
// Run with: node --experimental-strip-types --test "tests/*.test.mjs"

import assert from "node:assert/strict";
import { test } from "node:test";
import { expiryFrom, isExpired, isTestApplicant, TEST_ROW_DAYS } from "../lib/test-applicants.ts";
import { buildApplicationNotification } from "../lib/application-notification.ts";

const SETTING = " Alex.Taylor@example.test, sam.taylor@example.test ";

test("test addresses match whatever the case or spacing", () => {
  assert.ok(isTestApplicant("alex.taylor@example.test", SETTING));
  assert.ok(isTestApplicant("  SAM.TAYLOR@example.test ", SETTING));
  assert.ok(!isTestApplicant("someone@example-advice.co.uk", SETTING));
});

test("no setting, or an empty address, is never a test address", () => {
  assert.ok(!isTestApplicant("alex.taylor@example.test", ""));
  assert.ok(!isTestApplicant("", SETTING));
});

test("rows expire ten days on", () => {
  assert.equal(TEST_ROW_DAYS, 10);
  assert.equal(expiryFrom("2026-10-04T09:00:00.000Z"), "2026-10-14T09:00:00.000Z");
});

test("a row is expired only once its time has passed, and never with no expiry", () => {
  assert.ok(!isExpired("", "2030-01-01T00:00:00.000Z"));
  assert.ok(!isExpired("2026-10-14T09:00:00.000Z", "2026-10-14T08:59:59.999Z"));
  assert.ok(isExpired("2026-10-14T09:00:00.000Z", "2026-10-14T09:00:00.000Z"));
});

test("Daren's notification for a test-address row is tagged [Test]", () => {
  const { subject } = buildApplicationNotification({
    id: "c".repeat(64),
    fullName: "Alex Taylor",
    workEmail: "alex.taylor@example.test",
    phone: "",
    firmName: "Taylor & Co",
    firmReference: "",
    adviserCount: "",
    microsoft365: "",
    bottleneck: "",
    status: "pending",
    isTest: true,
    suspectedSpam: false,
    createdAt: "2026-10-04T09:00:00.000Z",
    updatedAt: "2026-10-04T09:00:00.000Z",
    approvalEmailedAt: "",
    expiresAt: "2026-10-14T09:00:00.000Z",
  });
  assert.equal(subject, "[Test] New founding application: Alex Taylor, Taylor & Co");
});
