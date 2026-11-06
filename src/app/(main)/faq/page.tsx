import { ChevronDown } from "lucide-react";

import { faqPageSchema } from "@/components/faq/faq-section";
import { ClosingCta } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/url";

import FaqHero from "./faq-hero";
import { RPL_FAQS } from "../components/faq-common";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RPL FAQs: Eligibility, Evidence, Cost and Timing",
  description:
    "Answers to common questions about Recognition of Prior Learning (RPL) in Australia: who is eligible, what evidence you need, how long it takes, what it costs and who issues your qualification.",
  alternates: {
    canonical: absoluteUrl("/faq"),
  },
  openGraph: {
    title: "RPL FAQs: Recognition of Prior Learning Questions Answered",
    description:
      "Who is eligible for RPL, what evidence you need, how long it takes and who issues your qualification.",
    url: absoluteUrl("/faq"),
    type: "website",
    images: [{ url: "/faq-hero.jpg", width: 1200, height: 630, alt: "RPL Fast Track FAQs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPL FAQs - RPL Fast Track",
    description:
      "Who is eligible for RPL, what evidence you need, how long it takes and who issues your qualification.",
    images: ["/faq-hero.jpg"],
  },
};

type Faq = { question: string; answer: string };

/** Shared answers from the home FAQ, so the same question never gets two different answers. */
const common = (question: string): Faq => {
  const faq = RPL_FAQS.find((f) => f.question === question);
  if (!faq) throw new Error(`FAQ not found: ${question}`);
  return faq;
};

// Plain-text answers: the same text is shown on the page and sent as FAQPage JSON-LD.
// Broker model: no prices, no RTO names, and no promises on the RTO's behalf.
const GROUPS: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "about-rpl",
    title: "About RPL",
    faqs: [
      common("What is Recognition of Prior Learning (RPL)?"),
      common("Is an RPL qualification the same as one earned by studying?"),
      common("Can I get a qualification through RPL online?"),
      {
        question: "What qualifications can I get through RPL?",
        answer:
          "Certificates, diplomas and advanced diplomas across industries such as aged care and disability, community services, construction, automotive, business, hospitality and training. Browse the courses page to find the qualification that matches your work.",
      },
      {
        question: "Who issues my qualification?",
        answer:
          "A registered training organisation (RTO) assesses your evidence and issues the qualification. RPL Fast Track is a referral partner: we match you with a suitable RTO and help you prepare your application and evidence.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and evidence",
    faqs: [
      common("Who is eligible for RPL?"),
      common("What evidence do I need for RPL?"),
      common("Can my overseas work experience count?"),
      {
        question: "What if my documents are in another language?",
        answer:
          "Documents in other languages usually need a certified English translation. Tell us what you have and we will let you know what needs translating.",
      },
      {
        question: "What if I have skill gaps?",
        answer:
          "If your evidence does not cover every unit, the assessor may ask for more information or recommend some extra training for the missing units. You only cover the gap, not the whole course.",
      },
    ],
  },
  {
    id: "process",
    title: "Process, time and cost",
    faqs: [
      {
        question: "What is the RPL process?",
        answer:
          "There are four steps: a free eligibility check, gathering your evidence, an assessment by a registered training organisation, and receiving your qualification. We guide you from the first call to your certificate.",
      },
      common("How long does RPL take?"),
      common("What does RPL cost?"),
      {
        question: "Do you help during the RPL process?",
        answer:
          "Yes. A consultant helps you choose the right qualification, explains which evidence to collect and keeps in touch with you until your assessment is finished.",
      },
      {
        question: "How do I get started?",
        answer:
          "Complete the free eligibility check on this website, or call or WhatsApp us. A consultant will contact you to talk about your experience and the qualification it could lead to.",
      },
    ],
  },
];

const faqSchema = faqPageSchema(
  GROUPS.flatMap((group) => group.faqs).map((faq, i) => ({ id: String(i), ...faq })),
);

/** Full FAQ page. Native <details>, so every answer is in the HTML (a Radix accordion unmounts closed answers). */
export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      <FaqHero />
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <nav aria-label="FAQ topics" className="flex flex-wrap gap-2">
            {GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-brand-subtle bg-brand-soft px-4 py-2 text-sm font-medium text-brand-strong transition-colors hover:bg-brand-subtle"
              >
                {group.title}
              </a>
            ))}
          </nav>

          {GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink md:text-3xl">{group.title}</h2>
              <div className="mt-5 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                {group.faqs.map((faq) => (
                  <details key={faq.question} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink hover:text-brand-strong md:px-6 md:text-lg [&::-webkit-details-marker]:hidden">
                      <h3>{faq.question}</h3>
                      <ChevronDown
                        aria-hidden
                        className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-gray-700 md:px-6">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
