/**
 * Writes the section (industry) content in docs/content/sections.json to the database.
 *
 *   npx tsx --env-file=.env scripts/import-section-content.mts                 # dry run
 *   npx tsx --env-file=.env scripts/import-section-content.mts --write [backup.json]
 *   npx tsx --env-file=.env scripts/import-section-content.mts --new-only --write
 *
 * Per section it sets the title, icon, image alt, SEO title/description, hero intro and
 * intro, and replaces the section's FAQs. Link, images and order are left alone.
 * An entry with an `image` (a path in /public) whose link isn't in the DB yet is created
 * at the end of the list. --new-only only creates, leaving existing sections untouched.
 * --only=link1,link2 writes just those sections.
 * --write first saves the current values to the backup path (default: sections-backup.json
 * in the working directory). Re-running overwrites edits made in the admin panel.
 * After --write, press "Refresh public cache" in the admin.
 */
import fs from "node:fs";

import { makePrisma } from "./db.mts";
import { sanitizeRichText } from "../src/lib/sanitize-rich-text";

type Entry = {
  link: string;
  title: string;
  icon: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  intro: string;
  faqs: { q: string; a: string }[];
  image?: string; // e.g. /images/sections/information-technology.webp; needed to create
};

const write = process.argv.includes("--write");
const newOnly = process.argv.includes("--new-only");
// --only=a,b limits the write to these sections (created or updated)
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const backupPath = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "sections-backup.json";
const entries: Entry[] = JSON.parse(fs.readFileSync("docs/content/sections.json", "utf8"));
const prisma = makePrisma();
const { icons } = await import("lucide-react");

const sections = await prisma.section.findMany({ include: { faqs: true } });
const byLink = new Map(sections.map((s) => [s.link, s]));
const problems: string[] = [];
const SUFFIX = " | RPL Fast Track".length;

for (const e of entries) {
  if (!byLink.has(e.link) && !e.image) problems.push(`${e.link}: no such section (add an image to create it)`);
  if (!byLink.has(e.link) && e.image && !fs.existsSync(`public${e.image}`))
    problems.push(`${e.link}: image not found: public${e.image}`);
  if (!(e.icon in icons)) problems.push(`${e.link}: unknown icon ${e.icon}`);
  if (e.metaTitle.length + SUFFIX > 70) problems.push(`${e.link}: meta title long (${e.metaTitle.length + SUFFIX})`);
  if (e.metaDescription.length > 160) problems.push(`${e.link}: meta description ${e.metaDescription.length} chars`);
  if (/\$\d|price|cheap|affordable|guarantee/i.test(JSON.stringify(e))) problems.push(`${e.link}: price/guarantee wording`);
}
const missing = sections.filter((s) => !entries.some((e) => e.link === s.link)).map((s) => s.link);
if (missing.length) problems.push(`no content for: ${missing.join(", ")}`);

for (const e of entries) {
  const words = e.intro.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`${byLink.has(e.link) ? "" : "NEW "}${e.link}: "${e.title}" icon=${e.icon} intro=${words}w faqs=${e.faqs.length} title=${e.metaTitle.length + SUFFIX} desc=${e.metaDescription.length}`);
}
if (problems.length) console.log("\nProblems:\n  " + problems.join("\n  "));

if (!write) {
  console.log("\nDry run. Add --write to apply.");
} else if (problems.some((p) => !p.includes("long"))) {
  console.log("\nNot writing until the problems are fixed.");
  process.exitCode = 1;
} else {
  fs.writeFileSync(backupPath, JSON.stringify(sections, null, 1));
  console.log(`\nBackup of current values: ${backupPath}`);
  for (const e of entries) {
    if (only && !only.includes(e.link)) continue;
    if (!byLink.has(e.link)) {
      const last = await prisma.section.aggregate({ _max: { index: true } });
      const created = await prisma.section.create({
        data: {
          link: e.link,
          title: e.title,
          index: (last._max.index ?? 0) + 1,
          imageUrl: e.image!,
          metaTitle: e.metaTitle,
          metaDescription: e.metaDescription,
        },
      });
      byLink.set(e.link, { ...created, faqs: [] });
      console.log(`created ${e.link}`);
    } else if (newOnly) {
      continue;
    }
    const id = byLink.get(e.link)!.id;
    await prisma.$transaction([
      prisma.section.update({
        where: { id },
        data: {
          title: e.title,
          icon: e.icon,
          imageAlt: e.imageAlt,
          metaTitle: e.metaTitle,
          metaDescription: e.metaDescription,
          heroIntro: sanitizeRichText(e.heroIntro),
          intro: sanitizeRichText(e.intro),
        },
      }),
      prisma.faq.deleteMany({ where: { sectionId: id } }),
      prisma.faq.createMany({
        data: e.faqs.map((f, index) => ({ sectionId: id, index, question: f.q, answer: sanitizeRichText(f.a) })),
      }),
    ]);
    console.log(`written ${e.link}`);
  }
}
await prisma.$disconnect();
