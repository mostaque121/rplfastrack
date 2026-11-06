import { BadgeCheck, Clock, Laptop } from "lucide-react";
import Image from "@/components/cloudinary-image";

import { ResponseForm } from "@/app/(main)/components/form/response-form";
import { RichText } from "@/components/rich-text/rich-text";
import { PageHero } from "@/components/sections/page-hero";

interface HeroSectionProps {
  data: {
    title: string;
    code?: string | null;
    imageUrl: string;
    imageAlt?: string | null;
    heroIntro?: string | null;
    duration?: string | null;
  };
  section: {
    title: string;
    link: string;
  };
}
export default function QualificationHeroSection({ data, section }: HeroSectionProps) {
  return (
    <PageHero
      title={data.title}
      eyebrow={data.code ?? undefined}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: section.title, href: `/section/${section.link}` },
        { label: data.title },
      ]}
      intro={data.heroIntro ? <RichText html={data.heroIntro} /> : undefined}
      benefits={[
        { icon: Laptop, text: "100% online assessment, Australia-wide" },
        {
          icon: Clock,
          text: data.duration ? `Typically ${data.duration}` : "Fast-track: no classes or exams",
        },
        { icon: BadgeCheck, text: "Nationally recognised qualification" },
      ]}
      media={
        <Image
          src={data.imageUrl}
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)"
          alt={data.imageAlt || data.title}
          width={1500}
          height={720}
          preload
          className="w-full rounded-xl shadow-md"
        />
      }
      aside={<ResponseForm interest={data.title} />}
    />
  );
}
