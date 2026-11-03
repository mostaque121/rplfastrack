// Every cache tag in one place. Public pages are invalidated by tag or path
// on admin edits only (no time-based revalidate: Vercel Hobby ISR limits).
export const CACHE_TAGS = {
  sections: "section:all",
  reviewsAll: "user-review:all",
  reviewsCommon: "user-review:common",
  redirects: "redirect:all",
} as const;
