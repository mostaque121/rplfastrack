"use client";

import Image from "next/image";
import { useState } from "react";

import { contactInfo } from "@/config/contact";
import { track } from "@/lib/track-lead";

export default function WhatsAppButton1({ position = "fixed" }: { position?: "fixed" | "static" }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    track("click_whatsapp", { location: "floating" });
    window.open(contactInfo.whatsappHref, "_blank", "noopener,noreferrer");
  };

  // On phones the sticky CTA bar has its own WhatsApp button, so the floating one is desktop only.
  const positionClasses =
    position === "fixed" ? "fixed bottom-6 right-6 max-md:hidden" : "relative";

  return (
    <div className={`${positionClasses} z-50 flex flex-row-reverse items-center gap-3`}>
      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-300 hover:scale-110 active:scale-105"
      >
        {/* Pulse rings */}
        <span className="absolute -z-10 h-full w-full animate-ping rounded-full bg-[#25D366]/40" />
        <span className="absolute -z-10 h-full w-full animate-pulse rounded-full bg-[#25D366]/20" />

        {/* Icon */}
        <Image
          src="/wp-ico-1.png"
          alt="WhatsApp"
          width={68}
          height={68}
          priority
          className={`relative z-10 transition-transform duration-300 ${active ? "rotate-12" : ""}`}
        />
      </button>

      {/* Tooltip */}
      <div
        className={`relative rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg transition-all duration-300 ${
          active ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
        }`}
      >
        Chat on WhatsApp
        {/* Arrow */}
        <span className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2">
          <span className="block h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-[#25D366]" />
        </span>
      </div>
    </div>
  );
}
