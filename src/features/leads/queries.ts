import "server-only";

import { CrmSyncStatus, LeadForm, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/server/db";

// Admin-only reads. Not cached: the admin is dynamic and must show new leads
// straight away.

export const LEADS_PAGE_SIZE = 50;
export const LEAD_TIME_ZONE = "Australia/Sydney";

// A lead still PENDING after this long means the background sync never ran.
const STALE_PENDING_MS = 10 * 60 * 1000;

export type LeadFilters = {
  q?: string;
  form?: LeadForm;
  status?: CrmSyncStatus;
  from?: string; // YYYY-MM-DD, Sydney time
  to?: string;
  page: number;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const isDay = (value?: string) => !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);

export function parseLeadFilters(params: Record<string, string | string[] | undefined>) {
  const form = first(params.form);
  const status = first(params.status);
  const from = first(params.from);
  const to = first(params.to);
  return {
    q: first(params.q)?.trim() || undefined,
    form: Object.values(LeadForm).includes(form as LeadForm) ? (form as LeadForm) : undefined,
    status: Object.values(CrmSyncStatus).includes(status as CrmSyncStatus)
      ? (status as CrmSyncStatus)
      : undefined,
    from: isDay(from) ? from : undefined,
    to: isDay(to) ? to : undefined,
    page: Math.max(1, Number(first(params.page)) || 1),
  } satisfies LeadFilters;
}

/** Sydney's UTC offset (ms) at a given instant. */
function sydneyOffset(instant: Date) {
  const local = new Date(instant.toLocaleString("en-US", { timeZone: LEAD_TIME_ZONE }));
  const utc = new Date(instant.toLocaleString("en-US", { timeZone: "UTC" }));
  return local.getTime() - utc.getTime();
}

/** UTC instant of midnight on `day` (YYYY-MM-DD) in Sydney. */
function sydneyMidnight(day: string) {
  const utcMidnight = new Date(`${day}T00:00:00Z`).getTime();
  // Take the offset at the guessed instant, so DST-change days are right too
  const guess = new Date(utcMidnight - sydneyOffset(new Date(utcMidnight)));
  return new Date(utcMidnight - sydneyOffset(guess));
}

function addDays(day: string, days: number) {
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function todayInSydney() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: LEAD_TIME_ZONE }).format(new Date());
}

function leadWhere(filters: Omit<LeadFilters, "page">): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};
  if (filters.form) where.form = filters.form;
  if (filters.status) where.crmStatus = filters.status;
  if (filters.from || filters.to) {
    where.createdAt = {
      ...(filters.from && { gte: sydneyMidnight(filters.from) }),
      ...(filters.to && { lt: sydneyMidnight(addDays(filters.to, 1)) }),
    };
  }
  if (filters.q) {
    const contains = { contains: filters.q, mode: "insensitive" as const };
    where.OR = [
      { name: contains },
      { email: contains },
      { phone: contains },
      { interest: contains },
    ];
  }
  return where;
}

export async function listLeads(filters: LeadFilters) {
  const where = leadWhere(filters);
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (filters.page - 1) * LEADS_PAGE_SIZE,
      take: LEADS_PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
  ]);
  return { leads, total, pages: Math.max(1, Math.ceil(total / LEADS_PAGE_SIZE)) };
}

/** Every matching lead, for the CSV export (capped so a request stays small). */
export async function listLeadsForExport(filters: LeadFilters) {
  return prisma.lead.findMany({
    where: leadWhere(filters),
    orderBy: { createdAt: "desc" },
    take: 10_000,
  });
}

/** Leads whose CRM sync failed, or never finished. */
export async function listUnsyncedLeads() {
  return prisma.lead.findMany({
    where: {
      OR: [
        { crmStatus: "FAILED" },
        { crmStatus: "PENDING", createdAt: { lt: new Date(Date.now() - STALE_PENDING_MS) } },
      ],
    },
    select: {
      id: true,
      name: true,
      form: true,
      crmStatus: true,
      crmError: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export type DailyLeadCount = { day: string; form: LeadForm; count: number };

/** Lead counts per Sydney day and form for the last `days` days (today included). */
export async function getDailyLeadCounts(days = 30) {
  const today = todayInSydney();
  const since = sydneyMidnight(addDays(today, -(days - 1)));
  const rows = await prisma.$queryRaw<DailyLeadCount[]>`
    SELECT to_char(("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${LEAD_TIME_ZONE}, 'YYYY-MM-DD') AS day,
           "form"::text AS form,
           count(*)::int AS count
    FROM "Lead"
    WHERE "createdAt" >= ${since}
    GROUP BY 1, 2`;

  const dayList = Array.from({ length: days }, (_, i) => addDays(today, i - (days - 1)));
  return { today, days: dayList, rows };
}

/** Landing pages that brought the most leads in the last 30 days. */
export async function getTopLeadPages(limit = 5) {
  const since = sydneyMidnight(addDays(todayInSydney(), -29));
  return prisma.$queryRaw<{ page: string; leads: number }[]>`
    SELECT "landingPage" AS page, count(*)::int AS leads
    FROM "Lead"
    WHERE "createdAt" >= ${since} AND "landingPage" IS NOT NULL
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT ${limit}`;
}
