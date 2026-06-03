"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const benefits = [
  "Multi-step eligibility assessment",
  "Compare 20+ lenders side-by-side",
  "Get a personalised loan estimate",
  "100% free — no credit check",
];

export function LoanToolTeaser() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box
          sx={{
            borderRadius: 6,
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
            p: { xs: 6, md: 10 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 8,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Typography variant="h3" sx={{ color: "white", fontWeight: 800, mb: 2.5, fontSize: { xs: 28, md: 38 } }}>
                Check Your Education Loan Eligibility
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.85)", mb: 5, fontSize: 18, lineHeight: 1.7 }}>
                Our intelligent loan wizard assesses your profile and matches you with the best lenders in minutes.
              </Typography>
              <Stack spacing={1.5} sx={{ mb: 5 }}>
                {benefits.map((b) => (
                  <Box key={b} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: "#86efac" }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>{b}</Typography>
                  </Box>
                ))}
              </Stack>
              <Button
                component={Link}
                href="/loans"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "white",
                  color: "primary.dark",
                  fontWeight: 700,
                  px: 4,
                  py: 1.6,
                  "&:hover": { bgcolor: "#f0f9ff" },
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
              >
                Check Eligibility — It's Free
              </Button>
            </motion.div>
          </Box>

          {/* Illustration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ flex: 1, maxWidth: 360, width: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 4,
                p: 4,
              }}
            >
              {[
                { label: "HDFC Credila", rate: "9.5%", tag: "Most Popular" },
                { label: "Avanse Financial", rate: "10.5%", tag: "Fast Approval" },
                { label: "Prodigy Finance", rate: "7.5%", tag: "No Collateral" },
              ].map((lender, i) => (
                <Box
                  key={lender.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 2.5,
                    p: 2,
                    mb: i < 2 ? 1.5 : 0,
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "white", fontWeight: 600, fontSize: 14 }}>{lender.label}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{lender.tag}</Typography>
                  </Box>
                  <Typography sx={{ color: "#86efac", fontWeight: 700, fontSize: 16 }}>{lender.rate}</Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
