import Image from "@/components/cloudinary-image";

import { ResponseForm } from "@/app/(main)/components/form/response-form";
import { LucideIcon } from "@/components/icon/lucide-icon";
import { RichText } from "@/components/rich-text/rich-text";
import { HERO_TRUST_CHIPS, PageHero } from "@/components/sections/page-hero";

interface HeroSectionProps {
  data: {
    title: string;
    heroIntro?: string | null;
    imageUrl: string;
    imageAlt?: string | null;
    icon?: string | null;
  };
  courseCount: number;
}

export default function HeroSection({ data, courseCount }: HeroSectionProps) {
  return (
    <PageHero
      eyebrow={`${courseCount} nationally recognised ${courseCount === 1 ? "qualification" : "qualifications"}`}
      title={<>RPL for {data.title}</>}
      icon={
        data.icon && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <LucideIcon name={data.icon} className="size-6" />
          </span>
        )
      }
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: data.title },
      ]}
      intro={
        data.heroIntro ? (
          <RichText html={data.heroIntro} />
        ) : (
          <p>
            Already working in {data.title.toLowerCase()}? Recognition of Prior Learning (RPL) turns
            the skills you use every day into a nationally recognised qualification, assessed online
            by a registered training organisation.
          </p>
        )
      }
      chips={HERO_TRUST_CHIPS}
      media={
        <Image
          src={data.imageUrl}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={data.imageAlt || `${data.title} RPL qualifications`}
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
