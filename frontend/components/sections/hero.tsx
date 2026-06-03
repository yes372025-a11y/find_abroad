"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #eff6ff 0%, #f9fafb 40%, #f9fafb 100%)",
        py: { xs: 12, md: 18 },
      }}
    >
      {/* Background blobs */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: -160, right: -160, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(147,197,253,0.3) 0%, transparent 70%)" }} />
        <Box sx={{ position: "absolute", top: 80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,219,254,0.35) 0%, transparent 70%)" }} />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 900, mx: "auto", px: { xs: 3, md: 6 }, textAlign: "center" }}>
        {/* Trust badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Chip
            icon={<StarIcon sx={{ fontSize: "14px !important", color: "#2563eb !important" }} />}
            label="Trusted by 25,000+ students worldwide"
            sx={{ bgcolor: "#dbeafe", color: "primary.main", fontWeight: 600, fontSize: 13, mb: 4, px: 1, height: 34 }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 40, md: 68 }, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", mb: 3, color: "#0f172a" }}
          >
            Your Dream University{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Abroad
            </Box>{" "}
            Awaits
          </Typography>
        </motion.div>

        {/* Sub */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: "auto", mb: 6, lineHeight: 1.6, fontSize: { xs: 17, md: 20 } }}>
            Discover top universities, compare scholarships, check loan eligibility, and get expert guidance — all in one place.
          </Typography>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <Button
              component={Link}
              href="/consultation"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4.5, py: 1.8, fontSize: 16, boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}
            >
              Book Free Consultation
            </Button>
            <Button
              component={Link}
              href="/universities"
              variant="outlined"
              size="large"
              sx={{ px: 4.5, py: 1.8, fontSize: 16, borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "primary.main", bgcolor: "transparent" } }}
            >
              Explore Universities
            </Button>
          </Stack>
        </motion.div>

        {/* Social proof logos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mt: 10 }}>
            {["Harvard", "Oxford", "MIT", "Toronto", "TU Munich", "UCD"].map((uni) => (
              <Typography key={uni} variant="body2" sx={{ color: "text.secondary", fontWeight: 600, opacity: 0.6 }}>
                {uni}
              </Typography>
            ))}
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
}
