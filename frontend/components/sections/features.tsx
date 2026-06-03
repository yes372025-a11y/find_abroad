"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalculateIcon from "@mui/icons-material/Calculate";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PsychologyIcon from "@mui/icons-material/Psychology";

const features = [
  { icon: SchoolIcon, title: "University Explorer", desc: "Browse 500+ universities with rankings, tuition, and intake information.", accent: "#FF6B35" },
  { icon: AutoStoriesIcon, title: "Scholarship Finder", desc: "Discover fully-funded and partial scholarships matched to your profile.", accent: "#00D9FF" },
  { icon: CalculateIcon, title: "Loan Eligibility Checker", desc: "Instantly assess your eligibility and compare lenders side-by-side.", accent: "#10B981" },
  { icon: ChatIcon, title: "Expert Consultations", desc: "Book free 1:1 sessions with certified study abroad counselors.", accent: "#FF6B35" },
  { icon: AssignmentIcon, title: "Application Tracker", desc: "Track every step of your application from shortlisting to visa.", accent: "#00D9FF" },
  { icon: PsychologyIcon, title: "AI Recommendations", desc: "Get personalized university picks powered by AI based on your profile.", accent: "#10B981" },
];

export function FeaturesSection() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 12, md: 18 }, 
        px: { xs: 3, md: 6 },
        bgcolor: "#0A0A0B",
        position: "relative",
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              sx={{ 
                color: "#FF6B35", 
                fontSize: 13, 
                fontWeight: 600, 
                textTransform: "uppercase", 
                letterSpacing: "0.1em",
                mb: 2,
              }}
            >
              Features
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: 32, md: 48 }, 
                mb: 2,
                color: "#FAFAFA",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Everything You Need to
              <br />
              <Box component="span" sx={{ color: "#A1A1AA" }}>Study Abroad</Box>
            </Typography>
            <Typography 
              sx={{ 
                fontSize: { xs: 16, md: 18 }, 
                maxWidth: 550, 
                mx: "auto",
                color: "#71717A",
                lineHeight: 1.7,
              }}
            >
              From first research to visa approval — we support every step of your international education journey.
            </Typography>
          </motion.div>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feat, i) => (
            <Grid item xs={12} sm={6} lg={4} key={feat.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: 4,
                    bgcolor: "#141416",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "#1A1A1C",
                      border: `1px solid ${feat.accent}20`,
                      transform: "translateY(-4px)",
                      "& .feature-icon": {
                        boxShadow: `0 0 30px ${feat.accent}40`,
                      },
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      mb: 3,
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: 2.5,
                      bgcolor: `${feat.accent}15`,
                      color: feat.accent,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <feat.icon sx={{ fontSize: 26 }} />
                  </Box>

                  {/* Content */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 1.5, 
                      fontWeight: 600, 
                      color: "#FAFAFA",
                      fontSize: 18,
                    }}
                  >
                    {feat.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.7, 
                      color: "#71717A",
                      fontSize: 14,
                    }}
                  >
                    {feat.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
