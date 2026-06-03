import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  { title: "Information We Collect", body: "We collect information you provide when creating an account, filling forms, or contacting us — including name, email, phone, and academic details." },
  { title: "How We Use Information", body: "We use your information to provide personalised recommendations, connect you with counselors, and improve our services. We do not sell your data." },
  { title: "Data Security", body: "We use industry-standard encryption and security measures to protect your personal information." },
  { title: "Cookies", body: "We use cookies to improve your experience and analyse usage. You can control cookie settings in your browser." },
  { title: "Contact Us", body: "For privacy-related questions, email privacy@findabroad.com." },
];

export default function PrivacyPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Privacy Policy</Typography>
        <Typography color="text.secondary" sx={{ mb: 6 }}>Last updated: June 2025</Typography>
        {sections.map((s) => (
          <Box key={s.title} sx={{ mb: 5 }}>
            <Typography variant="h6" fontWeight={700} mb={1.5}>{s.title}</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{s.body}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
