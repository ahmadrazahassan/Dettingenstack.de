import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-02", updatedAt: "2026-11-02" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const personioVsHrWorks = {
  slug: "personio-vs-hr-works",
  toolA: "personio",
  toolB: "hr-works",
  category: "hr-software",
  isPlaceholder: false,
  seo: {
    title: "Personio vs. HR WORKS (2026): Der große Vergleich",
    description:
      "Personio oder HR WORKS? Funktionen, Preismodelle, DATEV, Reisekosten und Datenschutz im direkten Vergleich – mit klarer Empfehlung je Situation.",
    h1: "Personio vs. HR WORKS: Welche HR-Software passt besser zu dir?",
  },
  verdict: {
    winner: "hr-works",
    summary:
      "HR WORKS bringt Reisekosten, Payroll und Bewerbermanagement mit und verzichtet auf eine Mindestlaufzeit, rechnet aber mindestens 20 Nutzer ab. Personio startet mit einem schlanken Kern und ergänzt Recruiting, Performance und DATEV über kostenpflichtige Apps.",
    chooseAIf: [
      "du mit den Kernfunktionen starten und Module später ergänzen willst",
      "dein Team kleiner als 20 Personen ist",
      "Performance-Gespräche ein eigenes Modul bekommen sollen",
    ],
    chooseBIf: [
      "deine Teams viel reisen und Spesen abrechnen",
      "Lohnabrechnung und DATEV aus einer Hand kommen sollen",
      "du dich nicht an eine Mindestlaufzeit binden willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "hr-works",
      note: "HR WORKS belegt Reisekosten, Payroll und Bewerbermanagement im eigenen Produkt; bei Personio sind Recruiting, Performance und Payroll zubuchbare Apps.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "hr-works",
      note: "Beide nennen Preise nur im Angebot. HR WORKS verzichtet auf eine Mindestlaufzeit, rechnet aber mindestens 20 Nutzer ab.",
    },
    datenschutz: {
      winner: "hr-works",
      note: "HR WORKS zeigt ein ISO-27001-Siegel auf der eigenen Website. Für Personio liegen Hosting und Zertifikat nur aus Drittquellen vor.",
    },
    support: untested,
    integrationen: {
      winner: "hr-works",
      note: "Beide binden DATEV an; HR WORKS zusätzlich ADDISON und eine Produkt-API.",
    },
  },
  featureGroupVerdicts: {
    verwaltung: {
      winner: "unentschieden",
      note: "Beide bieten digitale Personalakte und Self-Service; Details zu Rollen und Rechten fehlen bei beiden.",
    },
    zeit: {
      winner: "unentschieden",
      note: "Abwesenheiten und Zeiterfassung haben beide; Schichtplanung ist bei keinem belegt.",
    },
    recruiting: {
      winner: "hr-works",
      note: "Bei HR WORKS Teil der Personalverwaltung inklusive Stellenportal, bei Personio eine eigene App.",
    },
    entwicklung: {
      winner: "unentschieden",
      note: "Personio bietet Performance als App, HR WORKS ein Modul Personalentwicklung ohne nähere Angaben.",
    },
    lohn: {
      winner: "hr-works",
      note: "HR WORKS kombiniert Payroll, DATEV, ADDISON und Reisekosten; bei Personio sind Payroll und DATEV Apps.",
    },
    technik: {
      winner: "hr-works",
      note: "HR WORKS nennt eine Produkt-API; für Personio haben wir keine belegten Angaben.",
    },
  },
  personas: [
    {
      label: "Vertriebsteam mit vielen Dienstreisen",
      pick: "hr-works",
      reason: "Reisekostenabrechnung mit Belegfoto ist direkt dabei.",
    },
    {
      label: "Start-up mit 12 Mitarbeitenden",
      pick: "personio",
      reason: "HR WORKS rechnet mindestens 20 Nutzer ab.",
    },
    {
      label: "Mittelständler, der flexibel kündbar bleiben will",
      pick: "hr-works",
      reason: "Laut Preisseite ohne Mindestlaufzeit.",
    },
    {
      label: "Wachsendes KMU, das erst den Kern einführt",
      pick: "personio",
      reason: "Kernpaket zuerst, Recruiting und Performance später als Apps.",
    },
  ],
  migration:
    "Beide Anbieter arbeiten mit Personalstammdaten, Abwesenheiten und Zeitkonten. Exportiere vor dem Wechsel Stammdaten, Resturlaubsstände und Zeitkonten zum Stichtag, kläre mit dem Steuerbüro den Übergabemonat für DATEV und plane einen Parallelbetrieb von mindestens einem Abrechnungsmonat ein.",
  faqs: [
    {
      q: "Was kostet Personio im Vergleich zu HR WORKS?",
      a: "Beide Anbieter veröffentlichen keine Listenpreise. HR WORKS rechnet pro Nutzer ab, mindestens 20 Nutzer, ohne Mindestlaufzeit. Personio bepreist Kern und Apps im Angebot. Hol dir zwei Angebote für dieselbe Teamgröße und dieselben Module.",
    },
    {
      q: "Welches Tool hat die bessere DATEV-Anbindung?",
      a: "Beide binden DATEV an. HR WORKS ist DATEV-Partner und hat eine eigene Payroll-Lösung; Personio unterstützt laut Drittquellen DATEV LODAS und Lohn und Gehalt über eine kostenpflichtige App.",
    },
    {
      q: "Welche Software eignet sich für kleine Teams?",
      a: "Für Teams unter 20 Personen ist Personio die naheliegendere Wahl, weil HR WORKS mindestens 20 Nutzer abrechnet.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const personioVsKenjo = {
  slug: "personio-vs-kenjo",
  toolA: "personio",
  toolB: "kenjo",
  category: "hr-software",
  isPlaceholder: false,
  seo: {
    title: "Personio vs. Kenjo (2026): Der große Vergleich",
    description:
      "Personio oder Kenjo? Preise in Euro, Schichtplanung, DATEV, Serverstandort und Funktionen im direkten Vergleich.",
    h1: "Personio vs. Kenjo: Welche HR-Software passt besser zu dir?",
  },
  verdict: {
    winner: "kenjo",
    summary:
      "Kenjo legt Preise offen, hostet ausschließlich in Frankfurt und bringt Schichtplanung schon im Einstieg mit. Personio punktet mit einem bekannten HR-Kern und einer DATEV-App für LODAS und Lohn und Gehalt – Preise gibt es aber nur im Angebot.",
    chooseAIf: [
      "dein Steuerbüro DATEV LODAS nutzt",
      "du einen etablierten Anbieter mit großem Marktplatz suchst",
      "Performance-Management als eigenes Modul dazukommen soll",
    ],
    chooseBIf: [
      "du die Kosten vorab genau kennen willst",
      "Schichtplanung und Zeiterfassung wichtig sind",
      "der Serverstandort Deutschland Pflicht ist",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "kenjo",
      note: "Kenjo belegt Schichtplanung und 360°-Feedback schon im Einstiegstarif; bei Personio kommen Performance und Recruiting als Apps hinzu.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "kenjo",
      note: "Kenjo veröffentlicht Euro-Preise (ab 5,40 € bei jährlicher Zahlung); Personio nennt Preise nur im Angebot.",
    },
    datenschutz: {
      winner: "kenjo",
      note: "Kenjo bestätigt Frankfurt als einzigen Serverstandort und einen AVV im Vertrag. Für Personio liegen diese Angaben nur aus Drittquellen vor.",
    },
    support: untested,
    integrationen: {
      winner: "personio",
      note: "Personio unterstützt laut Drittquellen DATEV LODAS und Lohn und Gehalt; Kenjo bietet DATEV erst ab Growth mit 600 € Einrichtung.",
    },
  },
  featureGroupVerdicts: {
    verwaltung: {
      winner: "kenjo",
      note: "Kenjo bietet E-Signatur und eigene Rollen ab Growth; Personio im Kern nur eingeschränkte E-Signaturen.",
    },
    zeit: {
      winner: "kenjo",
      note: "Schichtplanung ist bei Kenjo ab Starter enthalten, bei Personio nicht belegt.",
    },
    recruiting: {
      winner: "unentschieden",
      note: "Bei beiden ein kostenpflichtiges Zusatzmodul.",
    },
    entwicklung: {
      winner: "kenjo",
      note: "360°-Beurteilungen sind bei Kenjo im Starter-Tarif; bei Personio eine App.",
    },
    lohn: {
      winner: "unentschieden",
      note: "Beide bereiten Lohndaten vor; DATEV ist bei beiden kostenpflichtig (Kenjo ab Growth, Personio als App).",
    },
    technik: {
      winner: "kenjo",
      note: "SSO und API (Connect) sind bei Kenjo belegt, bei Personio fehlen geprüfte Angaben.",
    },
  },
  personas: [
    {
      label: "Gastronomie- oder Handelskette mit Schichtbetrieb",
      pick: "kenjo",
      reason: "Schichtplanung und Zeiterfassung ab dem Einstiegstarif.",
    },
    {
      label: "Mittelständler, dessen Steuerbüro DATEV LODAS nutzt",
      pick: "personio",
      reason: "DATEV-App für LODAS und Lohn und Gehalt.",
    },
    {
      label: "Geschäftsführung, die erst kalkulieren will",
      pick: "kenjo",
      reason: "Preise und Preisrechner stehen auf der Website.",
    },
  ],
  migration:
    "Exportiere Personalstammdaten, Dokumente und Resturlaubsstände zum Monatsende. Kenjo verlangt für das Onboarding eine Gebühr ab 400 €, die DATEV-Einrichtung kostet einmalig 600 €. Plane die DATEV-Umstellung mit dem Steuerbüro zum Monatswechsel.",
  faqs: [
    {
      q: "Ist Kenjo günstiger als Personio?",
      a: "Kenjo kostet laut Preisseite 6,00 € pro Mitarbeitendem und Monat im Tarif Starter, bei jährlicher Zahlung 5,40 €. Personio nennt keine Listenpreise – ein direkter Preisvergleich ist nur mit einem Angebot möglich.",
    },
    {
      q: "Wo speichern Personio und Kenjo die Daten?",
      a: "Kenjo nennt ausschließlich Frankfurt am Main (AWS). Für Personio nennen Drittquellen ebenfalls AWS in Frankfurt; bestätige das im Trust Center und im AVV.",
    },
    {
      q: "Welches Tool hat Schichtplanung?",
      a: "Kenjo bietet Schichtplanung ab dem Starter-Tarif. Für Personio haben wir keine belegte Schichtplanung gefunden.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const kenjoVsLeapsome = {
  slug: "kenjo-vs-leapsome",
  toolA: "kenjo",
  toolB: "leapsome",
  category: "hr-software",
  isPlaceholder: false,
  seo: {
    title: "Kenjo vs. Leapsome (2026): Der große Vergleich",
    description:
      "Kenjo oder Leapsome? HR-Verwaltung gegen Performance-Plattform: Preise pro Mitarbeitendem, Module, DATEV und Datenschutz im Vergleich.",
    h1: "Kenjo vs. Leapsome: Welche HR-Software passt besser zu dir?",
  },
  verdict: {
    winner: "kenjo",
    summary:
      "Kenjo ist die vollständigere HR-Verwaltung mit Schichtplanung, DATEV und Servern in Frankfurt. Leapsome ist stärker, wenn Ziele, Feedback, Befragungen und Lernen im Mittelpunkt stehen – jedes dieser Module kostet aber extra.",
    chooseAIf: [
      "du Abwesenheiten, Zeiten und Lohndaten verwalten musst",
      "dein Steuerbüro mit DATEV arbeitet",
      "Serverstandort Deutschland Pflicht ist",
    ],
    chooseBIf: [
      "OKRs, Feedback-Zyklen und Befragungen dein Hauptthema sind",
      "du Module einzeln und ohne Einrichtungsgebühr buchen willst",
      "ISO 27001 und SOC 2 als Nachweise wichtig sind",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "kenjo",
      note: "Kenjo deckt die klassische Personalverwaltung deutlich breiter ab; Leapsome ist auf Talent-Themen spezialisiert.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "kenjo",
      note: "Kenjo Starter kostet 5,40–6,00 € inklusive Zeit und Schichten; Leapsome HRIS Pro 10,00 € plus Module.",
    },
    datenschutz: {
      winner: "kenjo",
      note: "Kenjo hostet ausschließlich in Frankfurt; Leapsome hat ISO 27001 und SOC 2, nennt aber keinen Serverstandort.",
    },
    support: untested,
    integrationen: {
      winner: "kenjo",
      note: "Kenjo bietet DATEV ab Growth; für Leapsome haben wir keine belegte Lohn-Schnittstelle gefunden.",
    },
  },
  featureGroupVerdicts: {
    verwaltung: {
      winner: "kenjo",
      note: "Dokumente, E-Signatur und Rollen sind bei Kenjo belegt, bei Leapsome nur die HRIS-Grundfunktionen.",
    },
    zeit: {
      winner: "kenjo",
      note: "Abwesenheiten, Zeiterfassung und Schichtplanung ab Starter; bei Leapsome Zeiterfassung als Modul für 3 €.",
    },
    recruiting: {
      winner: "unentschieden",
      note: "Bei beiden ein Zusatzmodul (Kenjo pauschal ab 249 €, Leapsome 5 € pro Mitarbeitendem).",
    },
    entwicklung: {
      winner: "leapsome",
      note: "Leapsome bietet Performance, OKRs, Befragungen und Lernen als eigene Module.",
    },
    lohn: {
      winner: "kenjo",
      note: "Beide bereiten Lohndaten vor; nur Kenjo hat eine belegte DATEV-Integration.",
    },
    technik: {
      winner: "kenjo",
      note: "SSO und API sind bei Kenjo belegt, bei Leapsome nicht geprüft.",
    },
  },
  personas: [
    {
      label: "Produktionsbetrieb mit Schichten und DATEV-Steuerbüro",
      pick: "kenjo",
      reason: "Schichtplanung und DATEV-Integration in einem Tool.",
    },
    {
      label: "Tech-Unternehmen mit OKR-Zyklen",
      pick: "leapsome",
      reason: "Ziele, Feedback und Befragungen sind der Kern von Leapsome.",
    },
    {
      label: "KMU mit knappem Budget pro Kopf",
      pick: "kenjo",
      reason:
        "Der Starter-Tarif liegt unter dem Grundpreis von Leapsome HRIS Pro.",
    },
  ],
  migration:
    "Viele Unternehmen kombinieren beide: Kenjo für Verwaltung und Zeiten, Leapsome für Performance und OKRs. Wenn du komplett wechselst, exportiere Stammdaten und Feedback-Historie; Ziele und Bewertungen lassen sich meist nur als CSV oder PDF übernehmen.",
  faqs: [
    {
      q: "Was kostet Leapsome im Vergleich zu Kenjo?",
      a: "Leapsome HRIS Pro kostet laut Preisseite 10,00 € pro Mitarbeitendem und Monat, jedes Talent-Modul 3–7 € zusätzlich. Kenjo Starter kostet 6,00 € (5,40 € bei jährlicher Zahlung).",
    },
    {
      q: "Kann ich Kenjo und Leapsome kombinieren?",
      a: "Ja, die Tools ergänzen sich. Prüfe vorher, ob ein Datenabgleich der Mitarbeitenden per Integration möglich ist.",
    },
    {
      q: "Welches Tool ist DSGVO-freundlicher?",
      a: "Kenjo nennt ausschließlich Frankfurt als Serverstandort und einen AVV im Vertrag. Leapsome weist ISO 27001 und SOC 2 nach, nennt aber keinen Serverstandort – frag danach.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
