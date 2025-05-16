"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Mail, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import MobileMenu from "./mobile-menu";
import { useRPL } from "./rpl-context";
import SearchModal from "./search-modal";

export default function Navbar() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const facebookPage = process.env.NEXT_PUBLIC_FACEBOOK_PAGE;

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
      <div className="w-full bg-slate-800 text-white ">
        <div className="container mx-auto  py-2 px-4 md:px-8 flex justify-between items-center">
          <div className="text-xs justify-between md:justify-center max-md:w-full  md:text-sm flex flex-wrap gap-2 md:gap-4">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <Link href={`mailto:${email}`} className="hover:underline">
                {email}
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <Link href={`tel:${phoneNumber}`} className="hover:underline">
                {phoneNumber}
              </Link>
            </div>
          </div>
          <div className="md:flex hidden items-center gap-3">
            <div className="flex items-center gap-2">
              <Link
                href={`${facebookPage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </Link>
              <Link
                href={`https://wa.me/${whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
              </Link>
            </div>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto py-4 px-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl mr-8">
              <Image
                src={"/logo-main.png"}
                alt="logo"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" ref={menuRef}>
            <Link
              href="/"
              className={cn(
                "text-slate-700 hover:text-emerald-500 font-medium px-2",
                pathname === "/" && "text-emerald-500"
              )}
            >
              Home
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("qualifications")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link href={"/qualifications"}>
                <button
                  className={cn(
                    "text-slate-700 hover:text-emerald-500 flex items-center cursor-pointer gap-1 font-medium px-2",
                    pathname === "/about" && "text-emerald-500"
                  )}
                >
                  Qualification
                  <ChevronDown className="h-4 w-4" />
                </button>
              </Link>

              {/* First level dropdown */}
              <div
                className={cn(
                  "absolute left-0 top-full min-w-[200px] bg-white shadow-md border border-gray-200  z-50 transition-all duration-200",
                  activeMenu === "qualifications"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                )}
              >
                {sections?.map((subItem) => (
                  <div
                    key={subItem.title}
                    className="relative group/sub"
                    onMouseEnter={() => setActiveSubMenu(subItem.title)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <Link
                      href={`/category/${subItem.link}`}
                      className={cn(
                        "text-slate-700 flex items-center justify-between font-medium text-sm hover:bg-slate-50 hover:text-emerald-500 px-2 py-2 border-b border-gray-200 last:border-b-0",
                        pathname === `/category/${subItem.link}` &&
                          "text-emerald-500"
                      )}
                      onClick={handleMenuItemClick}
                    >
                      {subItem.title}
                      {subItem.courses && subItem.courses.length > 0 && (
                        <ChevronRight className="h-4 ml-4 w-4" />
                      )}
                    </Link>

                    {/* Second level dropdown */}
                    {subItem.courses && subItem.courses.length > 0 && (
                      <div
                        className={cn(
                          "absolute left-full top-0 min-w-[250px] bg-white shadow-md border border-gray-200  z-50 transition-all duration-200",
                          activeSubMenu === subItem.title
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        )}
                      >
                        {subItem.courses.map((subSubItem) => (
                          <Link
                            key={subSubItem.title}
                            href={`/qualifications/${subSubItem.link}`}
                            className={cn(
                              "text-slate-700 block text-xs hover:bg-slate-50 hover:text-emerald-500 font-medium px-2 py-2 border-b border-gray-200 last:border-b-0",
                              pathname ===
                                `/qualifications/${subSubItem.link}` &&
                                "text-emerald-500"
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
              className="relative group"
              onMouseEnter={() => setActiveMenu("about")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={cn(
                  "text-slate-700 hover:text-emerald-500 flex items-center gap-1 font-medium px-2"
                )}
              >
                About
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* First level dropdown */}
              <div
                className={cn(
                  "absolute left-0 top-full min-w-[200px] bg-white shadow-md border border-gray-200  z-50 transition-all duration-200",
                  activeMenu === "about"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                )}
              >
                <Link
                  href={`/about-us`}
                  className={cn(
                    "text-slate-700 flex items-center justify-between font-medium text-sm hover:bg-slate-50 hover:text-emerald-500 px-4 py-2 border-b border-gray-200 last:border-b-0",
                    pathname === "/about-us" && "text-emerald-500"
                  )}
                  onClick={handleMenuItemClick}
                >
                  About Us
                </Link>
                <Link
                  href={`/about-rpl`}
                  className={cn(
                    "text-slate-700 flex items-center justify-between font-medium text-sm hover:bg-slate-50 hover:text-emerald-500 px-4 py-2 border-b border-gray-200 last:border-b-0",
                    pathname === "/about-rpl" && "text-emerald-500"
                  )}
                  onClick={handleMenuItemClick}
                >
                  About RPL
                </Link>
                <Link
                  href={`/faq`}
                  className={cn(
                    "text-slate-700 flex items-center justify-between font-medium text-sm hover:bg-slate-50 hover:text-emerald-500 px-4 py-2 border-b border-gray-200 last:border-b-0",
                    pathname === "/faq" && "text-emerald-500"
                  )}
                  onClick={handleMenuItemClick}
                >
                  FAQ
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className={cn(
                "text-slate-700 hover:text-emerald-500 font-medium px-2",
                pathname === "/contact" && "text-emerald-500"
              )}
              onClick={handleMenuItemClick}
            >
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="p-2 hover:text-emerald-500 hover:bg-gray-200 cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Mobile Menu - Only visible on mobile */}
            <div className="md:hidden">
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
