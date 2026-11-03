import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const rechnung = [
  "rechnungen",
  "e-rechnung-versand",
  "mahnwesen",
  "steuerberater-zugang",
  "datev-export",
  "app",
];
const buchhaltung = [
  ...rechnung,
  "belegerfassung",
  "buchungen",
  "ustva",
  "euer",
  "anlagen",
  "kassenbuch",
  "bankanbindung",
  "zahlungsabgleich",
];
const pro = [...buchhaltung, "kostenstellen", "api"];

// One administrator included in every plan, each further user 5,90 € per month.
const plan = (monthly: number, annualPerMonth: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "pauschal",
    base: { monthly, annualPerMonth },
    perUnit: { monthly: 590, annualPerMonth: 590 },
    includedUnits: 1,
  }) as const;

export const sevdesk = {
  slug: "sevdesk",
  name: "sevdesk",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "sevDesk GmbH",
    hq: "Offenburg",
    countryCode: "DE",
    website: "https://sevdesk.de/",
  },
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme"],
  },
  tagline:
    "Rechnungen und Buchhaltung in der Cloud, mit kostenlosem Einstiegstarif",
  bestFor: "Selbstständige und kleine Unternehmen mit EÜR",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://sevdesk.de/preise/",
    note: "Reguläre Preise netto (zzgl. MwSt.) bei monatlicher bzw. jährlicher Abrechnung. Bei 24 Monaten Laufzeit sind die Preise niedriger. Zum Prüfzeitpunkt zeigte die Seite zeitlich begrenzte Aktionspreise (u. a. Buchhaltung 9,95 €), die wir nicht übernehmen.",
    plans: [
      {
        id: "kostenlos",
        excludeFromEntry: ["buchhaltungssoftware"],
        name: "Kostenlos",
        model: {
          type: "free",
          limits: "3 (E-)Rechnungen pro Monat",
          maxUnits: 1,
        },
        features: ["rechnungen", "e-rechnung-versand"],
        highlights: [
          "3 (E-)Rechnungen pro Monat",
          "ZUGFeRD und XRechnung",
          "Unbegrenzt Kontakte und Produkte",
        ],
        limits: ["Keine Buchhaltung"],
      },
      {
        id: "rechnung",
        excludeFromEntry: ["buchhaltungssoftware"],
        name: "Rechnung",
        model: plan(1190, 990),
        features: rechnung,
        highlights: [
          "Unbegrenzt (E-)Rechnungen",
          "Angebote & Zahlungserinnerungen",
          "DATEV-/ADDISON-Schnittstelle",
          "Verknüpfung mit der Steuerberatung",
        ],
      },
      {
        id: "buchhaltung",
        name: "Buchhaltung",
        model: plan(2590, 2290),
        features: buchhaltung,
        highlights: [
          "Alles aus Rechnung",
          "Einfache und doppelte Buchführung",
          "KI-Belegerfassung",
          "UStVA an ELSTER, EÜR & GuV",
          "Online-Banking",
          "Kassenbuch & Abschreibungen",
        ],
        recommended: true,
      },
      {
        id: "pro",
        name: "Buchhaltung Pro",
        model: plan(3490, 3090),
        features: pro,
        highlights: [
          "Alles aus Buchhaltung",
          "Kostenstellen",
          "REST-API",
          "BWA in Echtzeit",
        ],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Weiterer Benutzer",
        unit: "pauschal",
        price: { monthly: 590, annualPerMonth: 590 },
      },
      {
        id: "zeiterfassung",
        name: "Zeiterfassung",
        unit: "pauschal",
        price: { monthly: 490, annualPerMonth: 490 },
      },
      {
        id: "inventar",
        name: "Inventar",
        unit: "pauschal",
        price: { monthly: 1990, annualPerMonth: 1990 },
      },
    ],
    oneTimeFees: [
      {
        label: "Einrichtungstermin (optional)",
        amount: 4900,
        note: "pro Termin",
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "rechnung",
        price: { monthly: 1190, annualPerMonth: 990 },
      },
      {
        date: checked,
        planId: "buchhaltung",
        price: { monthly: 2590, annualPerMonth: 2290 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 3490, annualPerMonth: 3090 },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: {
    ...buchhaltungFeatures({
      belegerfassung: {
        status: "ja",
        fromPlan: "buchhaltung",
        note: "KI-gestützt",
      },
      "e-rechnung-empfang": {
        status: "unbekannt",
        note: "Zuordnung zum Tarif auf der Preisseite nicht eindeutig",
      },
      buchungen: {
        status: "ja",
        fromPlan: "buchhaltung",
        note: "Einfache und doppelte Buchführung",
      },
      ustva: {
        status: "ja",
        fromPlan: "buchhaltung",
        note: "Direkt an ELSTER",
      },
      euer: { status: "ja", fromPlan: "buchhaltung" },
      bilanz: {
        status: "teilweise",
        note: "Doppelte Buchführung; die Bilanz erstellt laut sevdesk in der Regel die Steuerberatung aus dem DATEV-Export",
      },
      anlagen: {
        status: "ja",
        fromPlan: "buchhaltung",
        note: "Abschreibungen",
      },
      kassenbuch: { status: "ja", fromPlan: "buchhaltung" },
      kostenstellen: { status: "ja", fromPlan: "pro" },
      bankanbindung: {
        status: "ja",
        fromPlan: "buchhaltung",
        note: "Über 4.000 Banken laut Anbieter",
      },
      zahlungsabgleich: { status: "ja", fromPlan: "buchhaltung" },
      rechnungen: { status: "ja", note: "Im kostenlosen Tarif 3 pro Monat" },
      "e-rechnung-versand": { status: "ja", note: "ZUGFeRD und XRechnung" },
      mahnwesen: {
        status: "ja",
        fromPlan: "rechnung",
        note: "Mahnstufen ab Buchhaltung",
      },
      "steuerberater-zugang": { status: "ja", fromPlan: "rechnung" },
      "datev-export": {
        status: "ja",
        fromPlan: "rechnung",
        note: "DATEV- und ADDISON-Schnittstelle",
      },
      app: { status: "ja", note: "Mobile Apps kostenlos" },
      api: { status: "ja", fromPlan: "pro", note: "REST-API" },
    }),
    // Rechnungsprogramme (secondary category)
    abschlag: {
      status: "ja",
      fromPlan: "rechnung",
      note: "Abschlags- und Schlussrechnungen",
    },
    zeiterfassung: { status: "addon", note: "4,90 € pro Monat" },
    lager: { status: "addon", note: "Inventar 19,90 € pro Monat" },
  },
  integrations: ["datev", "addison", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Laut Datenschutzerklärung Serverstandort Deutschland; Hosting über Amazon Web Services, DDoS-Schutz über Cloudflare",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Keine eigene Zertifizierung auf der Sicherheitsseite genannt; das Rechenzentrum ist laut FAQ zertifiziert.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "sevdesk",
      url: "https://sevdesk.de/sicherheit/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Persönlicher Support ab Tarif Rechnung; Einrichtungstermin 49 €",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 70,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "Buchhaltung mit EÜR, UStVA, Abschreibungen und Kassenbuch; Kostenstellen und API im Pro-Tarif.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Buchhaltung ab 22,90 € netto bei jährlicher Zahlung, jeder weitere Nutzer 5,90 €; kostenloser Tarif für wenige Rechnungen.",
    datenschutz:
      "Server in Deutschland, AVV; keine eigene Zertifizierung genannt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV, ADDISON, ELSTER und REST-API (Pro).",
  },
  pros: [
    {
      title: "Kostenloser Einstieg",
      detail:
        "Bis zu drei (E-)Rechnungen im Monat kostenlos, inklusive XRechnung und ZUGFeRD.",
    },
    {
      title: "DATEV und ADDISON",
      detail:
        "Schon im Tarif Rechnung mit Schnittstellen zu DATEV und ADDISON und Verknüpfung mit der Steuerberatung.",
    },
    {
      title: "Monatlich oder jährlich",
      detail:
        "Abrechnung monatlich, jährlich oder alle zwei Jahre – mit niedrigeren Preisen bei längerer Laufzeit.",
    },
  ],
  cons: [
    {
      title: "Weitere Nutzer kosten extra",
      detail:
        "Jeder Tarif enthält einen Benutzer; jeder weitere kostet 5,90 € im Monat.",
    },
    {
      title: "Wechselnde Aktionspreise",
      detail:
        "Die Preisseite zeigt häufig Aktionspreise; vergleiche die regulären Preise.",
    },
    {
      title: "Keine eigene Zertifizierung",
      detail:
        "sevdesk nennt den Serverstandort Deutschland, aber keine eigene ISO-Zertifizierung.",
    },
  ],
  verdict: {
    short:
      "sevdesk deckt Rechnungen und Buchhaltung für Selbstständige und kleine Teams ab, mit kostenlosem Einstieg und DATEV-Schnittstelle schon im kleinsten Bezahltarif. Rechne für jeden weiteren Nutzer 5,90 € im Monat ein.",
    idealFor: [
      "Selbstständige, die mit Rechnungen starten und später die Buchhaltung dazunehmen",
      "Kleine Unternehmen mit Steuerbüro, das DATEV oder ADDISON nutzt",
    ],
    notIdealFor: [
      "Bilanzierende Unternehmen, die den Abschluss selbst in der Software erstellen wollen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Sicherheitsseiten des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "sevdesk", url: "https://sevdesk.de/preise/", accessedAt: checked },
    {
      name: "sevdesk",
      url: "https://sevdesk.de/sicherheit/",
      accessedAt: checked,
    },
    {
      name: "sevdesk",
      url: "https://sevdesk.de/datenschutz/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Reguläre Preise, Tarife und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
