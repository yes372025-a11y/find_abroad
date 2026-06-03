import type { Metadata } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LoginForm } from "~/components/forms/login-form";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="h5" fontWeight={700} mb={0.5}>Welcome back</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Sign in to your account</Typography>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
