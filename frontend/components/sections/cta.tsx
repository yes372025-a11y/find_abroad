import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function CTASection() {
  return (
    <Box component="section" sx={{ py: { xs: 12, md: 20 }, px: { xs: 3, md: 6 }, textAlign: "center" }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 52 }, mb: 2.5, lineHeight: 1.15 }}>
          Ready to Start Your{" "}
          <Box component="span" sx={{ background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Study Abroad Journey?
          </Box>
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 20, maxWidth: 580, mx: "auto", mb: 7 }}>
          Book a free consultation today and let our experts guide you to the right university, scholarship, and loan.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
          <Button
            component={Link}
            href="/consultation"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 5, py: 2, fontSize: 17, boxShadow: "0 10px 28px rgba(37,99,235,0.3)" }}
          >
            Book Free Consultation
          </Button>
          <Button
            component={Link}
            href="/auth/register"
            variant="outlined"
            size="large"
            sx={{ px: 5, py: 2, fontSize: 17, borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "primary.main" } }}
          >
            Create Free Account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
