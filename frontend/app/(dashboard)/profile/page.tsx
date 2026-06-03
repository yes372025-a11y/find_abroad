import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StudentProfileForm } from "~/components/forms/student-profile-form";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={4}>My Profile</Typography>
      <StudentProfileForm />
    </Box>
  );
}
