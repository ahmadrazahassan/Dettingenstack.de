import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked } from "./_pm";
import { perShop, shopFeatures } from "./_shop";

const jtlSource = "https://www.jtl-software.de/preise";
const wooSource = "https://woocommerce.com/de/";
const gambioSource = "https://www.gambio.de/eigenes-hosting";

export const jtlShop = {
  slug: "jtl-shop",
  name: "JTL-Shop",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "JTL-Software-GmbH",
    hq: "Hückelhoven",
    countryCode: "DE",
    website: "https://www.jtl-software.de/",
  },
  logo: null,
  categories: { primary: "shopsysteme", secondary: [] },
  tagline: "Shopsystem aus dem JTL-Ökosystem – direkt verbunden mit JTL-Wawi",
  bestFor: "Händler, die JTL-Wawi nutzen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: jtlSource,
    note: "JTL-Shop ist Teil der JTL-Editionen. Mit der kostenlosen JTL-Startversion fallen für Aufträge aus dem eigenen JTL-Shop keine Auftragskosten an; Advanced ab 119 € und Pro ab 329 € pro Monat mit Supportlevel. Die Tarife für den Shop selbst zeigt die Seite „JTL-Shop Tarife“.",
    plans: [
      {
        id: "start",
        name: "JTL Start",
        model: { type: "free", limits: "Bis zu 500 Aufträge pro Monat" },
        features: ["varianten", "marktplaetze"],
        highlights: ["Aufträge aus dem JTL-Shop kostenlos", "Ideal zum Testen"],
      },
      {
        id: "advanced",
        name: "JTL Advanced",
        model: perShop(11900, null),
        features: ["varianten", "marktplaetze"],
        highlights: ["Supportlevel Bronze"],
        limits: ["Ab-Preis"],
        recommended: true,
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "advanced",
        price: { monthly: 11900, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: shopFeatures({
    varianten: { status: "ja" },
    marktplaetze: { status: "ja", note: "Über JTL-Wawi" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "JTL-Software", url: jtlSource, accessedAt: checked },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 70,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen: "Shop mit enger Anbindung an JTL-Wawi; Details nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Aufträge aus dem JTL-Shop ohne Auftragskosten.",
    datenschutz: "Deutscher Hersteller; Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Nahtlos mit JTL-Wawi, POS und Marktplätzen.",
  },
  pros: [
    {
      title: "Eng mit JTL-Wawi verzahnt",
      detail: "Artikel, Bestände und Aufträge ohne Zusatzschnittstelle.",
    },
    {
      title: "Keine Auftragskosten",
      detail: "Aufträge aus dem JTL-Shop sind kostenlos.",
    },
  ],
  cons: [
    {
      title: "Am besten im JTL-Ökosystem",
      detail: "Ohne JTL-Wawi verliert der Shop seinen Hauptvorteil.",
    },
    {
      title: "Unübersichtliche Preise",
      detail: "Editionen, Shop-Tarife und Pakete auf mehreren Seiten.",
    },
  ],
  verdict: {
    short:
      "JTL-Shop ist erste Wahl für Händler, die JTL-Wawi nutzen: Aufträge aus dem eigenen Shop kosten keine Auftragsgebühren. Ohne JTL-Wawi gibt es flexiblere Systeme.",
    idealFor: [
      "Händler mit JTL-Wawi",
      "Onlinehändler mit Ladengeschäft und POS",
    ],
    notIdealFor: ["Shops ohne JTL-Warenwirtschaft"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "JTL-Software", url: jtlSource, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Einstieg und Auftragsregeln erstmals erfasst." },
  ],
} satisfies ToolInput;

export const woocommerce = {
  slug: "woocommerce",
  name: "WooCommerce",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Automattic Inc. (WooCommerce)",
    hq: "San Francisco",
    countryCode: "US",
    website: "https://woocommerce.com/de/",
  },
  logo: null,
  categories: { primary: "shopsysteme", secondary: [] },
  tagline: "Kostenloses Open-Source-Shop-Plugin für WordPress",
  bestFor: "Händler mit WordPress-Website",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: wooSource,
    note: "WooCommerce selbst ist kostenlos und Open Source. Kosten entstehen für Hosting, Domain, Themes, Erweiterungen und Wartung; sie hängen vom gewählten Hoster und den Plugins ab.",
    plans: [
      {
        id: "free",
        name: "WooCommerce",
        model: {
          type: "free",
          limits: "Hosting und Erweiterungen selbst bezahlen",
        },
        features: ["themes", "erweiterungen", "varianten", "api"],
        highlights: [
          "Open Source",
          "Für WordPress",
          "Große Entwickler-Community",
        ],
        recommended: true,
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: shopFeatures({
    hosting: { status: "nein", note: "Selbst organisieren" },
    themes: { status: "ja" },
    erweiterungen: {
      status: "ja",
      note: "Erweiterungen und WordPress-Plugins",
    },
    varianten: { status: "ja" },
    rechtstexte: { status: "addon", note: "Über Erweiterungen" },
    api: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Abhängig vom gewählten Hoster",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "WooCommerce", url: wooSource, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: ["community"],
    onboarding: "selbst",
  },
  platforms: ["web"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 75,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Mit Erweiterungen sehr flexibel.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Kostenlos; Hosting und Plugins kosten extra.",
    datenschutz: "Datenstandort hängt vom Hoster ab.",
    support: "Noch nicht getestet; vor allem Community-Support.",
    integrationen: "Große Auswahl an Erweiterungen.",
  },
  pros: [
    {
      title: "Kostenlos und offen",
      detail: "Open Source, keine Lizenzgebühr.",
    },
    {
      title: "Hosting frei wählbar",
      detail: "Auch bei deutschen Hostern betreibbar.",
    },
  ],
  cons: [
    {
      title: "Pflege liegt bei dir",
      detail: "Updates, Sicherheit und Backups musst du organisieren.",
    },
    {
      title: "Kosten für Erweiterungen",
      detail: "Viele Funktionen nur über Plugins.",
    },
  ],
  verdict: {
    short:
      "WooCommerce ist ideal, wenn du bereits WordPress nutzt und volle Kontrolle willst. Plane Hosting, Erweiterungen und regelmäßige Pflege als laufende Kosten ein.",
    idealFor: [
      "WordPress-Websites mit Shop",
      "Händler, die selbst hosten wollen",
    ],
    notIdealFor: ["Händler ohne Zeit für Technik"],
  },
  review: analyse("der Website des Anbieters"),
  sources: [{ name: "WooCommerce", url: wooSource, accessedAt: checked }],
  changelog: [{ date: checked, note: "Lizenzmodell erstmals erfasst." }],
} satisfies ToolInput;

export const gambio = {
  slug: "gambio",
  name: "Gambio",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Gambio GmbH",
    hq: "Bremen",
    countryCode: "DE",
    website: "https://www.gambio.de/",
  },
  logo: null,
  categories: { primary: "shopsysteme", secondary: [] },
  tagline: "Deutsches Shopsystem mit Cloud-Shop oder eigenem Hosting",
  bestFor: "Kleine Händler in Deutschland",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: gambioSource,
    note: "Gambio mit eigenem Hosting: 21 € pro Monat (252 € pro Jahr) bei jährlicher Abrechnung, zzgl. 0,2 % Transaktionsgebühr auf Zahlungen über den Gambio Hub; manuelle Zahlarten wie Rechnung oder Vorkasse ausgenommen, ein monatliches Freivolumen bleibt. Laut Gambio-Forum gilt dieses Modell seit dem 11.05.2026; Bestandskunden haben eigene Preise. Cloud-Shops inklusive Hosting und Updates sind ebenfalls verfügbar.",
    plans: [
      {
        id: "eigenes-hosting",
        name: "Eigenes Hosting",
        model: perShop(null, 2100),
        features: ["themes", "varianten", "zahlungen", "rechtstexte"],
        highlights: [
          "21 € pro Monat bei Jahreszahlung",
          "0,2 % auf Zahlungen über den Gambio Hub",
        ],
        recommended: true,
      },
    ],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "eigenes-hosting",
        price: { monthly: null, annualPerMonth: 2100 },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: shopFeatures({
    hosting: {
      status: "teilweise",
      note: "Cloud-Shop mit Hosting oder eigenes Hosting",
    },
    zahlungen: { status: "ja", note: "Gambio Payments Hub" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "Gambio", url: gambioSource, accessedAt: checked },
  },
  support: {
    languages: ["de"],
    channels: ["community"],
    onboarding: "unbekannt",
  },
  platforms: ["web"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "Solides Shopsystem für kleine Händler; Details nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "21 € pro Monat plus 0,2 % auf Hub-Zahlungen.",
    datenschutz: "Deutscher Anbieter; Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht im Detail geprüft.",
  },
  pros: [
    {
      title: "Günstiger Einstieg",
      detail: "21 € pro Monat bei Jahreszahlung.",
    },
    {
      title: "Deutscher Anbieter",
      detail: "Ausgerichtet auf den deutschen Markt.",
    },
  ],
  cons: [
    {
      title: "Transaktionsgebühr",
      detail: "0,2 % auf Zahlungen über den Gambio Hub.",
    },
    {
      title: "Neues Preismodell",
      detail: "Seit Mai 2026 geändert; Bestandskunden haben eigene Preise.",
    },
  ],
  verdict: {
    short:
      "Gambio ist ein günstiges deutsches Shopsystem für kleine Händler. Rechne die Transaktionsgebühr auf Hub-Zahlungen mit ein und prüfe die aktuelle Preisseite.",
    idealFor: [
      "Kleine Händler in Deutschland",
      "Shops mit überschaubarem Sortiment",
    ],
    notIdealFor: ["Große B2B-Shops"],
  },
  review: analyse(
    "der Website des Anbieters und einer Ankündigung im Gambio-Forum",
  ),
  sources: [
    { name: "Gambio", url: gambioSource, accessedAt: checked },
    {
      name: "Gambio-Forum",
      url: "https://www.gambio.de/forum/threads/wichtige-information-anpassung-der-gambio-cloud-und-eigenes-hosting-tarife-ab-mai-2026.52745/",
      accessedAt: checked,
    },
  ],
  changelog: [
    { date: checked, note: "Preismodell ab Mai 2026 erstmals erfasst." },
  ],
} satisfies ToolInput;
