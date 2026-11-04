"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { refreshPublicContent } from "../actions";

/** Only needed after a direct database change, e.g. a migration script. */
export function RefreshCacheButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      disabled={pending}
      title="Rebuild every public course and section page from the database. Saving in the editor already does this for the page you edit."
      onClick={() =>
        startTransition(async () => {
          const result = await refreshPublicContent();
          if (result.success) toast.success("Public pages will rebuild on their next visit");
          else toast.error(result.message);
        })
      }
    >
      {pending ? <Loader2 className="animate-spin" /> : <RefreshCw />}
      Refresh public cache
    </Button>
  );
}
