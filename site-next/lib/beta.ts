import { z } from "zod";

export const FOUNDING_PLACES = 15;
export const ACTIVE_BETA_STATUSES = ["pending", "contacted", "approved"] as const;
export const BETA_STATUSES = ["pending", "contacted", "approved", "declined", "withdrawn", "waitlist"] as const;

const phonePattern = /^[+()\d][\d\s()-]{5,28}\d$/;

// Optional fields arrive from the form as empty strings. Daren approves every
// applicant by phone, so anything he will ask on the call is not a barrier
// before it: absence is stored as "" and shown as "not supplied", never an error.
const optionalTrimmed = (max: number) =>
  z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(max));

export const betaApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  workEmail: z.string().trim().email("Please enter a valid work email.").max(180),
  phone: optionalTrimmed(30)
    .refine((value) => value === "" || phonePattern.test(value), "Please enter a valid phone number."),
  firmName: z.string().trim().min(2, "Please enter your firm name.").max(160),
  firmReference: optionalTrimmed(80),
  adviserCount: optionalTrimmed(8)
    .refine((value) => ["", "1", "2-4", "5-10", "11+"].includes(value), "Please choose an option from the list."),
  microsoft365: optionalTrimmed(8)
    .refine((value) => ["", "yes", "no", "not-sure"].includes(value), "Please choose an option from the list."),
  bottleneck: optionalTrimmed(1800),
  isQuilterAdviser: z.literal(true, { message: "Please confirm that you are a Quilter adviser." }),
  contactConsent: z.literal(true, { message: "Please confirm that we may contact you about the beta." }),
  website: z.string().max(0).optional(),
});

export type BetaApplicationInput = z.infer<typeof betaApplicationSchema>;

export function remainingPlaces(activeApplications: number) {
  return Math.max(0, FOUNDING_PLACES - activeApplications);
}
