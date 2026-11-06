import { businessHours, contactInfo } from "@/config/contact";
import { SITE_URL, siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { absoluteUrl } from "@/lib/url";

import type {
  BreadcrumbList,
  DayOfWeek,
  EducationalOccupationalProgram,
  ProfessionalService,
  Service,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

/** Stable ids so every page's nodes point at the same organisation and site. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const day = (name: string) => `https://schema.org/${name}` as DayOfWeek;
const DAY_NAMES: Record<string, DayOfWeek[]> = {
  "Mon – Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day),
  Saturday: [day("Saturday")],
};

/** "9:00 AM" → "09:00" */
const to24h = (t: string) => {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return t;
  const h = (Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0);
  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

const openingHours = businessHours.flatMap(([days, hours]) => {
  const dayOfWeek = DAY_NAMES[days];
  const [opens, closes] = hours.split("–").map((t) => to24h(t.trim()));
  return dayOfWeek && closes
    ? [{ "@type": "OpeningHoursSpecification" as const, dayOfWeek, opens, closes }]
    : [];
});

/** The business: an RPL application and referral service with a real office. Sits in the
 * layout, so every page has it; other nodes refer to it by `@id`. */
const organization: ProfessionalService = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: siteConfig.name,
  legalName: "RPL Fast Track Australia",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.png"),
    width: "1000",
    height: "500",
  },
  image: absoluteUrl("/home-hero.jpg"),
  description:
    "RPL Fast Track helps Australian tradies and workers turn their skills and experience into a nationally recognised qualification through Recognition of Prior Learning, assessed online by registered training organisations.",
  telephone: contactInfo.phone,
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "41 Hilton Way",
    addressLocality: "Melton West",
    addressRegion: "VIC",
    postalCode: "3337",
    addressCountry: "AU",
  },
  openingHoursSpecification: openingHours,
  areaServed: { "@type": "Country", name: "Australia" },
  knowsAbout: [
    "Recognition of Prior Learning",
    "Australian Qualifications Framework",
    "Trade licensing pathways",
    "Vocational education and training",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: "English",
  },
  sameAs: [socialLinks.facebook],
};

/** One JSON-LD document from several nodes (they reference each other by `@id`). */
const jsonLdGraph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes.map((node) => {
    const copy: Record<string, unknown> = { ...node };
    delete copy["@context"];
    return copy;
  }),
});

/** Organisation + website: sits in the layout, so every page has them. */
const siteGraph = () => jsonLdGraph(organization, websiteSchema);

/** Lightweight reference for `provider` / `publisher` fields. */
const organizationRef = {
  "@type": "Organization" as const,
  "@id": ORG_ID,
  name: siteConfig.name,
  url: SITE_URL,
};

const websiteSchema: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: siteConfig.name,
  inLanguage: siteConfig.language,
  publisher: { "@id": ORG_ID },
};

/** What we actually do: assess eligibility and refer the person to a registered training
 * organisation. We don't issue qualifications and don't publish prices. */
const serviceSchema: WithContext<Service> = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  serviceType: "Recognition of Prior Learning (RPL) application support",
  name: "RPL eligibility check and application support",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Australia" },
  audience: {
    "@type": "Audience",
    audienceType: "Experienced workers and tradespeople without a formal qualification",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: absoluteUrl("/contact"),
    availableLanguage: "English",
  },
  description:
    "Free eligibility check, then guided RPL assessment with a registered training organisation. Your work experience is assessed online for a nationally recognised Australian qualification.",
};

const homePageSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  name: "RPL Australia: Recognition of Prior Learning Online",
  url: SITE_URL,
  inLanguage: siteConfig.language,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/home-hero.jpg") },
  description:
    "Turn your work experience into a nationally recognised Australian qualification through RPL. 100% online assessment, no classes or exams.",
};

/** BreadcrumbList from [name, path] pairs; the last item is the current page. */
const breadcrumbSchema = (items: [name: string, path: string][]): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
});

/** AQF level from a qualification title ("Certificate IV in …" → 4). */
const AQF_LEVELS: [RegExp, number][] = [
  [/advanced diploma/i, 6],
  [/diploma/i, 5],
  [/certificate iv|cert iv/i, 4],
  [/certificate iii|cert iii/i, 3],
  [/certificate ii|cert ii/i, 2],
  [/certificate i|cert i/i, 1],
];
const aqfLevel = (title: string) => AQF_LEVELS.find(([re]) => re.test(title))?.[1];

const aboutWebPageSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About Us | RPL Fast Track",
  url: absoluteUrl("/about-us"),
  description:
    "Learn more about RPL Fast Track—our mission, vision, and how we help you fast-track your qualifications in Australia.",
};
const aboutRplPageSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About RPL | RPL Fast Track",
  url: absoluteUrl("/about-rpl"),
  description:
    "Learn what Recognition of Prior Learning (RPL) is and how it can help you gain qualifications for your existing skills and experience in Australia.",
};
const rplConceptSchema: WithContext<EducationalOccupationalProgram> = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: "Recognition of Prior Learning (RPL)",
  description:
    "RPL is a process that assesses your skills and experience to grant formal qualifications in Australia without traditional study.",
  educationalProgramMode: "online",
  provider: organizationRef,
};

export {
  aboutRplPageSchema,
  aboutWebPageSchema,
  aqfLevel,
  breadcrumbSchema,
  homePageSchema,
  jsonLdGraph,
  organization,
  organizationRef,
  rplConceptSchema,
  serviceSchema,
  siteGraph,
  websiteSchema,
};
