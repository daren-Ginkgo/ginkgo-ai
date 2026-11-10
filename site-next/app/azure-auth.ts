import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AzureUser = {
  displayName: string;
  email: string;
  principalId: string;
};

const DEFAULT_ADMIN_EMAIL = "daren@ginkgofinancial.com";
// Daren's Entra object ID in the Ginkgo tenant (pen test P1-19, 10 Nov 2026). The principal
// name header can be an account's DISPLAY NAME when it has no mailbox, which its admins can
// set to anything, so the name alone must never decide who is admin. Easy Auth fills
// x-ms-client-principal-id from the token's oid claim and strips any copy a caller sends, so
// the ID cannot be forged. Not a secret: an object ID grants nothing on its own.
const DEFAULT_ADMIN_OID = "18632331-edda-48da-83f0-87f64e2ad200";

export async function getAzureUser(): Promise<AzureUser | null> {
  const requestHeaders = await headers();
  const email = requestHeaders.get("x-ms-client-principal-name");
  const principalId = requestHeaders.get("x-ms-client-principal-id");

  if (email && principalId) {
    return { displayName: email, email, principalId };
  }

  if (process.env.NODE_ENV !== "production" && process.env.DEV_ADMIN_EMAIL) {
    return {
      displayName: process.env.DEV_ADMIN_EMAIL,
      email: process.env.DEV_ADMIN_EMAIL,
      principalId: "local-development",
    };
  }

  return null;
}

export async function requireFunnelAdmin(returnTo: string) {
  const user = await getAzureUser();
  if (!user) {
    redirect(`/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(returnTo)}`);
  }
  if (!isAdminUser(user)) redirect("/");
  return user;
}

export async function isFunnelAdmin() {
  const user = await getAzureUser();
  if (!user) return false;
  return isAdminUser(user);
}

/** Admin only when BOTH the signed-in name and the Entra object ID match. */
function isAdminUser(user: AzureUser): boolean {
  const adminEmail = (process.env.FUNNEL_ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).toLowerCase();
  const adminOid = (process.env.FUNNEL_ADMIN_OID ?? DEFAULT_ADMIN_OID).toLowerCase();
  if (user.email.toLowerCase() !== adminEmail) return false;
  if (process.env.NODE_ENV !== "production" && user.principalId === "local-development") return true;
  return user.principalId.toLowerCase() === adminOid;
}
