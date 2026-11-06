import { slugify } from "@/features/courses/schema";

/**
 * Gives every <h2> in stored guide HTML a stable id and returns the list for the
 * "On this page" nav. Runs at render time, so the sanitiser never has to allow ids.
 */
export function withHeadingIds(html: string) {
  const toc: { id: string; title: string }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const title = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .trim();
    let id = slugify(title).slice(0, 60) || "section";
    for (let n = 2; used.has(id); n++) id = `${id.replace(/-\d+$/, "")}-${n}`;
    used.add(id);
    toc.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}
