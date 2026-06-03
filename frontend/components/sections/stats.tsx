"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const stats = [
  { value: 25000, suffix: "+", label: "Students Guided" },
  { value: 500, suffix: "+", label: "Partner Universities" },
  { value: 40, suffix: "+", label: "Scholarship Programs" },
  { value: 2, prefix: "$", suffix: "B+", label: "Loans Facilitated" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <Typography
      ref={ref}
      variant="h3"
      sx={{
        fontWeight: 800,
        fontSize: { xs: 36, md: 52 },
        background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.02em",
      }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </Typography>
  );
}

export function StatsSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 3, md: 6 },
        bgcolor: "#0A0A0B",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Subtle gradient line at top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.3) 50%, transparent 100%)",
        }}
      />

      <Grid container spacing={4} sx={{ maxWidth: 1100, mx: "auto" }}>
        {stats.map((stat, i) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box 
                sx={{ 
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <Typography 
                  sx={{ 
                    mt: 1, 
                    fontWeight: 500, 
                    color: "#71717A",
                    fontSize: { xs: 13, md: 14 },
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
