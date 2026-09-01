import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AzureUser = {
  displayName: string;
  email: string;
  principalId: string;
};

const DEFAULT_ADMIN_EMAIL = "daren@ginkgofinancial.com";

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
  const adminEmail = (process.env.FUNNEL_ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).toLowerCase();
  if (user.email.toLowerCase() !== adminEmail) redirect("/");
  return user;
}

export async function isFunnelAdmin() {
  const user = await getAzureUser();
  if (!user) return false;
  const adminEmail = (process.env.FUNNEL_ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).toLowerCase();
  return user.email.toLowerCase() === adminEmail;
}
