/**
 * Writes the guides in docs/content/guides/ to the database.
 *
 *   npx tsx --env-file=.env scripts/import-guides.mts            # dry run: checks only
 *   npx tsx --env-file=.env scripts/import-guides.mts --write    # create or update, PUBLISHED
 *   ... --only=slug,slug   # only these guides (leaves admin edits to the others alone)
 *
 * guides.json holds each guide's metadata, linked courses and FAQs; {slug}.html holds the body.
 * Guides are matched by slug. Re-running overwrites edits made in the admin panel (the
 * first publish date is kept). Guides that exist only in the DB are left alone.
 * After --write, press "Refresh public cache" in the admin.
 */
import fs from "node:fs";

import { makePrisma } from "./db.mts";
import { sanitizeRichText } from "../src/lib/sanitize-rich-text";

type Entry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  courses: string[];
  faqs: { q: string; a: string }[];
};

const DIR = "docs/content/guides";
const SUFFIX = " | RPL Fast Track".length;
const write = process.argv.includes("--write");
const all: Entry[] = JSON.parse(fs.readFileSync(`${DIR}/guides.json`, "utf8"));
// --only=slug,slug limits the run, so guides already edited in the admin are not overwritten
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const entries = only ? all.filter((e) => only.includes(e.slug)) : all;
const prisma = makePrisma();

const courses = await prisma.course.findMany({ select: { id: true, link: true, status: true } });
const courseByLink = new Map(courses.map((c) => [c.link, c]));
const slugs = new Set(all.map((e) => e.slug));
const problems: string[] = [];
const warnings: string[] = [];
const bodies = new Map<string, string>();

const paragraph = (text: string) => (text.trim().startsWith("<") ? text : `<p>${text}</p>`);

for (const e of entries) {
  const file = `${DIR}/${e.slug}.html`;
  if (!fs.existsSync(file)) {
    problems.push(`${e.slug}: missing ${file}`);
    continue;
  }
  const raw = fs.readFileSync(file, "utf8");
  const body = sanitizeRichText(raw);
  bodies.set(e.slug, body);

  if (e.image && !fs.existsSync(`public${e.image}`))
    problems.push(`${e.slug}: image not found: public${e.image}`);
  for (const link of e.courses) {
    const course = courseByLink.get(link);
    if (!course) problems.push(`${e.slug}: no course ${link}`);
    else if (course.status !== "PUBLISHED") warnings.push(`${e.slug}: ${link} is a draft (hidden)`);
  }
  // Every internal link in the body must point at a real page
  for (const [, href] of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const [, kind, slug] = href.match(/^\/(courses|guides|section)\/([^/]+)$/) ?? [];
    if (kind === "courses" && !courseByLink.has(slug))
      problems.push(`${e.slug}: broken link ${href}`);
    if (kind === "guides" && !slugs.has(slug)) problems.push(`${e.slug}: broken link ${href}`);
  }
  if (/\$\s?\d/.test(raw + JSON.stringify(e))) problems.push(`${e.slug}: contains a price`);
  if (e.metaTitle.length + SUFFIX > 70)
    warnings.push(`${e.slug}: meta title ${e.metaTitle.length + SUFFIX} chars`);
  if (e.metaDescription.length > 160)
    warnings.push(`${e.slug}: meta description ${e.metaDescription.length} chars`);
  if (raw.length - body.length > 200)
    warnings.push(`${e.slug}: sanitiser removed ${raw.length - body.length} chars, check tags`);

  const words = body
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const links = [...body.matchAll(/href="\/courses\//g)].length;
  console.log(
    `${e.slug}: ${words}w, ${links} course links in body, ${e.courses.length} linked courses, ${e.faqs.length} FAQs`,
  );
}

if (warnings.length) console.log("\nWarnings:\n  " + warnings.join("\n  "));
if (problems.length) console.log("\nProblems:\n  " + problems.join("\n  "));

if (!write) {
  console.log("\nDry run. Add --write to apply.");
} else if (problems.length) {
  console.log("\nNot writing until the problems are fixed.");
} else {
  for (const [i, e] of entries.entries()) {
    const data = {
      title: e.title,
      metaTitle: e.metaTitle,
      metaDescription: e.metaDescription,
      excerpt: e.excerpt,
      body: bodies.get(e.slug)!,
      imageLink: e.image || null,
      imageAlt: e.imageAlt || null,
      index: all.findIndex((a) => a.slug === e.slug) + 1,
      status: "PUBLISHED" as const,
    };
    await prisma.$transaction(async (tx) => {
      const existing = await tx.guide.findUnique({
        where: { slug: e.slug },
        select: { id: true, publishedAt: true },
      });
      const guide = existing
        ? await tx.guide.update({
            where: { id: existing.id },
            data: { ...data, publishedAt: existing.publishedAt ?? new Date() },
          })
        : await tx.guide.create({ data: { ...data, slug: e.slug, publishedAt: new Date() } });
      await tx.faq.deleteMany({ where: { guideId: guide.id } });
      await tx.faq.createMany({
        data: e.faqs.map((f, index) => ({
          question: f.q,
          answer: sanitizeRichText(paragraph(f.a)),
          index,
          guideId: guide.id,
        })),
      });
      await tx.guideCourse.deleteMany({ where: { guideId: guide.id } });
      await tx.guideCourse.createMany({
        data: e.courses.map((link, index) => ({
          guideId: guide.id,
          courseId: courseByLink.get(link)!.id,
          index,
        })),
      });
      console.log(`${existing ? "updated" : "created"} ${e.slug}`);
    });
  }
  // Guides not in the JSON keep their place after the imported ones
  const others = await prisma.guide.findMany({
    where: { slug: { notIn: [...slugs] } },
    orderBy: { index: "asc" },
    select: { id: true },
  });
  for (const [i, g] of others.entries()) {
    await prisma.guide.update({ where: { id: g.id }, data: { index: entries.length + i + 1 } });
  }
  console.log('\nDone. Press "Refresh public cache" in the admin.');
}

await prisma.$disconnect();
