import { ClipboardCheck, MessageSquare, PhoneCall } from "lucide-react";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const STEPS = [
  {
    icon: MessageSquare,
    title: "You get in touch",
    text: "Send the form, call or message us. Tell us a little about the work you have done.",
  },
  {
    icon: PhoneCall,
    title: "We call you back",
    text: "An RPL consultant talks through your experience and the qualifications that could fit.",
  },
  {
    icon: ClipboardCheck,
    title: "You get a clear plan",
    text: "We explain the evidence you need and the next steps, with no pressure to continue.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="relative overflow-hidden bg-surface py-14 md:py-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--brand-subtle)_1.5px,transparent_1.5px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div className="relative container mx-auto px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="What happens next"
          title={
            <>
              What to expect after you <Accent>get in touch</Accent>
            </>
          }
        />

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-subtle hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute top-3 right-5 text-6xl leading-none font-bold text-brand-soft select-none"
              >
                0{i + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-strong text-white shadow-lg shadow-brand/25">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="relative mt-5 text-xl font-bold text-ink">{title}</h3>
              <p className="relative mt-2 text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
