"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=Hi%2C%20I%20am%20interested%20in%20studying%20abroad`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 999,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? "0 8px 28px rgba(37,211,102,0.55)"
            : "0 4px 16px rgba(37,211,102,0.4)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          textDecoration: "none",
          flexShrink: 0,
        }}
        aria-label="Chat on WhatsApp"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.57a.75.75 0 0 0 .92.921l5.882-1.538A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.528-5.23-1.448l-.374-.222-3.89 1.018 1.034-3.774-.244-.386A9.944 9.944 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
      </a>

      {/* Pulse ring — decorative attention ring that fades */}
      <span
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 998,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(37,211,102,0.25)",
          animation: "wa-pulse 2.4s ease-out infinite",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.9); opacity: 0;   }
          100% { transform: scale(1.9); opacity: 0;   }
        }
      `}</style>
    </>
  );
}
