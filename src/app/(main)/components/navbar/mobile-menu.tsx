"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { EligibilityForm } from "@/app/(main)/components/form/eligibility-form";
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
import { useRPL } from "@/contexts/rpl-context";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    qualifications: pathname.startsWith("/section") || pathname.startsWith("/courses"),
  });
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};

    sections?.forEach((item) => {
      if (item.courses?.some((course) => pathname.endsWith(course.link))) {
        initialState[item.title] = true;
      } else {
        initialState[item.title] = false;
      }
    });

    return initialState;
  });
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[350px]">
          <SheetHeader className="hidden">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-6 px-3 py-6">
            <Link
              prefetch={false}
              href="/"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-brand",
                pathname === "/" && "text-brand",
              )}
              onClick={handleItemClick}
            >
              Home
            </Link>

            <div className="w-full">
              <Collapsible
                open={openMenus["qualifications"]}
                onOpenChange={() => toggleMenu("qualifications")}
                className="w-full"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between px-2 font-medium text-slate-700">
                  <Link
                    prefetch={false}
                    href={"/courses"}
                    className={cn(
                      "flex-grow text-left hover:text-brand",
                      pathname === "/courses" && "text-brand",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick();
                    }}
                  >
                    Courses
                  </Link>
                  <ChevronDown
                    className={cn(
                      "ml-5 h-6 w-6 cursor-pointer rounded-sm bg-gray-200 p-1 transition-transform",
                      openMenus["qualifications"] && "rotate-180",
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pt-2 pl-4">
                  {sections?.map((subItem) => (
                    <div key={subItem.title} className="w-full">
                      {subItem.courses && subItem.courses.length > 0 ? (
                        <Collapsible
                          open={openSubMenus[subItem.title]}
                          onOpenChange={() => toggleSubMenu(subItem.title)}
                          className="w-full"
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 text-slate-700">
                            <Link
                              prefetch={false}
                              href={`/section/${subItem.link}`}
                              className={cn(
                                "flex-grow text-left hover:text-brand",
                                pathname === `/section/${subItem.link}` && "text-brand",
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick();
                              }}
                            >
                              {subItem.title}
                            </Link>
                            <ChevronDown
                              className={cn(
                                "ml-5 h-6 w-6 cursor-pointer rounded-sm bg-gray-100 p-1 transition-transform",
                                openSubMenus[subItem.title] && "rotate-180",
                              )}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-1 pt-1 pl-4">
                            {subItem.courses.map((subSubItem) => (
                              <Link
                                prefetch={false}
                                key={subSubItem.title}
                                href={`/courses/${subSubItem.link}`}
                                className={cn(
                                  "block px-2 py-1 text-sm hover:text-brand",
                                  pathname === `/courses/${subSubItem.link}` && "text-brand",
                                )}
                                onClick={handleItemClick}
                              >
                                {subSubItem.title}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          prefetch={false}
                          href={`/section/${subItem.link}`}
                          className={cn(
                            "block px-2 py-1 hover:text-brand",
                            pathname === `/section/${subItem.link}` && "text-brand",
                          )}
                          onClick={handleItemClick}
                        >
                          {subItem.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Link
              prefetch={false}
              href="/about-us"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-brand",
                pathname === "/about-us" && "text-brand",
              )}
              onClick={handleItemClick}
            >
              About Us
            </Link>

            <Link
              prefetch={false}
              href="/contact"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-brand",
                pathname === "/contact" && "text-brand",
              )}
              onClick={handleItemClick}
            >
              Contact
            </Link>

            <Link
              prefetch={false}
              href="/about-rpl"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-brand",
                pathname === "/about-rpl" && "text-brand",
              )}
              onClick={handleItemClick}
            >
              About RPL
            </Link>
            <Link
              prefetch={false}
              href="/faq"
              className={cn(
                "px-2 font-medium text-slate-700 hover:text-brand",
                pathname === "/about-rpl" && "text-brand",
              )}
              onClick={handleItemClick}
            >
              FAQ
            </Link>

            <EligibilityForm
              trigger={
                <div className="mt-4 border-t pt-4">
                  <Button className="w-full bg-brand text-white hover:bg-brand-strong">
                    Get Started
                  </Button>
                </div>
              }
              title="RPL Eligibility Assessment"
              description="Find out if you qualify for our RPL program in just a few minutes."
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
