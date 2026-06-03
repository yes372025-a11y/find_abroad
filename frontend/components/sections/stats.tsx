"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const stats = [
  { value: "25K+", label: "Students Guided" },
  { value: "500+", label: "Partner Universities" },
  { value: "40+", label: "Scholarship Programs" },
  { value: "$2B+", label: "Loans Facilitated" },
];

export function StatsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 6 }, borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider", bgcolor: "grey.50" }}>
      <Grid container spacing={4} sx={{ maxWidth: 1280, mx: "auto" }}>
        {stats.map((stat, i) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ color: "primary.main", fontWeight: 800, fontSize: { xs: 32, md: 42 } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
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
