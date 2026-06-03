import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoginForm } from "~/components/forms/login-form";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
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
        Welcome back
      </Typography>
      <Typography 
        sx={{ color: "#71717A", mb: 4, fontSize: 14 }}
      >
        Sign in to your account
      </Typography>
      <LoginForm />
    </Box>
  );
}
