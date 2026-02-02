import type { Route } from "./+types/sign-up";
import { redirectIfAuthenticated } from "~/middleware/auth";
import { SignUpForm } from "~/components/auth/sign-up-form";

export async function loader({ request }: Route.LoaderArgs) {
  await redirectIfAuthenticated(request);
  return null;
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignUpForm />
    </div>
  );
}
