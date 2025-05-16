import SectionCard from "@/components/section-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllSections } from "../action/courses";

export default async function ClientsFavourite() {
  const sections = await getAllSections();

  return (
    <section className="py-16 bg-[#F5F7FA] md:py-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Clients&apos; <span className="text-emerald-600">Favourite</span>
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The most in-demand qualifications our clients choose for recognition
            through RPL.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {sections.slice(0, 6).map((section) => (
          <SectionCard section={section} key={section.id} />
        ))}
      </div>

      <div className="pt-4 text-center">
        <Link href={"/qualifications"}>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-emerald-500 to-teal-500"
          >
            Explore All Industry
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
