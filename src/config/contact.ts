export const contactInfo = {
  phone: "+61 483 921 139",
  phoneHref: "tel:+61483921139",
  email: "info@rplfastrack.com",
  emailHref: "mailto:info@rplfastrack.com",
  whatsapp: "+61 483 921 139",
  whatsappHref: "https://wa.me/61483921139",
  address: "41 Hilton Way, Melton West VIC 3337, Australia",
} as const;

/** Business hours as [days, hours] rows, shown on the home contact section and the contact page. */
export const businessHours = [
  ["Mon – Fri", "9:00 AM – 5:00 PM"],
  ["Saturday", "10:00 AM – 2:00 PM"],
  ["Sunday", "Closed"],
] as const;
