"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "~/hooks/use-auth";

const studyAbroadItems = [
  { href: "/study-abroad/usa", label: "USA" },
  { href: "/study-abroad/uk", label: "UK" },
  { href: "/study-abroad/canada", label: "Canada" },
  { href: "/study-abroad/australia", label: "Australia" },
  { href: "/study-abroad/germany", label: "Germany" },
  { href: "/study-abroad/ireland", label: "Ireland" },
];

const navLinks = [
  { href: "/universities", label: "Universities" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/loans", label: "Loans" },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleStudyAbroadOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleStudyAbroadClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
      >
        <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", mr: 4 }}>
            <LanguageIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main", fontSize: 20 }}>
              Find Abroad
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, flex: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color={pathname.startsWith(link.href) ? "primary" : "inherit"}
                sx={{ fontWeight: pathname.startsWith(link.href) ? 600 : 500, fontSize: 14 }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleStudyAbroadOpen}
              sx={{ fontWeight: 500, fontSize: 14 }}
            >
              Study Abroad
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleStudyAbroadClose}
              slotProps={{ paper: { elevation: 2, sx: { borderRadius: 3, mt: 1, minWidth: 160 } } }}>
              {studyAbroadItems.map((item) => (
                <MenuItem key={item.href} component={Link} href={item.href} onClick={handleStudyAbroadClose}
                  sx={{ fontSize: 14, borderRadius: 2, mx: 0.5 }}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* CTA */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
            {isAuthenticated ? (
              <>
                <Button component={Link} href="/dashboard" color="inherit" sx={{ fontSize: 14, fontWeight: 500 }}>
                  Dashboard
                </Button>
                <Button onClick={logout} color="inherit" sx={{ fontSize: 14, fontWeight: 500 }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button component={Link} href="/auth/login" color="inherit" sx={{ fontSize: 14, fontWeight: 500 }}>
                Sign In
              </Button>
            )}
            <Button component={Link} href="/consultation" variant="contained" color="primary"
              sx={{ px: 2.5, py: 1, fontSize: 14 }}>
              Free Consultation
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton sx={{ display: { md: "none" }, ml: "auto" }} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LanguageIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>Find Abroad</Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)}
                  selected={pathname.startsWith(link.href)} sx={{ borderRadius: 2 }}>
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemText primary="Study Abroad" primaryTypographyProps={{ fontWeight: 600, fontSize: 12, color: "text.secondary", sx: { px: 2, pt: 1 } }} />
            </ListItem>
            {studyAbroadItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} href={item.href} onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 2, pl: 3 }}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {isAuthenticated ? (
              <>
                <Button component={Link} href="/dashboard" variant="outlined" fullWidth onClick={() => setDrawerOpen(false)}>
                  Dashboard
                </Button>
                <Button fullWidth onClick={() => { setDrawerOpen(false); logout(); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button component={Link} href="/auth/login" variant="outlined" fullWidth onClick={() => setDrawerOpen(false)}>Sign In</Button>
            )}
            <Button component={Link} href="/consultation" variant="contained" fullWidth onClick={() => setDrawerOpen(false)}>Free Consultation</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
