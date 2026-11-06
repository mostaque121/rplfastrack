import { ArrowRight, BadgeCheck, ClipboardCheck, Handshake, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { Button } from "@/components/ui/button";

const POINTS = [
  {
    icon: ClipboardCheck,
    title: "Free eligibility check",
    text: "Find out in minutes if your experience qualifies, with no obligation.",
  },
  {
    icon: Handshake,
    title: "Guided from start to finish",
    text: "One-to-one support from your first call to your certificate.",
  },
  {
    icon: ShieldCheck,
    title: "Nationally recognised",
    text: "Assessed and issued by a registered training organisation.",
  },
];

const TRUST = ["100% online assessment", "Australia-wide", "5+ years of experience"];

/**
 * About Us hero: dark navy like the home hero, text only. The slanted panel leans the other way
 * from the home page's. The navbar is transparent on top of it (see DARK_HERO_PATHS in the
 * navbar), so the top padding includes the navbar height.
 */
export default function HeroAboutUs() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Slanted panel, mirrored from the home hero: wide at the top, narrowing downwards. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-white/6 [clip-path:polygon(0_0,100%_0,100%_100%,30%_100%)] lg:block"
      />

      <div className="container mx-auto px-4 pt-32 pb-12 md:px-8 md:pt-36 md:pb-20">
        <div className="max-w-3xl space-y-7">
          <div className="[&_a]:text-brand-bright [&_a:hover]:text-white [&_li>span]:text-slate-300 [&_svg]:text-slate-400">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          </div>

          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white md:text-5xl lg:text-6xl">
            About <span className="text-brand-bright">RPL Fast Track</span>: your experience,
            recognised
          </h1>

          <p className="max-w-2xl text-lg text-slate-300">
            We help skilled Australian workers and migrants turn years of on-the-job experience into
            a nationally recognised qualification through Recognition of Prior Learning (RPL). No
            classrooms, no exams, just a clear, guided process.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <EligibilityForm
              trigger={
                <Button
                  size="lg"
                  className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
                >
                  Check your eligibility
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              }
              title="RPL Eligibility Assessment"
              description="Find out if you qualify for our RPL program in just a few minutes."
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link prefetch={false} href="/contact">
                Talk to our team
              </Link>
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-white">
                <BadgeCheck aria-hidden className="size-4 text-brand-bright" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="mb-3 flex size-10 items-center justify-center rounded-lg bg-brand-bright/15">
                <Icon aria-hidden className="size-5 text-brand-bright" />
              </span>
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-300">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
