import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const free = [
  "belegarchiv",
  "buchungen",
  "rechnungen",
  "e-rechnung-empfang",
  "e-rechnung-versand",
];
const s = [
  ...free,
  "belegerfassung",
  "bankanbindung",
  "zahlungsabgleich",
  "ustva",
  "euer",
  "mahnwesen",
  "datev-export",
];
const m = [...s, "api"];

export const papierkram = {
  slug: "papierkram",
  name: "Papierkram",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Papierkram GmbH",
    hq: "Hamburg",
    countryCode: "DE",
    website: "https://www.papierkram.de/",
  },
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme"],
  },
  tagline: "Buchhaltung, Rechnungen, Zeiterfassung und Projekte in einem Tool",
  bestFor: "Freiberufler und Agenturen mit Projekten und EÜR",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.papierkram.de/preise/",
    note: "Preise netto (zzgl. MwSt.); bei jährlicher Zahlung 20 % günstiger. S ohne Zusatznutzer, M höchstens 5 Nutzer, L unbegrenzt; zusätzliche Nutzer in M und L 2,90 € (monatlich) bzw. 2,32 € (jährlich). Wie viele Nutzer M und L ohne Aufpreis enthalten, nennt die Seite nicht eindeutig – wir rechnen mit einem.",
    plans: [
      {
        id: "free",
        excludeFromEntry: ["buchhaltungssoftware"],
        name: "Free",
        model: {
          type: "free",
          limits: "Grundfunktionen, 100 MB Speicher, keine Bankanbindung",
          maxUnits: 1,
        },
        features: free,
        highlights: [
          "Rechnungen & Zeiterfassung",
          "XML-E-Rechnungen erstellen und empfangen",
          "100 MB Speicher",
        ],
        limits: ["Kein DATEV-Export (nur CSV)", "Keine UStVA und EÜR"],
      },
      {
        id: "s",
        name: "S",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 1590, annualPerMonth: 1290 },
          includedUnits: 1,
        },
        features: s,
        highlights: [
          "Bis zu 2 Bankkonten",
          "KI-Belegerfassung (15 Belege/Monat)",
          "UStVA & EÜR",
          "DATEV-Export",
          "Mahnwesen",
        ],
        limits: ["Keine zusätzlichen Nutzer"],
      },
      {
        id: "m",
        name: "M",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 2990, annualPerMonth: 2490 },
          perUnit: { monthly: 290, annualPerMonth: 232 },
          includedUnits: 1,
        },
        features: m,
        highlights: [
          "Alles aus S",
          "Unbegrenzt Bankkonten und KI-Belegerfassung",
          "Teamarbeit, bis 5 Nutzer",
          "Kundenportal & Abschlagsrechnungen",
          "REST-API (Beta)",
        ],
        recommended: true,
      },
      {
        id: "l",
        name: "L",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 5990, annualPerMonth: 4990 },
          perUnit: { monthly: 290, annualPerMonth: 232 },
          includedUnits: 1,
        },
        features: m,
        highlights: ["Alles aus M", "Unbegrenzt Nutzer", "10.000 MB Speicher"],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Zusätzliche:r Nutzer:in (M, L)",
        unit: "pauschal",
        price: { monthly: 290, annualPerMonth: 232 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: "zum Ende der gewählten Laufzeit",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "s",
        price: { monthly: 1590, annualPerMonth: 1290 },
      },
      {
        date: checked,
        planId: "m",
        price: { monthly: 2990, annualPerMonth: 2490 },
      },
      {
        date: checked,
        planId: "l",
        price: { monthly: 5990, annualPerMonth: 4990 },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: {
    ...buchhaltungFeatures({
      belegerfassung: {
        status: "ja",
        fromPlan: "s",
        note: "Magic Suggest+; in S 15 Belege pro Monat",
      },
      belegarchiv: {
        status: "ja",
        note: "Laut Anbieter GoBD-konform nach Prüfung durch PKF",
      },
      "e-rechnung-empfang": { status: "ja" },
      buchungen: { status: "ja", note: "Im Free-Tarif Grundfunktionen" },
      ustva: { status: "ja", fromPlan: "s" },
      euer: { status: "ja", fromPlan: "s" },
      bankanbindung: {
        status: "ja",
        fromPlan: "s",
        note: "S: bis 2 Konten, ab M unbegrenzt",
      },
      zahlungsabgleich: { status: "ja", fromPlan: "s" },
      rechnungen: { status: "ja", note: "Wiederkehrende Rechnungen ab S" },
      "e-rechnung-versand": {
        status: "ja",
        note: "XRechnung und ZUGFeRD ab S",
      },
      mahnwesen: { status: "ja", fromPlan: "s" },
      "datev-export": { status: "ja", fromPlan: "s" },
      api: { status: "teilweise", fromPlan: "m", note: "REST-API in der Beta" },
    }),
    // Rechnungsprogramme (secondary category)
    wiederkehrend: { status: "ja", fromPlan: "s" },
    abschlag: { status: "ja", fromPlan: "m" },
    zeiterfassung: {
      status: "ja",
      note: "In allen Tarifen, Team-Auswertungen ab M",
    },
  },
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Rechenzentren in Frankfurt am Main und Hamburg, Remote-Backups bei Hetzner in Falkenstein",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Laut Anbieter TÜViT-zertifizierte Rechenzentren und GoBD-Prüfung durch PKF; ein Prüfbericht ist nicht öffentlich.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Papierkram",
      url: "https://www.papierkram.de/sicher-und-zuverlaessig-papierkram-buchhaltung-aus-der-cloud",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Buchhaltung mit UStVA und EÜR, dazu Zeiterfassung und Projekte; Bilanz auf der Preisseite nicht genannt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "UStVA, EÜR und DATEV ab 12,90 € bei jährlicher Zahlung; kostenloser Tarif.",
    datenschutz:
      "Rechenzentren und Backups in Deutschland; AVV und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV-Export ab S, REST-API in der Beta ab M.",
  },
  pros: [
    {
      title: "Günstiger Einstieg in die Buchhaltung",
      detail:
        "UStVA, EÜR und DATEV-Export schon im Tarif S ab 12,90 € bei jährlicher Zahlung.",
    },
    {
      title: "Zeiterfassung und Projekte inklusive",
      detail:
        "Praktisch für Agenturen und Freiberufler, die Stunden abrechnen.",
    },
    {
      title: "Alles in Deutschland",
      detail: "Rechenzentren in Frankfurt und Hamburg, Backups in Falkenstein.",
    },
  ],
  cons: [
    {
      title: "Bilanz nicht genannt",
      detail: "Die Preisseite erwähnt keine doppelte Buchführung mit Bilanz.",
    },
    {
      title: "S nur für eine Person",
      detail: "Im Tarif S lassen sich keine weiteren Nutzer buchen.",
    },
    {
      title: "Testzeitraum unklar",
      detail:
        "Statt eines Tests verweist Papierkram auf den kostenlosen Tarif.",
    },
  ],
  verdict: {
    short:
      "Papierkram ist eine günstige Wahl für Freiberufler und kleine Agenturen mit EÜR: Buchhaltung, Rechnungen, Zeiterfassung und Projekte in einem Tool, alles in Deutschland gehostet.",
    idealFor: [
      "Freiberufler und Agenturen, die Zeiten und Projekte abrechnen",
      "Selbstständige mit EÜR und kleinem Budget",
    ],
    notIdealFor: ["Bilanzierende Unternehmen"],
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
    {
      name: "Papierkram",
      url: "https://www.papierkram.de/preise/",
      accessedAt: checked,
    },
    {
      name: "Papierkram",
      url: "https://www.papierkram.de/sicher-und-zuverlaessig-papierkram-buchhaltung-aus-der-cloud",
      accessedAt: checked,
    },
    {
      name: "Papierkram",
      url: "https://www.papierkram.de/datenschutz",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
