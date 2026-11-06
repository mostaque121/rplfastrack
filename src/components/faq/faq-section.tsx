import { ChevronDown } from "lucide-react";
import striptags from "striptags";

import { RichText } from "@/components/rich-text/rich-text";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

import type { FAQPage, WithContext } from "schema-dts";

export type FaqItem = { id: string; question: string; answer: string };

/** FAQPage JSON-LD for the same FAQs the page shows. */
export function faqPageSchema(faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: striptags(faq.answer).trim() },
    })),
  };
}

/** Course/section FAQs. Native <details>, so every answer is in the HTML
 * (a Radix accordion unmounts closed answers). `tone` picks the background so the section
 * never matches its neighbours. */
export function FaqSection({
  title,
  faqs,
  tone = "surface",
}: {
  title: string;
  faqs: FaqItem[];
  tone?: "white" | "surface";
}) {
  if (!faqs.length) return null;
  return (
    <section className={cn("w-full py-14 md:py-24", tone === "white" ? "bg-white" : "bg-surface")}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                {title.replace(/:\s*FAQs?$/i, "")} <Accent>FAQs</Accent>
              </>
            }
            description="Straight answers to the questions people ask before they apply."
          />
          <div className="mt-10 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            {faqs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink hover:text-brand-strong md:px-6 md:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <RichText html={faq.answer} className="px-5 pb-5 text-gray-700 md:px-6" />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
