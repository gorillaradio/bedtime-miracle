import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("auth/callback", "routes/auth.callback.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
