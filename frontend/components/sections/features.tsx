"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalculateIcon from "@mui/icons-material/Calculate";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PsychologyIcon from "@mui/icons-material/Psychology";

const features = [
  { icon: SchoolIcon, title: "University Explorer", desc: "Browse 500+ universities with rankings, tuition, and intake information." },
  { icon: AutoStoriesIcon, title: "Scholarship Finder", desc: "Discover fully-funded and partial scholarships matched to your profile." },
  { icon: CalculateIcon, title: "Loan Eligibility Checker", desc: "Instantly assess your eligibility and compare lenders side-by-side." },
  { icon: ChatIcon, title: "Expert Consultations", desc: "Book free 1:1 sessions with certified study abroad counselors." },
  { icon: AssignmentIcon, title: "Application Tracker", desc: "Track every step of your application from shortlisting to visa." },
  { icon: PsychologyIcon, title: "AI Recommendations", desc: "Get personalized university picks powered by AI based on your profile." },
];

export function FeaturesSection() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 2 }}>
            Everything You Need to Study Abroad
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, maxWidth: 600, mx: "auto" }}>
            From first research to visa approval — we support every step of your international education journey.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feat, i) => (
            <Grid item xs={12} sm={6} lg={4} key={feat.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ height: "100%" }}
              >
                <Card sx={{ height: "100%", transition: "box-shadow 0.2s", "&:hover": { boxShadow: 3, transform: "translateY(-2px)" } }}>
                  <CardContent sx={{ p: 3.5 }}>
                    <Box sx={{ mb: 2.5, display: "inline-flex", p: 1.5, borderRadius: 3, bgcolor: "primary.main", color: "white" }}>
                      <feat.icon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>{feat.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{feat.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
