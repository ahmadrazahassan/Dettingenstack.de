import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both systems are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const shopifyVsShopware = {
  slug: "shopify-vs-shopware",
  toolA: "shopify",
  toolB: "shopware",
  category: "shopsysteme",
  isPlaceholder: false,
  seo: {
    title: "Shopify vs. Shopware (2026): Der große Vergleich",
    description:
      "Shopify oder Shopware? Mietshop gegen deutsches Open-Source-System: Kosten, Gebühren, B2B, Hosting und Rechtssicherheit im direkten Vergleich.",
    h1: "Shopify vs. Shopware: Welches Shopsystem passt zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Shopify ist der schnellste Weg zum Shop: Hosting inklusive, riesiger App Store, Preise auf der Seite nur in US-Dollar. Shopware ist flexibler und stärker im B2B, kostenlos als Community Edition, in den Cloud-Editionen aber ab 600 € pro Monat.",
    chooseAIf: [
      "du schnell und ohne Entwickler starten willst",
      "du international verkaufst",
      "du Hosting und Updates abgeben willst",
    ],
    chooseBIf: [
      "du B2B-Funktionen wie Angebote und Freigaben brauchst",
      "du mit einer Agentur individuell entwickeln willst",
      "du selbst hosten oder Open Source nutzen willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "shopware",
      note: "Shopware mit B2B-Funktionen ab Evolve und Open-Source-Kern.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "unentschieden",
      note: "Shopify günstig im Einstieg, aber mit Gebühren; Shopware Community kostenlos, Cloud-Editionen ab 600 €.",
    },
    datenschutz: {
      winner: "shopware",
      note: "Shopware ist ein deutscher Hersteller und selbst hostbar.",
    },
    support: untested,
    integrationen: {
      winner: "shopify",
      note: "Shopify mit dem größeren App Store.",
    },
  },
  featureGroupVerdicts: {
    betrieb: { winner: "shopify", note: "Hosting und Updates inklusive." },
    verkauf: { winner: "shopware", note: "B2B ab Evolve." },
    recht: {
      winner: "shopware",
      note: "Deutscher Hersteller; Shopify braucht für deutsche Rechtstexte meist Apps.",
    },
  },
  personas: [
    {
      label: "Gründerin mit erstem D2C-Produkt",
      pick: "shopify",
      reason: "In wenigen Tagen startklar.",
    },
    {
      label: "Großhändler mit B2B-Kunden",
      pick: "shopware",
      reason: "Angebote, Freigaben und Kundengruppen.",
    },
    {
      label: "Händler mit Agentur und eigenem Server",
      pick: "shopware",
      reason: "Open Source und frei anpassbar.",
    },
  ],
  migration:
    "Exportiere Produkte, Kunden und Bestellungen als CSV oder per Migrationstool, richte Weiterleitungen für alle alten URLs ein und teste Zahlungen und Rechtstexte vor dem Umstieg.",
  faqs: [
    {
      q: "Was kosten Shopify und Shopware?",
      a: "Shopify zeigte uns seine Tarife nur in US-Dollar; dazu kommen Transaktions- und App-Kosten. Shopware Community Edition ist kostenlos, Rise kostet ab 600 € pro Monat zzgl. MwSt., abhängig vom Umsatz.",
    },
    {
      q: "Welches System ist besser für B2B?",
      a: "Shopware bietet B2B-Funktionen wie Angebote und Freigaben ab Evolve. Shopify bietet erweiterte Funktionen im Plus-Tarif.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const shopwareVsJtlShop = {
  slug: "shopware-vs-jtl-shop",
  toolA: "shopware",
  toolB: "jtl-shop",
  category: "shopsysteme",
  isPlaceholder: false,
  seo: {
    title: "Shopware vs. JTL-Shop (2026): Der Vergleich",
    description:
      "Shopware oder JTL-Shop? Zwei deutsche Shopsysteme im Vergleich: Kosten, Anbindung an JTL-Wawi, B2B, Erweiterungen und für wen sich welches lohnt.",
    h1: "Shopware vs. JTL-Shop: Welches deutsche Shopsystem passt?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "JTL-Shop spielt seine Stärke mit JTL-Wawi aus: Aufträge aus dem eigenen Shop verursachen keine Auftragskosten. Shopware ist flexibler, mit großem Plugin-Store und B2B-Funktionen, lässt sich aber auch an JTL-Wawi anbinden – dann werden Auftragspakete fällig.",
    chooseAIf: [
      "du B2B-Funktionen oder individuelle Entwicklung brauchst",
      "du ohne JTL-Wawi arbeitest",
      "du einen großen Plugin-Store nutzen willst",
    ],
    chooseBIf: [
      "du JTL-Wawi bereits nutzt",
      "du Auftragskosten für Shopbestellungen vermeiden willst",
      "du Shop, Lager und POS aus einer Hand willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "shopware",
      note: "Shopware mit B2B-Funktionen und großem Store.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "jtl-shop",
      note: "Mit JTL-Wawi keine Auftragskosten für Shopbestellungen; Shopware-Aufträge in JTL-Wawi brauchen Auftragspakete.",
    },
    datenschutz: {
      winner: "unentschieden",
      note: "Beide deutsche Hersteller.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Shopware mit Plugins, JTL-Shop nahtlos mit JTL-Wawi.",
    },
  },
  featureGroupVerdicts: {
    betrieb: { winner: "shopware", note: "SaaS, PaaS oder selbst gehostet." },
    verkauf: { winner: "shopware", note: "B2B ab Evolve." },
    recht: {
      winner: "unentschieden",
      note: "Beide für den deutschen Markt entwickelt.",
    },
  },
  personas: [
    {
      label: "Händler mit JTL-Wawi und Ladengeschäft",
      pick: "jtl-shop",
      reason: "Shop, Wawi und POS aus einer Hand.",
    },
    {
      label: "B2B-Großhändler",
      pick: "shopware",
      reason: "Angebote, Freigaben und Kundengruppen.",
    },
    {
      label: "Marke mit Agentur",
      pick: "shopware",
      reason: "Frei anpassbar und großes Ökosystem.",
    },
  ],
  migration:
    "Beim Wechsel zwischen den Systemen bleiben Artikel und Kunden oft in JTL-Wawi; übertrage Inhalte, Kategorien und SEO-Weiterleitungen und teste die Auftragsübernahme vor dem Livegang.",
  faqs: [
    {
      q: "Kann ich Shopware mit JTL-Wawi nutzen?",
      a: "Ja. Für Bestellungen über Shopware 6 berechnet JTL Auftragspakete, zum Beispiel 79 € für 500 Aufträge pro Monat. Aufträge aus dem eigenen JTL-Shop sind kostenlos.",
    },
    {
      q: "Was kostet der Einstieg?",
      a: "Shopware Community Edition und die JTL-Startversion sind kostenlos. Hosting, Erweiterungen und Support kommen jeweils hinzu.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
