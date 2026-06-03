import type { Metadata } from "next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="h5" fontWeight={700} mb={0.5}>Reset your password</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Enter your email and we'll send you a reset link.
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Email" type="email" required fullWidth placeholder="you@example.com"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
          />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5 }}>
            Send Reset Link
          </Button>
          <Typography variant="body2" align="center" color="text.secondary">
            Remember your password?{" "}
            <Box component={Link} href="/auth/login" sx={{ color: "primary.main", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
              Sign in
            </Box>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
