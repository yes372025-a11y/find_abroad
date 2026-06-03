import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ApplicationTrackerClient } from "~/components/sections/application-tracker-client";

export const metadata: Metadata = { title: "My Applications" };

export default function ApplicationsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={4}>My Applications</Typography>
      <ApplicationTrackerClient />
    </Box>
  );
}
