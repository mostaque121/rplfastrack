"use client";

import { ChevronDown, ChevronRight, Mail, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/config/contact";
import { useRPL } from "@/contexts/rpl-context";
import { cn } from "@/lib/utils";

import AdminSection from "./admin-section";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";

export default function Navbar() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="w-full">
      {/* Top bar with contact info */}
      <div className="w-full bg-slate-800 text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-8">
          <div className="flex flex-wrap justify-between gap-2 text-xs max-md:w-full md:justify-center md:gap-4 md:text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <Link prefetch={false} href={contactInfo.emailHref} className="hover:underline">
                {contactInfo.email}
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <Link prefetch={false} href={contactInfo.phoneHref} className="hover:underline">
                {contactInfo.phone}
              </Link>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2">
              <Link
                prefetch={false}
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="h-5 w-5 text-white" />
              </Link>
            </div>
            <EligibilityForm
              trigger={
                <Button size="sm" className="bg-white text-slate-800 hover:bg-gray-100">
                  Get Started
                </Button>
              }
              title="RPL Eligibility Assessment"
              description="Find out if you qualify for our RPL program in just a few minutes."
            />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
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
              <span className="tracking-tight text-nowrap whitespace-nowrap text-emerald-600">
                RPL FAST TRACK
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 lg:flex" ref={menuRef}>
            <Link
              prefetch={false}
              href="/"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-emerald-600",
                pathname === "/" && "text-emerald-600",
              )}
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
                    "flex cursor-pointer items-center gap-1 px-2 font-medium text-slate-700 hover:text-emerald-600",
                    pathname === "/courses" && "text-emerald-600",
                  )}
                >
                  Courses
                  <ChevronDown className="h-4 w-4" />
                </button>
              </Link>

              {/* First level dropdown */}
              <div
                className={cn(
                  "absolute top-full left-0 z-50 min-w-[200px] border border-gray-200 bg-white shadow-md transition-all duration-200",
                  activeMenu === "qualifications" ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                {sections?.map((subItem) => (
                  <div
                    key={subItem.title}
                    className="group/sub relative"
                    onMouseEnter={() => setActiveSubMenu(subItem.title)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <Link
                      prefetch={false}
                      href={`/section/${subItem.link}`}
                      className={cn(
                        "flex items-center justify-between border-b border-gray-200 px-2 py-2 text-sm font-medium text-slate-700 last:border-b-0 hover:bg-slate-50 hover:text-emerald-600",
                        pathname === `/section/${subItem.link}` && "text-emerald-600",
                      )}
                      onClick={handleMenuItemClick}
                    >
                      {subItem.title}
                      {subItem.courses && subItem.courses.length > 0 && (
                        <ChevronRight className="ml-4 h-4 w-4" />
                      )}
                    </Link>

                    {/* Second level dropdown */}
                    {subItem.courses && subItem.courses.length > 0 && (
                      <div
                        className={cn(
                          "absolute top-0 left-full z-50 min-w-[250px] border border-gray-200 bg-white shadow-md transition-all duration-200",
                          activeSubMenu === subItem.title
                            ? "visible opacity-100"
                            : "invisible opacity-0",
                        )}
                      >
                        {subItem.courses.map((subSubItem) => (
                          <Link
                            prefetch={false}
                            key={subSubItem.title}
                            href={`/courses/${subSubItem.link}`}
                            className={cn(
                              "block border-b border-gray-200 px-2 py-2 text-xs font-medium text-slate-700 last:border-b-0 hover:bg-slate-50 hover:text-emerald-600",
                              pathname === `/courses/${subSubItem.link}` && "text-emerald-600",
                            )}
                            onClick={handleMenuItemClick}
                          >
                            {subSubItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="group relative"
              onMouseEnter={() => setActiveMenu("about")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-2 font-medium text-slate-700 hover:text-emerald-600",
                )}
              >
                About
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* First level dropdown */}
              <div
                className={cn(
                  "absolute top-full left-0 z-50 min-w-[200px] border border-gray-200 bg-white shadow-md transition-all duration-200",
                  activeMenu === "about" ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                <Link
                  prefetch={false}
                  href={`/about-us`}
                  className={cn(
                    "flex items-center justify-between border-b border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 last:border-b-0 hover:bg-slate-50 hover:text-emerald-600",
                    pathname === "/about-us" && "text-emerald-600",
                  )}
                  onClick={handleMenuItemClick}
                >
                  About Us
                </Link>
                <Link
                  prefetch={false}
                  href={`/about-rpl`}
                  className={cn(
                    "flex items-center justify-between border-b border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 last:border-b-0 hover:bg-slate-50 hover:text-emerald-600",
                    pathname === "/about-rpl" && "text-emerald-600",
                  )}
                  onClick={handleMenuItemClick}
                >
                  About RPL
                </Link>
                <Link
                  prefetch={false}
                  href={`/faq`}
                  className={cn(
                    "flex items-center justify-between border-b border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 last:border-b-0 hover:bg-slate-50 hover:text-emerald-600",
                    pathname === "/faq" && "text-emerald-600",
                  )}
                  onClick={handleMenuItemClick}
                >
                  FAQ
                </Link>
              </div>
            </div>

            <Link
              prefetch={false}
              href="/contact"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-emerald-600",
                pathname === "/contact" && "text-emerald-600",
              )}
              onClick={handleMenuItemClick}
            >
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <button
              className="mx-auto flex h-8 max-w-md flex-1 cursor-pointer items-center justify-start rounded-full border border-input px-2 text-muted-foreground hover:bg-muted/50 md:px-3"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4 flex-shrink-0 md:mr-2" />
              <span className="hidden w-32 md:inline">Search here</span>
            </button>

            <AdminSection />

            {/* Mobile Menu - Only visible on mobile */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>

          {/* Search Modal */}
          <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      </div>
    </header>
  );
}
