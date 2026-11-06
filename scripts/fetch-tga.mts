/**
 * Pulls official qualification data from training.gov.au for every course code
 * in the database or in docs/content/courses/*.json (using the current replacement
 * where a code is superseded)
 * and writes it to docs/content/courses/_official.json: title, status,
 * packaging rules, entry requirements, core and elective units.
 *
 *   npx tsx --env-file=.env scripts/fetch-tga.mts
 *
 * Re-run it each quarter to catch superseded codes (CONTENT_STRATEGY §4.4).
 * scripts/import-course-content.mts reads the output.
 */
import fs from "node:fs";

import render from "dom-serializer";
import { DomUtils, parseDocument } from "htmlparser2";

import { makePrisma } from "./db.mts";

const OUT = "docs/content/courses/_official.json";
const API = "https://training.gov.au/api";

const link = (c: string) => `<a href="https://training.gov.au/training/details/${c}">${c}</a>`;
const fixRefs = (html: string) => html.replace(/<ntr-tcref[^>]*data-nrt-code="([^"]+)"[^>]*>[^<]*<\/ntr-tcref>/g, (_, c) => link(c));
const text = (n: any) => DomUtils.textContent(n).replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const HEAD = /^(?:(?:imported (?:and common )?)?(?:core units?|electives? units?|specialist elective units?|general elective units?)\b.{0,40}|group [a-z]\b.{0,80})$/i;
const CODE = /^[A-Z]{3,}[0-9]{3,}[A-Z]?$/;
const titleCase = (s: string) => (s === s.toUpperCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s);
function convert(j: any) {
  const doc = parseDocument(j.items.PackagingRules);
  const root: any = DomUtils.findOne((e) => e.name === "div", doc.children, false) ?? doc;
  const groups: { title: string; rows: Map<string, string> }[] = [];
  let started = false;
  let rulesHtml = "";
  const heading = (t: string) => { started = true; groups.push({ title: titleCase(t.replace(/:$/, "")), rows: new Map() }); };
  const unit = (c: string, title: string, star: boolean) => {
    if (!started) return;
    const g = groups[groups.length - 1];
    if (!g.rows.has(c)) g.rows.set(c, `<tr><td>${link(c)}${star ? "*" : ""}</td><td>${title.replace(/\*$/, "").trim()}</td></tr>`);
  };
  const walk = (n: any) => {
    if (n.type !== "tag") return;
    if (n.name === "ntr-tcref") { const nx = n.next; const star = !!(nx && nx.type === "text" && nx.data.trim().startsWith("*")); unit(n.attribs["data-nrt-code"], n.attribs["data-nrt-title"] ?? "", star || (n.attribs["data-nrt-title"] ?? "").endsWith("*")); return; }
    if (n.name === "tr") {
      const cells = n.children.filter((c: any) => c.name === "td" || c.name === "th");
      const first = cells[0] ? text(cells[0]).replace(/\*$/, "") : "";
      if (cells.length >= 2 && CODE.test(first) && !DomUtils.findOne((e) => e.name === "ntr-tcref", cells, true)) { const t = text(cells[1]); unit(first, t, t.endsWith("*") || text(cells[0]).endsWith("*")); return; }
      const t = text(n); if (HEAD.test(t)) { heading(t.replace(/\s+(weighting )?points?$/i, "").replace(/\s+unit (code|title).*$/i, "")); return; }
      if (!started && cells.length === 1 && t.length > 150) { rulesHtml += cells[0].children.map((c: any) => render(c)).join(""); return; }
    }
    if (["p", "h2", "h3", "h4", "strong", "i", "em", "li"].includes(n.name) && !DomUtils.findOne((e) => e.name === "ntr-tcref", n.children, true)) {
      const t = text(n); if (HEAD.test(t)) { heading(t); return; }
    }
    n.children?.forEach(walk);
  };
  for (const child of root.children) { if (!started) { const before = groups.length; walk(child); if (groups.length === before && !started) rulesHtml += render(child); } else walk(child); }
  const table = (rows: string[], head?: string) => `<table>${head ? `<thead><tr><th colspan="2">${head}</th></tr></thead>` : ""}<tbody>${rows.join("")}</tbody></table>`;
  const coreG = groups.filter((g) => /^core/i.test(g.title));
  const elec = groups.filter((g) => !/^core/i.test(g.title) && g.rows.size);
  const core = coreG.flatMap((g) => [...g.rows.values()]);
  return {
    title: j.title,
    packagingRule: fixRefs(rulesHtml).replace(/ (class|style)="[^"]*"/g, ""),
    coreUnits: table(core),
    electiveUnits: elec.map((g) => table([...g.rows.values()], g.title)).join(""),
    entryRequirement: fixRefs(j.items.EntryRequirements ?? "<p>There are no entry requirements for this qualification.</p>").replace(/ (class|style)="[^"]*"/g, ""),
  };
}

async function get(url: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url).catch(() => null);
    if (res?.ok) return res.json();
  }
  throw new Error(`training.gov.au request failed: ${url}`);
}

/** Follows "superseded by" mappings to the current code. */
async function current(code: string): Promise<{ code: string; supersedes?: string; training: any }> {
  const training = await get(`${API}/training/${code}`);
  if (training.usageRecommendation !== "superseded") return { code, training };
  const next = (training.mappingInformation ?? []).find((m: any) => m.code !== code && m.mapsToCode === code);
  if (!next) return { code, training };
  const resolved = await current(next.code);
  return { ...resolved, supersedes: code };
}

const prisma = makePrisma();
const courses = await prisma.course.findMany({ select: { title: true, code: true } });
await prisma.$disconnect();
// Plus the codes of courses that only exist in the content files so far (created by the importer)
const DIR = "docs/content/courses";
const planned = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .flatMap((f) => JSON.parse(fs.readFileSync(`${DIR}/${f}`, "utf8")) as { code?: string }[])
  .map((e) => e.code);
const codes = [
  ...new Set([...courses.map((c) => c.code ?? c.title.match(/[A-Z]{3,}[0-9]{3,}[A-Z]?/)?.[0]), ...planned].filter(Boolean)),
] as string[];

const result: Record<string, any> = {};
await Promise.all(
  codes.map(async (dbCode) => {
    const { code, supersedes, training } = await current(dbCode);
    const release = training.releases.find((r: any) => r.currency === "current") ?? training.releases[0];
    const detail = await get(`${API}/training/${code}/releases/${release.releaseNumber}?include=All`);
    const bundle = await get(detail.contentBundles[0].links[0].href);
    const items = Object.fromEntries(bundle.items.map((i: any) => [i.contentType, i.content]));
    const base = {
      code,
      title: training.title,
      type: training.type,
      status: training.usageRecommendation,
      release: release.releaseNumber,
      releaseDate: release.releaseDate,
      workPlacementHours: release.workPlacementHours ?? null,
      ...(supersedes && { supersedes }),
    };
    result[dbCode] = training.type === "qualification" ? { ...base, ...convert({ ...training, items }) } : base;
    console.log(dbCode.padEnd(9), supersedes ? `-> ${code}` : "current");
  }),
);
fs.writeFileSync(OUT, JSON.stringify(Object.fromEntries(Object.entries(result).sort()), null, 1));
console.log(`Wrote ${Object.keys(result).length} qualifications to ${OUT}`);
