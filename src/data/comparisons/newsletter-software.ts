import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const cleverreachVsRapidmail = {
  slug: "cleverreach-vs-rapidmail",
  toolA: "cleverreach",
  toolB: "rapidmail",
  category: "newsletter-software",
  isPlaceholder: false,
  seo: {
    title: "CleverReach vs. rapidmail (2026): Der Vergleich",
    description:
      "CleverReach oder rapidmail? Zwei deutsche Newsletter-Tools im Vergleich: Gratis-Tarif, Einstiegspreise, Bezahlung pro Versand und Funktionen.",
    h1: "CleverReach vs. rapidmail: Welches deutsche Newsletter-Tool passt?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Beide starten bei 15 € im Monat für 500 Empfänger. CleverReach hat einen dauerhaften Gratis-Tarif und A/B-Tests in Pro; rapidmail punktet mit der Bezahlung pro Versand für alle, die selten verschicken.",
    chooseAIf: [
      "du dauerhaft kostenlos mit bis zu 250 Empfängern starten willst",
      "du A/B-Tests und mehrere Automatisierungen brauchst",
      "du regelmäßig versendest",
    ],
    chooseBIf: [
      "du nur gelegentlich Newsletter verschickst",
      "du ein Verein bist und Rabatt nutzen willst",
      "du Transaktionsmails per SMTP brauchst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "cleverreach",
      note: "CleverReach mit A/B-Tests und unbegrenzten Automatisierungen in Pro.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "unentschieden",
      note: "Beide ab 15 € für 500 Empfänger; CleverReach mit Gratis-Tarif, rapidmail mit Bezahlung pro Versand.",
    },
    datenschutz: {
      winner: "unentschieden",
      note: "Beide deutsche Anbieter; CleverReach nennt Server in der EU.",
    },
    support: untested,
    integrationen: {
      winner: "rapidmail",
      note: "rapidmail mit Transaktionsmails per SMTP.",
    },
  },
  featureGroupVerdicts: {
    erstellung: {
      winner: "unentschieden",
      note: "Editor und Vorlagen bei beiden.",
    },
    empfaenger: {
      winner: "unentschieden",
      note: "DSGVO-konforme Anmeldung bei beiden.",
    },
    versand: {
      winner: "cleverreach",
      note: "A/B-Tests und Automatisierungen in Pro.",
    },
    auswertung: { winner: "unentschieden", note: "Berichte bei beiden." },
  },
  personas: [
    {
      label: "Verein mit 400 Mitgliedern",
      pick: "rapidmail",
      reason: "Vereinsrabatt und Bezahlung pro Versand.",
    },
    {
      label: "Shop mit monatlichem Newsletter",
      pick: "cleverreach",
      reason: "A/B-Tests und Automatisierungen in Pro.",
    },
    {
      label: "Selbstständige mit 200 Kontakten",
      pick: "cleverreach",
      reason: "Gratis-Tarif bis 250 Empfänger.",
    },
  ],
  migration:
    "Exportiere Empfänger mit Anmeldedatum und Herkunft der Einwilligung als CSV. Übernimm nur bestätigte Kontakte, damit der Nachweis des Double-Opt-in erhalten bleibt.",
  faqs: [
    {
      q: "Was kosten CleverReach und rapidmail?",
      a: "Beide ab 15 € pro Monat für 500 Empfänger, zzgl. USt. CleverReach Pro kostet 18 € bei 500 Empfängern; rapidmail bietet zusätzlich einen Tarif pro Versand.",
    },
    {
      q: "Gibt es eine kostenlose Version?",
      a: "CleverReach Lite ist dauerhaft kostenlos bis 250 Empfänger und 1.000 E-Mails pro Monat. Bei rapidmail ist der erste Versand an bis zu 2.000 Kontakte kostenlos.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const brevoVsMailchimp = {
  slug: "brevo-vs-mailchimp",
  toolA: "brevo",
  toolB: "mailchimp",
  category: "newsletter-software",
  isPlaceholder: false,
  seo: {
    title: "Brevo vs. Mailchimp (2026): Der große Vergleich",
    description:
      "Brevo oder Mailchimp? Abrechnung nach Versand oder Kontakten, Gratis-Tarif, Euro-Preise, Automatisierung und Integrationen im direkten Vergleich.",
    h1: "Brevo vs. Mailchimp: Welches Newsletter-Tool ist günstiger?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Brevo rechnet nach versendeten E-Mails ab und ist damit für große Listen günstig, mit Euro-Preisen ab 7 €. Mailchimp rechnet nach Kontakten, hat mehr Integrationen, zeigte uns aber nur Aktionspreise in US-Dollar.",
    chooseAIf: [
      "du eine große Liste hast, aber selten versendest",
      "du transparente Euro-Preise willst",
      "du auch Transaktionsmails und SMS brauchst",
    ],
    chooseBIf: [
      "du viele Integrationen nutzt",
      "deine Liste klein ist",
      "du international arbeitest",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Beide mit Editor, Automatisierung und Berichten.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "brevo",
      note: "Brevo ab 7 € im Monat und kostenlos bis 300 E-Mails pro Tag; Mailchimp gratis nur bis 250 Kontakte.",
    },
    datenschutz: {
      winner: "brevo",
      note: "Brevo ist ein europäischer Anbieter; Serverstandorte bei beiden nicht geprüft.",
    },
    support: untested,
    integrationen: {
      winner: "mailchimp",
      note: "Mailchimp mit über 300 Integrationen.",
    },
  },
  featureGroupVerdicts: {
    erstellung: {
      winner: "unentschieden",
      note: "Editor und Vorlagen bei beiden.",
    },
    empfaenger: {
      winner: "mailchimp",
      note: "Prädiktive Segmente in Premium.",
    },
    versand: { winner: "brevo", note: "Transaktionsmails inklusive." },
    auswertung: {
      winner: "unentschieden",
      note: "Berichte und API bei beiden.",
    },
  },
  personas: [
    {
      label: "Verein mit 3.000 Kontakten und Quartals-Newsletter",
      pick: "brevo",
      reason: "Abrechnung nach Versand statt Kontakten.",
    },
    {
      label: "Shop mit vielen Integrationen",
      pick: "mailchimp",
      reason: "Über 300 Anbindungen.",
    },
    {
      label: "Start-up mit Transaktionsmails",
      pick: "brevo",
      reason: "Marketing- und Transaktionsmails auf einer Plattform.",
    },
  ],
  migration:
    "Exportiere Kontakte samt Einwilligungsnachweis und Tags. Automationen und Vorlagen musst du im neuen Tool neu aufbauen.",
  faqs: [
    {
      q: "Welches Tool ist kostenlos?",
      a: "Brevo bis 300 E-Mails pro Tag, Mailchimp Free bis 250 Kontakte und 500 E-Mails pro Monat.",
    },
    {
      q: "Wie rechnen Brevo und Mailchimp ab?",
      a: "Brevo nach E-Mails pro Monat (Starter ab 5.000 E-Mails), Mailchimp nach der Zahl der Kontakte.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
