"use client";

import { ArrowRight, ChevronDown, Mail, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { WhatsAppIcon } from "@/components/icon/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactInfo } from "@/config/contact";
import { useRPL } from "@/contexts/rpl-context";
import { cn } from "@/lib/utils";

const row =
  "flex items-center rounded-lg px-3 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/10";
const rowActive = "bg-white/10 text-brand-bright";

const LINKS_AFTER_COURSES = [
  { href: "/about-rpl", label: "About RPL" },
  { href: "/guides", label: "RPL Guides" },
  { href: "/about-us", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(
    pathname.startsWith("/section") || pathname.startsWith("/courses"),
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections?.forEach((item) => {
      initial[item.title] = !!item.courses?.some((course) => pathname.endsWith(course.link));
    });
    return initial;
  });

  const close = () => setIsOpen(false);
  const toggleSection = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-white/10 hover:text-current">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[88%] max-w-sm gap-0 overflow-hidden border-l-white/10 bg-ink p-0 text-white"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Site navigation</SheetDescription>
          </SheetHeader>

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
            <Image
              src="/fav.png"
              sizes="32px"
              alt=""
              width={512}
              height={512}
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold tracking-tight">RPL FAST TRACK</span>
          </div>

          {/* Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            <Link
              prefetch={false}
              href="/"
              className={cn(row, pathname === "/" && rowActive)}
              onClick={close}
            >
              Home
            </Link>

            <Collapsible open={coursesOpen} onOpenChange={setCoursesOpen}>
              <div className="flex items-center">
                <Link
                  prefetch={false}
                  href="/courses"
                  className={cn(row, "flex-1", pathname === "/courses" && rowActive)}
                  onClick={close}
                >
                  Courses
                </Link>
                <CollapsibleTrigger
                  aria-label="Show course categories"
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg text-white/80 hover:bg-white/10"
                >
                  <ChevronDown
                    className={cn("size-5 transition-transform", coursesOpen && "rotate-180")}
                  />
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-1 ml-4 space-y-0.5 border-l border-white/10 pl-2">
                {sections?.map((section) => {
                  const hasCourses = !!section.courses && section.courses.length > 0;
                  const sectionHref = `/section/${section.link}`;
                  return (
                    <Collapsible
                      key={section.title}
                      open={!!openSections[section.title]}
                      onOpenChange={() => toggleSection(section.title)}
                    >
                      <div className="flex items-center">
                        <Link
                          prefetch={false}
                          href={sectionHref}
                          className={cn(
                            "flex-1 rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-200 hover:bg-white/10",
                            pathname === sectionHref && rowActive,
                          )}
                          onClick={close}
                        >
                          {section.title}
                        </Link>
                        {hasCourses && (
                          <CollapsibleTrigger
                            aria-label={`Show ${section.title} courses`}
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10"
                          >
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                openSections[section.title] && "rotate-180",
                              )}
                            />
                          </CollapsibleTrigger>
                        )}
                      </div>

                      {hasCourses && (
                        <CollapsibleContent className="ml-3 space-y-0.5 border-l border-white/10 pl-2">
                          {section.courses?.map((course) => {
                            const href = `/courses/${course.link}`;
                            return (
                              <Link
                                prefetch={false}
                                key={course.title}
                                href={href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white",
                                  pathname === href && rowActive,
                                )}
                                onClick={close}
                              >
                                {course.title}
                              </Link>
                            );
                          })}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>

            {LINKS_AFTER_COURSES.map(({ href, label }) => (
              <Link
                prefetch={false}
                key={href}
                href={href}
                className={cn(row, pathname === href && rowActive)}
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Footer: main action + contact */}
          <div className="space-y-3 border-t border-white/10 bg-white/5 px-5 py-4">
            <EligibilityForm
              trigger={
                <Button className="group h-11 w-full bg-cta text-base text-white hover:bg-cta-strong">
                  Free eligibility check
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              }
              title="RPL Eligibility Assessment"
              description="Find out if you qualify for our RPL program in just a few minutes."
            />
            <div className="grid grid-cols-3 gap-2">
              <Link
                prefetch={false}
                href={contactInfo.phoneHref}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/15 py-2 text-xs font-medium hover:bg-white/10"
                onClick={close}
              >
                <Phone className="size-4 text-brand-bright" />
                Call
              </Link>
              <Link
                prefetch={false}
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-lg border border-white/15 py-2 text-xs font-medium hover:bg-white/10"
                onClick={close}
              >
                <WhatsAppIcon className="size-4 text-brand-bright" />
                WhatsApp
              </Link>
              <Link
                prefetch={false}
                href={contactInfo.emailHref}
                className="flex flex-col items-center gap-1 rounded-lg border border-white/15 py-2 text-xs font-medium hover:bg-white/10"
                onClick={close}
              >
                <Mail className="size-4 text-brand-bright" />
                Email
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
