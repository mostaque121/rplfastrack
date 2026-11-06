import type { CrmSyncStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

import { CRM_STATUS_LABELS } from "../labels";

const styles: Record<CrmSyncStatus, string> = {
  SYNCED: "bg-green-50 text-green-800 ring-green-600/20",
  PENDING: "bg-amber-50 text-amber-800 ring-amber-600/20",
  FAILED: "bg-red-50 text-red-800 ring-red-600/20",
};

export function CrmStatusBadge({ status }: { status: CrmSyncStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
      )}
    >
      {CRM_STATUS_LABELS[status]}
    </span>
  );
}
