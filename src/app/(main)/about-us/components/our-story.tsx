import { Award, Clock } from "lucide-react";
import Image from "next/image";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const HIGHLIGHTS = [
  {
    icon: Award,
    title: "Nationally Recognised Qualifications",
    text: "Qualifications are issued by registered training organisations and sit within the Australian Qualifications Framework (AQF).",
  },
  {
    icon: Clock,
    title: "A Faster Path Than Study",
    text: "Skip the classroom. Your existing skills are assessed, so you avoid repeating training you do not need.",
  },
];

export default function OurStory() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      {/* Soft glow behind the text column. */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 size-96 rounded-full bg-brand-soft blur-3xl"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  Why we started <Accent>RPL Fast Track</Accent>
                </>
              }
              description="From skilled workers without a certificate to nationally recognised qualifications."
            />

            <div className="mt-8 space-y-4 text-lg text-gray-700">
              <p>
                RPL Fast Track started in 2020 with a simple observation: Australia is full of
                skilled people who learned their trade on the job but have no certificate to show
                for it. Recognition of Prior Learning (RPL) exists to fix exactly that, yet many
                people never find out they qualify, or give up because the process looks confusing.
              </p>
              <p>
                Today our team of RPL consultants explains the process in plain English, checks your
                eligibility for free, and helps you put together the evidence you need. Your
                application is then assessed by a registered training organisation, so the result is
                a qualification employers, licensing bodies and training providers accept.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-brand-subtle bg-brand-soft/60 p-5"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -bottom-6 -left-6 hidden h-3/4 w-3/4 rounded-2xl bg-linear-to-tr from-brand-strong to-brand opacity-25 md:block"
            />
            <div
              aria-hidden
              className="absolute -top-5 -right-5 hidden size-28 bg-[radial-gradient(var(--brand)_2px,transparent_2px)] bg-size-[16px_16px] opacity-40 md:block"
            />
            <Image
              src="/about-us-story.webp"
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="RPL Fast Track team discussing a client's RPL application"
              width={1200}
              height={800}
              className="relative rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 left-4 rounded-xl bg-white px-5 py-3 shadow-xl md:-right-4 md:left-auto">
              <p className="text-2xl font-bold text-brand">Since 2020</p>
              <p className="text-sm font-medium text-gray-600">Helping skilled workers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
