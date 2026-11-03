// Every cache tag in one place. Public pages are invalidated by tag on admin
// edits only (no time-based revalidate: Vercel Hobby ISR limits).
export const CACHE_TAGS = {
  sections: "section:all",
  section: (link: string) => `section:${link}`,
  courses: "course:all",
  course: (link: string) => `course:${link}`,
  reviewsAll: "user-review:all",
  reviewsCommon: "user-review:common",
  redirects: "redirect:all",
} as const;
