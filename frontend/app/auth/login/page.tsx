import type { Metadata } from "next";
import { LoginForm } from "~/components/forms/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Find Abroad account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
