import { redirect } from "react-router";
import type { Route } from "./+types/auth.callback";
import { createClient } from "~/lib/supabase/server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (code) {
    const { supabase, headers } = createClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // If there's an error or no code, redirect to sign-in
  return redirect("/sign-in");
}

export default function AuthCallback() {
  // This component should never render as the loader always redirects
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Authenticating...</p>
    </div>
  );
}
