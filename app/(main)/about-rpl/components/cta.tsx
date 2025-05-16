import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 mx-auto md:px-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl text-emerald-600 font-bold tracking-tighter sm:text-4xl">
            Ready to Start Your RPL Journey?
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl">
            Contact us today for a free initial consultation. Our RPL experts
            will guide you through the entire process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              size="lg"
              asChild
            >
              <Link href="/contact">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about-us">Learn About Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
