import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ScholarshipListClient } from "~/components/sections/scholarship-list-client";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Find scholarships for studying abroad.",
};

export default function ScholarshipsPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={2}>Scholarships</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Discover fully-funded and partial scholarships for your study abroad journey.
        </Typography>
        <ScholarshipListClient />
      </Box>
    </Box>
  );
}
