"use client";

import { ClipboardCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/icon/whatsapp-icon";
import { contactInfo } from "@/config/contact";
import { cn } from "@/lib/utils";

import { EligibilityForm } from "./form/eligibility-form";

/** Shown once the visitor has scrolled past the hero. */
const SHOW_AFTER_PX = 480;

/**
 * Bottom bar on phones (hidden from md up): call, WhatsApp and the eligibility quiz.
 * It replaces the floating WhatsApp button on small screens.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      data-track-location="sticky_bar"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2">
        <a
          href={contactInfo.phoneHref}
          aria-label={`Call ${contactInfo.phone}`}
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-ink active:bg-gray-100"
        >
          <Phone className="size-5" aria-hidden />
        </a>
        <a
          href={contactInfo.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white active:bg-[#1EBE5A]"
        >
          <WhatsAppIcon className="size-6" />
        </a>
        <EligibilityForm
          trigger={
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cta text-base font-semibold text-white shadow-lg shadow-brand/20 active:bg-cta-strong"
            >
              <ClipboardCheck className="size-5" aria-hidden />
              Check my eligibility
            </button>
          }
        />
      </div>
    </div>
  );
}
