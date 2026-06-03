"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const destinations = [
  { name: "USA", flag: "🇺🇸", universities: "180+", slug: "usa" },
  { name: "UK", flag: "🇬🇧", universities: "130+", slug: "uk" },
  { name: "Canada", flag: "🇨🇦", universities: "60+", slug: "canada" },
  { name: "Australia", flag: "🇦🇺", universities: "45+", slug: "australia" },
  { name: "Germany", flag: "🇩🇪", universities: "80+", slug: "germany" },
  { name: "Ireland", flag: "🇮🇪", universities: "30+", slug: "ireland" },
];

export function DestinationsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 6 }, bgcolor: "grey.50" }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, mb: 1.5 }}>
            Top Study Destinations
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18 }}>
            Choose your destination and explore universities that fit your goals.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {destinations.map((dest, i) => (
            <Grid item xs={6} sm={4} md={2} key={dest.slug}>
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Card sx={{ height: "100%", transition: "all 0.25s", "&:hover": { transform: "translateY(-4px)", boxShadow: 4 } }}>
                  <CardActionArea component={Link} href={`/study-abroad/${dest.slug}`} sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", py: 3, px: 2 }}>
                      <Typography sx={{ fontSize: 42, mb: 1.5, display: "block" }}>{dest.flag}</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{dest.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{dest.universities} universities</Typography>
                      <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
                        <ArrowForwardIcon sx={{ fontSize: 16, color: "primary.main" }} />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
