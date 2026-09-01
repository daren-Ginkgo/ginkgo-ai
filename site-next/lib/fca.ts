// FCA Financial Services Register client for the funnel's advisory check.
// Ported from the Advice Engine's fca_register.py. The check NEVER gates an
// approval decision - it reports what the register says and the owner decides.
//
// Credentials: the API is free but keyed (https://register.fca.org.uk/Developer).
// Set FCA_API_EMAIL and FCA_API_KEY as App Service settings. Without them the
// check reports itself unavailable; it must never silently pass anyone.

const BASE = "https://register.fca.org.uk/services/V0.1";
const QUILTER_FS_FRN = "440703";
const QUILTER_FS_NAME = "quilter financial services";
const TIMEOUT_MS = 15000;

export type FcaCheckResult = {
  configured: boolean;
  frn: string | null;
  firmFound: boolean;
  registerName: string | null;
  registerStatus: string | null;
  statusAcceptable: boolean;
  nameMatch: "match" | "close" | "mismatch" | "unknown";
  quilterAr: boolean | null;
  quilterArEvidence: string;
  error: string | null;
};

export function fcaConfigured() {
  return Boolean(process.env.FCA_API_EMAIL) && Boolean(process.env.FCA_API_KEY);
}

async function registerGet(path: string): Promise<Record<string, unknown>> {
  const response = await fetch(BASE + path, {
    headers: {
      "X-Auth-Email": process.env.FCA_API_EMAIL ?? "",
      "X-Auth-Key": process.env.FCA_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (response.status === 404) return {};
  if (!response.ok) throw new Error(`FCA register returned HTTP ${response.status}`);
  try {
    return await response.json() as Record<string, unknown>;
  } catch {
    return {};
  }
}

// The register wraps results as {"Data": [...]} (sometimes {"Data": {...}}).
function firstRecord(payload: Record<string, unknown>): Record<string, unknown> {
  const data = payload?.Data;
  if (Array.isArray(data)) return typeof data[0] === "object" && data[0] ? data[0] as Record<string, unknown> : {};
  return typeof data === "object" && data ? data as Record<string, unknown> : {};
}

// Case-insensitive lookup of the first key containing every name part.
function field(record: Record<string, unknown>, ...nameParts: string[]) {
  for (const [key, value] of Object.entries(record ?? {})) {
    const lowered = key.toLowerCase();
    if (nameParts.every((part) => lowered.includes(part))) return value;
  }
  return undefined;
}

// Every dict record in a register response, whatever the container shape.
function recordsOf(payload: Record<string, unknown>): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const stack: unknown[] = [payload?.Data];
  while (stack.length) {
    const node = stack.pop();
    if (Array.isArray(node)) stack.push(...node);
    else if (node && typeof node === "object") {
      const record = node as Record<string, unknown>;
      if (Object.values(record).some((v) => v && typeof v === "object")) stack.push(...Object.values(record));
      out.push(record);
    }
  }
  return out;
}

// No termination/end date value means the relationship is current.
function recordIsCurrent(record: Record<string, unknown>) {
  return !Object.entries(record).some(([key, value]) => {
    const lowered = key.toLowerCase();
    return (lowered.includes("termination") || lowered.includes("end date")) && String(value ?? "").trim();
  });
}

function mentionsQuilter(record: Record<string, unknown>) {
  const frn = field(record, "principal", "frn");
  if (frn && String(frn).trim() === QUILTER_FS_FRN) return true;
  const name = field(record, "principal", "name");
  return Boolean(name) && String(name).toLowerCase().includes(QUILTER_FS_NAME);
}

export function parseFrn(reference: string): string | null {
  const match = reference?.match(/\b\d{5,7}\b/);
  return match ? match[0] : null;
}

// A firm the register will let the beta accept: currently authorised or a
// current AR. Anything lapsed/removed is refused.
export function statusAcceptable(status: string | null) {
  const s = (status ?? "").toLowerCase();
  if (!s) return false;
  if (["no longer", "cancel", "ceased", "removed", "refus"].some((bad) => s.includes(bad))) return false;
  return s.includes("authorised") || s.includes("appointed representative") || s.includes("registered");
}

function normaliseFirmName(name: string) {
  return name
    .toLowerCase()
    .replace(/\b(limited|ltd|llp|plc|partnership|and|&|the)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function compareFirmNames(applicant: string, register: string | null): FcaCheckResult["nameMatch"] {
  if (!register) return "unknown";
  const a = normaliseFirmName(applicant);
  const b = normaliseFirmName(register);
  if (!a || !b) return "unknown";
  if (a === b) return "match";
  if (a.includes(b) || b.includes(a)) return "close";
  const aTokens = new Set(a.split(" "));
  const shared = b.split(" ").filter((token) => aTokens.has(token)).length;
  return shared >= 2 ? "close" : "mismatch";
}

// Is this FRN a CURRENT Appointed Representative of Quilter Financial Services
// Ltd? Three-valued: true / false / null (undeterminable - treat as unverified).
async function quilterPrincipal(frn: string): Promise<{ verdict: boolean | null; evidence: string }> {
  try {
    const records = recordsOf(await registerGet(`/Firm/${frn}/AR`));
    const principalRecords = records.filter((r) => field(r, "principal", "frn") || field(r, "principal", "name"));
    for (const record of principalRecords) {
      if (mentionsQuilter(record) && recordIsCurrent(record)) {
        return { verdict: true, evidence: `register: current principal relationship to Quilter FS (${QUILTER_FS_FRN})` };
      }
    }
    if (principalRecords.length) {
      return { verdict: false, evidence: "register: firm has principal records, none current for Quilter FS" };
    }
    return { verdict: null, evidence: "register: no principal relationship records returned" };
  } catch {
    return { verdict: null, evidence: "register: AR relationship could not be determined" };
  }
}

export async function runFcaCheck(firmName: string, firmReference: string): Promise<FcaCheckResult> {
  const result: FcaCheckResult = {
    configured: fcaConfigured(),
    frn: parseFrn(firmReference),
    firmFound: false,
    registerName: null,
    registerStatus: null,
    statusAcceptable: false,
    nameMatch: "unknown",
    quilterAr: null,
    quilterArEvidence: "",
    error: null,
  };
  if (!result.configured) {
    result.error = "FCA register credentials are not configured on this server.";
    return result;
  }
  if (!result.frn) {
    result.error = "No FRN found in the application's firm reference.";
    return result;
  }

  try {
    const record = firstRecord(await registerGet(`/Firm/${result.frn}`));
    const name = field(record, "organisation", "name") ?? field(record, "name");
    if (!name) {
      result.error = "The register has no firm for this FRN.";
      return result;
    }
    result.firmFound = true;
    result.registerName = String(name).trim();
    result.registerStatus = String(field(record, "status") ?? "").trim() || null;
    result.statusAcceptable = statusAcceptable(result.registerStatus);
    result.nameMatch = compareFirmNames(firmName, result.registerName);
  } catch (error) {
    result.error = error instanceof Error ? error.message : "FCA register could not be reached.";
    return result;
  }

  const ar = await quilterPrincipal(result.frn);
  result.quilterAr = ar.verdict;
  result.quilterArEvidence = ar.evidence;
  return result;
}
