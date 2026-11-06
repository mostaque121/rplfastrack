/**
 * Applies the CTR-targeted titles/descriptions in docs/content/seo-meta.json
 * to the database AND to docs/content/courses/*.json (so a later
 * import-course-content run doesn't bring the old ones back). Only metaTitle and
 * metaDescription are touched.
 *
 *   npx tsx --env-file=.env scripts/apply-seo-meta.mts          # dry run
 *   npx tsx --env-file=.env scripts/apply-seo-meta.mts --write
 *
 * Then press "Refresh public cache" in the admin course list.
 */
import fs from "node:fs";
import path from "node:path";

import { makePrisma } from "./db.mts";

const DIR = "docs/content/courses";
const write = process.argv.includes("--write");
const meta: Record<string, { metaTitle: string; metaDescription: string }> = JSON.parse(
  fs.readFileSync("docs/content/seo-meta.json", "utf8"),
);
const prisma = makePrisma();
const problems: string[] = [];
const titles = new Set<string>();

for (const [link, m] of Object.entries(meta)) {
  if (m.metaTitle.length > 60) problems.push(`${link}: title ${m.metaTitle.length} chars`);
  if (m.metaDescription.length > 155)
    problems.push(`${link}: description ${m.metaDescription.length} chars`);
  if (titles.has(m.metaTitle)) problems.push(`${link}: duplicate title`);
  titles.add(m.metaTitle);
}

const courses = await prisma.course.findMany({ select: { id: true, link: true, metaTitle: true } });
const byLink = new Map(courses.map((c) => [c.link, c]));
for (const link of Object.keys(meta))
  if (!byLink.has(link)) problems.push(`${link}: not in the database`);
for (const c of courses) {
  const m = meta[c.link];
  if (!m) continue;
  const clash = courses.find((o) => o.metaTitle === m.metaTitle && o.link !== c.link);
  if (clash) problems.push(`${c.link}: title already used by ${clash.link}`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

let files = 0;
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"))) {
  const file = path.join(DIR, f);
  const entries = JSON.parse(fs.readFileSync(file, "utf8")) as {
    link: string;
    newLink?: string;
    metaTitle: string;
    metaDescription: string;
  }[];
  let changed = false;
  for (const e of entries) {
    const m = meta[e.newLink ?? e.link] ?? meta[e.link];
    if (m && (e.metaTitle !== m.metaTitle || e.metaDescription !== m.metaDescription)) {
      e.metaTitle = m.metaTitle;
      e.metaDescription = m.metaDescription;
      changed = true;
    }
  }
  if (changed) {
    files++;
    if (write) fs.writeFileSync(file, JSON.stringify(entries, null, 2) + "\n");
  }
}

// Titles are unique: swap through the DB one by one (no two rows share a title mid-way)
for (const [link, m] of Object.entries(meta)) {
  const c = byLink.get(link)!;
  console.log(`${write ? "set" : "would set"} ${link}\n  ${c.metaTitle}\n  -> ${m.metaTitle}`);
  if (write) await prisma.course.update({ where: { id: c.id }, data: m });
}
console.log(
  `${Object.keys(meta).length} courses, ${files} content files${write ? " written" : " (dry run)"}`,
);
await prisma.$disconnect();
