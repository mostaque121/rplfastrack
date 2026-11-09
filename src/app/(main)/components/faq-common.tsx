import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { faqPageSchema } from "@/components/faq/faq-section";
import { Accent, SectionHeading } from "@/components/sections/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";

// Plain-text answers: the same text is shown on the page and sent as FAQPage JSON-LD.
// Each answer starts with the direct answer, then adds detail. No prices (broker model).
export const RPL_FAQS = [
  {
    question: "What is Recognition of Prior Learning (RPL)?",
    answer:
      "RPL is a formal assessment that recognises the skills and experience you already have and turns them into a nationally recognised Australian qualification. You show an assessor evidence of your work instead of completing the full course.",
  },
  {
    question: "Can I get a qualification through RPL online?",
    answer:
      "Yes. The whole process is online and Australia-wide. You upload your evidence and speak with your assessor by phone or video, so you don't need to attend a classroom or sit an exam.",
  },
  {
    question: "Who is eligible for RPL?",
    answer:
      "Anyone with real, relevant work experience in the industry can apply. This can come from paid work, volunteering, a family business, previous training or overseas jobs. The free eligibility check tells you in a few minutes whether you are likely to qualify.",
  },
  {
    question: "How long does RPL take?",
    answer:
      "It depends on the qualification and how quickly you can gather your evidence. Most people finish in about 4 to 6 weeks. If you have your documents ready, it can be faster.",
  },
  {
    question: "What does RPL cost?",
    answer:
      "The cost depends on the qualification level and how much evidence is needed, so we don't publish one price. RPL is usually much cheaper than studying the full course, and the eligibility check is free with no obligation.",
  },
  {
    question: "What evidence do I need for RPL?",
    answer:
      "Typically a resume, references from employers or supervisors, payslips or contracts, photos or samples of your work, and any previous certificates or tickets. You also need 100 points of ID. We help you work out which evidence suits your qualification.",
  },
  {
    question: "Is an RPL qualification the same as one earned by studying?",
    answer:
      "Yes. It is issued by a registered training organisation, sits on the same national register, and has the same value to employers and licensing bodies as a qualification earned in a classroom.",
  },
  {
    question: "Can my overseas work experience count?",
    answer:
      "Often, yes. Skills you gained working overseas can be assessed against the Australian standard. You will need evidence such as references, employment records and work samples, and we can help you gather it.",
  },
];

const faqSchema = faqPageSchema(RPL_FAQS.map((faq, i) => ({ id: String(i), ...faq })));

/**
 * Home-page FAQ: one card, two columns on large screens. Native <details> so every
 * answer is in the HTML (good for Google and AI answers) and needs no JavaScript.
 */
export default function FaqCommon() {
  return (
    <section className="w-full bg-white py-14 md:py-24">
      <JsonLd data={faqSchema} />
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Common questions about <Accent>RPL</Accent>
            </>
          }
          description="Straight answers about cost, time, evidence and eligibility."
        />

        {/* One card; two columns from lg. The 1px grid gap shows the grey as dividers. */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 shadow-lg lg:grid-cols-2">
          {RPL_FAQS.map((faq) => (
            <details key={faq.question} className="group bg-white">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink hover:text-brand md:px-6 md:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-gray-600 md:px-6">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group h-12 bg-cta px-6 text-base text-white hover:bg-cta-strong"
          >
            <Link prefetch={false} href="/contact">
              Have more questions? Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
