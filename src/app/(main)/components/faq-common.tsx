import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FaqCommon() {
  return (
    <section className="w-full bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked <span className="text-brand">Questions</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our RPL services
            </p>
          </div>
        </div>
        <div className="mx-auto">
          {/* Changed to grid with 2 columns on large screens */}
          <div className="grid grid-cols-1 items-start gap-6 bg-transparent lg:grid-cols-2">
            {/* First column */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    What is Recognition of Prior Learning (RPL)?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    Recognition of Prior Learning (RPL) is a process that assesses your existing
                    skills, knowledge, and experience gained through formal or informal learning,
                    work experience, or life experiences. It allows you to receive formal
                    recognition and qualifications without having to complete all the standard
                    coursework.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    How does the RPL process work?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    Our RPL process involves several steps: 1) Initial consultation to assess your
                    eligibility, 2) Collection of evidence of your skills and experience, 3)
                    Assessment of your evidence against qualification standards, 4) Gap training if
                    required, and 5) Issuance of your qualification or statement of attainment. Our
                    RPL specialists will guide you through each step.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    Who is eligible for RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    Anyone with relevant skills, knowledge, and experience in their industry can
                    apply for RPL. You need to be able to provide evidence of your competency in the
                    areas related to your desired qualification. This could be through work
                    experience, previous training, life experiences, or a combination of these.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b-0">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    What documents do I need to provide for RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    Required documentation typically includes: resume/CV, job descriptions,
                    references from employers, certificates from previous training, work samples,
                    performance reviews, and any other evidence that demonstrates your skills and
                    knowledge. Our RPL assessors will help you identify the most relevant
                    documentation for your specific case.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Second column */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    How long does the RPL process take?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    The duration of the RPL process varies depending on the qualification sought and
                    the completeness of your evidence. Typically, it can take anywhere from 4 to 12
                    weeks. Simple assessments with comprehensive evidence can be completed faster,
                    while complex qualifications or cases requiring additional evidence may take
                    longer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    What are the costs involved in RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    RPL costs vary depending on the qualification level and complexity. We offer
                    competitive pricing with flexible payment options. The initial consultation is
                    free, and we provide a detailed quote before proceeding. RPL is typically more
                    cost-effective than completing a full course. Contact us for a personalized
                    quote based on your specific needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7" className="border-b border-gray-200">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    What qualifications can I get through RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    We offer RPL for a wide range of nationally recognized qualifications across
                    various industries including business, management, construction, engineering,
                    information technology, community services, and more. From Certificate II to
                    Advanced Diploma levels, our RPL services cover numerous vocational
                    qualifications. Check our qualifications page for a complete list.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8" className="border-b-0">
                  <AccordionTrigger className="px-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-brand">
                    How do I get started with RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-5 text-gray-600">
                    Getting started is easy! Simply contact us through our online form, email, or
                    phone to schedule a free initial consultation. During this consultation, our RPL
                    specialists will assess your eligibility, explain the process in detail, and
                    help you identify the most suitable qualification pathway based on your
                    experience and career goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link prefetch={false} href={"/contact"}>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-brand to-brand-strong text-white"
            >
              Have more questions? Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
