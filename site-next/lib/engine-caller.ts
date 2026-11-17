// The Advice Engine calling this site as itself, so Daren can approve or decline an
// application from the engine's sign-in pop-up (17 Nov 2026) instead of opening /funnel.
//
// How it is proved: the engine asks Azure for a token for this site's app registration
// using its own managed identity, and sends it as a bearer token. Easy Auth checks the
// token (our tenant, our app) and fills x-ms-client-principal-id from its oid claim,
// stripping any copy a caller sends, so the ID cannot be forged. Only the two identities
// below pass: the engine's live app and its staging slot (a slot keeps its own identity
// through a swap). Not secrets: an object ID grants nothing on its own.
//
// What it may do is deliberately less than Daren can: set a status to approved or declined
// (the same route, the same welcome email, sent once) and run the FCA register check that
// /funnel shows beside each row. Nothing else - no test flags, no expiry, no listing.
// The engine itself only offers the buttons to its platform admins.
//
// Pure, no runtime imports: tested in tests/engine-caller.test.mjs.

const DEFAULT_ENGINE_CALLER_OIDS = [
  "77319b63-e38e-4ba1-878c-cd61af7cb2b9", // ginkgo-advice-engine-demo (live)
  "7aad5d0b-662d-47e3-89ca-208ddbd9f26e", // ginkgo-advice-engine-demo/staging (the slot)
];

export const ENGINE_STATUSES = ["approved", "declined"] as const;

// ENGINE_CALLER_OIDS (app setting, comma-separated) replaces the list; set it to "off" to
// turn the engine's access off without a code change.
export function engineCallerIds(setting = process.env.ENGINE_CALLER_OIDS ?? "") {
  const value = setting.trim().toLowerCase();
  if (value === "off") return [];
  const ids = value ? value.split(/[,;\s]+/) : DEFAULT_ENGINE_CALLER_OIDS;
  return ids.map((id) => id.trim().toLowerCase()).filter(Boolean);
}

export function isEngineCallerId(principalId: string | null | undefined, setting?: string) {
  const id = (principalId ?? "").trim().toLowerCase();
  return Boolean(id) && engineCallerIds(setting).includes(id);
}

// The one change the engine may make: a status of approved or declined, nothing else.
export function isEngineChange(payload: { status?: unknown; isTest?: unknown; expiring?: unknown }) {
  return payload.isTest === undefined
    && payload.expiring === undefined
    && ENGINE_STATUSES.includes(payload.status as typeof ENGINE_STATUSES[number]);
}

// Decided rows the engine must leave alone. "withdrawn" is the applicant's own decision.
const DECIDED_STATUSES = ["approved", "declined", "withdrawn"];

export function isUndecided(status: string | null | undefined) {
  return !DECIDED_STATUSES.includes((status ?? "").trim().toLowerCase());
}
