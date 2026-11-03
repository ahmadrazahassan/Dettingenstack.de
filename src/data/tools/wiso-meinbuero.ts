import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const rechnungen = [
  "rechnungen",
  "e-rechnung-versand",
  "e-rechnung-empfang",
  "mahnwesen",
  "belegerfassung",
  "belegarchiv",
  "euer",
  "ustva",
  "steuerberater-zugang",
  "datev-export",
  "app",
];
const buchhaltung = [
  ...rechnungen,
  "buchungen",
  "anlagen",
  "bankanbindung",
  "zahlungsabgleich",
  "kassenbuch",
];
const auftrag = [...buchhaltung, "api"];

// Annual subscription only; each further user 6,00 € per month.
const plan = (annualPerMonth: number, includedUnits: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "pauschal",
    base: { monthly: null, annualPerMonth },
    perUnit: { monthly: null, annualPerMonth: 600 },
    includedUnits,
  }) as const;

export const wisoMeinbuero = {
  slug: "wiso-meinbuero",
  name: "WISO MeinBüro",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Buhl Data Service GmbH",
    hq: "Neunkirchen (Siegerland)",
    countryCode: "DE",
    website: "https://www.meinbuero.de/",
  },
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme"],
  },
  tagline:
    "Bürosoftware von Buhl mit Rechnungen, Buchhaltung und Warenwirtschaft in vier Stufen",
  bestFor: "Kleine Unternehmen, die von Rechnungen bis Lager wachsen",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.meinbuero.de/preise/",
    note: "Web-Version, nur im Jahresabo (Zahlung jährlich im Voraus), Listenpreise netto. Umsatzgrenzen: Rechnungen & Angebote bis 25.000 €, Buchhaltung bis 120.000 € Umsatz pro 365 Tage. Zum Prüfzeitpunkt galten Rabatte für das erste Jahr, die wir nicht übernehmen.",
    plans: [
      {
        id: "rechnungen",
        name: "Rechnungen & Angebote",
        model: plan(1090, 1),
        features: rechnungen,
        highlights: [
          "(E-)Rechnungen, XRechnung & ZUGFeRD",
          "Belegarchiv mit App-Scan",
          "EÜR & UStVA",
          "DATEV-Export für die Steuerberatung",
        ],
        limits: ["Bis 25.000 € Umsatz pro Jahr"],
      },
      {
        id: "buchhaltung",
        name: "Buchhaltung",
        model: plan(1990, 1),
        features: buchhaltung,
        highlights: [
          "Alles aus Rechnungen & Angebote",
          "SKR 03/04",
          "Anlagenverwaltung",
          "Online-Banking & Zahlungsabgleich",
          "Kassenbuch",
        ],
        limits: ["Bis 120.000 € Umsatz pro Jahr"],
        recommended: true,
      },
      {
        id: "auftragswesen",
        name: "Auftragswesen",
        model: plan(3990, 2),
        features: auftrag,
        highlights: [
          "Alles aus Buchhaltung",
          "Ohne Umsatzgrenze",
          "Aufträge & Lieferscheine",
          "Automatisches Mahnwesen",
          "REST-API",
          "2 Nutzer",
        ],
      },
      {
        id: "warenwirtschaft",
        name: "Warenwirtschaft",
        model: plan(6990, 5),
        features: auftrag,
        highlights: [
          "Alles aus Auftragswesen",
          "Lager & Einkauf",
          "Premium-Service",
          "5 Nutzer",
        ],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Weiterer Nutzer",
        unit: "pauschal",
        price: { monthly: null, annualPerMonth: 600 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 12,
      noticePeriod: "bis einen Tag vor Ablauf, sonst Verlängerung um ein Jahr",
      monthlyBilling: "nein",
    },
    history: [
      {
        date: checked,
        planId: "rechnungen",
        price: { monthly: null, annualPerMonth: 1090 },
      },
      {
        date: checked,
        planId: "buchhaltung",
        price: { monthly: null, annualPerMonth: 1990 },
      },
      {
        date: checked,
        planId: "auftragswesen",
        price: { monthly: null, annualPerMonth: 3990 },
      },
      {
        date: checked,
        planId: "warenwirtschaft",
        price: { monthly: null, annualPerMonth: 6990 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: {
    ...buchhaltungFeatures({
      belegerfassung: {
        status: "ja",
        note: "Belegscan per App, Belegauswertung",
      },
      belegarchiv: { status: "ja" },
      "e-rechnung-empfang": { status: "ja" },
      buchungen: { status: "ja", fromPlan: "buchhaltung", note: "SKR 03/04" },
      ustva: { status: "ja", note: "Über die ELSTER-Schnittstelle" },
      euer: { status: "ja" },
      anlagen: { status: "ja", fromPlan: "buchhaltung" },
      kassenbuch: { status: "ja", fromPlan: "buchhaltung" },
      bankanbindung: { status: "ja", fromPlan: "buchhaltung" },
      zahlungsabgleich: { status: "ja", fromPlan: "buchhaltung" },
      rechnungen: { status: "ja" },
      "e-rechnung-versand": { status: "ja", note: "XRechnung und ZUGFeRD" },
      mahnwesen: {
        status: "ja",
        note: "Manuell in allen Tarifen, automatisch ab Auftragswesen",
      },
      "steuerberater-zugang": { status: "ja" },
      "datev-export": {
        status: "ja",
        note: "DATEV-kompatibler Steuerberater-Export",
      },
      app: { status: "ja" },
      api: { status: "ja", fromPlan: "auftragswesen", note: "REST-API" },
    }),
    // Rechnungsprogramme (secondary category)
    wiederkehrend: { status: "ja", fromPlan: "auftragswesen" },
    abschlag: {
      status: "ja",
      fromPlan: "auftragswesen",
      note: "Teil- und Sammelrechnungen",
    },
    zeiterfassung: { status: "ja", fromPlan: "auftragswesen" },
    lager: { status: "ja", fromPlan: "warenwirtschaft" },
  },
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote: "Hosting in eigenen Rechenzentren in Deutschland",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: {
      name: "Buhl Data Service",
      url: "https://www.meinbuero.de/preise/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "unbekannt",
    note: "Premium-Service mit Onboarding im Tarif Warenwirtschaft",
  },
  platforms: ["web", "windows", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 75,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "EÜR und UStVA schon im kleinsten Tarif, Buchhaltung mit Anlagen und Bankabgleich ab 19,90 €; Bilanz nicht genannt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Günstige Listenpreise, aber nur im Jahresabo und mit Umsatzgrenzen in den kleinen Tarifen.",
    datenschutz:
      "Eigene Rechenzentren in Deutschland; AVV, Zertifikate und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "DATEV-Export, ELSTER, WISO Steuer, REST-API ab Auftragswesen.",
  },
  pros: [
    {
      title: "EÜR und UStVA ab 10,90 €",
      detail:
        "Schon der Tarif Rechnungen & Angebote enthält EÜR, UStVA und den DATEV-Export.",
    },
    {
      title: "Wächst mit",
      detail:
        "Von Rechnungen über Buchhaltung bis zu Auftragswesen und Warenwirtschaft in einem Produkt.",
    },
    {
      title: "Eigene Rechenzentren",
      detail:
        "Buhl hostet die Web-Version in eigenen Rechenzentren in Deutschland; eine Desktop-Version gibt es zusätzlich.",
    },
  ],
  cons: [
    {
      title: "Nur Jahresabo",
      detail: "Mindestlaufzeit zwölf Monate mit automatischer Verlängerung.",
    },
    {
      title: "Umsatzgrenzen",
      detail:
        "Die kleinen Tarife gelten nur bis 25.000 € bzw. 120.000 € Umsatz im Jahr.",
    },
    {
      title: "Bilanz nicht genannt",
      detail: "Die Preisseite erwähnt keine Bilanz.",
    },
  ],
  verdict: {
    short:
      "WISO MeinBüro bietet viel Funktion für wenig Geld, wenn du dich für ein Jahr bindest und unter den Umsatzgrenzen bleibst. Gut für kleine Unternehmen, die später Aufträge und Lager dazunehmen wollen.",
    idealFor: [
      "Selbstständige mit EÜR, die schon im kleinsten Tarif UStVA brauchen",
      "Kleine Händler, die später Warenwirtschaft dazunehmen",
    ],
    notIdealFor: ["Unternehmen, die monatlich kündbar bleiben wollen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Buhl Data Service",
      url: "https://www.meinbuero.de/preise/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Listenpreise, Tarife und Hosting-Angabe erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
