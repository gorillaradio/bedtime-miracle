import type { Route } from "./+types/sign-in";
import { redirectIfAuthenticated } from "~/middleware/auth";
import { SignInForm } from "~/components/auth/sign-in-form";

export async function loader({ request }: Route.LoaderArgs) {
  await redirectIfAuthenticated(request);
  return null;
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}
