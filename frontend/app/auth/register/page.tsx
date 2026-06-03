import type { Metadata } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RegisterForm } from "~/components/forms/register-form";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="h5" fontWeight={700} mb={0.5}>Create your account</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Start your study abroad journey today</Typography>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
