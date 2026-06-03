import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#0A0A0B", 
        borderTop: "1px solid", 
        borderColor: "rgba(255,255,255,0.06)", 
        mt: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient accent */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.5) 50%, transparent 100%)",
        }}
      />

      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid item xs={12} md={3}>
            <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, textDecoration: "none" }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0A0A0B" }}>F</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, color: "#FAFAFA", fontSize: 18 }}>Find Abroad</Typography>
            </Box>
            <Typography sx={{ color: "#71717A", mb: 4, lineHeight: 1.8, fontSize: 14 }}>
              Your trusted partner for studying abroad. We help students find the right university, scholarship, and loan.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <TwitterIcon sx={{ fontSize: 18 }} />, href: "#" },
                { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: "#" },
                { icon: <InstagramIcon sx={{ fontSize: 18 }} />, href: "#" },
              ].map(({ icon, href }, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={href}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#71717A",
                    "&:hover": {
                      bgcolor: "rgba(255,107,53,0.1)",
                      color: "#FF6B35",
                    },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <Grid item xs={6} md={3} key={heading}>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3, 
                  color: "#FAFAFA",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {heading}
              </Typography>
              <Stack spacing={2}>
                {links.map((link) => (
                  <Box
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{ 
                      color: "#71717A", 
                      fontSize: 14, 
                      "&:hover": { color: "#FF6B35" }, 
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.06)" }} />
        
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ color: "#52525B", fontSize: 13 }}>
            {new Date().getFullYear()} Find Abroad. All rights reserved.
          </Typography>
          <Typography sx={{ color: "#52525B", fontSize: 13 }}>
            Built for aspiring global students
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
