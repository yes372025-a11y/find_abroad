import type { Metadata } from "next";
import { DocumentVaultClient } from "~/components/sections/document-vault-client";

export const metadata: Metadata = { title: "Document Vault — Find Abroad" };

export default function DocumentsPage() {
  return <DocumentVaultClient />;
}
