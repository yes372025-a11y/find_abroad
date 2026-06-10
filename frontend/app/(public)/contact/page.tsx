import type { Metadata } from "next";
import { ContactForm } from "~/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <section style={{
      background: "var(--bg)",
      color: "var(--fg)",
      padding: "6rem 2rem 5rem",
      paddingTop: "calc(var(--nav-h, 80px) + 4rem)",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginBottom: "0.75rem",
        }}>
          Contact Us
        </h1>
        <p style={{
          fontSize: 17,
          color: "var(--muted)",
          lineHeight: 1.65,
          marginBottom: "2rem",
        }}>
          Have a question? We&apos;d love to hear from you.
        </p>

        {/* Quick contact options */}
        <div style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi%2C%20I%20am%20interested%20in%20studying%20abroad`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid var(--border)",
              background: "var(--elev)",
              color: "var(--fg)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.57a.75.75 0 0 0 .92.921l5.882-1.538A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.528-5.23-1.448l-.374-.222-3.89 1.018 1.034-3.774-.244-.386A9.944 9.944 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href="mailto:hello@findabroad.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid var(--border)",
              background: "var(--elev)",
              color: "var(--fg)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            hello@findabroad.com
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}