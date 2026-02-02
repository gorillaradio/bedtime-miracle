# Stack Tecnico

## Framework & Runtime
- **React Router v7** (SSR mode) - fullstack framework
- **React 19** - UI library
- **Vite 7** - build tool
- **TypeScript** - type safety

## Backend & Auth
- **Supabase** - database PostgreSQL + auth
  - Project ID: `hudfnrboivzfhnpowwbt`
  - Region: `eu-west-1`
- **Auth providers**: Email/password, Google OAuth
- **@supabase/ssr** - cookie-based session management

## UI
- **Tailwind CSS v4** - styling
- **shadcn/ui** (new-york style) - component library
- **Lucide React** - icons

## Forms & Validation
- **React Hook Form** - form state
- **Zod** - schema validation

## Database Schema (public)

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (links to auth.users via id) |
| `recipes` | Story templates with prompt, form schema, AI settings |
| `stories` | Generated stories with content, inputs, ratings |
| `generation_limits` | Daily limits per user (default: 2/day) |
| `recipe_favorites` | User's favorite recipes |
| `recipe_ratings` | User ratings on recipes |

### Key Relations
- `profiles.id` → `auth.users.id` (1:1)
- `recipes.creator_id` → `profiles.id`
- `recipes.parent_recipe_id` → `recipes.id` (fork chain)
- `stories.user_id` → `profiles.id`
- `stories.recipe_id` → `recipes.id`

### RLS
All public tables have Row Level Security enabled.

## Project Structure
```
app/
├── routes/           # Route components (loaders/actions)
├── components/
│   ├── ui/          # shadcn/ui components
│   └── auth/        # Auth forms
├── lib/
│   ├── supabase/    # server.ts (SSR), client.ts (browser)
│   └── utils.ts     # cn() helper
└── middleware/
    └── auth.ts      # requireAuth, getAuthContext, redirectIfAuthenticated
```

## Path Alias
`~/` → `app/`

## Environment Variables
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Commands
```bash
npm run dev        # Dev server (localhost:5173)
npm run build      # Production build
npm run start      # Run production
npm run typecheck  # Type check
```
