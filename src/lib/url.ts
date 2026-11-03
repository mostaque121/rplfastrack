import { SITE_URL } from "@/config/site";

/** Builds an absolute URL on the primary (www) host. */
export function absoluteUrl(path = "/") {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
