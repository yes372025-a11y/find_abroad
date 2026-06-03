import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UniversityListClient } from "~/components/sections/university-list-client";

export const metadata: Metadata = {
  title: "Explore Universities",
  description: "Browse and compare top universities worldwide.",
};

export default function UniversitiesPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={2}>Explore Universities</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Compare rankings, tuition, and requirements at 500+ institutions.
        </Typography>
        <UniversityListClient />
      </Box>
    </Box>
  );
}
