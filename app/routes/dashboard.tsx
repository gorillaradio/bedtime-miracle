import type { Route } from "./+types/dashboard";
import { requireAuth } from "~/middleware/auth";
import { UserMenu } from "~/components/auth/user-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import type { User } from "@supabase/supabase-js";

interface LoaderData {
  user: {
    id: string;
    email: string | undefined;
    user_metadata: User["user_metadata"];
  };
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await requireAuth(request);

  return Response.json(
    {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
      },
    } satisfies LoaderData,
    { headers }
  );
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Your dashboard" },
  ];
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData as LoaderData;
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <UserMenu user={user as User} />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {displayName}!</CardTitle>
            <CardDescription>
              You're now signed in. This is your protected dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">User ID:</span> {user.id}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
