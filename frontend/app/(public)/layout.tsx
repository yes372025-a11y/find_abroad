import Box from "@mui/material/Box";
import { Navbar } from "~/components/layout/navbar";
import { Footer } from "~/components/layout/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#0A0A0B" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}
