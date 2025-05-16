import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function EligibilityForRPL() {
  return (
    <section className="w-full bg-[#F5F7FA]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative h-[350px] w-full rounded-lg overflow-hidden">
            <Image
              src="/eligibility.jpg"
              alt="RPL eligibility"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl text-emerald-600 font-bold tracking-tighter">
              Who is Eligible for RPL?
            </h2>
            <p className="text-gray-700">
              RPL is suitable for individuals who have gained skills and
              knowledge through:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Work experience in relevant industries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Previous formal or informal training</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Volunteer work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>
                  Life experiences that have developed relevant skills
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Overseas qualifications or experience</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              There are no formal prerequisites for RPL, but you need to be able
              to provide evidence of your skills and knowledge that match the
              requirements of your desired qualification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
