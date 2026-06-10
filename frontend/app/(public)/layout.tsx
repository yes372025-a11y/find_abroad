import { Navbar } from "~/components/layout/navbar";
import { Footer } from "~/components/layout/footer";
import WhatsAppButton from "~/components/layout/whatsapp-button";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
