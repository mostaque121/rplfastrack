"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRPL } from "@/contexts/rpl-context";
import {
  Building,
  FileText,
  GraduationCapIcon as Graduation,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types
type Courses = {
  title: string;
  link: string;
};

type Sections = {
  title: string;
  link: string;
  courses?: Courses[];
};

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { sections } = useRPL();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(() =>
    buildSearchData(sections)
  );

  // Function to dynamically build search data
  function buildSearchData(sections?: Sections[]) {
    const qualifications =
      sections?.flatMap(
        (section) =>
          section.courses?.map((course) => ({
            title: course.title,
            url: `/courses/${course.link}`,
          })) ?? []
      ) ?? [];

    const industries =
      sections?.map((section) => ({
        title: section.title,
        url: `/section/${section.link}`,
      })) ?? [];

    const staticPages = [
      { title: "Home", url: "/" },
      { title: "About Us", url: "/about-us" },
      { title: "About Rpl", url: "/about-rpl" },
      { title: "Contact", url: "/contact" },
      { title: "FAQ", url: "/faq" },
      { title: "Reviews", url: "/reviews" },
      { title: "Write a Review", url: "/write-review" },
      { title: "Privacy Policy", url: "/privacy-policy" },
      { title: "Terms of Service", url: "/terms-of-service" },
      { title: "Cookie Policy", url: "/cookie-policy" },
      { title: "Refund Policy", url: "/refund-policy" },
    ];

    return [
      {
        category: "Qualifications",
        icon: Graduation,
        items: qualifications,
      },
      {
        category: "Industries",
        icon: Building,
        items: industries,
      },
      {
        category: "Pages",
        icon: FileText,
        items: staticPages,
      },
    ];
  }

  // Filter results based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(buildSearchData(sections));
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = buildSearchData(sections)
      .map((category) => {
        const filteredItems = category.items.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((category) => category.items.length > 0);

    setSearchResults(filtered);
  }, [searchQuery, sections]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Reset search input when modal closes
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!open) {
      // Delay clearing the search input slightly (e.g., 300ms)
      timeout = setTimeout(() => {
        setSearchQuery("");
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogTitle className="hidden">Search Modal</DialogTitle>
        <DialogDescription className="hidden">Search Modal</DialogDescription>
        <Command className="rounded-lg border !py-2 shadow-md">
          <CommandInput
            placeholder="Search qualifications, industries, pages..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12 !py-5"
          />
          <CommandList className="md:h-[300px] h-screen overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>

            {searchResults.map((category) => (
              <CommandGroup key={category.category} heading={category.category}>
                {category.items.map((item) => {
                  const Icon = category.icon;
                  return (
                    <Link prefetch={false} href={item.url} key={item.title}>
                      <CommandItem
                        value={item.title}
                        onSelect={() => {
                          onOpenChange(false);
                        }}
                        className="flex cursor-pointer items-center gap-2 py-2"
                      >
                        <Icon className="h-4 w-4 text-emerald-500" />
                        <span>{item.title} </span>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>

          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <div>
                Press <kbd className="rounded border bg-muted px-1">↑</kbd>{" "}
                <kbd className="rounded border bg-muted px-1">↓</kbd> to
                navigate
              </div>
              <div>
                Press <kbd className="rounded border bg-muted px-1">Enter</kbd>{" "}
                to select
              </div>
              <div>
                Press <kbd className="rounded border bg-muted px-1">Esc</kbd> to
                close
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
