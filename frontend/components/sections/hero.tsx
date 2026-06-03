"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0A0A0B",
        py: { xs: 12, md: 20 },
        minHeight: { xs: "auto", md: "85vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background elements */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Main gradient orb */}
        <Box
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,107,53,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Secondary accent */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "40%",
            height: "50%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,217,255,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1000, mx: "auto", px: { xs: 3, md: 6 }, textAlign: "center" }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.2)",
              borderRadius: "100px",
              px: 2.5,
              py: 1,
              mb: 5,
            }}
          >
            <Box sx={{ width: 5, height: 6, borderRadius: "50%", bgcolor: "#FF6B35", animation: "pulse 2s infinite" }} />
            <Typography sx={{ color: "#FF6B35", fontSize: 12, fontWeight: 600 }}>
              Trusted by 25,000+ students worldwide
            </Typography>
          </Box>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 44, sm: 56, md: 80 },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              mb: 3,
              color: "#FAFAFA",
            }}
          >
            Your Dream{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 50%, #00D9FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              University
            </Box>
            <br />
            Awaits Abroad
          </Typography>
        </motion.div>

        {/* Subheadline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Typography
            sx={{
              color: "#A1A1AA",
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
              mb: 6,
              lineHeight: 1.7,
              fontSize: { xs: 16, md: 19 },
            }}
          >
            Discover top universities, compare scholarships, check loan eligibility,
            and get expert guidance — all in one place.
          </Typography>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <Button
              component={Link}
              href="/consultation"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.8,
                fontSize: 16,
                background: "#FF6B35",
                color: "#0A0A0B",
                fontWeight: 600,
                boxShadow: "0 0 30px rgba(255,107,53,0.4)",
                "&:hover": {
                  background: "#FF8F66",
                  boxShadow: "0 0 40px rgba(255,107,53,0.5)",
                },
              }}
            >
              Book Free Consultation
            </Button>
            <Button
              component={Link}
              href="/universities"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.8,
                fontSize: 16,
                borderColor: "rgba(255,255,255,0.15)",
                color: "#FAFAFA",
                "&:hover": {
                  borderColor: "#FF6B35",
                  bgcolor: "rgba(255,107,53,0.08)",
                },
              }}
            >
              Explore Universities
            </Button>
          </Stack>
        </motion.div>

        {/* Partner universities */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <Box sx={{ mt: 14 }}>
            <Typography sx={{ color: "#52525B", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", mb: 4 }}>
              Students admitted to
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 5 }}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              {["Harvard", "Oxford", "MIT", "Toronto", "TU Munich", "Stanford"].map((uni, i) => (
                <motion.div
                  key={uni}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
                >
                  <Typography
                    sx={{
                      color: "#3F3F46",
                      fontWeight: 600,
                      fontSize: { xs: 13, md: 15 },
                      letterSpacing: "0.02em",
                    }}
                  >
                    {uni}
                  </Typography>
                </motion.div>
              ))}
            </Stack>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
