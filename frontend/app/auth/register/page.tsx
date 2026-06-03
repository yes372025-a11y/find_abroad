import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RegisterForm } from "~/components/forms/register-form";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <Box
      sx={{
        bgcolor: "#141416",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 4,
        p: { xs: 4, sm: 5 },
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ fontWeight: 700, mb: 0.5, color: "#FAFAFA" }}
      >
        Create your account
      </Typography>
      <Typography 
        sx={{ color: "#71717A", mb: 4, fontSize: 14 }}
      >
        Start your study abroad journey today
      </Typography>
      <RegisterForm />
    </Box>
  );
}
