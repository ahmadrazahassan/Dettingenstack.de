import type { CategoryInput } from "@/lib/schema";

// Newsletter-Software: priced by contacts or e-mail volume, usually per account. We compare the smallest
// published package (unit „pauschal“); the contact or volume tier stands in each plan's limits.
export const newsletterSoftware = {
  slug: "newsletter-software",
  name: "Newsletter-Software",
  nameSingular: "Newsletter-Software",
  nameShort: "Newsletter",
  unitLabel: { singular: "Konto", plural: "Konten" },
  unit: "pauschal",
  referenceTeams: [1],
  maxTeam: 1,
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.2,
    preisLeistung: 0.2,
    datenschutz: 0.2,
    support: 0.05,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "erstellung",
      label: "Erstellung",
      features: [
        {
          id: "editor",
          label: "Drag-and-Drop-Editor",
          description: "Newsletter ohne HTML-Kenntnisse gestalten.",
          importance: "kern",
        },
        {
          id: "vorlagen",
          label: "Vorlagen",
          description: "Fertige Designs für Newsletter und Mailings.",
          importance: "standard",
        },
        {
          id: "landingpages",
          label: "Landingpages & Formulare",
          description: "Anmeldeseiten und Formulare für neue Kontakte.",
          importance: "standard",
        },
      ],
    },
    {
      id: "empfaenger",
      label: "Empfänger & Recht",
      features: [
        {
          id: "doi",
          label: "Double-Opt-in",
          description: "Bestätigte Anmeldung als Nachweis der Einwilligung.",
          importance: "kern",
        },
        {
          id: "segmentierung",
          label: "Segmentierung",
          description: "Empfänger nach Merkmalen und Verhalten filtern.",
          importance: "kern",
        },
      ],
    },
    {
      id: "versand",
      label: "Versand & Automatisierung",
      features: [
        {
          id: "automatisierung",
          label: "Automatisierte Strecken",
          description: "Willkommens- und Folgemails automatisch auslösen.",
          importance: "kern",
        },
        {
          id: "ab-tests",
          label: "A/B-Tests",
          description: "Betreff oder Inhalt in Varianten testen.",
          importance: "standard",
        },
        {
          id: "transaktional",
          label: "Transaktionsmails",
          description: "Bestell- und Systemmails über dieselbe Plattform.",
          importance: "extra",
        },
      ],
    },
    {
      id: "auswertung",
      label: "Auswertung & Technik",
      features: [
        {
          id: "berichte",
          label: "Berichte",
          description: "Öffnungen, Klicks und Abmeldungen auswerten.",
          importance: "kern",
        },
        {
          id: "api",
          label: "API & Integrationen",
          description: "Anbindung an Shop, CRM oder Website.",
          importance: "standard",
        },
      ],
    },
  ],
  seo: {
    title: "Newsletter-Software Vergleich 2026: 8 Tools im Check",
    description:
      "Newsletter-Tools im Vergleich: CleverReach, rapidmail, Brevo, Mailchimp, Inxmail, Klaviyo, GetResponse und ActiveCampaign – Einstiegspreise, Gratis-Tarife, DSGVO.",
    h1: "Newsletter-Software Vergleich 2026: 8 Tools im Check",
  },
  intro:
    "Newsletter-Software gestaltet, versendet und wertet E-Mail-Kampagnen aus – und muss in Deutschland vor allem rechtssicher sein: Double-Opt-in, Auftragsverarbeitung, Serverstandort. Die Preise hängen von der Zahl der Kontakte oder E-Mails ab. Wir vergleichen deshalb die kleinste veröffentlichte Stufe jedes Anbieters und nennen, für wie viele Kontakte sie gilt.",
  testTasks: [
    "Anmeldeformular mit Double-Opt-in einrichten",
    "Newsletter im Editor aus einer Vorlage gestalten",
    "Empfänger nach Interessen segmentieren",
    "Willkommensstrecke mit drei E-Mails automatisieren",
    "Betreffzeilen per A/B-Test vergleichen",
    "Öffnungs- und Klickraten auswerten",
  ],
  guideMdx: "newsletter-software",
  faqs: [
    {
      q: "Was kostet Newsletter-Software?",
      a: "Die Preise hängen von der Zahl der Kontakte oder der versendeten E-Mails ab. Kleine Listen sind bei vielen Anbietern kostenlos; bezahlte Einstiegspakete beginnen in unserem Vergleich bei 7 € pro Monat (Brevo Starter) und 15 € (CleverReach Basic und rapidmail für bis zu 500 Kontakte).",
    },
    {
      q: "Brauche ich Double-Opt-in?",
      a: "Für Werbe-Newsletter brauchst du eine nachweisbare Einwilligung. Das Double-Opt-in-Verfahren gilt in Deutschland als Standard, um diesen Nachweis zu führen. Prüfe, ob das Tool die Bestätigung protokolliert.",
    },
    {
      q: "Darf ich einen US-Anbieter nutzen?",
      a: "Ja, mit Auftragsverarbeitungsvertrag und einer Grundlage für die Übermittlung, etwa dem EU-US Data Privacy Framework. Deutsche Anbieter wie CleverReach, rapidmail oder Inxmail vereinfachen die Prüfung.",
    },
  ],
  related: ["crm-software", "shopsysteme"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
