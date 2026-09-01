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

const statuses = ["pending", "contacted", "approved", "declined", "withdrawn", "waitlist"];

export function BetaAdminTable({ initialApplications }: { initialApplications: BetaApplicationRow[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [saving, setSaving] = useState<string | null>(null);

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

  return (
    <div className="funnel-table-wrap">
      <table className="funnel-table">
        <thead><tr><th>Applicant</th><th>Firm</th><th>Microsoft 365</th><th>Workflow problem</th><th>Applied</th><th>Status</th></tr></thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td><strong>{application.fullName}</strong><a href={`mailto:${application.workEmail}`}>{application.workEmail}</a></td>
              <td><strong>{application.firmName}</strong><span>{application.firmReference} · {application.adviserCount} advisers</span></td>
              <td>{application.microsoft365}</td>
              <td><p>{application.bottleneck}</p></td>
              <td>{new Date(application.createdAt).toLocaleDateString("en-GB")}</td>
              <td><select value={application.status} disabled={saving === application.id} onChange={(event) => updateStatus(application.id, event.target.value)}>{statuses.map((status) => <option value={status} key={status}>{status}</option>)}</select></td>
            </tr>
          ))}
          {!applications.length ? <tr><td colSpan={6}>No beta applications yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
