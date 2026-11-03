import type { Effect, Question } from "@/lib/finder";

// Questions every category asks the same way (§12.3: server location and the most important criterion).

export const serverQuestion: Question = {
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
};

export const priorityQuestion: Question = {
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
};

/** Multi-select „Welche Funktionen brauchst du?“: each option prefers one or more feature ids. */
export function featureQuestion(
  title: string,
  options: { id: string; label: string; features: string[]; weight?: number }[],
): Question {
  return {
    id: "funktionen",
    type: "multi",
    title,
    hint: "Mehrfachauswahl möglich.",
    options: options.map((o) => ({
      id: o.id,
      label: o.label,
      effects: o.features.map(
        (featureId): Effect => ({
          kind: "prefer-feature",
          featureId,
          weight: o.weight ?? 2,
        }),
      ),
    })),
  };
}

/** Budget question; `perUnit` = per user/employee and month, otherwise for the whole account per month. */
export function budgetQuestion(
  title: string,
  steps: { id: string; label: string; maxCents: number }[],
  perUnit: boolean,
): Question {
  return {
    id: "budget",
    type: "single",
    title,
    options: [
      ...steps.map((s) => ({
        id: s.id,
        label: s.label,
        effects: [
          {
            kind: perUnit ? "budget-per-unit" : "budget-total",
            maxCents: s.maxCents,
          } as Effect,
        ],
      })),
      {
        id: "offen",
        label: "Noch kein Budget festgelegt",
        effects: [
          {
            kind: perUnit ? "budget-per-unit" : "budget-total",
            maxCents: null,
          } as Effect,
        ],
      },
    ],
  };
}
