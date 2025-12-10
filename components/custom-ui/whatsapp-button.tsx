"use client";

import { useState } from "react";

// Pulse Animation with hover text tooltip
export default function WhatsAppButton1({
  phoneNumber = "1234567890",
  position = "fixed",
}: {
  phoneNumber?: string;
  position?: "fixed" | "static";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const positionClasses =
    position === "fixed" ? "fixed bottom-6 right-6" : "relative";

  return (
    <div
      className={`${positionClasses} z-50 flex flex-row-reverse items-center gap-3`}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse rings */}
        <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <span
          className="absolute h-full w-full animate-pulse rounded-full bg-[#25D366] opacity-20"
          style={{ animationDelay: "0.5s" }}
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          className={`relative h-9 w-9 fill-white transition-transform duration-300 ${
            isHovered ? "rotate-12" : ""
          }`}
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.962A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.596c-.39 1.1-1.932 2.012-3.182 2.278-.856.182-1.974.326-5.738-1.234-4.818-1.996-7.924-6.896-8.166-7.216-.232-.32-1.952-2.6-1.952-4.958s1.234-3.52 1.672-4.002c.39-.43 1.028-.638 1.64-.638.198 0 .376.01.536.018.438.02.658.046.946.73.36.856 1.236 3.016 1.344 3.236.11.22.22.52.07.82-.14.31-.26.448-.48.7-.22.252-.43.446-.65.718-.2.238-.426.492-.182.932.244.438 1.086 1.79 2.332 2.902 1.602 1.428 2.91 1.882 3.396 2.08.39.158.854.12 1.108-.158.32-.352.714-.936 1.116-1.51.286-.41.646-.462 1.076-.278.436.176 2.754 1.3 3.226 1.538.472.238.786.356.9.554.112.198.112 1.15-.278 2.25z" />
        </svg>
      </button>

      <div
        className={`relative whitespace-nowrap rounded-lg bg-[#25D366] px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 ${
          isHovered
            ? "translate-x-0 opacity-100"
            : "-translate-x-4 pointer-events-none opacity-0"
        }`}
      >
        <span>Chat on WhatsApp</span>
        {/* Arrow pointing right to button */}
        <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2">
          <div className="h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-[#25D366]" />
        </div>
      </div>
    </div>
  );
}
