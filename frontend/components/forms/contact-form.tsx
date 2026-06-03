"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { leadsApi } from "~/lib/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function ContactForm() {
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", message: "", target_country: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadsApi.capture({ ...form, source: "contact_form" });
      toast.success("Message sent! We\'ll get back to you within 24 hours.");
      setForm({ full_name: "", email: "", phone: "", message: "", target_country: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField label="Full Name" type="text" required fullWidth value={form.full_name} onChange={set("full_name")} placeholder="Jane Smith" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" required fullWidth value={form.email} onChange={set("email")} placeholder="you@example.com" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone (optional)" type="tel" fullWidth value={form.phone} onChange={set("phone")} placeholder="+1 234 567 8900" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Target Country</InputLabel>
                  <Select
                    value={form.target_country}
                    label="Target Country"
                    onChange={(e) => setForm((p) => ({ ...p, target_country: e.target.value }))}
                    sx={{ borderRadius: 2.5 }}
                  >
                    <MenuItem value=""><em>Select a country</em></MenuItem>
                    {["USA", "UK", "Canada", "Australia", "Germany", "Ireland"].map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message" required fullWidth multiline rows={4}
                  value={form.message} onChange={set("message")}
                  placeholder="Tell us about your study abroad goals..."
                />
              </Grid>
            </Grid>
            <Button
              type="submit" variant="contained" fullWidth size="large" disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
              sx={{ py: 1.5 }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
