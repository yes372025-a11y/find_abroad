import type { Metadata } from "next";
import { RegisterForm } from "~/components/forms/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Start your study abroad journey today.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
