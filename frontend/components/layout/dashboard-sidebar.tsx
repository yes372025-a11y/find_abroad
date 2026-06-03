"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LanguageIcon from "@mui/icons-material/Language";
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
        borderColor: "divider",
        bgcolor: "background.paper",
        height: "100%",
        flexShrink: 0,
      }}
    >
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
          <LanguageIcon sx={{ color: "primary.main", fontSize: 22 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "primary.main" }}>
            Find Abroad
          </Typography>
        </Box>
      </Box>

      <List sx={{ flex: 1, p: 1.5 }}>
        {sidebarLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <ListItem key={href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={href}
                selected={active}
                sx={{
                  borderRadius: 2.5,
                  px: 1.5,
                  py: 1.2,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon sx={{ fontSize: 20, color: active ? "white" : "text.secondary" }} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
