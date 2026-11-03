import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const easybillVsFastbill = {
  slug: "easybill-vs-fastbill",
  toolA: "easybill",
  toolB: "fastbill",
  category: "rechnungsprogramme",
  isPlaceholder: false,
  seo: {
    title: "easybill vs. FastBill (2026): Der große Vergleich",
    description:
      "easybill oder FastBill? Preise in Euro, E-Rechnung, wiederkehrende Rechnungen, Mahnwesen, DATEV und Shop-Anbindung im direkten Vergleich.",
    h1: "easybill vs. FastBill: Welches Rechnungsprogramm passt besser zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "easybill ist stark bei vielen Rechnungen und Marktplatz-Anbindungen und hat einen kostenlosen Tarif. FastBill verbindet Rechnungen mit Belegen, Banking und UStVA und enthält ab Pro drei Nutzer. Beide starten bei 9 € im Monat bei jährlicher Zahlung.",
    chooseAIf: [
      "du über Amazon, eBay oder Shopify verkaufst",
      "du kostenlos mit bis zu 50 Dokumenten im Monat starten willst",
      "du sehr viele Rechnungen schreibst",
    ],
    chooseBIf: [
      "du Rechnungen, Belege und Banking an einem Ort willst",
      "mehrere Personen im Team mitarbeiten",
      "du eine API schon im kleinsten Tarif brauchst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "easybill bietet Marktplatz-Anbindung und Zeiterfassung (Premium), FastBill Belege, Banking und UStVA.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "easybill",
      note: "Beide ab 9 € bei jährlicher Zahlung; easybill zusätzlich mit kostenlosem Tarif, aber mit Dokumentlimits.",
    },
    datenschutz: {
      winner: "easybill",
      note: "Beide hosten in Deutschland; easybill legt den AVV offen und bietet 2FA.",
    },
    support: untested,
    integrationen: {
      winner: "easybill",
      note: "easybill bindet Marktplätze und den DATEV-Datenservice an; FastBill bietet API und DATEV-Rechnungsdatenservice ab Pro.",
    },
  },
  featureGroupVerdicts: {
    dokumente: {
      winner: "unentschieden",
      note: "E-Rechnung bei beiden; wiederkehrende Rechnungen bei easybill ab Professional, bei FastBill ab Pro.",
    },
    zahlung: {
      winner: "fastbill",
      note: "FastBill bindet Bankkonten schon im kleinsten Tarif an; easybill ab Starter mit einem Konto.",
    },
    buchhaltung: {
      winner: "fastbill",
      note: "FastBill nennt UStVA und Belegerfassung; bei easybill nicht belegt.",
    },
    technik: {
      winner: "easybill",
      note: "easybill Connect für Marktplätze und Zeiterfassung in Premium.",
    },
  },
  personas: [
    {
      label: "Onlinehändler mit Amazon und eBay",
      pick: "easybill",
      reason: "Marktplatz-Anbindung über easybill Connect.",
    },
    {
      label: "Freelancer mit Belegen und einem Geschäftskonto",
      pick: "fastbill",
      reason: "Rechnungen, Belege und Banking in einem Tool.",
    },
    {
      label: "Agentur mit drei Personen",
      pick: "fastbill",
      reason: "Pro enthält drei Nutzer.",
    },
  ],
  migration:
    "Exportiere Kunden, Artikel und offene Rechnungen als CSV und übernimm sie ins neue Programm. Führe die Rechnungsnummern lückenlos weiter und bewahre alle bisherigen Rechnungen für die Aufbewahrungsfrist lesbar auf.",
  faqs: [
    {
      q: "Was kosten easybill und FastBill?",
      a: "Beide starten bei 9 € pro Monat netto bei jährlicher Zahlung (easybill Starter, FastBill Solo). easybill hat zusätzlich einen kostenlosen Tarif mit 50 Dokumenten im Monat.",
    },
    {
      q: "Können beide E-Rechnungen?",
      a: "Ja. easybill nennt E-Rechnungen in allen Tarifen inklusive Empfang von ZUGFeRD und XRechnung, FastBill nennt E-Rechnungen in allen Tarifen.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const sevdeskVsBillomat = {
  slug: "sevdesk-vs-billomat",
  toolA: "sevdesk",
  toolB: "billomat",
  category: "rechnungsprogramme",
  isPlaceholder: false,
  seo: {
    title: "sevdesk vs. Billomat (2026): Der große Vergleich",
    description:
      "sevdesk oder Billomat? Preise, E-Rechnung, Serienrechnungen, Mahnwesen, DATEV und Buchhaltung im direkten Vergleich – mit Empfehlung je Situation.",
    h1: "sevdesk vs. Billomat: Welches Rechnungsprogramm passt besser zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "sevdesk ist günstiger und lässt sich zur vollständigen Buchhaltung ausbauen. Billomat enthält wiederkehrende Rechnungen und Mahnwesen schon im Einstieg, DATEV-Export und Banking aber erst ab Business.",
    chooseAIf: [
      "du später auch die Buchhaltung mit UStVA im selben Tool willst",
      "du günstig mit DATEV-Export starten willst",
      "du kostenlos testen willst, wie viele Rechnungen du schreibst",
    ],
    chooseBIf: [
      "du viele Serienrechnungen schreibst",
      "Kunden Angebote online annehmen sollen",
      "dir ein ISO-27001-zertifizierter Anbieter wichtig ist",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "sevdesk",
      note: "sevdesk bietet zusätzlich Buchhaltung mit UStVA; Billomat Angebotsannahme online und EÜR.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "sevdesk",
      note: "sevdesk Rechnung ab 9,90 € inkl. DATEV-Schnittstelle; Billomat mit DATEV ab 29 € (Business).",
    },
    datenschutz: {
      winner: "billomat",
      note: "Billomat nennt eine ISO-27001-Zertifizierung; sevdesk keine eigene Zertifizierung.",
    },
    support: untested,
    integrationen: {
      winner: "sevdesk",
      note: "sevdesk mit DATEV und ADDISON schon im Tarif Rechnung; Billomat DATEVconnect, mollie und API ab Business.",
    },
  },
  featureGroupVerdicts: {
    dokumente: {
      winner: "billomat",
      note: "Wiederkehrende Rechnungen bei Billomat in allen Tarifen.",
    },
    zahlung: {
      winner: "unentschieden",
      note: "Mahnwesen bei beiden; Banking bei sevdesk ab Buchhaltung, bei Billomat ab Business.",
    },
    buchhaltung: {
      winner: "sevdesk",
      note: "DATEV-Export schon im Tarif Rechnung, Buchhaltung mit UStVA zubuchbar.",
    },
    technik: {
      winner: "unentschieden",
      note: "API bei sevdesk im Pro-Tarif, bei Billomat ab Business.",
    },
  },
  personas: [
    {
      label:
        "Gründerin, die erst Rechnungen und später die Buchhaltung digitalisiert",
      pick: "sevdesk",
      reason: "Vom Tarif Rechnung zur Buchhaltung im selben Tool.",
    },
    {
      label: "Agentur mit monatlichen Retainer-Rechnungen",
      pick: "billomat",
      reason: "Serienrechnungen schon im Einstiegstarif.",
    },
    {
      label: "Dienstleister, dessen Kunden Angebote digital bestätigen",
      pick: "billomat",
      reason: "Angebote mit Annahmefunktion.",
    },
  ],
  migration:
    "Beide exportieren Kunden und Rechnungen. Übernimm Stammdaten und offene Posten zum Monatsende, führe die Rechnungsnummern weiter und bewahre die Rechnungen aus dem alten Programm lesbar auf.",
  faqs: [
    {
      q: "Was ist günstiger, sevdesk oder Billomat?",
      a: "sevdesk Rechnung kostet 9,90 € pro Monat bei jährlicher Zahlung, Billomat Professional 19 €. Mit DATEV-Export: sevdesk 9,90 €, Billomat Business 29 €. Alle Preise netto.",
    },
    {
      q: "Welches Tool hat das bessere Mahnwesen?",
      a: "Beide bieten Mahnwesen. Bei Billomat ist es in allen Tarifen enthalten, bei sevdesk gibt es Zahlungserinnerungen ab Rechnung und Mahnstufen ab Buchhaltung.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
