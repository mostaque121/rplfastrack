import { cn } from "@/lib/utils";

/**
 * Renders stored (sanitised) course/section HTML with the shared
 * `.prose-rpl` styles. Ships no editor JavaScript.
 */
export function RichText({
  html,
  className,
}: {
  html: string | null | undefined;
  className?: string;
}) {
  if (!html) return null;
  return <div className={cn("prose-rpl", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
