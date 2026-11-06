import { BadgeCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Breadcrumbs, type Crumb } from "./breadcrumbs";

import type { ReactNode } from "react";

export type HeroBenefit = { icon: LucideIcon; text: string };

export const HERO_TRUST_CHIPS = [
  "Nationally recognised",
  "Free eligibility check",
  "100% online assessment",
];

interface PageHeroProps {
  title: ReactNode;
  /** Small line above the H1. */
  eyebrow?: string;
  /** Shown left of the H1, e.g. a section icon. */
  icon?: ReactNode;
  breadcrumbs?: Crumb[];
  intro?: ReactNode;
  benefits?: HeroBenefit[];
  chips?: string[];
  /** Buttons under the intro. */
  actions?: ReactNode;
  /** Image (or other media) at the end of the text column. */
  media?: ReactNode;
  /** Right-hand column, usually the lead form. On mobile it comes straight after the H1. */
  aside?: ReactNode;
}

/**
 * The hero on every public page: dark navy, slanted panel, keyword H1, benefits and trust chips,
 * and an optional form card. Without `aside` it is a short, left-aligned page header.
 * The navbar is transparent on top of it, so the top padding includes the navbar height.
 */
export function PageHero({
  title,
  eyebrow,
  icon,
  breadcrumbs,
  intro,
  benefits,
  chips,
  actions,
  media,
  aside,
}: PageHeroProps) {
  const simple = !aside;

  const head = (
    <div className="space-y-4">
      {breadcrumbs && (
        <div className="[&_a]:text-brand-bright [&_a:hover]:text-white [&_li>span]:text-slate-300 [&_svg]:text-slate-400">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-brand-bright uppercase">{eyebrow}</p>
      )}
      <h1
        className={cn(
          "text-3xl leading-[1.1] font-bold tracking-tight text-balance text-white md:text-5xl",
          icon && "flex items-center gap-3",
        )}
      >
        {icon}
        {title}
      </h1>
    </div>
  );

  const body = (
    <div className={cn("space-y-6", aside && "lg:flex lg:h-full lg:flex-col")}>
      {intro && (
        <div className="max-w-2xl text-base text-slate-300 md:text-lg [&_a]:text-brand-bright [&_p]:text-slate-300 [&_strong]:text-white">
          {intro}
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <ul className="space-y-2">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 font-medium text-white">
              <Icon aria-hidden className="size-5 shrink-0 text-brand-bright" />
              {text}
            </li>
          ))}
        </ul>
      )}
      {chips && chips.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {chips.map((chip) => (
            <li key={chip} className="flex items-center gap-1.5 text-sm font-medium text-white">
              <BadgeCheck aria-hidden className="size-4 text-brand-bright" />
              {chip}
            </li>
          ))}
        </ul>
      )}
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      {media && <div className="lg:mt-auto">{media}</div>}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className={cn(
          "absolute inset-y-0 right-0 -z-10 hidden bg-white/6 lg:block",
          simple
            ? "w-[38%] [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]"
            : "w-[48%] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]",
        )}
      />
      {simple && (
        <div
          aria-hidden
          className="absolute -bottom-24 left-1/4 -z-10 size-72 rounded-full bg-brand/20 blur-3xl"
        />
      )}

      <div
        className={cn(
          "container mx-auto px-4 md:px-8",
          simple ? "pt-28 pb-10 md:pt-32 md:pb-14" : "pt-28 pb-12 md:pt-32 md:pb-16",
        )}
      >
        {simple ? (
          <div className="max-w-3xl space-y-6">
            {head}
            {body}
          </div>
        ) : (
          // DOM order is head, body, form, so on mobile the form comes last. On desktop the text
          // sits in the left column and the form in the right one, bottom-aligned with the image.
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:grid-rows-[auto_1fr] lg:gap-x-12">
            {head}
            {body}
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-end">{aside}</div>
          </div>
        )}
      </div>
    </section>
  );
}
