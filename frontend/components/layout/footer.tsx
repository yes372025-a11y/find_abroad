import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const footerLinks = {
  "Study Abroad": [
    { href: "/study-abroad/usa", label: "Study in USA" },
    { href: "/study-abroad/uk", label: "Study in UK" },
    { href: "/study-abroad/canada", label: "Study in Canada" },
    { href: "/study-abroad/australia", label: "Study in Australia" },
    { href: "/study-abroad/germany", label: "Study in Germany" },
    { href: "/study-abroad/ireland", label: "Study in Ireland" },
  ],
  Services: [
    { href: "/universities", label: "University Search" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/loans", label: "Education Loans" },
    { href: "/consultation", label: "Free Consultation" },
    { href: "/success-stories", label: "Success Stories" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.50", borderTop: "1px solid", borderColor: "divider", mt: "auto" }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid item xs={12} md={3}>
            <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5, textDecoration: "none" }}>
              <LanguageIcon sx={{ color: "primary.main", fontSize: 26 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>Find Abroad</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              Your trusted partner for studying abroad. We help students find the right university, scholarship, and loan.
            </Typography>
            <Stack spacing={1.5}>
              {[
                { icon: <EmailIcon sx={{ fontSize: 16 }} />, text: "hello@findabroad.com" },
                { icon: <PhoneIcon sx={{ fontSize: 16 }} />, text: "+1 (800) ABROAD" },
                { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, text: "New York, USA" },
              ].map(({ icon, text }) => (
                <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "text.secondary" }}>
                  {icon}
                  <Typography variant="body2">{text}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <Grid item xs={6} md={3} key={heading}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2.5 }}>{heading}</Typography>
              <Stack spacing={1.5}>
                {links.map((link) => (
                  <Box
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{ color: "text.secondary", fontSize: 14, "&:hover": { color: "primary.main" }, transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Find Abroad. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with ❤️ for aspiring global students
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
