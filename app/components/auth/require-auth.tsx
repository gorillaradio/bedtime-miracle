import { Navigate, useLocation } from "react-router";
import type { User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

interface RequireAuthProps {
  user: User | null;
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Client-side auth wrapper component.
 * Use this to protect routes that need authentication.
 *
 * Note: For better UX and security, prefer using the server-side
 * requireAuth function in your route loader instead.
 */
export function RequireAuth({
  user,
  children,
  redirectTo = "/sign-in",
}: RequireAuthProps) {
  const location = useLocation();

  if (!user) {
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", location.pathname + location.search);
    return <Navigate to={`${redirectTo}?${searchParams.toString()}`} replace />;
  }

  return <>{children}</>;
}
