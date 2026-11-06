/**
 * One-time clean-up of the course HTML written by the old Quill/CKEditor
 * editors, so it matches the Tiptap schema (see docs/PROJECT_PLAN.md §8a).
 *
 *   npx tsx --env-file=.env scripts/migrate-rich-text.ts          # dry run
 *   npx tsx --env-file=.env scripts/migrate-rich-text.ts --write  # apply
 *
 * The dry run changes nothing and writes a before/after report to
 * docs/data/rich-text-migration.html (git-ignored). After --write, press
 * "Refresh public cache" on the admin course list so pages pick it up.
 */
import fs from "node:fs";
import path from "node:path";

import { makePrisma } from "./db.mts";
import { sanitizeRichText } from "../src/lib/sanitize-rich-text";

const FIELDS = [
  "description",
  "jobOpportunity",
  "entryRequirement",
  "packagingRule",
  "coreUnits",
  "electiveUnits",
] as const;

const write = process.argv.includes("--write");
const prisma = makePrisma();

/** Quill 2 stores bullet lists as <ol><li data-list="bullet">. */
function quillListsToHtml(html: string) {
  return html.replace(/<ol>((?:(?!<\/?ol>)[\s\S])*)<\/ol>/g, (match, inner: string) => {
    const items = inner.match(/<li\b[^>]*>/g) ?? [];
    const bullets = items.filter((li) => li.includes('data-list="bullet"')).length;
    return bullets > 0 && bullets === items.length ? `<ul>${inner}</ul>` : match;
  });
}

function migrateHtml(html: string) {
  return sanitizeRichText(quillListsToHtml(html));
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function main() {
  const courses = await prisma.course.findMany({
    select: { id: true, title: true, ...Object.fromEntries(FIELDS.map((f) => [f, true])) },
    orderBy: { title: "asc" },
  });

  let changedFields = 0;
  let before = 0;
  let after = 0;
  const report: string[] = [];
  const updates: { id: string; data: Partial<Record<(typeof FIELDS)[number], string>> }[] = [];

  for (const course of courses as unknown as ({ id: string; title: string } & Record<
    (typeof FIELDS)[number],
    string
  >)[]) {
    const data: Partial<Record<(typeof FIELDS)[number], string>> = {};
    for (const field of FIELDS) {
      const original = course[field] ?? "";
      const migrated = migrateHtml(original);
      before += original.length;
      after += migrated.length;
      if (migrated === original) continue;
      data[field] = migrated;
      changedFields++;
      report.push(
        `<h3>${escape(course.title)} · ${field}</h3>` +
          `<div class="row"><div><h4>Before</h4><div class="html">${original}</div><pre>${escape(original)}</pre></div>` +
          `<div><h4>After</h4><div class="html">${migrated}</div><pre>${escape(migrated)}</pre></div></div>`,
      );
    }
    if (Object.keys(data).length) updates.push({ id: course.id, data });
  }

  const dir = path.join(process.cwd(), "docs", "data");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "rich-text-migration.html");
  fs.writeFileSync(
    file,
    `<!doctype html><meta charset="utf-8"><title>Rich text migration</title>
<style>body{font:14px system-ui;margin:2rem}.row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
pre{white-space:pre-wrap;font-size:11px;background:#f5f5f5;padding:.5rem;max-height:20rem;overflow:auto}
.html{border:1px solid #ddd;padding:.5rem;max-height:20rem;overflow:auto}td,th{border:1px solid #ccc;padding:2px 4px}</style>
<h1>Rich text migration (${write ? "applied" : "dry run"})</h1>
<p>${courses.length} courses, ${changedFields} fields change. ${before.toLocaleString()} → ${after.toLocaleString()} characters.</p>
${report.join("\n")}`,
  );

  console.log(
    `${courses.length} courses, ${updates.length} with changes, ${changedFields} fields. ` +
      `${before.toLocaleString()} → ${after.toLocaleString()} characters.`,
  );
  console.log(`Report: ${file}`);

  if (!write) {
    console.log("Dry run: nothing written. Re-run with --write to apply.");
    return;
  }

  for (const { id, data } of updates) {
    await prisma.course.update({ where: { id }, data });
  }
  console.log(`Updated ${updates.length} courses.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
