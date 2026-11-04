"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

import { richTextExtensions } from "./extensions";
import { Toolbar } from "./toolbar";

/**
 * Admin-only rich text editor. Load it with next/dynamic so public pages
 * never ship Tiptap. Emits HTML ("" when empty); the server sanitises it.
 */
export function RichTextEditor({
  value,
  onChange,
  minHeight = "10rem",
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: string;
  "aria-label"?: string;
}) {
  const editor = useEditor({
    extensions: richTextExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose-rpl max-w-none px-4 py-3 focus:outline-none",
        style: `min-height: ${minHeight}`,
        ...(ariaLabel && { "aria-label": ariaLabel }),
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });

  // Follow outside resets (e.g. "Discard changes"), not our own updates
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-input bg-background shadow-xs",
        "focus-within:ring-[3px] focus-within:ring-ring/50",
      )}
    >
      {editor ? (
        <>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div style={{ minHeight }} className="animate-pulse bg-muted/40" />
      )}
    </div>
  );
}

export default RichTextEditor;
