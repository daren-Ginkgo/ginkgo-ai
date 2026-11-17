// Unit tests for the Advice Engine calling the funnel as itself.
// Run with: node --experimental-strip-types --test "tests/*.test.mjs"

import assert from "node:assert/strict";
import { test } from "node:test";
import { engineCallerIds, isEngineCallerId, isEngineChange, isUndecided } from "../lib/engine-caller.ts";

const LIVE = "77319b63-e38e-4ba1-878c-cd61af7cb2b9";
const SLOT = "7aad5d0b-662d-47e3-89ca-208ddbd9f26e";

test("the engine's live app and its slot pass by default", () => {
  assert.ok(isEngineCallerId(LIVE, ""));
  assert.ok(isEngineCallerId(SLOT.toUpperCase(), ""));
});

test("anyone else, or no identity at all, does not", () => {
  assert.ok(!isEngineCallerId("18632331-edda-48da-83f0-87f64e2ad200", ""));
  assert.ok(!isEngineCallerId("", ""));
  assert.ok(!isEngineCallerId(null, ""));
  assert.ok(!isEngineCallerId(undefined, ""));
});

test("the setting replaces the list, and off turns it off", () => {
  assert.deepEqual(engineCallerIds(" AAA , bbb "), ["aaa", "bbb"]);
  assert.ok(!isEngineCallerId(LIVE, "aaa,bbb"));
  assert.ok(isEngineCallerId("bbb", "aaa,bbb"));
  assert.ok(!isEngineCallerId(LIVE, "off"));
  assert.deepEqual(engineCallerIds("OFF"), []);
});

test("the engine may only approve or decline", () => {
  assert.ok(isEngineChange({ status: "approved" }));
  assert.ok(isEngineChange({ status: "declined" }));
  for (const status of ["pending", "contacted", "withdrawn", "waitlist", "", undefined, 1]) {
    assert.ok(!isEngineChange({ status }), String(status));
  }
});

test("and never touches the test flag or the expiry", () => {
  assert.ok(!isEngineChange({ status: "approved", isTest: false }));
  assert.ok(!isEngineChange({ status: "declined", expiring: true }));
  assert.ok(!isEngineChange({ isTest: true }));
});

test("the engine decides only rows nobody has decided yet", () => {
  for (const status of ["pending", "contacted", "waitlist", ""]) assert.ok(isUndecided(status), status);
  for (const status of ["approved", "declined", "withdrawn", " Approved "]) assert.ok(!isUndecided(status), status);
});
