import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { Button } from "@/components/ui/button";

import { RPL_STEPS } from "@/components/sections/rpl-steps";

const TRUST = ["Nationally recognised", "100% online assessment", "Free eligibility check"];

/**
 * About RPL hero: dark navy, text on the left and a "RPL in 4 steps" summary card on the right.
 * The navbar is transparent on top of it (see DARK_HERO_PATHS in the navbar), so the top padding
 * includes the navbar height.
 */
export default function AboutRplHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Slanted band across the bottom-left, a different shape from the other dark heroes. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-2/5 bg-white/6 [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-1/3 -z-10 size-80 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container mx-auto px-4 pt-32 pb-12 md:px-8 md:pt-36 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
          <div className="space-y-7">
            <div className="[&_a]:text-brand-bright [&_a:hover]:text-white [&_li>span]:text-slate-300 [&_svg]:text-slate-400">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "What is RPL?" }]} />
            </div>

            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white md:text-5xl lg:text-6xl">
              What is <span className="text-brand-bright">Recognition of Prior Learning</span>{" "}
              (RPL)?
            </h1>

            <p className="max-w-2xl text-lg text-slate-300">
              RPL turns the skills and experience you already have into a nationally recognised
              Australian qualification. You show an assessor evidence of your work instead of
              sitting through a course. Here is how it works, who can apply and what you need.
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
                <Link prefetch={false} href="#rpl-process">
                  See the RPL process
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

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            <p className="text-sm font-semibold tracking-wider text-brand-bright uppercase">
              RPL in 4 steps
            </p>
            <ol className="mt-4 space-y-4">
              {RPL_STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-bright text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="text-sm text-slate-300">{step.short}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
