"use client";
 
import { useState, useEffect, useRef } from "react";
import { ConsultationBookingForm } from "~/components/forms/consultation-booking-form";
 
export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const delayRef = useRef(45000); // Start with 45 seconds
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
 
  useEffect(() => {
    // Prevent if already submitted
    if (typeof window !== "undefined" && localStorage.getItem("consultation_submitted") === "true") {
      return;
    }
 
    const scheduleNext = () => {
      if (localStorage.getItem("consultation_submitted") === "true") return;
 
      timeoutIdRef.current = setTimeout(() => {
        if (localStorage.getItem("consultation_submitted") !== "true") {
          setIsOpen(true);
          // Double the delay for the next time
          delayRef.current *= 2;
        }
      }, delayRef.current);
    };
 
    // Only schedule if not currently open
    if (!isOpen) {
      scheduleNext();
    }
 
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [isOpen]);
 
  useEffect(() => {
    const handleSubmitted = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
 
    window.addEventListener("consultation_submitted", handleSubmitted);
 
    return () => {
      window.removeEventListener("consultation_submitted", handleSubmitted);
    };
  }, []);
 
  if (!isOpen) return null;
 
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.3s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        style={{
           position: "relative",
           width: "100%",
           maxWidth: 600,
           maxHeight: "90vh",
           overflowY: "auto",
           borderRadius: 14,
           animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
           boxShadow: "0 24px 64px rgba(0,0,0,0.3)"
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "rgba(128, 128, 128, 0.15)",
            border: "none",
            color: "var(--fg)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(128, 128, 128, 0.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(128, 128, 128, 0.15)")}
          title="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
       
        {/* We wrap the form, the form itself has the styling and background */}
        <ConsultationBookingForm />
      </div>
     
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
 