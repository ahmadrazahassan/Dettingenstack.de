import type { CategoryInput } from "@/lib/schema";

// Shopsysteme: priced per shop and month, often plus transaction or revenue fees (unit „pauschal“).
export const shopsysteme = {
  slug: "shopsysteme",
  name: "Shopsysteme",
  nameSingular: "Shopsystem",
  nameShort: "Shopsysteme",
  unitLabel: { singular: "Shop", plural: "Shops" },
  unit: "pauschal",
  referenceTeams: [1],
  maxTeam: 1,
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.2,
    preisLeistung: 0.2,
    datenschutz: 0.1,
    support: 0.1,
    integrationen: 0.15,
  },
  featureGroups: [
    {
      id: "betrieb",
      label: "Betrieb & Design",
      features: [
        {
          id: "hosting",
          label: "Hosting inklusive",
          description: "Der Anbieter betreibt Server, Updates und Sicherheit.",
          importance: "standard",
        },
        {
          id: "themes",
          label: "Themes & Designs",
          description: "Fertige Designs für den Shop.",
          importance: "kern",
        },
        {
          id: "erweiterungen",
          label: "Apps & Plugins",
          description: "Funktionen über einen Store nachrüsten.",
          importance: "kern",
        },
      ],
    },
    {
      id: "verkauf",
      label: "Verkauf",
      features: [
        {
          id: "varianten",
          label: "Produkte & Varianten",
          description: "Größen, Farben und Lagerbestände.",
          importance: "kern",
        },
        {
          id: "zahlungen",
          label: "Zahlungsarten",
          description: "PayPal, Kreditkarte, Rechnung und mehr.",
          importance: "kern",
        },
        {
          id: "marktplaetze",
          label: "Marktplätze",
          description: "Verkauf über Amazon, eBay & Co. anbinden.",
          importance: "standard",
        },
        {
          id: "b2b",
          label: "B2B-Funktionen",
          description: "Kundengruppenpreise, Angebote, Freigaben.",
          importance: "extra",
        },
      ],
    },
    {
      id: "recht",
      label: "Recht & International",
      features: [
        {
          id: "rechtstexte",
          label: "Deutsche Rechtstexte",
          description:
            "Impressum, AGB, Widerruf, Preisangaben nach deutschem Recht.",
          importance: "kern",
        },
        {
          id: "mehrsprachig",
          label: "Mehrsprachigkeit",
          description: "Shop in mehreren Sprachen und Währungen.",
          importance: "standard",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an ERP und Warenwirtschaft.",
          importance: "standard",
        },
      ],
    },
  ],
  seo: {
    title: "Shopsysteme Vergleich 2026: 5 Lösungen für Deutschland",
    description:
      "Shopsysteme im Vergleich: Shopify, Shopware, JTL-Shop, WooCommerce und Gambio – Kosten, Gebühren, Hosting und Eignung für den deutschen Markt.",
    h1: "Shopsysteme Vergleich 2026: 5 Lösungen im Check",
  },
  intro:
    "Das Shopsystem ist das Fundament deines Onlinehandels. Wir vergleichen Mietlösungen wie Shopify mit Open-Source-Systemen wie Shopware Community Edition und WooCommerce sowie deutschen Anbietern wie JTL und Gambio – mit den Kosten, die die Anbieter nennen, und den Gebühren, die zusätzlich anfallen.",
  testTasks: [
    "Produkt mit Varianten und Lagerbestand anlegen",
    "PayPal und Kauf auf Rechnung einrichten",
    "Rechtstexte und Preisangaben prüfen",
    "Bestellung an die Warenwirtschaft übergeben",
    "Shop auf Englisch übersetzen",
    "Theme anpassen und mobil testen",
  ],
  guideMdx: "shopsysteme",
  faqs: [
    {
      q: "Was kostet ein Onlineshop?",
      a: "Open-Source-Systeme wie WooCommerce oder die Shopware Community Edition sind kostenlos, dafür zahlst du Hosting, Erweiterungen und Wartung. Mietshops kosten einen Monatsbeitrag; Shopware Rise kostet ab 600 € pro Monat; Shopify zeigte uns seine Tarife nur in US-Dollar. Dazu kommen Zahlungs- und Transaktionsgebühren.",
    },
    {
      q: "Mietshop oder Open Source?",
      a: "Mietshops sind schnell startklar, Hosting und Updates übernimmt der Anbieter. Open Source gibt mehr Freiheit, verlangt aber eigenes Hosting und Pflege. Mehr im Ratgeber Shopsystem: SaaS oder Open Source.",
    },
    {
      q: "Worauf muss ich rechtlich achten?",
      a: "Impressum, AGB, Widerrufsbelehrung, Datenschutzerklärung, korrekte Preisangaben und ein rechtssicherer Bestellbutton. Viele Händler nutzen Rechtstexte-Dienste mit Schnittstelle zum Shopsystem.",
    },
  ],
  related: ["erp-software", "newsletter-software", "rechnungsprogramme"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
