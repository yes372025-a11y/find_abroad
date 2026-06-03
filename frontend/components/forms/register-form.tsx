"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { authApi } from "~/lib/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function RegisterForm() {
  const [data, setData] = useState({ email: "", full_name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(data);
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      <Toaster position="top-right" />
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Full Name" type="text" required fullWidth
          value={data.full_name} onChange={set("full_name")}
          inputProps={{ minLength: 2 }} placeholder="Jane Smith"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
        />
        <TextField
          label="Email" type="email" required fullWidth
          value={data.email} onChange={set("email")}
          placeholder="you@example.com"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          fullWidth
          value={data.password} onChange={set("password")}
          inputProps={{ minLength: 8 }} placeholder="At least 8 characters"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
        />
        <Button
          type="submit" variant="contained" fullWidth size="large" disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ py: 1.5, mt: 0.5 }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account?{" "}
          <Box component={Link} href="/auth/login" sx={{ color: "primary.main", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
            Sign in
          </Box>
        </Typography>
      </Box>
    </>
  );
}
