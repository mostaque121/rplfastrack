import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/server/admin";

/**
 * GET /api/admin/preview?path=/courses/slug        → Draft Mode on, then the page
 * GET /api/admin/preview?path=/courses/slug&exit=1 → Draft Mode off
 *
 * In Draft Mode the course page renders per request and shows drafts. Only
 * this admin's browser is affected; public visitors keep the static page.
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path") ?? "/";
  // Same-site course/section paths only, so this can't be an open redirect
  const target = /^\/(courses|section)\/[a-z0-9-]+$/.test(path) ? path : "/";

  const draft = await draftMode();
  if (req.nextUrl.searchParams.has("exit")) draft.disable();
  else draft.enable();

  return NextResponse.redirect(new URL(target, req.nextUrl.origin));
}
