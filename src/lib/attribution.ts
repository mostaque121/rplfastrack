import { z } from "zod";

const KEY = "rpl-attribution";
const PARAMS = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  gclid: "gclid",
  fbclid: "fbclid",
} as const;

const field = z.string().trim().max(500).optional();

export const attributionSchema = z.object({
  landingPage: field,
  utmSource: field,
  utmMedium: field,
  utmCampaign: field,
  gclid: field,
  fbclid: field,
});

export type Attribution = z.infer<typeof attributionSchema>;

/**
 * Remembers where this visit came from, for the session. The first page
 * wins, unless a later URL carries campaign or click IDs (a new ad click).
 */
export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const fromUrl: Attribution = {};
    for (const [key, param] of Object.entries(PARAMS)) {
      const value = url.searchParams.get(param);
      if (value) fromUrl[key as keyof typeof PARAMS] = value;
    }
    const hasCampaign = Object.keys(fromUrl).length > 0;
    if (sessionStorage.getItem(KEY) && !hasCampaign) return;

    sessionStorage.setItem(KEY, JSON.stringify({ landingPage: url.pathname, ...fromUrl }));
  } catch {
    // Storage blocked (private mode, etc.): leads are still saved without it
  }
}

export function getAttribution(): Attribution {
  try {
    const parsed = attributionSchema.safeParse(JSON.parse(sessionStorage.getItem(KEY) ?? "{}"));
    return parsed.success ? parsed.data : {};
  } catch {
    return {};
  }
}
