// Old URLs still in Google (Search Console, Nov 2026) that 404 today.
// Applied in next.config.ts (matching there is case-insensitive, and
// uppercase slugs are lowercased by the pages themselves). Future slug changes are stored in the
// `Redirect` table instead (see app/(main)/action/redirects.ts).
export const LEGACY_REDIRECTS: { from: string; to: string }[] = [
  // Courses
  {
    from: "/courses/shb30416",
    to: "/courses/shb30416-certificate-iii-in-hairdressing",
  },
  {
    from: "/courses/chc40221-certificate-iv-in-education-support",
    to: "/courses/chc40221-certificate-iv-in-school-based-education",
  },
  {
    from: "/courses/chc40321-cert-iv-in-child-youth-and-family",
    to: "/courses/chc40321-cert-iv-in-child-youth-family",
  },
  {
    from: "/courses/hlt43021-certificate-nr-in-allied-health-assistance",
    to: "/courses/hlt43021-certificate-iv-in-allied-health-assistance",
  },
  {
    from: "/courses/chc30121-certificate-iii-in-early-childhood-education-and-care",
    to: "/courses/chc30121-certificate-iii-in-early-childhood-education",
  },
  {
    from: "/courses/chc33021-certificate-iii-individual-support",
    to: "/courses/chc33021-certificate-iii-in-individual-support",
  },
  {
    from: "/courses/cpc31320-certificate-iii-in-wall-and-floor-tiling-rpl-fast-track",
    to: "/courses/cpc31320-certificate-iii-in-wall-and-floor-tiling",
  },
  {
    from: "/courses/uee30820-certificate-iii-electrotechnology-electrician-become-a-licensed-electrician",
    to: "/courses/uee30820-certificate-iii-in-electrotechnology-electrician-become-a-licensed-electrician",
  },
  {
    from: "/courses/uee30820-cert-iii-electrotechnology-electrician-become-a-licensed-electrician",
    to: "/courses/uee30820-certificate-iii-in-electrotechnology-electrician-become-a-licensed-electrician",
  },
  {
    from: "/courses/uee30820-certificate-iii-in-electrotechnology-electrician-become-authorization-to-install-test-repair-and-maintain",
    to: "/courses/uee30820-certificate-iii-in-electrotechnology-electrician-become-a-licensed-electrician",
  },
  {
    from: "/courses/uee32225-certificate-iii-in-air-conditioning-and-refrigeration-start-your-hvocab-career",
    to: "/courses/uee32225-certificate-iii-in-air-conditioning-and-refrigeration-start-your-hvac-career",
  },
  {
    from: "/courses/uee32225-certificate-iii-in-air-conditioning-and-start-your-hvac-career",
    to: "/courses/uee32225-certificate-iii-in-air-conditioning-and-refrigeration-start-your-hvac-career",
  },
  // Sections
  {
    from: "/section/automotive-and-engineering",
    to: "/section/automotive-services",
  },
  { from: "/section/health-and-beauty", to: "/section/health-care" },
  { from: "/section/hairdressing-beauty", to: "/section/health-care" },
  { from: "/section/hairdressing-beaut", to: "/section/health-care" },
  {
    from: "/section/electrotechnology",
    to: "/section/electrotechnology-air-conditioning",
  },
];
