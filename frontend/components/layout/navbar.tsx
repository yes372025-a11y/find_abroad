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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
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
        elevation={0}
        sx={{ 
          borderBottom: "1px solid", 
          borderColor: "rgba(255,255,255,0.06)",
          bgcolor: "rgba(10,10,11,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto", px: { xs: 2, md: 4 }, minHeight: { xs: 64, md: 72 } }}>
          {/* Logo */}
          <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", mr: 6 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(255,107,53,0.3)",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0A0A0B" }}>F</Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, color: "#FAFAFA", fontSize: 18, letterSpacing: "-0.02em" }}>
              Find Abroad
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5, flex: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{ 
                  fontWeight: pathname.startsWith(link.href) ? 600 : 500, 
                  fontSize: 14,
                  color: pathname.startsWith(link.href) ? "#FF6B35" : "#A1A1AA",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  "&:hover": { 
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#FAFAFA",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "18px !important" }} />}
              onClick={handleStudyAbroadOpen}
              sx={{ 
                fontWeight: 500, 
                fontSize: 14, 
                color: "#A1A1AA",
                px: 2,
                py: 1,
                borderRadius: "8px",
                "&:hover": { 
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "#FAFAFA",
                },
              }}
            >
              Study Abroad
            </Button>
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={handleStudyAbroadClose}
              slotProps={{ 
                paper: { 
                  elevation: 0, 
                  sx: { 
                    borderRadius: 3, 
                    mt: 1.5, 
                    minWidth: 180,
                    bgcolor: "#1A1A1C",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  } 
                } 
              }}
            >
              {studyAbroadItems.map((item) => (
                <MenuItem 
                  key={item.href} 
                  component={Link} 
                  href={item.href} 
                  onClick={handleStudyAbroadClose}
                  sx={{ 
                    fontSize: 14, 
                    borderRadius: 2, 
                    mx: 0.5,
                    my: 0.25,
                    color: "#A1A1AA",
                    "&:hover": {
                      bgcolor: "rgba(255,107,53,0.1)",
                      color: "#FF6B35",
                    },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* CTA */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button 
                  component={Link} 
                  href="/dashboard" 
                  sx={{ 
                    fontSize: 14, 
                    fontWeight: 500, 
                    color: "#A1A1AA",
                    "&:hover": { color: "#FAFAFA" },
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={logout} 
                  sx={{ 
                    fontSize: 14, 
                    fontWeight: 500, 
                    color: "#A1A1AA",
                    "&:hover": { color: "#FAFAFA" },
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                component={Link} 
                href="/auth/login" 
                sx={{ 
                  fontSize: 14, 
                  fontWeight: 500, 
                  color: "#A1A1AA",
                  "&:hover": { color: "#FAFAFA" },
                }}
              >
                Sign In
              </Button>
            )}
            <Button 
              component={Link} 
              href="/consultation" 
              variant="contained" 
              sx={{ 
                px: 3, 
                py: 1, 
                fontSize: 14,
                background: "#FF6B35",
                color: "#0A0A0B",
                fontWeight: 600,
                "&:hover": {
                  background: "#FF8F66",
                },
              }}
            >
              Free Consultation
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton 
            sx={{ 
              display: { md: "none" }, 
              ml: "auto",
              color: "#FAFAFA",
            }} 
            onClick={() => setDrawerOpen(true)} 
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        slotProps={{ 
          paper: { 
            sx: { 
              width: "100%", 
              maxWidth: 360,
              bgcolor: "#0A0A0B",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            } 
          } 
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF8F66 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0A0A0B" }}>F</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, color: "#FAFAFA" }}>Find Abroad</Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#A1A1AA" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ mb: 2 }}>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={link.href} 
                  onClick={() => setDrawerOpen(false)}
                  selected={pathname.startsWith(link.href)} 
                  sx={{ 
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      bgcolor: "rgba(255,107,53,0.1)",
                      color: "#FF6B35",
                    },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#52525B", px: 2, mb: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Study Abroad
          </Typography>
          <List sx={{ mb: 3 }}>
            {studyAbroadItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={item.href} 
                  onClick={() => setDrawerOpen(false)} 
                  sx={{ 
                    borderRadius: 2, 
                    pl: 3,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, color: "#A1A1AA" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 3 }} />
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button 
                  component={Link} 
                  href="/dashboard" 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => setDrawerOpen(false)}
                  sx={{ 
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "#FAFAFA",
                    "&:hover": {
                      borderColor: "#FF6B35",
                      bgcolor: "rgba(255,107,53,0.08)",
                    },
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  fullWidth 
                  onClick={() => { setDrawerOpen(false); logout(); }}
                  sx={{ 
                    color: "#A1A1AA",
                    "&:hover": { color: "#FAFAFA" },
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                component={Link} 
                href="/auth/login" 
                variant="outlined" 
                fullWidth 
                onClick={() => setDrawerOpen(false)}
                sx={{ 
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#FAFAFA",
                  "&:hover": {
                    borderColor: "#FF6B35",
                    bgcolor: "rgba(255,107,53,0.08)",
                  },
                }}
              >
                Sign In
              </Button>
            )}
            <Button 
              component={Link} 
              href="/consultation" 
              variant="contained" 
              fullWidth 
              onClick={() => setDrawerOpen(false)}
              sx={{
                background: "#FF6B35",
                color: "#0A0A0B",
                fontWeight: 600,
                py: 1.5,
                "&:hover": {
                  background: "#FF8F66",
                },
              }}
            >
              Free Consultation
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
