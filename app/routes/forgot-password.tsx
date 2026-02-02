import type { Route } from "./+types/forgot-password";
import { redirectIfAuthenticated } from "~/middleware/auth";
import { ForgotPasswordForm } from "~/components/auth/forgot-password-form";

export async function loader({ request }: Route.LoaderArgs) {
  await redirectIfAuthenticated(request);
  return null;
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Forgot Password" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  );
}
