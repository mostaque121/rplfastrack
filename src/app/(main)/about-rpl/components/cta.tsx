import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-brand sm:text-4xl">
            Ready to Start Your RPL Journey?
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl">
            Contact us today for a free initial consultation. Our RPL experts will guide you through
            the entire process.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="bg-brand hover:bg-brand-strong" size="lg" asChild>
              <Link prefetch={false} href="/contact">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link prefetch={false} href="/about-us">
                Learn About Our Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
