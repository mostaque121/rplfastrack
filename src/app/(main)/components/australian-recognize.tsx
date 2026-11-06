import { ArrowRight, Banknote, BriefcaseBusiness, Globe2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Accent, SectionHeading } from "@/components/sections/section-heading";

const POINTS = [
  {
    icon: BriefcaseBusiness,
    title: "Equal recognition",
    text: "Aged care providers, childcare centres, community organisations and builders all treat an RPL qualification the same as one earned by studying, because it meets the same national standards.",
  },
  {
    icon: Globe2,
    title: "Count your overseas experience",
    text: "If you gained your skills abroad but have no Australian certificate, RPL can recognise them for jobs, licensing and skills assessments.",
  },
  {
    icon: Banknote,
    title: "A stronger case for a pay rise",
    text: "A formal qualification shows your skill level on paper, which gives you more to point to when applying for roles or negotiating pay.",
  },
];

/**
 * "Do employers accept RPL?" section. Answer-first for the common question; the three points
 * give the supporting reasons. Text first on mobile, photo second.
 */
export default function EmployerRecognition() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Recognised by employers"
              title={
                <>
                  Do Australian employers accept an <Accent>RPL qualification?</Accent>
                </>
              }
            />

            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-ink">
                Yes. An RPL qualification is a real, nationally recognised Australian qualification.
              </strong>{" "}
              It is issued by a registered training organisation and appears on the same national
              register as a qualification earned by studying, so employers have no reason to treat
              it differently.
            </p>

            <ul className="space-y-3">
              {POINTS.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              prefetch={false}
              href="/about-rpl"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand hover:text-brand-strong hover:underline"
            >
              Learn how RPL is recognised
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-xl lg:max-w-none">
            <div className="relative aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/employer-welcome.webp"
                alt="Aged-care manager warmly welcoming a newly qualified carer at the care facility"
                fill
                sizes="(min-width: 1024px) 416px, (min-width: 768px) 448px, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
              <p className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/95 p-3 text-sm font-semibold text-ink">
                <ShieldCheck aria-hidden className="size-6 shrink-0 text-brand" />
                Meets the same national standards as full-time study
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
