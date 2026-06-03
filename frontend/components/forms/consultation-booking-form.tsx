"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { leadsApi } from "~/lib/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function ConsultationBookingForm() {
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    target_country: "", target_program: "", message: "",
    preferred_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadsApi.capture({ ...form, source: "consultation" });
      setSubmitted(true);
      toast.success("Consultation booked! Check your email for confirmation.");
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent sx={{ p: 6, textAlign: "center" }}>
          <Box sx={{ width: 72, height: 72, bgcolor: "success.main", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} mb={1.5}>You&apos;re all set!</Typography>
          <Typography color="text.secondary">Our counselor will reach out within 24 hours to confirm your slot.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField label="Full Name" required fullWidth value={form.full_name} onChange={set("full_name")} placeholder="Jane Smith" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" required fullWidth value={form.email} onChange={set("email")} placeholder="you@example.com" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone" type="tel" fullWidth value={form.phone} onChange={set("phone")} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Target Country</InputLabel>
                  <Select value={form.target_country} label="Target Country"
                    onChange={(e) => setForm((p) => ({ ...p, target_country: e.target.value }))}
                    sx={{ borderRadius: 2.5 }}>
                    <MenuItem value=""><em>Select a country</em></MenuItem>
                    {["USA", "UK", "Canada", "Australia", "Germany", "Ireland"].map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Preferred Program" fullWidth value={form.target_program} onChange={set("target_program")} placeholder="e.g. MS Computer Science, MBA" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Anything else?" multiline rows={3} fullWidth value={form.message} onChange={set("message")} placeholder="Share your goals, timeline, or questions..." />
              </Grid>
            </Grid>
            <Button
              type="submit" variant="contained" fullWidth size="large" disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              sx={{ py: 1.6 }}
            >
              {loading ? "Booking..." : "Book Free Consultation"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
