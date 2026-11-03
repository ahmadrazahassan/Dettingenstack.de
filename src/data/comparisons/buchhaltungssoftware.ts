import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-02", updatedAt: "2026-11-02" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const lexwareOfficeVsSevdesk = {
  slug: "lexware-office-vs-sevdesk",
  toolA: "lexware-office",
  toolB: "sevdesk",
  category: "buchhaltungssoftware",
  isPlaceholder: false,
  seo: {
    title: "Lexware Office vs. sevdesk (2026): Der große Vergleich",
    description:
      "Lexware Office oder sevdesk? Preise in Euro, Buchhaltung, E-Rechnung, DATEV und Datenschutz im direkten Vergleich – mit klarer Empfehlung je Situation.",
    h1: "Lexware Office vs. sevdesk: Welche Buchhaltungssoftware passt besser zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Beide decken Rechnungen, Buchhaltung, EÜR und Umsatzsteuer für Selbstständige und kleine Teams ab. Lexware Office ist monatlich kündbar und lässt Lohn als Zusatzmodul zu, sevdesk startet kostenlos und wird mit jährlicher Zahlung günstiger, berechnet aber jeden weiteren Nutzer.",
    chooseAIf: [
      "du monatlich kündbar bleiben willst",
      "du später Lohn und Gehalt im selben Tool abrechnen möchtest",
      "dein Steuerbüro die DATEV-Datenservices nutzt",
    ],
    chooseBIf: [
      "du mit wenigen Rechnungen kostenlos starten willst",
      "dein Steuerbüro mit ADDISON arbeitet",
      "du Kostenstellen oder eine REST-API brauchst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Beide bieten Belege, Rechnungen, EÜR, UStVA und Bankabgleich. Lexware Office ergänzt Lohn als Modul, sevdesk Kostenstellen im Pro-Tarif.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "sevdesk",
      note: "Für einen Nutzer ist sevdesk Buchhaltung bei jährlicher Zahlung mit 22,90 € etwa so teuer wie Lexware Office L mit 21,90 €; sevdesk bietet zusätzlich einen kostenlosen Tarif. Für mehrere Nutzer kostet sevdesk 5,90 € je Nutzer.",
    },
    datenschutz: {
      winner: "lexware-office",
      note: "Beide hosten in Deutschland. Lexware nennt eine Prüfung nach IDW PS 880 und Rechenzentren in Frankfurt; sevdesk nennt keine eigene Zertifizierung.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Lexware Office bietet DATEV-Export und DATEV-Datenservices, sevdesk DATEV und ADDISON; eine API gibt es bei beiden nur im obersten Tarif.",
    },
  },
  featureGroupVerdicts: {
    belege: {
      winner: "unentschieden",
      note: "Belegerfassung per App bei beiden; E-Rechnungs-Empfang ist bei sevdesk keinem Tarif eindeutig zugeordnet.",
    },
    buchhaltung: {
      winner: "sevdesk",
      note: "sevdesk belegt zusätzlich Abschreibungen und Kostenstellen; Lexware Office nennt laut Hersteller auch die Bilanz.",
    },
    bank: {
      winner: "unentschieden",
      note: "Beide bieten Bankanbindung und Zahlungsabgleich.",
    },
    rechnungen: {
      winner: "unentschieden",
      note: "Angebote, (E-)Rechnungen und Mahnungen bei beiden; sevdesk schon kostenlos für drei Rechnungen im Monat.",
    },
    zusammenarbeit: {
      winner: "unentschieden",
      note: "Zugang für die Steuerberatung und DATEV-Export bei beiden.",
    },
    technik: {
      winner: "lexware-office",
      note: "Lexware Office bietet Lohn & Gehalt als Zusatzmodul; bei sevdesk ist Lohn auf der Preisseite nicht genannt.",
    },
  },
  personas: [
    {
      label: "Freelancerin mit fünf Rechnungen im Monat",
      pick: "sevdesk",
      reason:
        "Der kostenlose Tarif reicht für den Start, die Buchhaltung lässt sich später zubuchen.",
    },
    {
      label: "Handwerksbetrieb mit zwei Angestellten",
      pick: "lexware-office",
      reason: "Lohn & Gehalt als Zusatzmodul im selben Tool.",
    },
    {
      label: "Agentur mit Kostenstellen je Kunde",
      pick: "sevdesk",
      reason: "Kostenstellen im Tarif Buchhaltung Pro.",
    },
    {
      label: "Gründer, der sich nicht binden will",
      pick: "lexware-office",
      reason: "Monatlich kündbar ohne Mindestlaufzeit.",
    },
  ],
  migration:
    "Beide Tools exportieren Buchungen im DATEV-Format. Wechsle am besten zum Monats- oder Quartalsende: Exportiere Kunden, offene Posten und die Buchungen bis zum Stichtag, übernimm Stammdaten ins neue Tool und bewahre die Belege des alten Systems für die Aufbewahrungsfrist lesbar auf.",
  faqs: [
    {
      q: "Was ist günstiger, Lexware Office oder sevdesk?",
      a: "Für einen Nutzer liegen beide nah beieinander: Lexware Office L kostet 21,90 € im Monat (monatlich kündbar), sevdesk Buchhaltung 22,90 € bei jährlicher bzw. 25,90 € bei monatlicher Zahlung. Weitere Nutzer kosten bei sevdesk 5,90 € pro Monat; bei Lexware Office nennt die Preisseite keine Nutzerzahl. Alle Preise netto.",
    },
    {
      q: "Können beide E-Rechnungen?",
      a: "Ja. Beide erstellen XRechnung und ZUGFeRD. sevdesk bietet das sogar im kostenlosen Tarif für drei Rechnungen im Monat.",
    },
    {
      q: "Welches Tool eignet sich für bilanzierende Unternehmen?",
      a: "Beide sind vor allem auf die EÜR ausgerichtet. Lexware nennt die Bilanz als Funktion, bei sevdesk erstellt laut Anbieter in der Regel die Steuerberatung den Abschluss aus dem DATEV-Export.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const sevdeskVsDatevUnternehmenOnline = {
  slug: "sevdesk-vs-datev-unternehmen-online",
  toolA: "sevdesk",
  toolB: "datev-unternehmen-online",
  category: "buchhaltungssoftware",
  isPlaceholder: false,
  seo: {
    title: "sevdesk vs. DATEV Unternehmen online (2026): Vergleich",
    description:
      "Selbst buchen mit sevdesk oder Belege an die Kanzlei mit DATEV Unternehmen online? Kosten, Funktionen, Datenschutz und Zusammenarbeit mit dem Steuerbüro im Vergleich.",
    h1: "sevdesk vs. DATEV Unternehmen online: Selbst buchen oder buchen lassen?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Die beiden Lösungen stehen für zwei Arbeitsweisen: Mit sevdesk buchst du selbst und schreibst Rechnungen, mit DATEV Unternehmen online lieferst du Belege und Bankdaten, und deine Kanzlei bucht. Entscheidend ist, wie viel Buchhaltung du selbst machen willst und wie dein Steuerbüro arbeitet.",
    chooseAIf: [
      "du selbst buchen und deine UStVA selbst abgeben willst",
      "du Rechnungen und Buchhaltung in einem Tool möchtest",
      "du transparente Preise ohne Kanzleivertrag brauchst",
    ],
    chooseBIf: [
      "deine Kanzlei mit DATEV arbeitet und die Buchhaltung übernimmt",
      "du keinen Export an das Steuerbüro mehr pflegen willst",
      "dir ein eigenes, zertifiziertes Rechenzentrum wichtig ist",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "sevdesk",
      note: "sevdesk deckt Rechnungen, Buchhaltung, EÜR und UStVA selbst ab. DATEV Unternehmen online konzentriert sich auf Belege, Bank und Zahlungen; gebucht wird meist in der Kanzlei.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "sevdesk",
      note: "sevdesk veröffentlicht Preise (Buchhaltung ab 22,90 € bei jährlicher Zahlung). DATEV nennt keine Endkundenpreise; die Kosten legt die Kanzlei fest.",
    },
    datenschutz: {
      winner: "datev-unternehmen-online",
      note: "DATEV betreibt ein eigenes, nach ISO/IEC 27001 zertifiziertes Rechenzentrum in Nürnberg. sevdesk hostet in Deutschland, nennt aber keine eigene Zertifizierung.",
    },
    support: untested,
    integrationen: {
      winner: "datev-unternehmen-online",
      note: "Bei DATEV liegen die Daten direkt im Bestand der Kanzlei; sevdesk übergibt per DATEV- oder ADDISON-Export.",
    },
  },
  featureGroupVerdicts: {
    belege: {
      winner: "unentschieden",
      note: "Belegerfassung mit Texterkennung bei beiden.",
    },
    buchhaltung: {
      winner: "sevdesk",
      note: "Bei sevdesk buchst du selbst inklusive UStVA und EÜR; bei DATEV meist die Kanzlei.",
    },
    bank: {
      winner: "datev-unternehmen-online",
      note: "DATEV bindet Konten direkt an und erlaubt Überweisungen und Lastschriften.",
    },
    rechnungen: {
      winner: "sevdesk",
      note: "Angebote, (E-)Rechnungen und Mahnungen in sevdesk; bei DATEV Unternehmen online nicht Teil der geprüften Angaben.",
    },
    zusammenarbeit: {
      winner: "datev-unternehmen-online",
      note: "Gemeinsamer Datenbestand mit der Kanzlei statt Export.",
    },
    technik: {
      winner: "sevdesk",
      note: "sevdesk bietet eine REST-API im Pro-Tarif.",
    },
  },
  personas: [
    {
      label: "Selbstständiger, der die UStVA selbst abgibt",
      pick: "sevdesk",
      reason: "UStVA direkt an ELSTER aus dem Tarif Buchhaltung.",
    },
    {
      label: "GmbH, deren Kanzlei die Buchhaltung macht",
      pick: "datev-unternehmen-online",
      reason: "Belege und Bank landen direkt im DATEV-Bestand der Kanzlei.",
    },
    {
      label: "Kleines Unternehmen ohne festes Steuerbüro",
      pick: "sevdesk",
      reason: "Funktioniert ohne Kanzleivertrag, mit veröffentlichten Preisen.",
    },
  ],
  migration:
    "Wenn du von sevdesk zu DATEV Unternehmen online wechselst, richtet in der Regel die Kanzlei den Zugang ein. Exportiere vorher Buchungen und Belege im DATEV-Format, damit die Kanzlei die Vorperioden übernehmen kann, und bewahre die sevdesk-Daten für die Aufbewahrungsfrist lesbar auf.",
  faqs: [
    {
      q: "Was kostet DATEV Unternehmen online?",
      a: "DATEV veröffentlicht keine Endkundenpreise. Du nutzt die Lösung über deine Steuerkanzlei, die die Kosten nach ihrem Vertrag weitergibt. Frag deine Kanzlei nach einem konkreten Monatsbetrag.",
    },
    {
      q: "Kann ich sevdesk mit einer DATEV-Kanzlei nutzen?",
      a: "Ja. sevdesk exportiert Buchungen und Belege im DATEV-Format und bietet einen Zugang für die Steuerberatung.",
    },
    {
      q: "Wo liegen die Daten?",
      a: "Bei DATEV im eigenen Rechenzentrum in der Region Nürnberg, bei sevdesk laut Datenschutzerklärung auf Servern in Deutschland.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
