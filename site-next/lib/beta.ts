import { z } from "zod";

export const FOUNDING_PLACES = 15;
export const ACTIVE_BETA_STATUSES = ["pending", "contacted", "approved"] as const;
export const BETA_STATUSES = ["pending", "contacted", "approved", "declined", "withdrawn", "waitlist"] as const;

export const betaApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  workEmail: z.string().trim().email("Please enter a valid work email.").max(180),
  firmName: z.string().trim().min(2, "Please enter your firm name.").max(160),
  firmReference: z.string().trim().min(2, "Please enter your firm or FCA reference.").max(80),
  adviserCount: z.enum(["1", "2-4", "5-10", "11+"]),
  microsoft365: z.enum(["yes", "no", "not-sure"]),
  bottleneck: z.string().trim().min(20, "Please tell us a little more about the workflow problem.").max(1800),
  isQuilterAdviser: z.literal(true, { message: "Please confirm that you are a Quilter adviser." }),
  contactConsent: z.literal(true, { message: "Please confirm that we may contact you about the beta." }),
  website: z.string().max(0).optional(),
});

export type BetaApplicationInput = z.infer<typeof betaApplicationSchema>;

export function remainingPlaces(activeApplications: number) {
  return Math.max(0, FOUNDING_PLACES - activeApplications);
}
