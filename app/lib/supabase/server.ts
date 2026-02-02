import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export function createClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
          return cookies
            .filter((cookie): cookie is { name: string; value: string } =>
              cookie.value !== undefined
            );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              `${name}=${value}; Path=${options?.path ?? "/"}; HttpOnly; SameSite=Lax${options?.maxAge ? `; Max-Age=${options.maxAge}` : ""}${options?.secure ? "; Secure" : ""}`
            );
          });
        },
      },
    }
  );

  return { supabase, headers };
}
