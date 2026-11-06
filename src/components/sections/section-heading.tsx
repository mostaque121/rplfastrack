import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small label above the title, e.g. "Popular qualifications". */
  eyebrow: string;
  /** The H2. Wrap the key phrase in <Accent> to colour it. */
  title: ReactNode;
  description?: ReactNode;
  /** `left` (default): side bar. `center`: short bar above, everything centred. */
  align?: "left" | "center";
  /** `dark` for sections on the navy `ink` background. */
  tone?: "light" | "dark";
  className?: string;
}

/** Coloured phrase inside a section title. */
export function Accent({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return <span className={tone === "dark" ? "text-brand-bright" : "text-brand"}>{children}</span>;
}

/**
 * Heading block used at the top of every content section so all sections share one look:
 * left-aligned, a thick green bar down the side, eyebrow, display title, short description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const center = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        center
          ? "mx-auto text-center"
          : cn("border-l-4 pl-4 sm:pl-5", dark ? "border-brand-bright" : "border-brand"),
        className,
      )}
    >
      {center && (
        <span
          aria-hidden
          className={cn(
            "mx-auto mb-4 block h-1 w-12 rounded-full",
            dark ? "bg-brand-bright" : "bg-brand",
          )}
        />
      )}
      <p
        className={cn(
          "text-sm font-semibold tracking-wider uppercase",
          dark ? "text-brand-bright" : "text-brand",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-2 text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-4xl md:text-[2.75rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base md:text-lg", dark ? "text-slate-300" : "text-gray-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
