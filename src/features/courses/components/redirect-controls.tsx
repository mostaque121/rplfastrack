"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createRedirect, deleteRedirect } from "../actions";

export function AddRedirectForm() {
  const router = useRouter();
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-wrap items-end gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const result = await createRedirect({ fromPath, toPath });
          if (!result.success) {
            toast.error(result.message);
            return;
          }
          toast.success("Redirect saved");
          setFromPath("");
          setToPath("");
          router.refresh();
        });
      }}
    >
      <label className="flex min-w-64 flex-1 flex-col gap-1 text-sm">
        Old path
        <Input
          value={fromPath}
          onChange={(e) => setFromPath(e.target.value)}
          placeholder="/courses/old-slug"
          required
        />
      </label>
      <label className="flex min-w-64 flex-1 flex-col gap-1 text-sm">
        Redirect to
        <Input
          value={toPath}
          onChange={(e) => setToPath(e.target.value)}
          placeholder="/courses/new-slug"
          required
        />
      </label>
      <Button type="submit" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        Add redirect
      </Button>
    </form>
  );
}

export function DeleteRedirectButton({ id, fromPath }: { id: string; fromPath: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={`Delete redirect from ${fromPath}`}
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete the redirect from ${fromPath}? That URL will 404.`)) return;
        startTransition(async () => {
          await deleteRedirect(id);
          router.refresh();
        });
      }}
    >
      {pending ? <Loader2 className="animate-spin" /> : <Trash2 className="text-destructive" />}
    </Button>
  );
}
