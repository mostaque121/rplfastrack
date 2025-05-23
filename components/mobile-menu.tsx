"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { EligibilityForm } from "./eligibility-form";
import { useRPL } from "./rpl-context";

export default function MobileMenu() {
  const { sections } = useRPL();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    qualifications:
      pathname.startsWith("/section") || pathname.startsWith("/courses"),
  });
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};

      sections?.forEach((item) => {
        if (item.courses?.some((course) => pathname.endsWith(course.link))) {
          initialState[item.title] = true;
        } else {
          initialState[item.title] = false;
        }
      });

      return initialState;
    }
  );
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
    console.log("clicked");
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[350px] overflow-y-auto"
        >
          <SheetHeader className="hidden">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col px-3 gap-6 py-6 mt-6">
            <Link
              href="/"
              className={cn(
                "text-slate-700 hover:text-emerald-600 font-medium px-2",
                pathname === "/" && "text-emerald-600"
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
                <CollapsibleTrigger className="flex w-full items-center justify-between px-2 text-slate-700 font-medium">
                  <Link
                    href={"/courses"}
                    className={cn(
                      "flex-grow text-left hover:text-emerald-600",
                      pathname === "/courses" && "text-emerald-600"
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
                      "h-6 w-6 bg-gray-200 cursor-pointer rounded-sm p-1 ml-5 transition-transform",
                      openMenus["qualifications"] && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 pt-2 space-y-2">
                  {sections?.map((subItem) => (
                    <div key={subItem.title} className="w-full">
                      {subItem.courses && subItem.courses.length > 0 ? (
                        <Collapsible
                          open={openSubMenus[subItem.title]}
                          onOpenChange={() => toggleSubMenu(subItem.title)}
                          className="w-full"
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 px-2 text-slate-700">
                            <Link
                              href={`/section/${subItem.link}`}
                              className={cn(
                                "flex-grow hover:text-emerald-600  text-left",
                                pathname === `/section/${subItem.link}` &&
                                  "text-emerald-600"
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
                                "h-6 w-6 p-1 bg-gray-100 rounded-sm ml-5 cursor-pointer transition-transform",
                                openSubMenus[subItem.title] && "rotate-180"
                              )}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 pt-1 space-y-1">
                            {subItem.courses.map((subSubItem) => (
                              <Link
                                key={subSubItem.title}
                                href={`/courses/${subSubItem.link}`}
                                className={cn(
                                  "block py-1 px-2 hover:text-emerald-600 text-sm",
                                  pathname === `/courses/${subSubItem.link}` &&
                                    "text-emerald-600"
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
                          href={`/section/${subItem.link}`}
                          className={cn(
                            "block py-1 px-2 hover:text-emerald-600 ",
                            pathname === `/section/${subItem.link}` &&
                              "text-emerald-600"
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
              href="/about-us"
              className={cn(
                "text-slate-700 hover:text-emerald-600 font-medium px-2",
                pathname === "/about-us" && "text-emerald-600"
              )}
              onClick={handleItemClick}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-slate-700 hover:text-emerald-600 font-medium px-2",
                pathname === "/contact" && "text-emerald-600"
              )}
              onClick={handleItemClick}
            >
              Contact
            </Link>

            <Link
              href="/about-rpl"
              className={cn(
                "text-slate-700 hover:text-emerald-600 font-medium px-2",
                pathname === "/about-rpl" && "text-emerald-600"
              )}
              onClick={handleItemClick}
            >
              About RPL
            </Link>
            <Link
              href="/faq"
              className={cn(
                "text-slate-700 hover:text-emerald-600 font-medium px-2",
                pathname === "/about-rpl" && "text-emerald-600"
              )}
              onClick={handleItemClick}
            >
              FAQ
            </Link>

            <EligibilityForm
              trigger={
                <div className="pt-4 mt-4 border-t">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
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
