import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";
import Link from "next/link";
import FaqHero from "./faq-hero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | RPL Service",
  description:
    "Find answers to common questions about our Recognition of Prior Learning (RPL) services, process, eligibility, and more.",
};

const faqs = [
  {
    value: "what-is-rpl",
    question: "What is Recognition of Prior Learning (RPL)?",
    answer: `Recognition of Prior Learning (RPL) is a process that assesses your existing skills and knowledge—
      gained through work, life, or informal training—and matches them to formal qualifications.`,
  },
  {
    value: "benefits",
    question: "What are the benefits of RPL?",
    answer: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Save time and money</li>
        <li>Get certified faster</li>
        <li>Boost career and salary potential</li>
        <li>Meet licensing or industry standards</li>
      </ul>
    ),
  },
  {
    value: "eligibility",
    question: "Who is eligible for RPL?",
    answer: (
      <>
        You may be eligible if you have:
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Relevant work experience</li>
          <li>Informal or formal learning/training</li>
          <li>Volunteer or community experience</li>
          <li>Skills from life experience</li>
        </ul>
      </>
    ),
  },
  {
    value: "process",
    question: "What is the RPL process?",
    answer: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Initial consultation</li>
        <li>Submit application</li>
        <li>Gather supporting evidence</li>
        <li>Assessment by qualified assessors</li>
        <li>Gap training if needed</li>
        <li>Receive your qualification</li>
      </ol>
    ),
  },
  {
    value: "evidence",
    question: "What type of evidence do I need?",
    answer: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Resume or CV</li>
        <li>References or letters</li>
        <li>Work samples, videos, or projects</li>
        <li>Certificates or transcripts</li>
      </ul>
    ),
  },
  {
    value: "qualifications",
    question: "What qualifications can I get through RPL?",
    answer: (
      <>
        We offer qualifications in:
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Business & Management</li>
          <li>IT & Digital</li>
          <li>Healthcare & Aged Care</li>
          <li>Community Services</li>
          <li>Construction, Trades, and more</li>
        </ul>
      </>
    ),
  },
  {
    value: "cost",
    question: "How much does RPL cost?",
    answer: `Costs depend on the qualification and complexity, but RPL is often cheaper than traditional study. Flexible payment plans are available.`,
  },
  {
    value: "duration",
    question: "How long does RPL take?",
    answer: `Usually 4–12 weeks, depending on your qualification and how quickly you provide evidence.`,
  },
  {
    value: "gap-training",
    question: "What if I have skill gaps?",
    answer: `No problem! We'll offer targeted training for areas you're missing—no need to repeat what you already know.`,
  },
  {
    value: "recognized",
    question: "Are RPL qualifications recognized?",
    answer: `Yes, they are nationally recognized under the Australian Qualifications Framework (AQF).`,
  },
  {
    value: "overseas",
    question: "Can I apply for RPL if I live overseas?",
    answer: `Yes, RPL is available for international applicants as long as you can provide the required evidence.`,
  },
  {
    value: "support",
    question: "Do you provide support during the RPL process?",
    answer: `Absolutely! Our team assists you at every step, from consultation to evidence collection and gap training.`,
  },
  {
    value: "language",
    question: "What if my documents are in another language?",
    answer: `Documents in other languages must be officially translated into English. We can guide you on this.`,
  },
  {
    value: "get-started",
    question: "How do I get started?",
    answer: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Contact us via website or phone</li>
        <li>Book a free consultation</li>
        <li>Talk with an RPL specialist</li>
        <li>Begin your application journey</li>
      </ol>
    ),
  },
];

export default function FAQPage() {
  return (
    <>
      <FaqHero />
      <div className="container max-w-4xl mx-auto py-12 px-4 md:py-24 md:px-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ value, question, answer }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left hover:text-emerald-600 text-lg font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Our RPL specialists are here to help you with any additional
            questions you may have.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-primary-foreground shadow hover:bg-emerald-700/90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
