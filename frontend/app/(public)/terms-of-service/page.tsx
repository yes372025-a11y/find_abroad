import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  { title: "Acceptance of Terms", body: "By accessing Find Abroad, you agree to these terms. If you do not agree, please do not use the service." },
  { title: "Use of Service", body: "You may use Find Abroad for lawful purposes only. You must not misuse, disrupt, or attempt to gain unauthorised access to the service." },
  { title: "Account Responsibility", body: "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account." },
  { title: "Intellectual Property", body: "All content on Find Abroad — including text, logos, and software — is owned by or licensed to Find Abroad and protected by copyright law." },
  { title: "Limitation of Liability", body: "Find Abroad provides information for guidance only and is not liable for decisions made based on this information." },
  { title: "Changes to Terms", body: "We may update these terms at any time. Continued use of the service after changes constitutes acceptance." },
];

export default function TermsPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Terms of Service</Typography>
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
