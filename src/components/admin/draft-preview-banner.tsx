import { draftMode } from "next/headers";

/** Shown only in Draft Mode (an admin previewing), never to visitors. */
export async function DraftPreviewBanner({ path }: { path: string }) {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-4 bg-amber-400 px-4 py-2 text-sm font-medium text-amber-950">
      Preview mode: you see drafts and unpublished changes.
      <a
        href={`/api/admin/preview?exit=1&path=${encodeURIComponent(path)}`}
        className="underline underline-offset-2"
      >
        Exit preview
      </a>
    </div>
  );
}
