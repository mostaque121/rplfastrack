"use client";

import { ArrowRight, ChevronDown, ChevronRight, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/config/contact";
import { useRPL } from "@/contexts/rpl-context";
import { cn } from "@/lib/utils";

import AdminSection from "./admin-section";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";

// Dropdowns: the outer wrapper has top padding so the panel sits a little below the bar while the
// hover area stays continuous; the inner card carries the look.
const dropdownCard =
  "rounded-xl border border-gray-200 bg-white p-2 shadow-xl shadow-ink/15 ring-1 ring-black/5";
const dropdownItem =
  "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-soft hover:text-brand";
const dropdownShown = (open: boolean) =>
  open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0";

export default function Navbar() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Every public page starts with a dark hero (PageHero, or the home hero) with top padding for
  // the bar: it is transparent on top of the hero, then frosted navy once scrolled.
  const linkTone = "text-white/90 hover:text-white";
  const activeTone = "text-white";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle clicking on any menu item - close all dropdowns
  const handleMenuItemClick = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
  };

  return (
    <header className="contents">
      {/* Main navigation: sticky; overlaps the hero */}
      <div
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-200",
          "-mb-16 md:-mb-18",
          scrolled ? "bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between md:h-18">
            <div className="flex items-center">
              <Link
                prefetch={false}
                href="/"
                className="mr-8 flex items-center gap-1 text-lg font-bold md:text-xl"
              >
                <Image
                  src={"/fav.png"}
                  sizes="40px"
                  alt="logo"
                  width={512}
                  height={512}
                  className="h-7 w-auto object-contain md:h-10"
                />
                <span className="tracking-tight text-nowrap whitespace-nowrap text-white">
                  RPL FAST TRACK
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-6 lg:flex" ref={menuRef}>
              <Link
                prefetch={false}
                href="/"
                className={cn("px-2 font-medium", linkTone, pathname === "/" && activeTone)}
              >
                Home
              </Link>

              <div
                className="group relative"
                onMouseEnter={() => setActiveMenu("qualifications")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link prefetch={false} href={"/courses"}>
                  <button
                    className={cn(
                      "flex cursor-pointer items-center gap-1 px-2 font-medium",
                      linkTone,
                      pathname === "/courses" && activeTone,
                    )}
                  >
                    Courses
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </Link>

                {/* First level dropdown */}
                <div
                  className={cn(
                    "absolute top-full left-0 z-50 pt-4 transition-all duration-200",
                    dropdownShown(activeMenu === "qualifications"),
                  )}
                >
                  <div className={cn(dropdownCard, "w-72")}>
                    {sections?.map((subItem) => (
                      <div
                        key={subItem.title}
                        className="relative"
                        onMouseEnter={() => setActiveSubMenu(subItem.title)}
                        onMouseLeave={() => setActiveSubMenu(null)}
                      >
                        <Link
                          prefetch={false}
                          href={`/section/${subItem.link}`}
                          className={cn(
                            dropdownItem,
                            (pathname === `/section/${subItem.link}` ||
                              activeSubMenu === subItem.title) &&
                              "bg-brand-soft text-brand",
                          )}
                          onClick={handleMenuItemClick}
                        >
                          {subItem.title}
                          {subItem.courses && subItem.courses.length > 0 && (
                            <ChevronRight className="size-4 shrink-0 text-brand" />
                          )}
                        </Link>

                        {/* Second level dropdown */}
                        {subItem.courses && subItem.courses.length > 0 && (
                          <div
                            className={cn(
                              "absolute -top-2 left-full z-50 pl-3 transition-all duration-200",
                              dropdownShown(activeSubMenu === subItem.title),
                            )}
                          >
                            <div className={cn(dropdownCard, "max-h-[70vh] w-80 overflow-y-auto")}>
                              {subItem.courses.map((subSubItem) => (
                                <Link
                                  prefetch={false}
                                  key={subSubItem.title}
                                  href={`/courses/${subSubItem.link}`}
                                  className={cn(
                                    dropdownItem,
                                    "text-[13px]",
                                    pathname === `/courses/${subSubItem.link}` &&
                                      "bg-brand-soft text-brand",
                                  )}
                                  onClick={handleMenuItemClick}
                                >
                                  {subSubItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="group relative"
                onMouseEnter={() => setActiveMenu("about")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className={cn("flex items-center gap-1 px-2 font-medium", linkTone)}>
                  About
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* First level dropdown */}
                <div
                  className={cn(
                    "absolute top-full left-0 z-50 pt-4 transition-all duration-200",
                    dropdownShown(activeMenu === "about"),
                  )}
                >
                  <div className={cn(dropdownCard, "w-52")}>
                    <Link
                      prefetch={false}
                      href="/about-us"
                      className={cn(
                        dropdownItem,
                        pathname === "/about-us" && "bg-brand-soft text-brand",
                      )}
                      onClick={handleMenuItemClick}
                    >
                      About Us
                    </Link>
                    <Link
                      prefetch={false}
                      href="/about-rpl"
                      className={cn(
                        dropdownItem,
                        pathname === "/about-rpl" && "bg-brand-soft text-brand",
                      )}
                      onClick={handleMenuItemClick}
                    >
                      About RPL
                    </Link>
                    <Link
                      prefetch={false}
                      href="/faq"
                      className={cn(
                        dropdownItem,
                        pathname === "/faq" && "bg-brand-soft text-brand",
                      )}
                      onClick={handleMenuItemClick}
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                prefetch={false}
                href="/guides"
                className={cn(
                  "px-2 font-medium",
                  linkTone,
                  pathname.startsWith("/guides") && activeTone,
                )}
                onClick={handleMenuItemClick}
              >
                Guides
              </Link>

              <Link
                prefetch={false}
                href="/contact"
                className={cn("px-2 font-medium", linkTone, pathname === "/contact" && activeTone)}
                onClick={handleMenuItemClick}
              >
                Contact
              </Link>
            </nav>

            {/* Right side: phone, search, CTA */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                prefetch={false}
                href={contactInfo.phoneHref}
                className="hidden items-center gap-1.5 text-sm font-semibold text-white xl:flex"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </Link>

              <button
                aria-label="Search"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </button>

              <div className="hidden md:block">
                <EligibilityForm
                  trigger={
                    <Button className="group bg-cta text-white hover:bg-cta-strong">
                      Free eligibility check
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  }
                  title="RPL Eligibility Assessment"
                  description="Find out if you qualify for our RPL program in just a few minutes."
                />
              </div>

              <AdminSection />

              {/* Mobile Menu - Only visible on mobile */}
              <div className="text-white lg:hidden">
                <MobileMenu />
              </div>
            </div>

            {/* Search Modal */}
            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}
