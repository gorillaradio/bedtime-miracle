import { redirect } from "react-router";
import { createClient } from "~/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export interface AuthContext {
  user: User | null;
  headers: Headers;
}

/**
 * Get authenticated user from request
 * Use in loaders to check auth status
 */
export async function getAuthContext(request: Request): Promise<AuthContext> {
  const { supabase, headers } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, headers };
}

/**
 * Require authentication - redirect to sign-in if not authenticated
 * Use in protected route loaders
 */
export async function requireAuth(request: Request): Promise<{
  user: User;
  headers: Headers;
}> {
  const { user, headers } = await getAuthContext(request);

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    throw redirect(`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`, {
      headers,
    });
  }

  return { user, headers };
}

/**
 * Redirect if already authenticated
 * Use in auth pages (sign-in, sign-up) loaders
 */
export async function redirectIfAuthenticated(
  request: Request,
  redirectTo = "/dashboard"
): Promise<{ user: User | null; headers: Headers }> {
  const { user, headers } = await getAuthContext(request);

  if (user) {
    throw redirect(redirectTo, { headers });
  }

  return { user, headers };
}
