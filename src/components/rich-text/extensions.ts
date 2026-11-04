import { TableKit } from "@tiptap/extension-table";
import StarterKit from "@tiptap/starter-kit";

import { Callout } from "./callout-extension";

/**
 * The editor schema: only what the page design can display well.
 * Keep it in step with the allow-list in src/lib/sanitize-rich-text.ts.
 * Pasted content outside this schema (colours, fonts, images…) is dropped.
 */
export const richTextExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    blockquote: false,
    code: false,
    codeBlock: false,
    horizontalRule: false,
    strike: false,
    underline: false,
    link: {
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["mailto", "tel"],
      // rel/target are set on save by the sanitiser (internal vs external)
      HTMLAttributes: { rel: null, target: null },
    },
  }),
  TableKit.configure({ table: { resizable: false } }),
  Callout,
];
