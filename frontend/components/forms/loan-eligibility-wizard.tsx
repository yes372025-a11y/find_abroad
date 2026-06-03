"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { lendersApi } from "~/lib/api";
import { formatCurrency } from "~/lib/utils";
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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const stepLabels = ["Destination", "Academics", "Financial", "Contact"];

const initialData = {
  target_country: "", target_course: "", target_university: "",
  cgpa: "", work_experience_years: "",
  family_income_usd: "", has_co_applicant: false, has_collateral: false,
  collateral_value_usd: "",
  email: "", full_name: "", phone: "",
};

export function LoanEligibilityWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        cgpa: data.cgpa ? Number(data.cgpa) : undefined,
        work_experience_years: data.work_experience_years ? Number(data.work_experience_years) : undefined,
        family_income_usd: data.family_income_usd ? Number(data.family_income_usd) : undefined,
        collateral_value_usd: data.collateral_value_usd ? Number(data.collateral_value_usd) : undefined,
      };
      const res = await lendersApi.assess(payload);
      setResult(res.data);
    } catch {
      toast.error("Assessment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 36, color: "success.main" }} />
            <Typography variant="h5" fontWeight={700}>Your Loan Assessment</Typography>
          </Box>
          <Alert severity="success" sx={{ borderRadius: 3, mb: 3, "& .MuiAlert-message": { width: "100%" } }}>
            <Typography variant="h4" color="primary.main" fontWeight={800}>
              {formatCurrency(result.estimated_eligibility_amount ?? 0)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>{result.assessment_result?.recommendation}</Typography>
          </Alert>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {result.eligible_lender_ids?.length ?? 0} lenders matched your profile
          </Typography>
          <Button variant="text" onClick={() => { setResult(null); setStep(0); setData(initialData); }}>
            Start over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Stepper */}
          <Box sx={{ px: 3, pt: 3, pb: 2 }}>
            <Stepper activeStep={step} alternativeLabel>
              {stepLabels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Divider />

          {/* Step content */}
          <Box sx={{ p: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                {step === 0 && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Where do you want to study?</Typography>
                    <FormControl fullWidth size="small">
                      <InputLabel>Target Country</InputLabel>
                      <Select value={data.target_country} label="Target Country"
                        onChange={(e) => setData((p) => ({ ...p, target_country: e.target.value }))}
                        sx={{ borderRadius: 2.5 }}>
                        <MenuItem value=""><em>Select a country</em></MenuItem>
                        {["USA","UK","Canada","Australia","Germany","Ireland"].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <TextField label="Course / Program" value={data.target_course} onChange={setField("target_course")} placeholder="e.g. MS Computer Science" fullWidth />
                    <TextField label="University (optional)" value={data.target_university} onChange={setField("target_university")} placeholder="e.g. University of Toronto" fullWidth />
                  </Box>
                )}

                {step === 1 && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Tell us about your academics</Typography>
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField label="CGPA (0–10)" type="number" fullWidth value={data.cgpa} onChange={setField("cgpa")} placeholder="e.g. 7.8" inputProps={{ min: 0, max: 10, step: 0.01 }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Work Experience (years)" type="number" fullWidth value={data.work_experience_years} onChange={setField("work_experience_years")} placeholder="e.g. 2" inputProps={{ min: 0 }} />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {step === 2 && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Financial background</Typography>
                    <TextField label="Annual Family Income (USD)" type="number" fullWidth value={data.family_income_usd} onChange={setField("family_income_usd")} placeholder="e.g. 30000" inputProps={{ min: 0 }} />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      <FormControlLabel control={<Checkbox checked={data.has_co_applicant} onChange={setField("has_co_applicant")} color="primary" />} label="I have a co-applicant" />
                      <FormControlLabel control={<Checkbox checked={data.has_collateral} onChange={setField("has_collateral")} color="primary" />} label="I have collateral" />
                    </Box>
                    {data.has_collateral && (
                      <TextField label="Collateral Value (USD)" type="number" fullWidth value={data.collateral_value_usd} onChange={setField("collateral_value_usd")} inputProps={{ min: 0 }} />
                    )}
                  </Box>
                )}

                {step === 3 && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Almost there — your contact details</Typography>
                    <TextField label="Full Name" required fullWidth value={data.full_name} onChange={setField("full_name")} placeholder="Jane Smith" />
                    <TextField label="Email" type="email" required fullWidth value={data.email} onChange={setField("email")} placeholder="you@example.com" />
                    <TextField label="Phone (optional)" type="tel" fullWidth value={data.phone} onChange={setField("phone")} />
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </Box>

          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", px: 4, py: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              sx={{ borderRadius: 99 }}
            >
              Back
            </Button>
            {step < stepLabels.length - 1 ? (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => setStep((s) => s + 1)}
                sx={{ borderRadius: 99 }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                onClick={handleSubmit}
                disabled={loading || !data.email || !data.full_name}
                sx={{ borderRadius: 99 }}
              >
                {loading ? "Checking..." : "Check Eligibility"}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
