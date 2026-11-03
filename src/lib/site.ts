export const site = {
  name: "Dettingenstack",
  domain: "dettingenstack.de",
  // Production builds use the own domain (canonicals, sitemap, JSON-LD); NEXT_PUBLIC_SITE_URL overrides it.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://dettingenstack.de"
      : "http://localhost:3000"),
  locale: "de-DE",
  mission:
    "Wir vergleichen Business-Software so, wie du sie nutzt: mit echten Preisen in Euro, klaren Kriterien und ehrlich benannten Schwächen.",
  buildYear: process.env.NEXT_PUBLIC_BUILD_YEAR ?? "",
  affiliateFootnote:
    "*Werbelink: Wenn du über diesen Link kaufst, erhalten wir eine Provision. Für dich ändert sich der Preis nicht.",
} as const;

/**
 * Operator of the website, as entered in the Vereinsregister (Amtsgericht Ulm, VR 723243, new entry 28.04.2026).
 * Phone is not known yet: it stays null and the legal pages show a placeholder until set.
 */
export const operator = {
  legalName: "Dettingen e.V.",
  legalForm: "eingetragener Verein",
  street: "Eberhardtstraße 2" as string | null,
  postalCode: "89547",
  city: "Gerstetten",
  region: "Baden-Württemberg",
  country: "Deutschland",
  countryCode: "DE",
  email: "l.bantel@dettingenstack.de" as string | null,
  phone: null as string | null,
  register: {
    type: "Vereinsregister",
    court: "Amtsgericht Ulm",
    number: "VR 723243",
    registeredAt: "2026-04-28",
  },
  /** Vorstand as shown on the site. */
  board: [{ name: "Luca Bantel", role: "Vorstandsvorsitzender" }],
  /** Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV. */
  contentResponsible: {
    name: "Luca Bantel",
    street: "Ipfweg 22",
    postalCode: "89547",
    city: "Gerstetten",
  },
} as const;
