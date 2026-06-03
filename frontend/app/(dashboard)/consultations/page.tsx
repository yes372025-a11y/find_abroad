import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export const metadata: Metadata = { title: "My Consultations" };

export default function ConsultationsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={4}>My Consultations</Typography>
      <Alert severity="info" sx={{ borderRadius: 2.5 }}>
        Your consultation sessions will appear here. Book a consultation to get started.
      </Alert>
    </Box>
  );
}
