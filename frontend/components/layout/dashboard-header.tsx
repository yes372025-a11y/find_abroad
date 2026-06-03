"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Link from "next/link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "~/hooks/use-auth";

export function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        height: 60,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        flexShrink: 0,
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        Student Dashboard
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button size="small" variant="outlined" onClick={logout} sx={{ borderRadius: 999, textTransform: "none" }}>
          Sign Out
        </Button>
        <Tooltip title="Notifications">
          <IconButton size="small" aria-label="Notifications">
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton size="small" component={Link} href="/profile" aria-label="Settings">
            <SettingsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 14, fontWeight: 700, ml: 0.5 }}>
          S
        </Avatar>
      </Box>
    </Box>
  );
}
