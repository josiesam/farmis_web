// `app/register/page.tsx` - Server Component
import { redirect } from "next/navigation";
import { authProviderServer } from "@providers/auth-provider";
import RegisterAuthPage from "./RegisterAuthPage"; // Client Component for AuthPage

export default async function Register() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <RegisterAuthPage />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
