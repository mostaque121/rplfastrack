import { Node } from "@tiptap/react";

export const CALLOUT_VARIANTS = ["info", "tip", "warning"] as const;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    callout: {
      /** Wraps the selection in a callout, switches its variant, or removes it. */
      toggleCallout: (variant: CalloutVariant) => ReturnType;
    };
  }
}

/** Stored as <aside data-callout="info|tip|warning">…</aside>. */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "(paragraph | bulletList | orderedList)+",
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: "info",
        parseHTML: (element) => {
          const value = element.getAttribute("data-callout");
          return CALLOUT_VARIANTS.includes(value as CalloutVariant) ? value : "info";
        },
        renderHTML: (attributes) => ({ "data-callout": attributes.variant }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "aside[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["aside", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      toggleCallout:
        (variant) =>
        ({ editor, commands }) => {
          if (!editor.isActive(this.name)) return commands.wrapIn(this.name, { variant });
          if (editor.isActive(this.name, { variant })) return commands.lift(this.name);
          return commands.updateAttributes(this.name, { variant });
        },
    };
  },
});
