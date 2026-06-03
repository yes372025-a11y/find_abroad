"use client";

import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "~/lib/api";
import { formatDate } from "~/lib/utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/HourglassTop";
import CancelIcon from "@mui/icons-material/Cancel";

const STATUS_STEPS = [
  "lead", "consultation", "university_shortlisted",
  "applied", "offer_received", "visa_processing", "completed",
];

const STATUS_LABELS: Record<string, string> = {
  lead: "Lead",
  consultation: "Consultation",
  university_shortlisted: "Shortlisted",
  applied: "Applied",
  offer_received: "Offer Received",
  visa_processing: "Visa Processing",
  completed: "Completed",
  rejected: "Rejected",
};

function StatusChip({ status }: { status: string }) {
  if (status === "completed") return <Chip icon={<CheckCircleIcon />} label="Completed" color="success" size="small" />;
  if (status === "rejected") return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
  return <Chip icon={<PendingIcon />} label={STATUS_LABELS[status] ?? status} color="primary" size="small" variant="outlined" />;
}

export function ApplicationTrackerClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsApi.my().then((r) => r.data),
  });

  if (isLoading) {
    return (
      <Stack spacing={2}>
        {[1, 2, 3].map((i) => <Skeleton key={i} variant="rounded" height={140} sx={{ borderRadius: 4 }} />)}
      </Stack>
    );
  }

  if (isError) return <Alert severity="error" sx={{ borderRadius: 2.5 }}>Failed to load applications.</Alert>;

  const apps = data?.items ?? [];

  if (apps.length === 0) {
    return (
      <Alert severity="info" sx={{ borderRadius: 2.5 }}>
        No applications yet. Start by exploring universities and booking a consultation.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {apps.map((app: any) => {
        const stepIndex = STATUS_STEPS.indexOf(app.status);
        return (
          <Card key={app.id}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5, flexWrap: "wrap", gap: 1 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>{app.university_name ?? "University"}</Typography>
                  <Typography variant="body2" color="text.secondary">{app.program ?? "Program"}</Typography>
                </Box>
                <StatusChip status={app.status} />
              </Box>

              {app.status !== "rejected" && stepIndex >= 0 && (
                <Box sx={{ mt: 2 }}>
                  <Stepper activeStep={stepIndex} alternativeLabel sx={{ "& .MuiStepLabel-label": { fontSize: 11 } }}>
                    {STATUS_STEPS.map((s) => (
                      <Step key={s} completed={STATUS_STEPS.indexOf(s) <= stepIndex}>
                        <StepLabel>{STATUS_LABELS[s]}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}

              {app.updated_at && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="caption" color="text.secondary">Last updated: {formatDate(app.updated_at)}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
