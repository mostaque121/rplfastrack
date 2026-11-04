"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/** Warns before closing or reloading the tab with unsaved changes. */
export function useUnsavedChangesWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}

export function SaveBar({
  dirty,
  saving,
  onDiscard,
  extra,
}: {
  dirty: boolean;
  saving: boolean;
  onDiscard: () => void;
  extra?: React.ReactNode;
}) {
  useUnsavedChangesWarning(dirty);

  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t bg-background/95 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {saving ? "Saving…" : dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {extra}
          <Button type="button" variant="ghost" disabled={!dirty || saving} onClick={onDiscard}>
            Discard
          </Button>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
