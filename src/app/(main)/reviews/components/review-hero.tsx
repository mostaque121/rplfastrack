import { PenLine } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";

export default function ReviewHero() {
  return (
    <PageHero
      title="What our clients say"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      intro={
        <p>
          Reviews from people who turned their work experience into a nationally recognised
          qualification with RPL Fast Track.
        </p>
      }
      actions={
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
        >
          <Link prefetch={false} href="/write-review">
            <PenLine aria-hidden className="mr-2 size-4" />
            Write a review
          </Link>
        </Button>
      }
    />
  );
}
