/**
 * Exports the tables the admin rebuild retires (payments, old lead tables,
 * notes, notifications) to one Excel file, before they are dropped.
 *
 *   npx tsx --env-file=.env scripts/export-legacy-data.ts
 *
 * Writes docs/data/legacy-export-YYYY-MM-DD.xlsx (git-ignored). Read-only:
 * nothing in the database changes. Needs a direct postgresql:// DATABASE_URL
 * and a client generated with the engine (`npx prisma generate`).
 */
import fs from "node:fs";
import path from "node:path";

import ExcelJS from "exceljs";

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

type Row = Record<string, unknown>;

function addSheet(workbook: ExcelJS.Workbook, name: string, rows: Row[]) {
  const sheet = workbook.addWorksheet(name);
  if (rows.length === 0) {
    sheet.addRow(["(no rows)"]);
    return;
  }
  const keys = Object.keys(rows[0]);
  sheet.columns = keys.map((key) => ({ header: key, key, width: 20 }));
  for (const row of rows) {
    sheet.addRow(
      Object.fromEntries(
        keys.map((key) => {
          const value = row[key];
          if (Array.isArray(value)) return [key, value.join(", ")];
          // Decimal and other objects
          if (value && typeof value === "object" && !(value instanceof Date)) {
            return [key, String(value)];
          }
          return [key, value];
        }),
      ),
    );
  }
  sheet.getRow(1).font = { bold: true };
  sheet.views = [{ state: "frozen", ySplit: 1 }];
}

async function main() {
  const [payments, paymentParts, responses, eligibility, notes, notifications] = await Promise.all([
    prisma.payment.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.paymentPart.findMany({ orderBy: { paidAt: "asc" } }),
    prisma.response.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.eligibilitySubmission.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.note.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.notification.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const workbook = new ExcelJS.Workbook();
  addSheet(workbook, "Payment", payments);
  addSheet(workbook, "PaymentPart", paymentParts);
  addSheet(workbook, "Response", responses);
  addSheet(workbook, "EligibilitySubmission", eligibility);
  addSheet(workbook, "Note", notes);
  addSheet(workbook, "Notification", notifications);

  const dir = path.join(process.cwd(), "docs", "data");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `legacy-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  await workbook.xlsx.writeFile(file);

  console.table({
    Payment: payments.length,
    PaymentPart: paymentParts.length,
    Response: responses.length,
    EligibilitySubmission: eligibility.length,
    Note: notes.length,
    Notification: notifications.length,
  });
  console.log(`Saved ${file}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
