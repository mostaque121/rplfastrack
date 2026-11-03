"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { retryLeadSync } from "../actions";

export function RetrySyncButton({ leadId }: { leadId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await retryLeadSync(leadId);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        })
      }
    >
      {pending ? <Loader2 className="animate-spin" /> : <RefreshCw />}
      Retry
    </Button>
  );
}
