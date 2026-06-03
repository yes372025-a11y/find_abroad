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
        height: 64,
        borderBottom: "1px solid",
        borderColor: "rgba(255,255,255,0.06)",
        bgcolor: "#0D0D0E",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        flexShrink: 0,
      }}
    >
      <Typography sx={{ color: "#71717A", fontWeight: 600, fontSize: 14 }}>
        Student Dashboard
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Button 
          size="small" 
          variant="outlined" 
          onClick={logout} 
          sx={{ 
            borderRadius: 2, 
            textTransform: "none",
            borderColor: "rgba(255,255,255,0.1)",
            color: "#A1A1AA",
            fontSize: 13,
            "&:hover": {
              borderColor: "#FF6B35",
              bgcolor: "rgba(255,107,53,0.08)",
            },
          }}
        >
          Sign Out
        </Button>
        <Tooltip title="Notifications">
          <IconButton 
            size="small" 
            aria-label="Notifications"
            sx={{ 
              color: "#71717A",
              "&:hover": { color: "#FAFAFA" },
            }}
          >
            <NotificationsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton 
            size="small" 
            component={Link} 
            href="/profile" 
            aria-label="Settings"
            sx={{ 
              color: "#71717A",
              "&:hover": { color: "#FAFAFA" },
            }}
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Avatar 
          sx={{ 
            width: 34, 
            height: 34, 
            bgcolor: "#FF6B35", 
            fontSize: 14, 
            fontWeight: 700, 
            ml: 0.5,
            color: "#0A0A0B",
          }}
        >
          S
        </Avatar>
      </Box>
    </Box>
  );
}
