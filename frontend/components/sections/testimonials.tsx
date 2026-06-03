"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";

const testimonials = [
  { name: "Priya Sharma", university: "University of Toronto", country: "Canada", text: "Find Abroad made the entire process seamless. From shortlisting universities to getting my study permit — their team was with me every step.", rating: 5 },
  { name: "Rahul Menon", university: "TU Munich", country: "Germany", text: "I had no idea I could get a fully-funded scholarship for my MS in Germany. The scholarship explorer on Find Abroad changed my life.", rating: 5 },
  { name: "Ananya Patel", university: "University College London", country: "UK", text: "The loan eligibility checker was incredibly accurate. I got approved for the exact amount they predicted. Brilliant tool!", rating: 5 },
];

export function TestimonialsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 6 }, bgcolor: "grey.50" }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 1.5 }}>
            Students Love Find Abroad
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
            Real stories from students who achieved their dreams.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={t.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ height: "100%" }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ p: 3.5 }}>
                    <Rating value={t.rating} readOnly size="small" sx={{ mb: 2.5, color: "#f59e0b" }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontStyle: "italic" }}>
                      "{t.text}"
                    </Typography>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>{t.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.university} · {t.country}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
