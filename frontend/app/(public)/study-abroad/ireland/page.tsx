import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { UniversityListClient } from "~/components/sections/university-list-client";

export const metadata: Metadata = { title: "Study in Ireland" };

const FACTS = [
  { label: "Avg Tuition", value: "EUR 10,000–25,000" },
            { label: "Visa Type", value: "Study Visa" },
            { label: "Intakes", value: "September and January" },
            { label: "Universities", value: "30+" },
];

const HIGHLIGHTS = [
  { text: "English-speaking EU country" },
                { text: "Stay-back option up to 2 years" },
                { text: "Hub for tech companies (Google, Meta)" },
                { text: "Vibrant student life" },
];

export default function StudyInIrelandPage() {
  return (
    <Box>
      <Box sx={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", py: { xs: 10, md: 14 }, px: { xs: 3, md: 6 }, color: "white" }}>
        <Box sx={{ maxWidth: 860, mx: "auto", textAlign: "center" }}>
          <Typography sx={{ fontSize: 64, mb: 2 }}>🇮🇪</Typography>
          <Typography variant="h3" fontWeight={900} mb={2}>Study in Ireland</Typography>
          <Typography sx={{ opacity: 0.85, fontSize: 18, mb: 5 }}>
            Explore 30+ universities with expert counselor support.
          </Typography>
          <Button
            component={Link}
            href="/consultation"
            variant="contained"
            sx={{ bgcolor: "white", color: "primary.dark", fontWeight: 700, px: 4, py: 1.5, "&:hover": { bgcolor: "#f0f9ff" } }}
          >
            Book Free Consultation
          </Button>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {FACTS.map((item) => (
              <Grid item xs={6} md={3} key={item.label}>
                <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", textAlign: "center" }}>
                  <CardContent>
                    <Typography fontWeight={700} sx={{ fontSize: { xs: 18, md: 22 } }}>{item.value}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{item.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", mb: 8 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} mb={3}>Why Study in Ireland?</Typography>
              <Grid container spacing={2}>
                {HIGHLIGHTS.map((item) => (
                  <Grid item xs={12} sm={6} key={item.text}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <CheckCircleIcon sx={{ fontSize: 20, color: "success.main" }} />
                      <Typography variant="body2">{item.text}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Typography variant="h5" fontWeight={700} mb={4}>Universities in Ireland</Typography>
          <UniversityListClient defaultCountry="ireland" />
        </Box>
      </Box>
    </Box>
  );
}
