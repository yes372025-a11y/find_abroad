"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import EventIcon from "@mui/icons-material/Event";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const sidebarLinks = [
  { href: "/profile", label: "My Profile", icon: PersonIcon },
  { href: "/applications", label: "Applications", icon: MenuBookIcon },
  { href: "/universities", label: "Universities", icon: SchoolIcon },
  { href: "/scholarships", label: "Scholarships", icon: PublicIcon },
  { href: "/consultations", label: "Consultations", icon: EventIcon },
  { href: "/documents", label: "Documents", icon: FolderOpenIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        width: 256,
        borderRight: "1px solid",
        borderColor: "rgba(255,255,255,0.06)",
        bgcolor: "#0D0D0E",
        height: "100%",
        flexShrink: 0,
      }}
    >
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "rgba(255,255,255,0.06)" }}>
        <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}>
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
            <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#0A0A0B" }}>F</Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, color: "#FAFAFA", fontSize: 16 }}>
            Find Abroad
          </Typography>
        </Box>
      </Box>

      <List sx={{ flex: 1, p: 2 }}>
        {sidebarLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <ListItem key={href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={href}
                selected={active}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  "&.Mui-selected": {
                    bgcolor: "rgba(255,107,53,0.12)",
                    color: "#FF6B35",
                    "&:hover": { bgcolor: "rgba(255,107,53,0.18)" },
                    "& .MuiListItemIcon-root": { color: "#FF6B35" },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon sx={{ fontSize: 20, color: active ? "#FF6B35" : "#71717A" }} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ 
                    fontSize: 14, 
                    fontWeight: active ? 600 : 500,
                    color: active ? "#FF6B35" : "#A1A1AA",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
