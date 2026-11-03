import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const xentralVsWeclapp = {
  slug: "xentral-vs-weclapp",
  toolA: "xentral",
  toolB: "weclapp",
  category: "erp-software",
  isPlaceholder: false,
  seo: {
    title: "Xentral vs. weclapp (2026): Der ERP-Vergleich",
    description:
      "Xentral oder weclapp? Zwei deutsche Cloud-ERPs im Vergleich: Preise nach Aufträgen oder Nutzern, Warenwirtschaft, CRM, Projekte und Hosting.",
    h1: "Xentral vs. weclapp: Welches Cloud-ERP passt zu deinem Unternehmen?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Xentral ist auf Onlinehandel zugeschnitten und rechnet ohne Nutzerpreise ab. weclapp deckt neben Handel auch Dienstleistung mit CRM, Projekten und Zeiterfassung ab und rechnet pro Nutzer. Beide hosten in Deutschland.",
    chooseAIf: [
      "du vor allem online über Shops und Marktplätze verkaufst",
      "viele Personen im System arbeiten sollen",
      "du Versand, Pick & Pack und Retouren steuern willst",
    ],
    chooseBIf: [
      "du Dienstleistungen mit Projekten und Zeiten abrechnest",
      "du ein CRM im ERP brauchst",
      "du auch produzierst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Xentral stark im E-Commerce, weclapp breiter mit CRM, Projekten und Produktion.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "unentschieden",
      note: "Xentral ab 99 € pauschal plus Auftragsgebühr; weclapp Handel ab 163 € pro Nutzer. Für große Teams ist Xentral günstiger, für kleine oft weclapp.",
    },
    datenschutz: {
      winner: "unentschieden",
      note: "Beide hosten in Deutschland.",
    },
    support: untested,
    integrationen: {
      winner: "xentral",
      note: "Xentral mit Shops, Marktplätzen, Versand und DATEV.",
    },
  },
  featureGroupVerdicts: {
    vertrieb: { winner: "weclapp", note: "CRM ab Dienstleistung." },
    logistik: {
      winner: "unentschieden",
      note: "Warenwirtschaft bei beiden; Produktion bei weclapp Handel.",
    },
    finanzen: { winner: "weclapp", note: "Buchhaltung und Projekte im ERP." },
    technik: {
      winner: "unentschieden",
      note: "API bei beiden in den mittleren Tarifen.",
    },
  },
  personas: [
    {
      label: "Onlineshop mit 15 Mitarbeitenden",
      pick: "xentral",
      reason: "Keine Nutzerpreise, starke Shop-Anbindung.",
    },
    {
      label: "IT-Dienstleister mit 8 Personen",
      pick: "weclapp",
      reason: "CRM, Projekte und Zeiterfassung ab Dienstleistung.",
    },
    {
      label: "Händler mit kleiner Fertigung",
      pick: "weclapp",
      reason: "Produktion im Tarif Handel.",
    },
  ],
  migration:
    "Übernimm Artikel, Kunden, Lieferanten und Lagerbestände zum Stichtag per Import. Offene Aufträge solltest du im Altsystem abschließen; Buchhaltungsdaten bleiben im Altsystem oder bei DATEV archiviert.",
  faqs: [
    {
      q: "Was kosten Xentral und weclapp für 10 Nutzer?",
      a: "Xentral Starter kostet 349 € pro Monat mit unbegrenzten Nutzern und 500 Aufträgen. weclapp Handel kostet 10 × 163 € = 1.630 € pro Monat bei jährlicher Zahlung, weclapp Dienstleistung 10 × 86 € = 860 €. Alle Preise netto.",
    },
    {
      q: "Wo liegen die Daten?",
      a: "Xentral nutzt die AWS-Cloud in Frankfurt, weclapp ausschließlich deutsche Rechenzentren.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const odooVsSapBusinessOne = {
  slug: "odoo-vs-sap-business-one",
  toolA: "odoo-crm",
  toolB: "sap-business-one",
  category: "erp-software",
  isPlaceholder: false,
  seo: {
    title: "Odoo vs. SAP Business One (2026): Der ERP-Vergleich",
    description:
      "Odoo oder SAP Business One? Modulares Open-Source-ERP gegen SAP-Standard für KMU: Kosten, Einführung, Hosting und Partner im Vergleich.",
    h1: "Odoo vs. SAP Business One: Open Source oder SAP-Standard?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Odoo startet kostenlos mit einer App und wächst modular zum ERP, auch selbst gehostet. SAP Business One ist ein etablierter Standard für KMU, wird aber ausschließlich über Partner und ohne Listenpreise verkauft.",
    chooseAIf: [
      "du klein anfangen und Module nach Bedarf ergänzen willst",
      "du selbst hosten oder Open Source nutzen willst",
      "du ohne Partner starten willst",
    ],
    chooseBIf: [
      "dein Konzern oder deine Kunden SAP verlangen",
      "du einen Partner mit Branchenlösung suchst",
      "du später zu SAP S/4HANA wechseln willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Beide decken Vertrieb, Einkauf, Lager, Produktion und Finanzen ab.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "odoo-crm",
      note: "Odoo mit Gratis-App und Community-Edition; SAP Business One ohne Listenpreise.",
    },
    datenschutz: {
      winner: "odoo-crm",
      note: "Odoo Online hostet in der EU, ISO 27001:2022; bei SAP B1 hängt das Hosting vom Partner ab.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Große Ökosysteme bei beiden.",
    },
  },
  featureGroupVerdicts: {
    vertrieb: { winner: "odoo-crm", note: "CRM und Verkauf als Odoo-Apps." },
    logistik: {
      winner: "unentschieden",
      note: "Lager und Produktion bei beiden.",
    },
    finanzen: {
      winner: "unentschieden",
      note: "Finanzbuchhaltung bei beiden.",
    },
    technik: {
      winner: "unentschieden",
      note: "APIs und Erweiterungen bei beiden.",
    },
  },
  personas: [
    {
      label: "Start-up mit 5 Personen",
      pick: "odoo-crm",
      reason: "Kostenlos starten, Apps nach Bedarf.",
    },
    {
      label: "Tochter eines SAP-Konzerns",
      pick: "sap-business-one",
      reason: "Anbindung an den SAP-Standard.",
    },
    {
      label: "Händler mit eigener IT",
      pick: "odoo-crm",
      reason: "Selbst hostbar und anpassbar.",
    },
  ],
  migration:
    "Beide Einführungen sind Projekte: Stammdaten bereinigen, Prozesse definieren, Daten zum Stichtag übernehmen. Bei SAP Business One übernimmt das der Partner, bei Odoo wahlweise ein Partner oder das eigene Team.",
  faqs: [
    {
      q: "Ist Odoo kostenlos?",
      a: "Eine einzelne App ist auf Odoo Online mit unbegrenzten Nutzern kostenlos, die Community-Edition ist Open Source. Für mehrere Apps fallen Kosten pro Nutzer an.",
    },
    {
      q: "Was kostet SAP Business One?",
      a: "SAP veröffentlicht keine Listenpreise; Lizenzen und Einführung kalkulieren SAP-Partner im Angebot.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const businessCentralVsSapBusinessOne = {
  slug: "business-central-vs-sap-business-one",
  toolA: "business-central",
  toolB: "sap-business-one",
  category: "erp-software",
  isPlaceholder: false,
  seo: {
    title: "Business Central vs. SAP Business One (2026): Vergleich",
    description:
      "Microsoft Dynamics 365 Business Central oder SAP Business One? Lizenzpreise, Microsoft-Integration, Partner und Hosting der beiden KMU-ERPs im Vergleich.",
    h1: "Business Central vs. SAP Business One: Welches KMU-ERP passt?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Business Central hat transparente Lizenzpreise ab 69,30 € pro Nutzer und ist eng mit Microsoft 365 verzahnt. SAP Business One wird über Partner ohne Listenpreise verkauft und passt zu Unternehmen mit SAP-Umfeld. Beide brauchen in der Regel einen Implementierungspartner.",
    chooseAIf: [
      "du Microsoft 365 und Teams intensiv nutzt",
      "du Lizenzkosten vorab kennen willst",
      "du Team-Member-Lizenzen für Gelegenheitsnutzer brauchst",
    ],
    chooseBIf: [
      "dein Umfeld auf SAP setzt",
      "du eine SAP-Branchenlösung eines Partners nutzen willst",
      "du später zu SAP S/4HANA wachsen willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Beide sind vollständige KMU-ERPs mit Produktion.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "business-central",
      note: "Business Central mit veröffentlichten Lizenzpreisen; SAP B1 nur auf Anfrage.",
    },
    datenschutz: {
      winner: "business-central",
      note: "EU Data Boundary bei Microsoft; bei SAP B1 hängt das Hosting vom Partner ab.",
    },
    support: untested,
    integrationen: {
      winner: "business-central",
      note: "Eng mit Microsoft 365, Teams und Power Platform verzahnt.",
    },
  },
  featureGroupVerdicts: {
    vertrieb: {
      winner: "unentschieden",
      note: "Aufträge und Verkauf bei beiden.",
    },
    logistik: {
      winner: "unentschieden",
      note: "Lager und Produktion bei beiden; Produktion bei BC in Premium.",
    },
    finanzen: {
      winner: "unentschieden",
      note: "Finanzbuchhaltung bei beiden.",
    },
    technik: {
      winner: "business-central",
      note: "Mobile Apps und Microsoft-Integration.",
    },
  },
  personas: [
    {
      label: "Großhändler mit Microsoft 365",
      pick: "business-central",
      reason: "Outlook-, Excel- und Teams-Integration.",
    },
    {
      label: "Zulieferer eines SAP-Konzerns",
      pick: "sap-business-one",
      reason: "SAP-Standard im Umfeld.",
    },
    {
      label: "Produzent mit 30 Nutzern",
      pick: "business-central",
      reason: "Premium mit Produktion und planbaren Lizenzkosten.",
    },
  ],
  migration:
    "Plane den Wechsel mit dem Partner: Stammdaten bereinigen, Salden zum Geschäftsjahreswechsel übernehmen, Altdaten revisionssicher archivieren.",
  faqs: [
    {
      q: "Was kostet Business Central?",
      a: "Essentials 69,30 €, Premium 95,30 € und Team Members 6,90 € pro Nutzer und Monat bei jährlicher Abrechnung, zzgl. MwSt. Dazu kommen Partnerkosten.",
    },
    {
      q: "Braucht man einen Partner?",
      a: "Bei beiden in der Regel ja. SAP Business One wird ausschließlich über Partner vertrieben.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
