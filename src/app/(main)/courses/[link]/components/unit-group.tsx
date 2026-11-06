"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { ReactNode } from "react";

/**
 * One expandable unit list. A button toggles it, so there is no native <details> behaviour
 * (which can move the page). The content stays in the HTML when closed: it is only collapsed
 * with CSS, so Google still reads every unit.
 */
export function UnitGroup({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-ink hover:text-brand-strong"
      >
        {title}
        <ChevronDown
          aria-hidden
          className={`size-5 shrink-0 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className={`overflow-hidden ${open ? "" : "invisible"}`}>
          <div className="border-t border-gray-100 px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
