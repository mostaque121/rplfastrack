"use client";

import { icons } from "lucide-react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SUGGESTED_ICONS } from "@/config/icons";
import { cn } from "@/lib/utils";

// Admin only: imports every Lucide icon, so load it with next/dynamic.

type IconName = keyof typeof icons;

const MAX_RESULTS = 72;

// Industry words that don't appear in icon names
const ALIASES: Record<string, IconName[]> = {
  plumbing: ["Droplets", "Wrench", "ShowerHead", "Bath"],
  electrical: ["Zap", "Plug", "Cable", "Lightbulb"],
  carpentry: ["Hammer", "Axe", "Ruler"],
  building: ["Building2", "HardHat", "Construction", "House"],
  civil: ["Construction", "Pickaxe", "Shovel", "Landmark"],
  hospitality: ["UtensilsCrossed", "ChefHat", "Coffee", "Hotel", "Wine"],
  cooking: ["ChefHat", "CookingPot", "UtensilsCrossed"],
  care: ["HandHeart", "HeartPulse", "Accessibility", "Baby"],
  health: ["HeartPulse", "Stethoscope", "Pill", "Hospital"],
  childcare: ["Baby", "Blocks", "School"],
  business: ["Briefcase", "Handshake", "ChartLine", "Calculator"],
  automotive: ["Car", "Wrench", "Cog", "Fuel"],
  transport: ["Truck", "Bus", "Forklift", "Route"],
  logistics: ["Warehouse", "Package", "Truck", "Forklift"],
  mining: ["Pickaxe", "Mountain", "HardHat"],
  agriculture: ["Tractor", "Sprout", "Wheat"],
  security: ["ShieldCheck", "Lock", "Cctv"],
  beauty: ["Scissors", "Sparkles", "Brush"],
  it: ["Laptop", "Monitor", "Server", "Code"],
  education: ["GraduationCap", "BookOpen", "School"],
  fitness: ["Dumbbell", "Activity"],
};

const allNames = Object.keys(icons) as IconName[];
// "HardHat" -> "hard hat hardhat", so "hard hat" and "hardhat" both match
const searchText = new Map(
  allNames.map((name) => {
    const words = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
    return [name, `${words} ${name.toLowerCase()}`];
  }),
);

function search(query: string): IconName[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...SUGGESTED_ICONS];
  const aliased = Object.entries(ALIASES)
    .filter(([word]) => word.startsWith(q))
    .flatMap(([, names]) => names)
    .filter((name) => name in icons);
  const matches = allNames.filter((name) => searchText.get(name)!.includes(q));
  return [...new Set([...aliased, ...matches])].slice(0, MAX_RESULTS);
}

export default function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => search(query), [query]);
  const Current = value ? icons[value as IconName] : undefined;

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="min-w-44 justify-start">
            {Current ? <Current /> : <span className="size-4 rounded border border-dashed" />}
            {value || "Choose an icon"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[22rem] p-3">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 1,500+ icons (e.g. plumbing, truck)"
            aria-label="Search icons"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {query.trim() ? `${results.length} result(s)` : "Suggested for industries"}
          </p>
          <div className="mt-2 grid max-h-72 grid-cols-6 gap-1 overflow-y-auto">
            {results.map((name) => {
              const Icon = icons[name];
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  aria-label={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-md border border-transparent hover:bg-muted",
                    value === name && "border-primary bg-muted",
                  )}
                >
                  <Icon className="size-5" />
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remove icon"
          onClick={() => onChange("")}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
