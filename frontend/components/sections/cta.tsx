"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function CTASection() {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 16, md: 24 }, 
        px: { xs: 3, md: 6 }, 
        textAlign: "center",
        bgcolor: "#0A0A0B",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,53,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      {/* Grid pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 800, mx: "auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: 36, md: 60 }, 
              mb: 3, 
              lineHeight: 1.1,
              color: "#FAFAFA",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Ready to Start Your
            <br />
            <Box 
              component="span" 
              sx={{ 
                background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 50%, #00D9FF 100%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
              }}
            >
              Global Journey?
            </Box>
          </Typography>
          
          <Typography 
            sx={{ 
              fontSize: { xs: 16, md: 19 }, 
              maxWidth: 520, 
              mx: "auto", 
              mb: 8,
              color: "#71717A",
              lineHeight: 1.7,
            }}
          >
            Book a free consultation today and let our experts guide you to the right university, scholarship, and loan.
          </Typography>
          
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center" 
            alignItems="center"
          >
            <Button
              component={Link}
              href="/consultation"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 5, 
                py: 2, 
                fontSize: 17,
                background: "#FF6B35",
                color: "#0A0A0B",
                fontWeight: 600,
                boxShadow: "0 0 40px rgba(255,107,53,0.4)",
                "&:hover": {
                  background: "#FF8F66",
                  boxShadow: "0 0 50px rgba(255,107,53,0.5)",
                },
              }}
            >
              Book Free Consultation
            </Button>
            <Button
              component={Link}
              href="/auth/register"
              variant="outlined"
              size="large"
              sx={{ 
                px: 5, 
                py: 2, 
                fontSize: 17, 
                borderColor: "rgba(255,255,255,0.15)", 
                color: "#FAFAFA",
                "&:hover": { 
                  borderColor: "#FF6B35",
                  bgcolor: "rgba(255,107,53,0.08)",
                },
              }}
            >
              Create Free Account
            </Button>
          </Stack>
        </motion.div>
      </Box>
    </Box>
  );
}
