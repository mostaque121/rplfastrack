"use client";

import { useEffect } from "react";

import { track } from "@/lib/track-lead";

function locationOf(el: Element) {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged) return tagged.dataset.trackLocation!;
  if (el.closest("footer")) return "footer";
  if (el.closest("header, nav")) return "menu";
  return "page";
}

/**
 * One delegated listener that sends GA4 click_call / click_email /
 * click_whatsapp for every tel:, mailto: and wa.me link on the site, so the
 * server-rendered links don't each need an onClick. Override the location with
 * data-track-location on the link or a wrapper.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = locationOf(a);
      if (href.startsWith("tel:")) track("click_call", { location });
      else if (href.startsWith("mailto:")) track("click_email", { location });
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href))
        track("click_whatsapp", { location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
