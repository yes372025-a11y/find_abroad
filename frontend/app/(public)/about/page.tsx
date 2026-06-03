import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const metadata: Metadata = { title: "About Us" };

const values = [
  { title: "Student-First", desc: "Every decision we make starts with how it benefits the student." },
  { title: "Transparency", desc: "No hidden fees, no surprises. We tell you exactly what to expect." },
  { title: "Expertise", desc: "Our counselors have helped thousands of students reach top universities worldwide." },
];

export default function AboutPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>About Find Abroad</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, maxWidth: 640, mb: 8, lineHeight: 1.7 }}>
          Find Abroad was founded to make international education accessible to every ambitious student,
          regardless of their background. We connect aspiring students with the right university, scholarship,
          and loan — all in one place.
        </Typography>

        <Typography variant="h5" fontWeight={700} mb={4}>Our Values</Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {values.map((v) => (
            <Grid item xs={12} md={4} key={v.title}>
              <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Typography variant="h6" fontWeight={700} mb={1.5}>{v.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{v.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" fontWeight={700} mb={2.5}>Our Story</Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
          Founded in 2020, Find Abroad has helped over 25,000 students secure admissions and funding at
          universities across the USA, UK, Canada, Australia, Germany, and Ireland. Our team of 50+
          certified counselors brings first-hand experience of studying abroad.
        </Typography>
      </Box>
    </Box>
  );
}
