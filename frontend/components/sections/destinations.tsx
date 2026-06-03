"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const destinations = [
  { name: "USA", universities: "180+", slug: "usa", gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)" },
  { name: "UK", universities: "130+", slug: "uk", gradient: "linear-gradient(135deg, #00D9FF 0%, #00A3CC 100%)" },
  { name: "Canada", universities: "60+", slug: "canada", gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)" },
  { name: "Australia", universities: "45+", slug: "australia", gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)" },
  { name: "Germany", universities: "80+", slug: "germany", gradient: "linear-gradient(135deg, #00D9FF 0%, #00A3CC 100%)" },
  { name: "Ireland", universities: "30+", slug: "ireland", gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)" },
];

export function DestinationsSection() {
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
      {/* Background accent */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 1280, mx: "auto", position: "relative" }}>
        {/* Header */}
        <Box sx={{ mb: 8 }}>
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
              Destinations
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
              Top Study Destinations
            </Typography>
            <Typography 
              sx={{ 
                fontSize: { xs: 16, md: 18 },
                color: "#71717A",
                maxWidth: 500,
              }}
            >
              Choose your destination and explore universities that fit your goals.
            </Typography>
          </motion.div>
        </Box>

        {/* Destinations Grid */}
        <Grid container spacing={2}>
          {destinations.map((dest, i) => (
            <Grid item xs={6} sm={4} md={2} key={dest.slug}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Box
                  component={Link}
                  href={`/study-abroad/${dest.slug}`}
                  sx={{
                    display: "block",
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "#141416",
                    border: "1px solid rgba(255,255,255,0.04)",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      bgcolor: "#1A1A1C",
                      border: "1px solid rgba(255,107,53,0.2)",
                      "& .dest-arrow": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                      "& .dest-number": {
                        background: dest.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      },
                    },
                  }}
                >
                  {/* Country initial with gradient */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: dest.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      boxShadow: `0 8px 24px ${dest.gradient.includes("FF6B35") ? "rgba(255,107,53,0.25)" : dest.gradient.includes("00D9FF") ? "rgba(0,217,255,0.25)" : "rgba(16,185,129,0.25)"}`,
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: 24, color: "#0A0A0B" }}>
                      {dest.name.charAt(0)}
                    </Typography>
                  </Box>

                  <Typography 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 0.5, 
                      color: "#FAFAFA",
                      fontSize: 15,
                    }}
                  >
                    {dest.name}
                  </Typography>
                  <Typography 
                    className="dest-number"
                    sx={{ 
                      fontSize: 13, 
                      color: "#71717A",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {dest.universities} universities
                  </Typography>

                  {/* Arrow indicator */}
                  <Box
                    className="dest-arrow"
                    sx={{
                      mt: 2,
                      opacity: 0,
                      transform: "translateX(-8px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 16, color: "#FF6B35" }} />
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
