import { ChevronDown } from "lucide-react";
import striptags from "striptags";

import { RichText } from "@/components/rich-text/rich-text";

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
 * (a Radix accordion unmounts closed answers). */
export function FaqSection({ title, faqs }: { title: string; faqs: FaqItem[] }) {
  if (!faqs.length) return null;
  return (
    <section className="w-full bg-[#F5F7FA] py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-emerald-700 md:text-3xl">{title}</h2>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-gray-900 hover:text-emerald-700 md:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                />
              </summary>
              <RichText html={faq.answer} className="px-5 pb-5 text-gray-700" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
