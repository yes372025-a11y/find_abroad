"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const benefits = [
  "Multi-step eligibility assessment",
  "Compare 20+ lenders side-by-side",
  "Get a personalised loan estimate",
  "100% free — no credit check",
];

export function LoanToolTeaser() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 12, md: 18 }, 
        px: { xs: 3, md: 6 },
        bgcolor: "#0A0A0B",
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box
          sx={{
            borderRadius: 5,
            background: "linear-gradient(135deg, #141416 0%, #1A1A1C 100%)",
            border: "1px solid rgba(255,107,53,0.15)",
            p: { xs: 5, md: 8 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 5, md: 8 },
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "60%",
              height: "150%",
              background: "radial-gradient(ellipse, rgba(255,107,53,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
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
                Loan Calculator
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  color: "#FAFAFA", 
                  fontWeight: 700, 
                  mb: 3, 
                  fontSize: { xs: 28, md: 40 },
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Check Your Education
                <br />
                Loan Eligibility
              </Typography>
              <Typography 
                sx={{ 
                  color: "#71717A", 
                  mb: 4, 
                  fontSize: { xs: 15, md: 17 }, 
                  lineHeight: 1.7,
                  maxWidth: 450,
                }}
              >
                Our intelligent loan wizard assesses your profile and matches you with the best lenders in minutes.
              </Typography>
              
              <Stack spacing={2} sx={{ mb: 5 }}>
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: "rgba(16,185,129,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 12, color: "#10B981" }} />
                      </Box>
                      <Typography sx={{ color: "#A1A1AA", fontSize: 14 }}>{b}</Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
              
              <Button
                component={Link}
                href="/loans"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: "#FF6B35",
                  color: "#0A0A0B",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  "&:hover": { 
                    background: "#FF8F66",
                  },
                  boxShadow: "0 0 30px rgba(255,107,53,0.3)",
                }}
              >
                Check Eligibility Free
              </Button>
            </motion.div>
          </Box>

          {/* Lender cards illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ flex: 1, maxWidth: 380, width: "100%", position: "relative", zIndex: 1 }}
          >
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                p: 3,
              }}
            >
              {[
                { label: "HDFC Credila", rate: "9.5%", tag: "Most Popular", color: "#FF6B35" },
                { label: "Avanse Financial", rate: "10.5%", tag: "Fast Approval", color: "#00D9FF" },
                { label: "Prodigy Finance", rate: "7.5%", tag: "No Collateral", color: "#10B981" },
              ].map((lender, i) => (
                <Box
                  key={lender.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 2.5,
                    p: 2.5,
                    mb: i < 2 ? 2 : 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.06)",
                      borderColor: `${lender.color}30`,
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "#FAFAFA", fontWeight: 600, fontSize: 14, mb: 0.5 }}>
                      {lender.label}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: lender.color, 
                        fontSize: 11, 
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {lender.tag}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: lender.color, fontWeight: 700, fontSize: 20 }}>
                      {lender.rate}
                    </Typography>
                    <Typography sx={{ color: "#52525B", fontSize: 11 }}>Interest</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
