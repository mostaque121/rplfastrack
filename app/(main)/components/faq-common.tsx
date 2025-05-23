import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FaqCommon() {
  return (
    <section className="w-full bg-[#F5F7FA] md:py-24 py-16 ">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked{" "}
              <span className="text-emerald-600">Questions</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find answers to common questions about our RPL services
            </p>
          </div>
        </div>
        <div className="mx-auto ">
          {/* Changed to grid with 2 columns on large screens */}
          <div className="grid grid-cols-1 items-start bg-transparent lg:grid-cols-2 gap-6">
            {/* First column */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 py-5 text-lg text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    What is Recognition of Prior Learning (RPL)?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    Recognition of Prior Learning (RPL) is a process that
                    assesses your existing skills, knowledge, and experience
                    gained through formal or informal learning, work experience,
                    or life experiences. It allows you to receive formal
                    recognition and qualifications without having to complete
                    all the standard coursework.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    How does the RPL process work?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    Our RPL process involves several steps: 1) Initial
                    consultation to assess your eligibility, 2) Collection of
                    evidence of your skills and experience, 3) Assessment of
                    your evidence against qualification standards, 4) Gap
                    training if required, and 5) Issuance of your qualification
                    or statement of attainment. Our RPL specialists will guide
                    you through each step.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    Who is eligible for RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    Anyone with relevant skills, knowledge, and experience in
                    their industry can apply for RPL. You need to be able to
                    provide evidence of your competency in the areas related to
                    your desired qualification. This could be through work
                    experience, previous training, life experiences, or a
                    combination of these.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-4"
                  className="border-b-0 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    What documents do I need to provide for RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    Required documentation typically includes: resume/CV, job
                    descriptions, references from employers, certificates from
                    previous training, work samples, performance reviews, and
                    any other evidence that demonstrates your skills and
                    knowledge. Our RPL assessors will help you identify the most
                    relevant documentation for your specific case.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Second column */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-5"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    How long does the RPL process take?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    The duration of the RPL process varies depending on the
                    qualification sought and the completeness of your evidence.
                    Typically, it can take anywhere from 4 to 12 weeks. Simple
                    assessments with comprehensive evidence can be completed
                    faster, while complex qualifications or cases requiring
                    additional evidence may take longer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-6"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    What are the costs involved in RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    RPL costs vary depending on the qualification level and
                    complexity. We offer competitive pricing with flexible
                    payment options. The initial consultation is free, and we
                    provide a detailed quote before proceeding. RPL is typically
                    more cost-effective than completing a full course. Contact
                    us for a personalized quote based on your specific needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-7"
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    What qualifications can I get through RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    We offer RPL for a wide range of nationally recognized
                    qualifications across various industries including business,
                    management, construction, engineering, information
                    technology, community services, and more. From Certificate
                    II to Advanced Diploma levels, our RPL services cover
                    numerous vocational qualifications. Check our qualifications
                    page for a complete list.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-8"
                  className="border-b-0 dark:border-gray-800"
                >
                  <AccordionTrigger className="px-6 text-lg py-5 text-left font-medium text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    How do I get started with RPL?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0 text-gray-600 dark:text-gray-400">
                    Getting started is easy! Simply contact us through our
                    online form, email, or phone to schedule a free initial
                    consultation. During this consultation, our RPL specialists
                    will assess your eligibility, explain the process in detail,
                    and help you identify the most suitable qualification
                    pathway based on your experience and career goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link href={"/contact"}>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
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
