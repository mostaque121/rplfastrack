import { Award, BookOpen, Lightbulb } from "lucide-react";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Evidence-based assessment",
    text: "Your existing skills are assessed against the national standard for the qualification.",
  },
  {
    icon: Award,
    title: "Nationally recognised",
    text: "The result is a formal qualification recognised by employers and licensing bodies across Australia.",
  },
  {
    icon: Lightbulb,
    title: "Flexible pathways",
    text: "RPL can lead to a full qualification, or to credit towards further study.",
  },
];

export default function WhatIsRPL() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 size-96 rounded-full bg-brand-soft blur-3xl"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="RPL explained"
              title={
                <>
                  RPL means your experience <Accent>counts as learning</Accent>
                </>
              }
            />

            {/* Plain-language definition, written to be quoted by search and AI answers. */}
            <p className="mt-8 rounded-2xl border border-brand-subtle bg-brand-soft/60 p-5 text-lg text-ink">
              <strong className="font-semibold text-brand-strong">In short:</strong> Recognition of
              Prior Learning (RPL) is an assessment that recognises the skills and knowledge you
              have gained through work, training and life, and turns them into a nationally
              recognised qualification.
            </p>

            <div className="mt-6 space-y-4 text-lg text-gray-700">
              <p>
                Learning does not only happen in a classroom. Your work experience, volunteer
                activities, community involvement and self-directed learning all build real
                competencies, and RPL gives you formal credit for them.
              </p>
              <p>
                Through RPL you are recognised for what you already know, without relearning it.
                That saves time and study costs, and the qualification is issued by a registered
                training organisation under the Australian Qualifications Framework (AQF).
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:pt-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border border-gray-200 bg-surface p-6 transition-all duration-300 hover:border-brand-subtle hover:bg-white hover:shadow-lg"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-gray-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
