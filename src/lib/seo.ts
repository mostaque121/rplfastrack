import { contactInfo } from "@/config/contact";
import { SITE_URL } from "@/config/site";
import { socialLinks } from "@/config/social";
import { absoluteUrl } from "@/lib/url";
import type {
  BreadcrumbList,
  CollectionPage,
  Country,
  EducationalOccupationalProgram,
  Organization,
  Service,
  WebPage,
  WithContext,
} from "schema-dts";

const organization: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RPL Fast Track",
  url: SITE_URL,
  logo: absoluteUrl("/fav.png"),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactInfo.phone,
    contactType: "Customer Service",
    email: contactInfo.email,
    availableLanguage: "English",
    contactOption: "TollFree",
  },
  sameAs: [socialLinks.facebook],
};

const serviceSchema: WithContext<Service> = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Recognition of Prior Learning (RPL)",
  provider: organization, // Reusing the organization object here
  areaServed: {
    "@type": "Country",
    name: "Australia",
  } as Country,
  description:
    "Fast-track your qualifications through RPL by recognizing your existing skills and experience.",
};
const homePageSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",

  name: "RPL Fast Track - Accelerate Your Skills Recognition",
  url: SITE_URL,

  description:
    "RPL Fast Track helps you fast-track your qualifications with Recognition of Prior Learning (RPL) in Australia.",
};

const allCoursesSchema: WithContext<CollectionPage> = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Courses | RPL Fast Track",
  url: absoluteUrl("/courses"),
  description:
    "Explore all RPL-recognized qualifications across various industries in Australia.",
};

const coursesBreadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Courses",
      item: absoluteUrl("/courses"),
    },
  ],
};
const aboutPageBreadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: absoluteUrl("/about-us"),
    },
  ],
};
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
  provider: organization,
};
const aboutRplBreadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About RPL",
      item: absoluteUrl("/about-rpl"),
    },
  ],
};

export {
  aboutPageBreadcrumb,
  aboutRplBreadcrumb,
  aboutRplPageSchema,
  aboutWebPageSchema,
  allCoursesSchema,
  coursesBreadcrumb,
  homePageSchema,
  organization,
  rplConceptSchema,
  serviceSchema,
};
