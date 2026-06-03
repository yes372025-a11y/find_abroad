import type { Metadata } from "next";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata: Metadata = { title: "Dashboard" };

const quickLinks = [
  { href: "/applications", icon: MenuBookIcon, label: "Application Tracker", description: "View and manage your university applications", color: "#2563eb", bg: "#eff6ff" },
  { href: "/consultations", icon: EventIcon, label: "Consultations", description: "Upcoming and past counselor sessions", color: "#7c3aed", bg: "#f5f3ff" },
  { href: "/documents", icon: FolderOpenIcon, label: "Document Vault", description: "Upload and manage your documents", color: "#16a34a", bg: "#f0fdf4" },
  { href: "/profile", icon: PersonIcon, label: "My Profile", description: "Update your academic and financial details", color: "#d97706", bg: "#fffbeb" },
];

const exploreLinks = [
  { href: "/universities", icon: SchoolIcon, label: "Universities", sub: "Browse 500+ institutions" },
  { href: "/scholarships", icon: AutoStoriesIcon, label: "Scholarships", sub: "Find funding opportunities" },
];

export default function DashboardPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Welcome banner */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
          borderRadius: 4,
          p: { xs: 4, md: 5 },
          color: "white",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, fontWeight: 500 }}>Welcome back</Typography>
        <Typography variant="h4" fontWeight={800} mb={1.5}>Your Study Abroad Journey</Typography>
        <Typography sx={{ opacity: 0.85, maxWidth: 520, mb: 3.5, fontSize: 16 }}>
          Track your applications, manage documents, and connect with expert counselors — all in one place.
        </Typography>
        <Button
          component={Link}
          href="/consultation"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{ bgcolor: "white", color: "primary.main", "&:hover": { bgcolor: "grey.100" }, fontWeight: 700 }}
        >
          Book a Consultation
        </Button>
      </Paper>

      {/* Quick links */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2.5}>Quick Access</Typography>
        <Grid container spacing={2.5}>
          {quickLinks.map(({ href, icon: Icon, label, description, color, bg }) => (
            <Grid item xs={12} sm={6} key={href}>
              <Card sx={{ height: "100%", transition: "all 0.2s", "&:hover": { boxShadow: 3, transform: "translateY(-2px)" } }}>
                <CardActionArea component={Link} href={href} sx={{ height: "100%", p: 3 }}>
                  <Box sx={{ display: "inline-flex", p: 1.5, borderRadius: 3, bgcolor: bg, mb: 2 }}>
                    <Icon sx={{ fontSize: 22, color }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700} mb={0.5}>{label}</Typography>
                  <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Explore */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2.5}>Explore</Typography>
        <Grid container spacing={2}>
          {exploreLinks.map(({ href, icon: Icon, label, sub }) => (
            <Grid item xs={12} sm={6} key={href}>
              <Card sx={{ transition: "all 0.2s", "&:hover": { boxShadow: 2, transform: "translateY(-1px)" } }}>
                <CardActionArea component={Link} href={href} sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: "grey.100", borderRadius: 2.5, display: "flex" }}>
                    <Icon sx={{ fontSize: 22, color: "text.secondary" }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700}>{label}</Typography>
                    <Typography variant="caption" color="text.secondary">{sub}</Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
