import "server-only";
import { icons } from "lucide-react";

import type { LucideProps } from "lucide-react";

/** Renders a Lucide icon stored by name in the DB (e.g. Section.icon).
 * Server-only: the full icon map stays out of the client bundle. */
export function LucideIcon({
  name,
  ...props
}: { name?: string | null } & Omit<LucideProps, "name">) {
  const Icon = name ? icons[name as keyof typeof icons] : undefined;
  return Icon ? <Icon aria-hidden {...props} /> : null;
}
