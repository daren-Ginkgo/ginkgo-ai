import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "advice-engine-marketing",
    storageConfigured: Boolean(process.env.AZURE_STORAGE_CONNECTION_STRING),
    chatConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    checkedAt: new Date().toISOString(),
  });
}
