"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  { 
    name: "Priya Sharma", 
    university: "University of Toronto", 
    country: "Canada", 
    text: "Find Abroad made the entire process seamless. From shortlisting universities to getting my study permit — their team was with me every step.",
    accent: "#FF6B35",
  },
  { 
    name: "Rahul Menon", 
    university: "TU Munich", 
    country: "Germany", 
    text: "I had no idea I could get a fully-funded scholarship for my MS in Germany. The scholarship explorer on Find Abroad changed my life.",
    accent: "#00D9FF",
  },
  { 
    name: "Ananya Patel", 
    university: "University College London", 
    country: "UK", 
    text: "The loan eligibility checker was incredibly accurate. I got approved for the exact amount they predicted. Brilliant tool!",
    accent: "#10B981",
  },
];

export function TestimonialsSection() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 12, md: 18 }, 
        px: { xs: 3, md: 6 }, 
        bgcolor: "#0D0D0E",
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
              Testimonials
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
              Students Love Find Abroad
            </Typography>
            <Typography 
              sx={{ 
                fontSize: { xs: 16, md: 18 },
                color: "#71717A",
              }}
            >
              Real stories from students who achieved their dreams.
            </Typography>
          </motion.div>
        </Box>

        {/* Testimonials Grid */}
        <Grid container spacing={3}>
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={t.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: 4,
                    bgcolor: "#141416",
                    border: "1px solid rgba(255,255,255,0.04)",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#1A1A1C",
                      border: `1px solid ${t.accent}20`,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Quote icon */}
                  <FormatQuoteIcon 
                    sx={{ 
                      fontSize: 32, 
                      color: t.accent, 
                      opacity: 0.5,
                      mb: 2,
                    }} 
                  />

                  {/* Quote text */}
                  <Typography 
                    sx={{ 
                      color: "#A1A1AA", 
                      lineHeight: 1.8, 
                      mb: 4, 
                      fontSize: 15,
                    }}
                  >
                    {t.text}
                  </Typography>

                  {/* Author */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${t.accent} 0%, ${t.accent}99 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#0A0A0B" }}>
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: "#FAFAFA", fontSize: 14 }}>
                        {t.name}
                      </Typography>
                      <Typography sx={{ color: "#52525B", fontSize: 12 }}>
                        {t.university} / {t.country}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
