import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function EligibilityForRPL() {
  return (
    <section className="w-full bg-surface">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-[350px] w-full overflow-hidden rounded-lg">
            <Image
              src="/eligibility.webp"
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="RPL eligibility"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-brand">
              Who is Eligible for RPL?
            </h2>
            <p className="text-gray-700">
              RPL is suitable for individuals who have gained skills and knowledge through:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-brand" />
                <span>Work experience in relevant industries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-brand" />
                <span>Previous formal or informal training</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-brand" />
                <span>Volunteer work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-brand" />
                <span>Life experiences that have developed relevant skills</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 text-brand" />
                <span>Overseas qualifications or experience</span>
              </li>
            </ul>
            <p className="mt-4 text-gray-700">
              There are no formal prerequisites for RPL, but you need to be able to provide evidence
              of your skills and knowledge that match the requirements of your desired
              qualification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
