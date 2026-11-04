import sanitizeHtml from "sanitize-html";

import { siteConfig } from "@/config/site";

// Mirrors the editor schema in components/rich-text/extensions.ts. Anything
// else (colours, fonts, images, underline, classes…) is removed; the text
// inside a removed tag is kept.
const CALLOUTS = new Set(["info", "tip", "warning"]);
const SITE_HOST = new URL(siteConfig.url).hostname.replace(/^www\./, "");

function isInternal(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === SITE_HOST;
  } catch {
    return false;
  }
}

/** Absolute links to our own site become root-relative paths. */
function internalPath(href: string) {
  if (href.startsWith("/")) return href;
  const url = new URL(href);
  return `${url.pathname}${url.search}${url.hash}`;
}

const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "h2",
    "h3",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "a",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "aside",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    aside: ["data-callout"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    b: "strong",
    i: "em",
    h1: "h2",
    h4: "h3",
    h5: "h3",
    h6: "h3",
    a: (tagName, attribs): sanitizeHtml.Tag => {
      const href = attribs.href?.trim() ?? "";
      if (isInternal(href)) return { tagName, attribs: { href: internalPath(href) } };
      if (/^(mailto|tel):/i.test(href)) return { tagName, attribs: { href } };
      if (/^https?:\/\//i.test(href)) {
        return { tagName, attribs: { href, target: "_blank", rel: "noopener noreferrer" } };
      }
      // No usable href (empty, javascript:…): unwrapped after sanitising
      return { tagName, attribs: {} };
    },
    td: (tagName, attribs) => ({ tagName, attribs: spans(attribs) }),
    th: (tagName, attribs) => ({ tagName, attribs: spans(attribs) }),
    aside: (tagName, attribs) => ({
      tagName,
      attribs: {
        "data-callout": CALLOUTS.has(attribs["data-callout"]) ? attribs["data-callout"] : "info",
      },
    }),
  },
  // Empty paragraphs and links, e.g. Quill's <p><br></p> spacers
  exclusiveFilter: (frame) =>
    (frame.tag === "p" || frame.tag === "a") && !frame.text.trim() && !frame.mediaChildren.length,
};

/** Keeps colspan/rowspan only when they actually merge cells. */
function spans(attribs: sanitizeHtml.Attributes) {
  const result: sanitizeHtml.Attributes = {};
  for (const key of ["colspan", "rowspan"]) {
    const value = Number(attribs[key]);
    if (Number.isInteger(value) && value > 1) result[key] = String(value);
  }
  return result;
}

/** Cleans editor HTML before it is saved. Returns "" for empty content. */
export function sanitizeRichText(html: string | null | undefined) {
  if (!html) return "";
  const clean = sanitizeHtml(html, options)
    .trim()
    .replace(/<a>((?:(?!<\/?a[\s>]).)*)<\/a>/g, "$1");
  // Tiptap puts each table cell's text in a <p>; unwrap single paragraphs
  return clean.replace(/<(td|th)([^>]*)><p>((?:(?!<\/?p>).)*)<\/p><\/\1>/g, "<$1$2>$3</$1>");
}
