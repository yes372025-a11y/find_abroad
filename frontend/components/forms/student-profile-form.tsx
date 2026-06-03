"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/lib/api";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export function StudentProfileForm() {
  const [form, setForm] = useState({
    cgpa: "", work_experience_years: "", highest_qualification: "",
    undergraduate_university: "", undergraduate_field: "", graduation_year: "",
    family_income_annual: "", has_co_applicant: false, has_collateral: false,
    target_countries: "", target_programs: "", budget_usd: "",
    ielts_score: "", toefl_score: "", gre_score: "", gmat_score: "",
    intended_intake: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).filter(([_, v]) => v !== "" && v !== false)
      );
      await api.patch("/users/me/student-profile", payload);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Academic */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Academic Background</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="CGPA" type="number" fullWidth value={form.cgpa} onChange={set("cgpa")} placeholder="7.8" inputProps={{ min: 0, max: 10, step: 0.01 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Work Experience (yrs)" type="number" fullWidth value={form.work_experience_years} onChange={set("work_experience_years")} placeholder="2" inputProps={{ min: 0 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Graduation Year" type="number" fullWidth value={form.graduation_year} onChange={set("graduation_year")} placeholder="2023" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Highest Qualification</InputLabel>
                  <Select value={form.highest_qualification} label="Highest Qualification"
                    onChange={(e) => setForm((p) => ({ ...p, highest_qualification: e.target.value }))}
                    sx={{ borderRadius: 2.5 }}>
                    <MenuItem value=""><em>Select</em></MenuItem>
                    {["Bachelor", "Diploma", "12th Grade", "10th Grade"].map((q) => <MenuItem key={q} value={q}>{q}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Test Scores */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Test Scores (optional)</Typography>
            <Grid container spacing={2.5}>
              {[
                { id: "ielts_score", label: "IELTS Score" },
                { id: "toefl_score", label: "TOEFL Score" },
                { id: "gre_score", label: "GRE Score" },
                { id: "gmat_score", label: "GMAT Score" },
              ].map((f) => (
                <Grid item xs={12} sm={6} key={f.id}>
                  <TextField label={f.label} type="number" fullWidth value={(form as any)[f.id]} onChange={set(f.id)} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Study Preferences */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Study Preferences</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField label="Target Countries" fullWidth value={form.target_countries} onChange={set("target_countries")} placeholder="USA, UK, Canada" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Budget (USD/year)" type="number" fullWidth value={form.budget_usd} onChange={set("budget_usd")} placeholder="40000" inputProps={{ min: 0 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Intended Intake</InputLabel>
                  <Select value={form.intended_intake} label="Intended Intake"
                    onChange={(e) => setForm((p) => ({ ...p, intended_intake: e.target.value }))}
                    sx={{ borderRadius: 2.5 }}>
                    <MenuItem value=""><em>Select</em></MenuItem>
                    {["Fall 2025", "Spring 2026", "Fall 2026"].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={3} sx={{ mt: 2.5 }}>
              <FormControlLabel
                control={<Checkbox checked={form.has_co_applicant} onChange={set("has_co_applicant")} color="primary" />}
                label="I have a co-applicant"
              />
              <FormControlLabel
                control={<Checkbox checked={form.has_collateral} onChange={set("has_collateral")} color="primary" />}
                label="I have collateral"
              />
            </Stack>
          </CardContent>
        </Card>

        <Box>
          <Button
            type="submit" variant="contained" size="large" disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{ px: 5, py: 1.5 }}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
