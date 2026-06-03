import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DocumentVaultClient } from "~/components/sections/document-vault-client";

export const metadata: Metadata = { title: "Document Vault" };

export default function DocumentsPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={4}>Document Vault</Typography>
      <DocumentVaultClient />
    </Box>
  );
}
