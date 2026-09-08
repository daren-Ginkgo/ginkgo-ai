import { betaAvailability, bumpChatCounter } from "@/lib/azure-storage";
import {
  askAnthropic,
  availabilityLine,
  buildSystem,
  callerKey,
  chatConfigured,
  chatPayloadSchema,
  LIMITS,
  limitWindows,
} from "@/lib/chat";

export const dynamic = "force-dynamic";

const UNAVAILABLE = "The assistant is unavailable right now. Email hello@theadviceengine.ai and a human will answer instead.";
const SLOW_DOWN = "You have reached the conversation limit for now. For anything more, email hello@theadviceengine.ai or book a walkthrough at /demo.";
const AVAILABILITY_TIMEOUT_MS = 2000;

// The founding-places lookup mirrors the availability badge's discipline: two
// seconds, then answer without a number rather than with a wrong one.
async function availabilityFact() {
  try {
    const result = await Promise.race([
      betaAvailability(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), AVAILABILITY_TIMEOUT_MS)),
    ]);
    return availabilityLine(result);
  } catch {
    return availabilityLine(null);
  }
}

export async function POST(request: Request) {
  try {
    if (!chatConfigured()) {
      return Response.json({ error: UNAVAILABLE }, { status: 503 });
    }
    const payload = await request.json() as Record<string, unknown>;
    const parsed = chatPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "That message could not be read." },
        { status: 400 },
      );
    }

    // The caps are the feature on an anonymous route that spends money. Counted
    // in Azure Tables against a hashed caller key; if the counter store is down,
    // the chat closes rather than running uncounted.
    const caller = callerKey(request);
    const windows = limitWindows();
    const [callerHour, callerDay, globalDay] = await Promise.all([
      bumpChatCounter(windows.hour, caller),
      bumpChatCounter(windows.day, caller),
      bumpChatCounter(windows.day, "global"),
    ]);
    if (callerHour > LIMITS.perCallerPerHour || callerDay > LIMITS.perCallerPerDay
        || globalDay > LIMITS.globalPerDay) {
      return Response.json({ error: SLOW_DOWN }, { status: 429 });
    }

    const system = buildSystem(await availabilityFact());
    const reply = await askAnthropic(system, parsed.data.messages.slice(-LIMITS.maxMessages));
    return Response.json({ reply });
  } catch {
    return Response.json({ error: UNAVAILABLE }, { status: 500 });
  }
}
