import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ConsultationBookingForm } from "~/components/forms/consultation-booking-form";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Book a free consultation with our study abroad experts.",
};

export default function ConsultationPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Book a Free Consultation</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Our expert counselors are ready to guide your study abroad journey.
        </Typography>
        <ConsultationBookingForm />
      </Box>
    </Box>
  );
}
