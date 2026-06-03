import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactForm } from "~/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Contact Us</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Have a question? We'd love to hear from you.
        </Typography>
        <ContactForm />
      </Box>
    </Box>
  );
}
