import type { Question } from "@/lib/finder";

// Six questions (§12.3). Labels in German, effects drive lib/finder.ts.
export const hrQuiz: Question[] = [
  {
    id: "anzahl",
    type: "number",
    title: "Wie viele Mitarbeitende hat dein Unternehmen?",
    hint: "Grobe Schätzung reicht – sie bestimmt Tarif und Kosten.",
    min: 1,
    max: 2000,
    default: 25,
  },
  {
    id: "bereiche",
    type: "multi",
    title: "Welche Bereiche soll die Software abdecken?",
    hint: "Mehrfachauswahl möglich.",
    options: [
      {
        id: "personalakte",
        label: "Personalakte",
        effects: [
          { kind: "prefer-feature", featureId: "personalakte", weight: 2 },
        ],
      },
      {
        id: "abwesenheiten",
        label: "Urlaub & Abwesenheiten",
        effects: [
          { kind: "prefer-feature", featureId: "abwesenheiten", weight: 2 },
        ],
      },
      {
        id: "zeiterfassung",
        label: "Zeiterfassung",
        effects: [
          { kind: "prefer-feature", featureId: "zeiterfassung", weight: 2 },
        ],
      },
      {
        id: "schichten",
        label: "Schichtplanung",
        effects: [
          { kind: "prefer-feature", featureId: "schichtplanung", weight: 2 },
        ],
      },
      {
        id: "recruiting",
        label: "Recruiting",
        effects: [
          {
            kind: "prefer-feature",
            featureId: "bewerbermanagement",
            weight: 1,
          },
        ],
      },
      {
        id: "onboarding",
        label: "Onboarding",
        effects: [
          { kind: "prefer-feature", featureId: "onboarding", weight: 1 },
        ],
      },
      {
        id: "feedback",
        label: "Feedback & Ziele",
        effects: [
          { kind: "prefer-feature", featureId: "feedback", weight: 1 },
          { kind: "prefer-feature", featureId: "ziele", weight: 1 },
        ],
      },
    ],
  },
  {
    id: "lohn",
    type: "single",
    title: "Wer macht eure Lohnabrechnung?",
    options: [
      {
        id: "datev",
        label: "Unser Steuerbüro mit DATEV",
        effects: [{ kind: "require-feature", featureId: "datev-lohn" }],
      },
      {
        id: "selbst",
        label: "Wir rechnen selbst ab",
        effects: [
          { kind: "prefer-feature", featureId: "lohnabrechnung", weight: 2 },
        ],
      },
      { id: "offen", label: "Noch offen", effects: [] },
    ],
  },
  {
    id: "budget",
    type: "single",
    title: "Wie hoch ist dein Budget pro Mitarbeitendem und Monat?",
    options: [
      {
        id: "5",
        label: "Bis 5 €",
        effects: [{ kind: "budget-per-unit", maxCents: 500 }],
      },
      {
        id: "10",
        label: "5 bis 10 €",
        effects: [{ kind: "budget-per-unit", maxCents: 1000 }],
      },
      {
        id: "mehr",
        label: "Über 10 €",
        effects: [{ kind: "budget-per-unit", maxCents: 2000 }],
      },
      {
        id: "offen",
        label: "Noch kein Budget festgelegt",
        effects: [{ kind: "budget-per-unit", maxCents: null }],
      },
    ],
  },
  {
    id: "server",
    type: "single",
    title: "Wo müssen eure Daten gespeichert werden?",
    options: [
      {
        id: "de",
        label: "In Deutschland",
        effects: [{ kind: "server", value: "DE", hard: true }],
      },
      {
        id: "eu",
        label: "In der EU reicht",
        effects: [{ kind: "server", value: "EU", hard: false }],
      },
      { id: "egal", label: "Egal", effects: [] },
    ],
  },
  {
    id: "prioritaet",
    type: "single",
    title: "Was ist dir am wichtigsten?",
    options: [
      {
        id: "bedienung",
        label: "Einfache Bedienung",
        effects: [
          { kind: "boost-criterion", criterion: "bedienbarkeit", factor: 2 },
        ],
      },
      {
        id: "funktionen",
        label: "Großer Funktionsumfang",
        effects: [
          { kind: "boost-criterion", criterion: "funktionen", factor: 2 },
        ],
      },
      {
        id: "preis",
        label: "Günstiger Preis",
        effects: [
          { kind: "boost-criterion", criterion: "preisLeistung", factor: 2 },
        ],
      },
      {
        id: "datenschutz",
        label: "Datenschutz",
        effects: [
          { kind: "boost-criterion", criterion: "datenschutz", factor: 2 },
        ],
      },
    ],
  },
];
