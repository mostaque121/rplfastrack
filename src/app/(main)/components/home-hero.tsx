import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";

import { ResponseForm } from "./form/response-form";

const STEPS = [
  { title: "Free eligibility check", text: "Tell us about your work history." },
  { title: "Show your experience", text: "We help you gather the evidence." },
  { title: "Get certified", text: "Receive your nationally recognised qualification." },
];

const TRUST = ["Nationally recognised", "100% online assessment", "Australia-wide"];

/**
 * Home hero: dark navy with a photo under a left-to-right overlay. Text on the left, the lead
 * form as a floating white card on the right. The navbar is transparent on top of it, so the
 * top padding includes the navbar height.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Background: flat navy, with a lighter navy slanted panel behind the form (desktop only). */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[48%] bg-white/6 [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block"
      />

      <div className="container mx-auto px-4 pt-32 pb-12 md:px-8 md:pt-36 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white">
                <span className="size-2 rounded-full bg-brand-bright" />
                Recognition of Prior Learning (RPL)
              </p>
              <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white md:text-6xl">
                Get a <span className="text-brand-bright">nationally recognised qualification</span>{" "}
                through RPL in Australia
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                Years on the job but no certificate? We turn your real-world experience into a
                qualification. No classrooms, no exams, no extra study.
              </p>
            </div>

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
                <Link prefetch={false} href="/about-rpl">
                  How RPL works
                </Link>
              </Button>
            </div>

            <ol className="grid gap-3 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:block sm:p-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-bright text-sm font-bold text-ink sm:mb-2">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-0.5 text-sm text-slate-300 sm:mt-1">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-white">
                  <BadgeCheck aria-hidden className="size-4 text-brand-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:justify-self-end">
            <ResponseForm />
          </div>
        </div>
      </div>
    </section>
  );
}
