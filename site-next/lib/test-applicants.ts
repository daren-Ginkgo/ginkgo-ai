// Test applications: Daren's own addresses, and rows set to delete themselves.
//
// TEST_APPLICANT_EMAILS (app setting, comma-separated, kept out of this public
// repo) lists addresses Daren tests the /start form with. An application from one
// of them is never a duplicate: each one makes a fresh row, marked as a test so it
// holds no place, set to expire after TEST_ROW_DAYS, and it still gets the full
// email flow (including the approval email) so the whole journey can be rehearsed.
//
// Any row can also be set to expire from /funnel. Expired rows are deleted the next
// time /funnel loads or someone applies (purgeExpiredApplications).
//
// Pure, no runtime imports: tested in tests/test-applicants.test.mjs.

export const TEST_ROW_DAYS = 10;

export function testApplicantEmails(setting: string) {
  return setting.split(/[,;\s]+/).map((email) => email.trim().toLowerCase()).filter(Boolean);
}

export function isTestApplicant(email: string, setting = process.env.TEST_APPLICANT_EMAILS ?? "") {
  const address = (email ?? "").trim().toLowerCase();
  return Boolean(address) && testApplicantEmails(setting).includes(address);
}

export function expiryFrom(nowIso: string, days = TEST_ROW_DAYS) {
  return new Date(new Date(nowIso).getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

// "" means the row never expires.
export function isExpired(expiresAt: string, nowIso: string) {
  return Boolean(expiresAt) && expiresAt <= nowIso;
}
