import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures } from "./_buchhaltung";
import { rechnungFeatures } from "./_rechnung";
import {
  checkedSage as checked,
  sageReview,
  sageSupport,
  sageUrl,
  sageVendor,
} from "./_sage";

/* ───── Sage Active: Cloud-Buchhaltung für Kleinunternehmen ───── */

const activeSource = sageUrl("produkte/sage-active/");
const activeStarter = [
  "rechnungen",
  "e-rechnung-versand",
  "belegerfassung",
  "zahlungsabgleich",
  "steuerberater-zugang",
  "app",
  "api",
];
const activeEssentials = [
  ...activeStarter,
  "buchungen",
  "anlagen",
  "euer",
  "bilanz",
  "ustva",
  "datev-export",
  "lohn",
];

export const sageActive = {
  slug: "sage-active",
  name: "Sage Active",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme"],
  },
  tagline:
    "Cloud-Buchhaltung von Sage mit Rechnungen, UStVA per ELSTER und Lohn in einem Abo",
  bestFor: "Kleinunternehmen, die Buchhaltung und Lohn selbst machen",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: activeSource,
    note: "Listenpreise pro Monat zzgl. MwSt.; das Abo verlängert sich monatlich. Neukunden erhalten bis 04.01.2027 50 % Rabatt für die ersten 3 Monate (Starter 12,50 €, Essentials 24,50 €), danach gilt der Listenpreis. Starter enthält laut Paketübersicht 1 Unternehmen und 5 Nutzer (eine FAQ-Antwort nennt 2 Nutzer), Essentials 1 Unternehmen, 10 Nutzer und 2 Mitarbeiter in der Lohnabrechnung. Inklusive Rechnungen pro Monat: 300 (Starter) bzw. 500 (Essentials); darüber Rechnungspakete oder 0,15 € pro Rechnung. Jedes weitere Unternehmen wird zusätzlich berechnet. 5 GB Speicher.",
    plans: [
      {
        id: "starter",
        name: "Sage Active Starter",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 2500, annualPerMonth: null },
          includedUnits: 5,
        },
        features: activeStarter,
        highlights: [
          "Angebote und Rechnungen",
          "KI für Belege und E-Rechnungen",
          "Bankkontenabgleich",
          "Zusammenarbeit mit externem Buchhalter",
          "Open API und Mobile App",
        ],
        limits: ["300 Rechnungen pro Monat", "Keine eigene Finanzbuchhaltung"],
        // Invoicing only: the bookkeeping itself is left to an external accountant.
        excludeFromEntry: ["buchhaltungssoftware"],
      },
      {
        id: "essentials",
        name: "Sage Active Essentials",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 4900, annualPerMonth: null },
          includedUnits: 10,
        },
        features: activeEssentials,
        highlights: [
          "Doppelte Buchführung (SKR03/SKR04)",
          "UStVA per ELSTER",
          "EÜR, GuV und Bilanz",
          "Anlagenbuchhaltung",
          "Lohnabrechnung & HR für 2 Mitarbeiter",
          "DATEV-Export",
        ],
        limits: ["500 Rechnungen pro Monat", "Keine Lagerverwaltung"],
        recommended: true,
      },
    ],
    addOns: [
      {
        id: "nutzer-starter",
        name: "Zusätzlicher Nutzer (Starter)",
        unit: "nutzer",
        price: { monthly: 500, annualPerMonth: null },
      },
      {
        id: "nutzer-essentials",
        name: "Zusätzlicher Nutzer (Essentials)",
        unit: "nutzer",
        price: { monthly: 1000, annualPerMonth: null },
      },
      {
        id: "mitarbeiter",
        name: "Zusätzlicher Mitarbeiter in Lohn & HR (Essentials)",
        unit: "mitarbeitende",
        price: { monthly: 300, annualPerMonth: null },
      },
      {
        id: "rechnungen-100",
        name: "100 zusätzliche Rechnungen",
        unit: "pauschal",
        price: { monthly: 1000, annualPerMonth: null },
        note: "500 für 40 €, 1.000 für 65 €, 5.000 für 250 €, 10.000 für 500 €",
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "Abo verlängert sich monatlich zum Vertragsdatum",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 2500, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "essentials",
        price: { monthly: 4900, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 30, creditCard: true },
  freePlan: "nein",
  features: buchhaltungFeatures({
    belegerfassung: { status: "ja", note: "KI für Belege und (E-)Rechnungen" },
    rechnungen: { status: "ja" },
    "e-rechnung-versand": { status: "ja" },
    "e-rechnung-empfang": {
      status: "ja",
      note: "KI-Erkennung von E-Rechnungen",
    },
    buchungen: {
      status: "ja",
      fromPlan: "essentials",
      note: "Doppelte Buchführung, SKR03 und SKR04, automatische Buchungssätze",
    },
    ustva: {
      status: "ja",
      fromPlan: "essentials",
      note: "Direkt per ELSTER, monatlich oder vierteljährlich",
    },
    euer: { status: "ja", fromPlan: "essentials" },
    bilanz: {
      status: "ja",
      fromPlan: "essentials",
      note: "GuV und Bilanz; E-Bilanz und Jahressteuererklärung nicht enthalten",
    },
    anlagen: { status: "ja", fromPlan: "essentials" },
    zahlungsabgleich: { status: "ja", note: "Einfacher Bankkontenabgleich" },
    "steuerberater-zugang": {
      status: "ja",
      note: "Zusammenarbeit mit externem Buchhalter",
    },
    "datev-export": { status: "ja", fromPlan: "essentials" },
    lohn: {
      status: "ja",
      fromPlan: "essentials",
      note: "2 Mitarbeiter inklusive, je weiterer 3 € pro Monat",
    },
    app: { status: "ja", note: "Belege per Foto, Kennzahlen, Rechnungen" },
    api: { status: "ja", note: "Open API" },
  }),
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "unbekannt",
    serverNote:
      "Reine Cloud-Lösung; den Serverstandort nennt die Produktseite nicht",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Sage", url: activeSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: ["web", "windows", "macos", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 70,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Rechnungen, Finanzbuchhaltung, UStVA und Lohn in einem Abo; keine Lagerverwaltung.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Essentials 49 € pro Monat inklusive 10 Nutzern und Lohn für 2 Mitarbeiter.",
    datenschutz: "Serverstandort auf der Produktseite nicht genannt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "ELSTER, DATEV-Export und Open API.",
  },
  pros: [
    {
      title: "Buchhaltung und Lohn in einem",
      detail:
        "Essentials verbindet Finanzbuchhaltung, UStVA und Lohnabrechnung für 2 Mitarbeiter.",
    },
    {
      title: "Viele Nutzer inklusive",
      detail: "5 Nutzer in Starter, 10 in Essentials ohne Aufpreis.",
    },
    {
      title: "Monatlich kündbar",
      detail: "Das Abo verlängert sich nur jeweils um einen Monat.",
    },
  ],
  cons: [
    {
      title: "Keine Steuererklärung",
      detail: "Jahressteuererklärung und E-Bilanz sind laut FAQ nicht möglich.",
    },
    {
      title: "Rechnungslimits",
      detail: "Über 300 bzw. 500 Rechnungen im Monat kosten Zusatzpakete.",
    },
    {
      title: "Test nur mit Kreditkarte",
      detail: "Der kostenlose Monat setzt eine Kreditkarte voraus.",
    },
  ],
  verdict: {
    short:
      "Sage Active ist die Cloud-Buchhaltung von Sage für Kleinunternehmen: Essentials deckt Buchhaltung, UStVA und Lohn für 49 € im Monat ab. Für Lager oder E-Bilanz brauchst du Sage 50 oder eine Zusatzlösung.",
    idealFor: [
      "Kleinunternehmen mit eigener Buchhaltung",
      "Betriebe mit wenigen Mitarbeitenden in der Lohnabrechnung",
    ],
    notIdealFor: ["Händler mit Lagerbeständen"],
  },
  review: sageReview("der Produkt- und FAQ-Seite von Sage Active"),
  sources: [{ name: "Sage", url: activeSource, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Listenpreise, Inklusivleistungen und Zusatzkosten erstmals erfasst.",
    },
  ],
} satisfies ToolInput;

/* ───── Sage 50: Buchhaltung und Warenwirtschaft für kleine Unternehmen ───── */

const fiftySource = sageUrl("produkte/sage-50connected/");
const comfort = [
  "rechnungen",
  "e-rechnung-versand",
  "bankanbindung",
  "belegarchiv",
  "euer",
  "bilanz",
  "anlagen",
  "datev-export",
];

export const sage50 = {
  slug: "sage-50",
  name: "Sage 50",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme", "erp-software"],
  },
  tagline:
    "Buchhaltung und Warenwirtschaft für kleine Unternehmen, installiert mit Cloud-Anbindung",
  bestFor: "Kleine Händler und Dienstleister mit mehreren Arbeitsplätzen",
  companySizes: ["kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: fiftySource,
    note: "Preise pro Arbeitsplatz und Monat zzgl. MwSt., gültig bei jährlicher Rechnungsstellung mit 12 Monaten Mindestlaufzeit für Neukunden; kürzere oder längere Laufzeiten sind optional verfügbar. Comfort ab 2, Professional ab 3 Arbeitsplätzen. Zusatzlösungen wie Onlineshop, Lohnabrechnung, Kassen- oder Versandmodul kosten extra.",
    plans: [
      {
        id: "comfort",
        name: "Comfort",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: null, annualPerMonth: 3500 },
          minUnits: 2,
        },
        features: comfort,
        highlights: [
          "Angebote & Rechnungen",
          "Integriertes Onlinebanking",
          "Warenwirtschaft & Bestellwesen",
          "EÜR oder Bilanz",
          "Anlagenbuchhaltung",
          "DATEV-Schnittstelle",
        ],
        limits: ["Ab 2 Arbeitsplätzen"],
        recommended: true,
      },
      {
        id: "professional",
        name: "Professional",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: null, annualPerMonth: 4000 },
          minUnits: 3,
        },
        features: [...comfort, "kostenstellen"],
        highlights: [
          "Alles aus Comfort",
          "Kosten- und Erlösrechnung",
          "Variantenartikel",
          "Anpassbare Chefübersichten",
        ],
        limits: ["Ab 3 Arbeitsplätzen"],
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "nein" },
    history: [
      {
        date: checked,
        planId: "comfort",
        price: { monthly: null, annualPerMonth: 3500 },
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: null, annualPerMonth: 4000 },
      },
    ],
  },
  trial: { available: "ja", days: 30, creditCard: false },
  freePlan: "nein",
  features: buchhaltungFeatures({
    rechnungen: { status: "ja", note: "Angebote und Rechnungen" },
    "e-rechnung-versand": { status: "ja" },
    bankanbindung: { status: "ja", note: "Integriertes Onlinebanking" },
    belegarchiv: { status: "ja", note: "Digitale Belegarchivierung" },
    euer: { status: "ja" },
    bilanz: { status: "ja" },
    anlagen: { status: "ja" },
    kostenstellen: {
      status: "ja",
      fromPlan: "professional",
      note: "Kosten- und Erlösrechnung",
    },
    "datev-export": { status: "ja", note: "DATEV-Schnittstelle" },
    lohn: { status: "addon", note: "Lohnabrechnung als Zusatzlösung" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Installierte Software (Testversion zum Download)",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "Sage", url: fiftySource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: [],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Buchhaltung, Warenwirtschaft und Bestellwesen in einem Programm.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 35 € pro Arbeitsplatz, mindestens 2 Arbeitsplätze, Jahresvertrag.",
    datenschutz: "Lokal installiert, Daten im eigenen Haus.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV-Schnittstelle und Zusatzmodule.",
  },
  pros: [
    {
      title: "Buchhaltung plus Warenwirtschaft",
      detail: "Rechnungen, Lager, Bestellwesen und Finanzbuchhaltung in einem.",
    },
    {
      title: "30 Tage Test ohne Zahlungsdaten",
      detail: "Die Testversion endet automatisch.",
    },
  ],
  cons: [
    {
      title: "Mindestens 2 Arbeitsplätze",
      detail: "Comfort ab 2, Professional ab 3 Arbeitsplätzen.",
    },
    {
      title: "Jahresvertrag",
      detail: "Die Listenpreise gelten bei 12 Monaten Laufzeit.",
    },
  ],
  verdict: {
    short:
      "Sage 50 verbindet Buchhaltung und Warenwirtschaft für kleine Unternehmen mit mehreren Arbeitsplätzen. Wer allein arbeitet oder rein in der Cloud arbeiten will, ist mit Sage Active günstiger dran.",
    idealFor: [
      "Kleine Händler mit Lager und Bestellwesen",
      "Teams mit 2 bis 10 Arbeitsplätzen",
    ],
    notIdealFor: ["Selbstständige mit nur einem Arbeitsplatz"],
  },
  review: sageReview("der Produktseite von Sage 50"),
  sources: [{ name: "Sage", url: fiftySource, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Pakete, Preise und Laufzeit erstmals erfasst." },
  ],
} satisfies ToolInput;

/* ───── Sage 50 Handwerk: Auftragsbearbeitung für Handwerksbetriebe ───── */

const handwerkSource = sageUrl("produkte/sage-50-handwerk/");
const essential = ["rechnungen", "e-rechnung-versand"];

export const sage50Handwerk = {
  slug: "sage-50-handwerk",
  name: "Sage 50 Handwerk",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline:
    "Angebote, Aufträge und Rechnungen für Handwerksbetriebe – mit E-Rechnung und Projekten",
  bestFor: "Handwerksbetriebe mit Angeboten und Projekten",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: handwerkSource,
    note: "Preise pro Monat zzgl. MwSt., gültig bei jährlicher Rechnungsstellung mit 12 Monaten Mindestlaufzeit; kürzere oder längere Laufzeiten optional. Essential für 1 Benutzer, Enterprise für unbegrenzte Benutzer. Erweiterbar um Schnittstellen (GAEB, IDS), DMS, Finanzbuchhaltung, Nachkalkulation, Wartung und Service, Regiezentrum sowie Termin- und Ressourcenplanung.",
    plans: [
      {
        id: "essential",
        name: "Essential",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: null, annualPerMonth: 1990 },
          includedUnits: 1,
        },
        features: essential,
        highlights: [
          "1 Benutzer",
          "Angebote, Aufträge, Rechnungen",
          "E-Rechnung (ZUGFeRD 2.1, XRechnung)",
          "Projektverwaltung",
          "Express-Auftrag",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: null, annualPerMonth: 5900 },
          includedUnits: 1000,
        },
        features: [...essential, "abschlag"],
        highlights: [
          "Unbegrenzte Benutzer",
          "Alles aus Essential",
          "Teil- und Schlussrechnungen",
          "Terminkalender",
        ],
        recommended: true,
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "nein" },
    history: [
      {
        date: checked,
        planId: "essential",
        price: { monthly: null, annualPerMonth: 1990 },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: null, annualPerMonth: 5900 },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: rechnungFeatures({
    rechnungen: { status: "ja", note: "Angebote, Aufträge, Rechnungen" },
    "e-rechnung-versand": { status: "ja", note: "ZUGFeRD 2.1 und XRechnung" },
    abschlag: {
      status: "ja",
      fromPlan: "enterprise",
      note: "Teil- und Schlussrechnungen",
    },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "Sage", url: handwerkSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: [],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 70,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Angebote, Aufträge, E-Rechnung und Projekte; vieles als Zusatzmodul.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "19,90 € für 1 Benutzer, 59 € für unbegrenzte Benutzer bei Jahresvertrag.",
    datenschutz: "Betriebsmodell und Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "GAEB- und IDS-Schnittstellen als Erweiterung.",
  },
  pros: [
    {
      title: "Für das Handwerk gebaut",
      detail: "Projekte, Teil- und Schlussrechnungen, GAEB- und IDS-Anbindung.",
    },
    {
      title: "Unbegrenzte Benutzer",
      detail: "Enterprise kostet 59 € im Monat unabhängig von der Teamgröße.",
    },
  ],
  cons: [
    {
      title: "Viele Module extra",
      detail:
        "Finanzbuchhaltung, Nachkalkulation und Planung kosten zusätzlich.",
    },
    {
      title: "Jahresvertrag",
      detail: "Die Listenpreise gelten bei 12 Monaten Laufzeit.",
    },
  ],
  verdict: {
    short:
      "Sage 50 Handwerk ist ein Auftrags- und Rechnungsprogramm für Handwerksbetriebe mit E-Rechnung und Projekten. Ab mehreren Mitarbeitenden ist Enterprise mit unbegrenzten Benutzern die bessere Wahl.",
    idealFor: [
      "Handwerksbetriebe mit Angeboten und Aufträgen",
      "Betriebe mit Teil- und Schlussrechnungen",
    ],
    notIdealFor: ["Dienstleister ohne Projektgeschäft"],
  },
  review: sageReview("der Produktseite von Sage 50 Handwerk"),
  sources: [{ name: "Sage", url: handwerkSource, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Pakete, Preise und Module erstmals erfasst." },
  ],
} satisfies ToolInput;

/* ───── Sage Intacct: Finanzmanagement für wachsende Unternehmen ───── */

const intacctSource = sageUrl("sage-business-cloud/intacct/");

export const sageIntacct = {
  slug: "sage-intacct",
  name: "Sage Intacct",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: ["erp-software"] },
  tagline:
    "Cloud-Finanzmanagement für wachsende Dienstleister – Hauptbuch, Reporting, KI",
  bestFor: "Mittelständische Dienstleister mit eigener Finanzabteilung",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: intacctSource,
    note: "Sage Intacct kostet laut Produktseite ab 1.390 € pro Monat zzgl. MwSt.; den genauen Preis nennt ein personalisiertes Angebot. Erweiterungen wie Vertragsmanagement, Lagerverwaltung, Lieferantenzahlungsservice, Zeit- und Kostenmanagement oder Anlagenverwaltung kosten extra.",
    plans: [
      {
        id: "intacct",
        name: "Sage Intacct",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 139000, annualPerMonth: null },
          includedUnits: 1,
        },
        features: ["buchungen", "rechnungen", "e-rechnung-empfang"],
        highlights: [
          "Hauptbuch",
          "Debitoren inkl. Rechnungsstellung & Kreditoren",
          "Reports & Dashboards",
          "Auftragsverwaltung & Cash-Management",
          "Einkauf",
          "Sage AI Copilot",
        ],
        limits: ["Ab-Preis; Nutzerzahl im Angebot"],
        recommended: true,
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "intacct",
        price: { monthly: 139000, annualPerMonth: null },
        note: "ab-Preis",
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: buchhaltungFeatures({
    buchungen: { status: "ja", note: "Hauptbuch" },
    rechnungen: {
      status: "ja",
      note: "Debitorenbuchhaltung inkl. Rechnungsstellung",
    },
    "e-rechnung-empfang": {
      status: "ja",
      note: "Rechnungseingangs-Assistent mit KI",
    },
    anlagen: { status: "addon", note: "Anlagenverwaltung als Erweiterung" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Sage", url: intacctSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 70,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Finanzplattform mit Hauptbuch, Reporting und KI-Assistenten für Abschluss und Rechnungseingang.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 1.390 € pro Monat – für Kleinbetriebe zu teuer, für Finanzabteilungen angemessen.",
    datenschutz: "Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Erweiterungen und Partnerlösungen.",
  },
  pros: [
    {
      title: "KI-Assistenten",
      detail:
        "Assistenten für Abschluss, Ausreißer und Rechnungseingang sowie ein Finance Intelligence Agent.",
    },
    {
      title: "Skalierbar",
      detail: "Für wachsende Unternehmen mit eigener Finanzabteilung gedacht.",
    },
  ],
  cons: [
    {
      title: "Hoher Einstiegspreis",
      detail: "Ab 1.390 € pro Monat.",
    },
    {
      title: "Preis nur im Angebot",
      detail: "Den genauen Preis nennt Sage erst im Angebot.",
    },
  ],
  verdict: {
    short:
      "Sage Intacct ist Finanzmanagement für wachsende, dienstleistungsorientierte Unternehmen mit eigener Finanzabteilung. Für Kleinbetriebe sind Sage Active oder Sage 50 die passenderen Sage-Produkte.",
    idealFor: [
      "Dienstleister mit Finanzteam",
      "Unternehmen mit mehreren Gesellschaften",
    ],
    notIdealFor: ["Kleinunternehmen und Selbstständige"],
  },
  review: sageReview("der Produktseite von Sage Intacct"),
  sources: [{ name: "Sage", url: intacctSource, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Einstiegspreis und Funktionen erstmals erfasst." },
  ],
} satisfies ToolInput;
