import fs from "node:fs";
import { makePrisma } from "./db.mts";
const prisma = makePrisma();
const courses = await prisma.course.findMany({
  orderBy: [{ section: { index: "asc" } }, { index: "asc" }],
  include: { section: { select: { title: true, link: true } }, _count: { select: { faqs: true } } },
});
const sections = await prisma.section.findMany({ orderBy: { index: "asc" }, include: { _count: { select: { faqs: true, courses: true } } } });
fs.writeFileSync(process.argv[2], JSON.stringify({ sections, courses }, null, 1));
for (const c of courses) console.log([c.section.link, c.link, c.code ?? "-", c.status, c.qualificationStatus, c.title, `faqs=${c._count.faqs}`, `hero=${c.heroIntro ? "y" : "n"}`].join(" | "));
console.log("sections:", sections.map(s => `${s.link}(${s._count.courses}) metaTitle=${s.metaTitle ? "y":"n"} intro=${s.intro?"y":"n"} faqs=${s._count.faqs}`).join("\n"));
await prisma.$disconnect();
