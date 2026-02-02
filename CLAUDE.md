# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

**I gestisco i server manualmente.** Non avviare `npm run dev` o `npm run start` direttamente - dimmi quando devo avviarli/stopparli e lo faccio io.

## Commands

```bash
npm run dev        # Start dev server with HMR (localhost:5173)
npm run build      # Production build
npm run start      # Run production build (react-router-serve)
npm run typecheck  # Generate route types and run TypeScript check
```

## Architecture

This is a React Router v7 full-stack application with SSR enabled, using Supabase for authentication and database.

### Tech Stack
- **Framework:** React Router v7 (SSR mode) + React 19
- **Auth/DB:** Supabase (@supabase/ssr for cookie-based sessions)
- **UI:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Forms:** React Hook Form + Zod validation
- **Build:** Vite 7

### Key Directories
- `app/routes/` - Route components with loaders/actions
- `app/components/ui/` - shadcn/ui components
- `app/components/auth/` - Auth forms (SignIn, SignUp, ForgotPassword, UserMenu)
- `app/lib/supabase/` - Supabase clients (server.ts for SSR, client.ts for browser)
- `app/middleware/auth.ts` - Auth helpers

### Path Aliases
Use `~/` to reference the `app/` directory:
- `~/components`, `~/lib/utils`, `~/middleware/auth`

### Authentication Pattern

**Server-side (in route loaders):**
```typescript
import { requireAuth, getAuthContext, redirectIfAuthenticated } from "~/middleware/auth";

// Protected route - redirects to /sign-in if not authenticated
export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await requireAuth(request);
  return Response.json({ user }, { headers });
}

// Auth pages - redirects to /dashboard if already authenticated
export async function loader({ request }: Route.LoaderArgs) {
  await redirectIfAuthenticated(request);
  return null;
}
```

**Browser-side:**
```typescript
import { createClient } from "~/lib/supabase/client";
const supabase = createClient();
```

### Environment Variables
```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Routes

| Path | File | Protection |
|------|------|------------|
| `/` | routes/home.tsx | Public |
| `/sign-in` | routes/sign-in.tsx | Redirects if authenticated |
| `/sign-up` | routes/sign-up.tsx | Redirects if authenticated |
| `/forgot-password` | routes/forgot-password.tsx | Redirects if authenticated |
| `/auth/callback` | routes/auth.callback.tsx | OAuth/magic link handler |
| `/dashboard` | routes/dashboard.tsx | Requires authentication |
