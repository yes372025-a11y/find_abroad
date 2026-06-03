import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0A0A0B",
        px: 2,
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: "50%",
          height: "80%",
          background: "radial-gradient(ellipse, rgba(255,107,53,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "40%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(0,217,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <Box
        component={Link}
        href="/"
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          textDecoration: "none",
        }}
      >
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

      <Box sx={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}
