import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

import { listGuides } from "../queries";
import { GuideCard } from "./guide-card";

/** A row of guide cards with a link to /guides. Renders nothing until guides are published. */
export async function GuidesBand({
  slugs,
  tone = "surface",
}: {
  /** Which guides to show, in order. */
  slugs: string[];
  tone?: "white" | "surface";
}) {
  const all = await listGuides();
  const guides = slugs.flatMap((slug) => all.filter((g) => g.slug === slug));
  if (!guides.length) return null;

  return (
    <section className={cn("py-14 md:py-20", tone === "white" ? "bg-white" : "bg-surface")}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="RPL guides"
            title={
              <>
                Learn more <Accent>before you apply</Accent>
              </>
            }
          />
          <Link
            prefetch={false}
            href="/guides"
            className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-strong hover:underline"
          >
            All guides
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.id}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
