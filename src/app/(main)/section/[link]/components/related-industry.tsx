import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LucideIcon } from "@/components/icon/lucide-icon";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";

type Industry = {
  id: string;
  link: string;
  title: string;
  imageUrl: string;
  icon?: string | null;
  courses?: { id: string }[];
};

const SHOWN_INDUSTRIES = 4;

/** Links to the other industries (never the current one), for internal linking. */
export default function RelatedIndustry({
  industries,
  currentLink,
  tone = "white",
}: {
  industries: Industry[];
  currentLink: string;
  tone?: "white" | "surface";
}) {
  const others = industries.filter((industry) => industry.link !== currentLink);
  if (others.length === 0) return null;

  return (
    <section className={tone === "white" ? "bg-white py-14 md:py-24" : "bg-surface py-14 md:py-24"}>
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="More industries"
          title={
            <>
              Explore RPL in <Accent>other industries</Accent>
            </>
          }
          description="RPL works across many trades and services. Find the qualifications for your field."
        />

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {others.slice(0, SHOWN_INDUSTRIES).map((industry) => (
            <li key={industry.id}>
              <Link
                prefetch={false}
                href={`/section/${industry.link}`}
                className="group relative block aspect-4/5 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <Image
                  src={industry.imageUrl}
                  alt={`${industry.title} RPL qualifications`}
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <span>
                    <span className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">
                      <LucideIcon
                        name={industry.icon}
                        className="size-5 shrink-0 text-brand-bright"
                      />
                      {industry.title}
                    </span>
                    {industry.courses && (
                      <span className="mt-0.5 block text-xs text-slate-300">
                        {industry.courses.length}{" "}
                        {industry.courses.length === 1 ? "qualification" : "qualifications"}
                      </span>
                    )}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
          >
            <Link prefetch={false} href="/courses">
              View all industries
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
