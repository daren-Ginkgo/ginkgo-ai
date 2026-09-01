import { createHash, randomUUID } from "node:crypto";
import { TableClient, type TableEntity } from "@azure/data-tables";
import { ACTIVE_BETA_STATUSES, FOUNDING_PLACES, remainingPlaces } from "@/lib/beta";

const APPLICATION_TABLE = "BetaApplications";
const EVENT_TABLE = "ConversionEvents";
const APPLICATION_PARTITION = "founding-beta";

export type ApplicationStatus = "pending" | "contacted" | "approved" | "declined" | "withdrawn" | "waitlist";

export type StoredApplication = {
  id: string;
  fullName: string;
  workEmail: string;
  firmName: string;
  firmReference: string;
  adviserCount: string;
  microsoft365: string;
  bottleneck: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
};

type ApplicationEntity = TableEntity & Omit<StoredApplication, "id">;
type EventEntity = TableEntity & {
  eventName: string;
  path: string;
  context: string;
  createdAt: string;
};

let tablesReady: Promise<void> | null = null;

function connectionString() {
  const value = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!value) throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
  return value;
}

function applicationClient() {
  return TableClient.fromConnectionString(connectionString(), APPLICATION_TABLE);
}

function eventClient() {
  return TableClient.fromConnectionString(connectionString(), EVENT_TABLE);
}

async function ensureTables() {
  async function createIfMissing(client: TableClient) {
    try {
      await client.createTable();
    } catch (error) {
      if (statusCode(error) !== 409) throw error;
    }
  }
  tablesReady ??= Promise.all([
    createIfMissing(applicationClient()),
    createIfMissing(eventClient()),
  ]).then(() => undefined);
  await tablesReady;
}

function statusCode(error: unknown) {
  if (!error || typeof error !== "object" || !("statusCode" in error)) return undefined;
  const value = (error as { statusCode?: unknown }).statusCode;
  return typeof value === "number" ? value : undefined;
}

function emailKey(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function fromApplicationEntity(entity: ApplicationEntity): StoredApplication {
  return {
    id: entity.rowKey,
    fullName: entity.fullName,
    workEmail: entity.workEmail,
    firmName: entity.firmName,
    firmReference: entity.firmReference,
    adviserCount: entity.adviserCount,
    microsoft365: entity.microsoft365,
    bottleneck: entity.bottleneck,
    status: entity.status,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export async function listApplications(): Promise<StoredApplication[]> {
  await ensureTables();
  const rows: StoredApplication[] = [];
  for await (const entity of applicationClient().listEntities<ApplicationEntity>({
    queryOptions: { filter: `PartitionKey eq '${APPLICATION_PARTITION}'` },
  })) rows.push(fromApplicationEntity(entity));
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function betaAvailability() {
  const applications = await listApplications();
  const active = applications.filter((row) => ACTIVE_BETA_STATUSES.includes(row.status as typeof ACTIVE_BETA_STATUSES[number])).length;
  return { total: FOUNDING_PLACES, active, remaining: remainingPlaces(active) };
}

export async function submitBetaApplication(input: {
  fullName: string;
  workEmail: string;
  firmName: string;
  firmReference: string;
  adviserCount: string;
  microsoft365: string;
  bottleneck: string;
}) {
  await ensureTables();
  const client = applicationClient();
  const rowKey = emailKey(input.workEmail);

  try {
    const existing = await client.getEntity<ApplicationEntity>(APPLICATION_PARTITION, rowKey);
    return { duplicate: true, application: fromApplicationEntity(existing), availability: await betaAvailability() };
  } catch (error) {
    if (statusCode(error) !== 404) throw error;
  }

  const before = await betaAvailability();
  const now = new Date().toISOString();
  const entity: ApplicationEntity = {
    partitionKey: APPLICATION_PARTITION,
    rowKey,
    fullName: input.fullName,
    workEmail: input.workEmail.toLowerCase(),
    firmName: input.firmName,
    firmReference: input.firmReference,
    adviserCount: input.adviserCount,
    microsoft365: input.microsoft365,
    bottleneck: input.bottleneck,
    status: before.remaining > 0 ? "pending" : "waitlist",
    createdAt: now,
    updatedAt: now,
  };

  try {
    await client.createEntity(entity);
  } catch (error) {
    if (statusCode(error) !== 409) throw error;
    const existing = await client.getEntity<ApplicationEntity>(APPLICATION_PARTITION, rowKey);
    return { duplicate: true, application: fromApplicationEntity(existing), availability: await betaAvailability() };
  }

  return { duplicate: false, application: fromApplicationEntity(entity), availability: await betaAvailability() };
}

export async function getApplication(id: string): Promise<StoredApplication | null> {
  await ensureTables();
  try {
    const entity = await applicationClient().getEntity<ApplicationEntity>(APPLICATION_PARTITION, id);
    return fromApplicationEntity(entity);
  } catch (error) {
    if (statusCode(error) === 404) return null;
    throw error;
  }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  await ensureTables();
  const client = applicationClient();
  const existing = await client.getEntity<ApplicationEntity>(APPLICATION_PARTITION, id);
  await client.updateEntity({
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  }, "Replace");
}

export async function recordConversion(eventName: string, path: string, context = "") {
  await ensureTables();
  const createdAt = new Date().toISOString();
  const partitionKey = createdAt.slice(0, 7);
  const entity: EventEntity = {
    partitionKey,
    rowKey: `${Date.now()}-${randomUUID()}`,
    eventName,
    path,
    context,
    createdAt,
  };
  await eventClient().createEntity(entity);
}

export async function conversionSummary() {
  await ensureTables();
  const eventCounts = new Map<string, number>();
  const pageCounts = new Map<string, number>();
  for await (const event of eventClient().listEntities<EventEntity>()) {
    eventCounts.set(event.eventName, (eventCounts.get(event.eventName) ?? 0) + 1);
    if (event.eventName === "page_view") pageCounts.set(event.path, (pageCounts.get(event.path) ?? 0) + 1);
  }
  return {
    events: Array.from(eventCounts.entries()).map(([eventName, count]) => ({ eventName, count })),
    pages: Array.from(pageCounts.entries()).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count).slice(0, 10),
  };
}
