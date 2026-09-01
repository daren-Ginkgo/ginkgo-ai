"use client";

import { useState } from "react";

export type BetaApplicationRow = {
  id: string;
  fullName: string;
  workEmail: string;
  firmName: string;
  firmReference: string;
  adviserCount: string;
  microsoft365: string;
  bottleneck: string;
  status: string;
  createdAt: string;
};

type FcaCheck = {
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

const statuses = ["pending", "contacted", "approved", "declined", "withdrawn", "waitlist"];

function FcaVerdict({ check }: { check: FcaCheck }) {
  if (check.error) return <span className="fca-line fca-warn">? {check.error}</span>;
  const nameLine =
    check.nameMatch === "match" ? "✓ name ties in" :
    check.nameMatch === "close" ? `~ name close: register says “${check.registerName}”` :
    check.nameMatch === "mismatch" ? `✗ name differs: register says “${check.registerName}”` :
    "? name could not be compared";
  const arLine =
    check.quilterAr === true ? "✓ current Quilter FS AR" :
    check.quilterAr === false ? "✗ not a current Quilter FS AR" :
    "? Quilter AR status undetermined";
  return (
    <span className="fca-result">
      <span className={`fca-line ${check.firmFound ? "fca-ok" : "fca-bad"}`}>
        {check.firmFound ? `✓ FRN ${check.frn} found` : `✗ FRN ${check.frn ?? "?"} not on register`}
      </span>
      <span className={`fca-line ${check.statusAcceptable ? "fca-ok" : "fca-bad"}`}>
        {check.registerStatus ? `${check.statusAcceptable ? "✓" : "✗"} ${check.registerStatus}` : "? no status returned"}
      </span>
      <span className={`fca-line ${check.nameMatch === "match" ? "fca-ok" : check.nameMatch === "mismatch" ? "fca-bad" : "fca-warn"}`}>{nameLine}</span>
      <span className={`fca-line ${check.quilterAr === true ? "fca-ok" : check.quilterAr === false ? "fca-bad" : "fca-warn"}`} title={check.quilterArEvidence}>{arLine}</span>
    </span>
  );
}

export function BetaAdminTable({ initialApplications }: { initialApplications: BetaApplicationRow[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [saving, setSaving] = useState<string | null>(null);
  const [checks, setChecks] = useState<Record<string, FcaCheck | "loading">>({});

  async function updateStatus(id: string, status: string) {
    setSaving(id);
    try {
      const response = await fetch(`/api/beta-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Update failed");
      setApplications((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    } finally {
      setSaving(null);
    }
  }

  async function runCheck(id: string) {
    setChecks((current) => ({ ...current, [id]: "loading" }));
    try {
      const response = await fetch(`/api/beta-applications/${id}/fca-check`);
      const payload = await response.json() as FcaCheck & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Check failed");
      setChecks((current) => ({ ...current, [id]: payload }));
    } catch (error) {
      setChecks((current) => ({
        ...current,
        [id]: {
          configured: false, frn: null, firmFound: false, registerName: null, registerStatus: null,
          statusAcceptable: false, nameMatch: "unknown", quilterAr: null, quilterArEvidence: "",
          error: error instanceof Error ? error.message : "Check failed",
        },
      }));
    }
  }

  return (
    <div className="funnel-table-wrap">
      <table className="funnel-table">
        <thead><tr><th>Applicant</th><th>Firm</th><th>FCA register</th><th>Microsoft 365</th><th>Workflow problem</th><th>Applied</th><th>Status</th></tr></thead>
        <tbody>
          {applications.map((application) => {
            const check = checks[application.id];
            return (
              <tr key={application.id}>
                <td><strong>{application.fullName}</strong><a href={`mailto:${application.workEmail}`}>{application.workEmail}</a></td>
                <td><strong>{application.firmName}</strong><span>{application.firmReference} · {application.adviserCount} advisers</span></td>
                <td>
                  {check && check !== "loading" ? <FcaVerdict check={check} /> : null}
                  <button
                    type="button"
                    className="fca-check-button"
                    disabled={check === "loading"}
                    onClick={() => runCheck(application.id)}
                  >
                    {check === "loading" ? "Checking…" : check ? "Re-check" : "Check register"}
                  </button>
                  <span className="fca-note">Advisory only — your status decision always stands.</span>
                </td>
                <td>{application.microsoft365}</td>
                <td><p>{application.bottleneck}</p></td>
                <td>{new Date(application.createdAt).toLocaleDateString("en-GB")}</td>
                <td><select value={application.status} disabled={saving === application.id} onChange={(event) => updateStatus(application.id, event.target.value)}>{statuses.map((status) => <option value={status} key={status}>{status}</option>)}</select></td>
              </tr>
            );
          })}
          {!applications.length ? <tr><td colSpan={7}>No beta applications yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
