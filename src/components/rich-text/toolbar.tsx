"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  Info,
  Italic,
  Lightbulb,
  Link2,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  Table,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { CalloutVariant } from "./callout-extension";

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn("size-8", active && "bg-accent text-accent-foreground")}
    >
      {children}
    </Button>
  );
}

const callouts: { variant: CalloutVariant; label: string; icon: typeof Info }[] = [
  { variant: "info", label: "Info callout", icon: Info },
  { variant: "tip", label: "Tip callout", icon: Lightbulb },
  { variant: "warning", label: "Warning callout", icon: TriangleAlert },
];

function LinkButton({ editor, active }: { editor: Editor; active: boolean }) {
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState("");

  const apply = () => {
    const chain = editor.chain().focus().extendMarkRange("link");
    if (href.trim()) chain.setLink({ href: href.trim() }).run();
    else chain.unsetLink().run();
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setHref(editor.getAttributes("link").href ?? "");
        setOpen(next);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Link"
          aria-label="Link"
          aria-pressed={active}
          className={cn("size-8", active && "bg-accent text-accent-foreground")}
        >
          <Link2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2" align="start">
        <Input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
          placeholder="/courses/… or https://…"
          autoFocus
        />
        <p className="text-xs text-muted-foreground">
          Internal links start with /. Leave empty to remove the link.
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" size="sm" onClick={apply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      h2: editor.isActive("heading", { level: 2 }),
      h3: editor.isActive("heading", { level: 3 }),
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      bulletList: editor.isActive("bulletList"),
      orderedList: editor.isActive("orderedList"),
      link: editor.isActive("link"),
      table: editor.isActive("table"),
      callout: callouts.find(({ variant }) => editor.isActive("callout", { variant }))?.variant,
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const chain = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/40 p-1">
      <ToolButton
        label="Heading 2"
        active={state.h2}
        onClick={() => chain().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </ToolButton>
      <ToolButton
        label="Heading 3"
        active={state.h3}
        onClick={() => chain().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 />
      </ToolButton>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolButton label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}>
        <Bold />
      </ToolButton>
      <ToolButton label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}>
        <Italic />
      </ToolButton>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolButton
        label="Bullet list"
        active={state.bulletList}
        onClick={() => chain().toggleBulletList().run()}
      >
        <List />
      </ToolButton>
      <ToolButton
        label="Numbered list"
        active={state.orderedList}
        onClick={() => chain().toggleOrderedList().run()}
      >
        <ListOrdered />
      </ToolButton>
      <LinkButton editor={editor} active={state.link} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Table"
            aria-label="Table"
            className={cn("size-8", state.table && "bg-accent text-accent-foreground")}
          >
            <Table />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onSelect={() => chain().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()}
          >
            Insert table
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={!state.table} onSelect={() => chain().addRowAfter().run()}>
            Add row below
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!state.table} onSelect={() => chain().addColumnAfter().run()}>
            Add column right
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!state.table} onSelect={() => chain().deleteRow().run()}>
            Delete row
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!state.table} onSelect={() => chain().deleteColumn().run()}>
            Delete column
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!state.table}
            onSelect={() => chain().toggleHeaderRow().run()}
          >
            Toggle header row
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!state.table}
            className="text-destructive"
            onSelect={() => chain().deleteTable().run()}
          >
            Delete table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="mx-1 h-5" />
      {callouts.map(({ variant, label, icon: Icon }) => (
        <ToolButton
          key={variant}
          label={label}
          active={state.callout === variant}
          onClick={() => chain().toggleCallout(variant).run()}
        >
          <Icon />
        </ToolButton>
      ))}
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolButton label="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}>
        <Undo2 />
      </ToolButton>
      <ToolButton label="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}>
        <Redo2 />
      </ToolButton>
      <ToolButton
        label="Clear formatting"
        onClick={() => chain().unsetAllMarks().clearNodes().run()}
      >
        <RemoveFormatting />
      </ToolButton>
    </div>
  );
}
