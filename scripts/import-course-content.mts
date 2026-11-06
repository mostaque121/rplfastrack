/**
 * Writes the course content in docs/content/courses/*.json to the database,
 * merged with the official training.gov.au data in _official.json
 * (from scripts/fetch-tga.mts).
 *
 *   npx tsx --env-file=.env scripts/import-course-content.mts                     # dry run
 *   npx tsx --env-file=.env scripts/import-course-content.mts --write             # apply
 *   npx tsx --env-file=.env scripts/import-course-content.mts --new-only --write  # only create + move
 *
 * Per course it sets the code, official title, SEO and content fields, career
 * outcomes, packaging rules, entry requirements, units and FAQs (replacing the
 * course's existing FAQs). A `newLink` renames the slug and writes a 301 in
 * the Redirect table; `duplicateOf` hides a duplicate page (DRAFT) and
 * redirects it. Images and publish status are left alone.
 *
 * An entry with `code` and `section` whose link isn't in the DB yet is CREATED
 * as a DRAFT at the end of that section (no image: the page uses the section's).
 * `section` on an existing course moves it there. `--new-only` skips the content
 * update of existing courses (so admin edits survive) and only creates and moves.
 * After --write, press "Refresh public cache" on the admin course list.
 */
import fs from "node:fs";
import path from "node:path";

import { makePrisma } from "./db.mts";
import { sanitizeRichText } from "../src/lib/sanitize-rich-text";

type Entry = {
  link: string;
  code?: string; // required to create a course
  section?: string; // section link: where a new course goes, or where to move an existing one
  newLink?: string;
  duplicateOf?: string;
  isPopular?: boolean;
  metaTitle: string;
  metaDescription: string;
  heroIntro: string;
  whoIsItFor: string;
  evidenceExamples: string;
  licensingInfo?: string;
  description: string;
  jobOpportunity: string[];
  duration: string;
  deliveryMode: string;
  searchAliases: string[];
  imageAlt?: string; // new courses use their section's image and alt text
  faqs: { q: string; a: string }[];
};

const DIR = "docs/content/courses";
const write = process.argv.includes("--write");
const newOnly = process.argv.includes("--new-only");
const prisma = makePrisma();
const official = JSON.parse(fs.readFileSync(path.join(DIR, "_official.json"), "utf8"));

const entries: Entry[] = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Entry[]);

const courses = await prisma.course.findMany({
  select: { id: true, link: true, title: true, code: true, metaTitle: true, sectionId: true },
});
const byLink = new Map(courses.map((c) => [c.link, c]));
const sections = await prisma.section.findMany({ select: { id: true, link: true } });
const sectionByLink = new Map(sections.map((s) => [s.link, s]));
const plannedLinks = new Set(entries.flatMap((e) => [e.link, e.newLink ?? e.link]));
const html = (s: string) => sanitizeRichText(s);
const problems: string[] = [];
const seenTitles = new Set<string>();

type Plan =
  | { id: string; from: string; to: string; data: Record<string, unknown>; faqs: Entry["faqs"] }
  | { id: string; from: string; draftTo: string }
  | { id: string; from: string; moveTo: { id: string; link: string } }
  | { create: true; from: string; to: string; sectionId: string; data: Record<string, unknown>; faqs: Entry["faqs"] };
const plans: Plan[] = [];

for (const e of entries) {
  // After a rename has been applied, the course is found by its new link
  const renamed = !byLink.has(e.link) && !!e.newLink && byLink.has(e.newLink);
  if (renamed) e.link = e.newLink!;
  const course = byLink.get(e.link);
  const section = e.section ? sectionByLink.get(e.section) : undefined;
  if (e.section && !section) {
    problems.push(`${e.link}: no section "${e.section}" (run import-section-content first)`);
    continue;
  }
  if (!course && !(e.code && section)) {
    problems.push(`No course with link "${e.link}"`);
    continue;
  }
  if (course && section && course.sectionId !== section.id) {
    plans.push({ id: course.id, from: e.link, moveTo: section });
  }
  if (course && newOnly) continue;
  if (course && e.duplicateOf) {
    plans.push({ id: course.id, from: e.link, draftTo: e.duplicateOf });
    continue;
  }
  const dbCode = e.code ?? course?.code ?? course?.title.match(/[A-Z]{3,}[0-9]{3,}[A-Z]?/)?.[0] ?? "";
  const o = official[dbCode] ?? Object.values<any>(official).find((q) => q.code === dbCode);
  if (!o) problems.push(`${e.link}: no official data for ${dbCode}`);
  if (!course && o && o.code !== dbCode) problems.push(`${e.link}: ${dbCode} is superseded by ${o.code}`);
  if (!course && !o?.packagingRule) problems.push(`${e.link}: no units/packaging rules to create it with`);
  const clash = courses.find((c) => c.metaTitle === e.metaTitle && c.link !== e.link && c.link !== e.newLink);
  if (clash) problems.push(`${e.link}: metaTitle already used by ${clash.link}`);
  // Course links in the content must point at a course that exists or is being created
  const text = [e.heroIntro, e.whoIsItFor, e.evidenceExamples, e.licensingInfo, e.description, ...e.faqs.map((f) => f.a)].join(" ");
  for (const [, slug] of text.matchAll(/href="\/courses\/([^"#?]+)"/g)) {
    if (!byLink.has(slug) && !plannedLinks.has(slug)) problems.push(`${e.link}: broken link /courses/${slug}`);
  }

  if (e.metaTitle.length > 60) problems.push(`${e.link}: metaTitle ${e.metaTitle.length} chars`);
  if (e.metaDescription.length > 160) problems.push(`${e.link}: metaDescription ${e.metaDescription.length} chars`);
  if (seenTitles.has(e.metaTitle)) problems.push(`${e.link}: duplicate metaTitle`);
  seenTitles.add(e.metaTitle);
  if (e.faqs.length < 4) problems.push(`${e.link}: only ${e.faqs.length} FAQs`);

  const data: Record<string, unknown> = {
    code: o?.code ?? dbCode,
    title: o ? `${o.code} ${o.title}` : course!.title,
    qualificationStatus: "CURRENT",
    metaTitle: e.metaTitle,
    metaDescription: e.metaDescription,
    heroIntro: html(e.heroIntro),
    whoIsItFor: html(e.whoIsItFor),
    evidenceExamples: html(e.evidenceExamples),
    licensingInfo: e.licensingInfo ? html(e.licensingInfo) : null,
    description: html(e.description),
    jobOpportunity: html(`<ul>${e.jobOpportunity.map((j) => `<li>${j}</li>`).join("")}</ul>`),
    duration: e.duration,
    deliveryMode: e.deliveryMode,
    searchAliases: e.searchAliases,
    imageAlt: e.imageAlt,
    isPopular: e.isPopular ?? false,
  };
  if (o?.packagingRule) {
    Object.assign(data, {
      packagingRule: html(o.packagingRule),
      entryRequirement: html(o.entryRequirement),
      coreUnits: html(o.coreUnits),
      electiveUnits: html(o.electiveUnits),
    });
  }
  if (!course) {
    plans.push({ create: true, from: e.link, to: e.link, sectionId: section!.id, data: { ...data, link: e.link }, faqs: e.faqs });
    continue;
  }
  if (e.newLink) data.link = e.newLink;
  plans.push({ id: course.id, from: e.link, to: e.newLink ?? e.link, data, faqs: e.faqs });
}

const words = (s: unknown) => (typeof s === "string" ? s.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0);
for (const p of plans) {
  if ("draftTo" in p) {
    console.log(`DRAFT ${p.from} -> 301 /courses/${p.draftTo}`);
    continue;
  }
  if ("moveTo" in p) {
    console.log(`MOVE  ${p.from} -> section ${p.moveTo.link}`);
    continue;
  }
  const d = p.data;
  const unique =
    ["heroIntro", "whoIsItFor", "evidenceExamples", "licensingInfo", "description"].reduce((n, k) => n + words(d[k]), 0) +
    p.faqs.reduce((n, f) => n + words(f.q) + words(f.a), 0);
  console.log(
    `${"create" in p ? "NEW " : ""}${String(d.code).padEnd(9)} ${p.to !== p.from ? `RENAME ${p.from} -> ${p.to}` : p.from.slice(0, 50).padEnd(50)} title ${String((d.metaTitle as string).length).padStart(2)} desc ${String((d.metaDescription as string).length).padStart(3)} faqs ${p.faqs.length} words ${unique}`,
  );
}
console.log(`\n${plans.filter((p) => "create" in p).length} new, ${plans.length} changes${problems.length ? `, ${problems.length} problems:` : ", no problems"}`);
problems.forEach((p) => console.log(`  ! ${p}`));

if (!write) {
  console.log("\nDry run. Add --write to apply.");
} else {
  const blocking = ["No course", "duplicate", "no section", "superseded by", "no units", "already used", "broken link", "no official"];
  if (problems.some((p) => blocking.some((b) => p.includes(b)))) throw new Error("Fix the problems first");
  for (const p of plans) {
    if ("create" in p) {
      await prisma.$transaction(async (tx) => {
        const last = await tx.course.aggregate({ where: { sectionId: p.sectionId }, _max: { index: true } });
        const created = await tx.course.create({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: { ...(p.data as any), sectionId: p.sectionId, index: (last._max.index ?? 0) + 1, status: "DRAFT" },
          select: { id: true },
        });
        await tx.faq.createMany({
          data: p.faqs.map((f, index) => ({ courseId: created.id, question: f.q, answer: html(f.a), index })),
        });
      });
      console.log(`created ${p.to} (DRAFT)`);
      continue;
    }
    if ("moveTo" in p) {
      const last = await prisma.course.aggregate({ where: { sectionId: p.moveTo.id }, _max: { index: true } });
      await prisma.course.update({ where: { id: p.id }, data: { sectionId: p.moveTo.id, index: (last._max.index ?? 0) + 1 } });
      console.log(`moved ${p.from} -> ${p.moveTo.link}`);
      continue;
    }
    const redirectTo = "draftTo" in p ? p.draftTo : p.to;
    await prisma.$transaction(async (tx) => {
      if ("draftTo" in p) {
        await tx.course.update({ where: { id: p.id }, data: { status: "DRAFT" } });
      } else {
        await tx.course.update({ where: { id: p.id }, data: p.data });
        await tx.faq.deleteMany({ where: { courseId: p.id } });
        await tx.faq.createMany({
          data: p.faqs.map((f, index) => ({ courseId: p.id, question: f.q, answer: html(f.a), index })),
        });
      }
      if (redirectTo !== p.from) {
        const fromPath = `/courses/${p.from}`;
        const toPath = `/courses/${redirectTo}`;
        // Keep older redirects pointing straight at the final URL, and drop any loop
        await tx.redirect.updateMany({ where: { toPath: fromPath }, data: { toPath } });
        await tx.redirect.deleteMany({ where: { fromPath: toPath } });
        await tx.redirect.upsert({ where: { fromPath }, create: { fromPath, toPath }, update: { toPath } });
      }
    });
    console.log(`wrote ${"draftTo" in p ? p.from : p.to}`);
  }
  console.log('\nDone. Press "Refresh public cache" on the admin course list.');
}
await prisma.$disconnect();
