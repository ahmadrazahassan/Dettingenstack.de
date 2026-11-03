"use client";

import { Check, Minus } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Button, ButtonLink } from "@/components/ui/button";
import { RangeWithStepper } from "@/components/ui/controls";
import { EmptyState } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/cn";
import { type Answers, evaluate, type Question } from "@/lib/finder";
import type { Category, Tool } from "@/lib/schema";

// Software-Finder (§11.11). Answers stay in this component — nothing is stored or sent.
export function Finder({
  category,
  tools,
  questions,
  overall,
}: {
  category: Category;
  tools: Tool[];
  questions: Question[];
  overall: Record<string, number>;
}) {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const q = questions[step];
  const done = step >= questions.length;

  if (step === -1) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="type-lead max-w-2xl">
          {questions.length} Fragen, rund zwei Minuten. Am Ende bekommst du die
          drei passendsten {category.name}-Tools – mit Begründung.
        </p>
        <Button size="lg" onClick={() => setStep(0)}>
          Finder starten
        </Button>
        <p className="type-ui-sm text-neutral-600">
          Keine Anmeldung nötig. Deine Antworten speichern wir nicht.
        </p>
      </div>
    );
  }

  if (done) {
    const results = evaluate(tools, category, questions, answers);
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <SiteImage id="C-13" sizes="64px" className="w-16 shrink-0" />
            <h2 className="type-h2">Deine Shortlist</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
            className="link-marker font-medium font-ui text-[15px]"
          >
            Neu starten
          </button>
        </div>
        {results.length === 0 ? (
          <EmptyState
            spot={<SiteImage id="C-11" sizes="160px" />}
            title="Kein Tool passt perfekt"
            text="Mit deinen Anforderungen passt aktuell kein Tool perfekt. Lockere ein Muss-Kriterium oder sieh dir die beste Annäherung an."
          />
        ) : (
          <>
            {results[0]?.relaxed && (
              <p className="rounded-md bg-neutral-50 p-4 type-small text-neutral-800">
                Kein Tool erfüllt alle Kriterien. Das ist die{" "}
                <strong className="text-black">beste Annäherung</strong>.
              </p>
            )}
            <ol className="flex flex-col gap-4">
              {results.map((r, i) => (
                <li
                  key={r.tool.slug}
                  className={cn(
                    "rounded-lg bg-white p-6",
                    i === 0
                      ? "border-2 border-black"
                      : "border border-neutral-200",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <ToolLogo
                      name={r.tool.name}
                      src={r.tool.logo?.src}
                      size={48}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="type-h3">{r.tool.name}</p>
                      <p className="type-ui-sm text-neutral-600">
                        {r.tool.bestFor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="tabular font-bold font-display text-[32px] text-black leading-none">
                        {r.match} %
                      </p>
                      <p className="type-ui-sm text-neutral-600">
                        Übereinstimmung
                      </p>
                    </div>
                    <ScoreBox
                      score={overall[r.tool.slug] ?? 0}
                      size="sm"
                      label={false}
                    />
                  </div>
                  <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {r.reasons.map((reason) => (
                      <li
                        key={reason.text}
                        className="flex items-start gap-2 font-ui text-[14px] text-neutral-800"
                      >
                        {reason.ok ? (
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-positive"
                            strokeWidth={2.25}
                          />
                        ) : (
                          <Minus
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-neutral-400"
                            strokeWidth={2.25}
                          />
                        )}
                        <span>
                          <span className="sr-only">
                            {reason.ok ? "Erfüllt: " : "Nicht erfüllt: "}
                          </span>
                          {reason.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <VendorCTA
                      tool={r.tool}
                      placement="finder"
                      size="sm"
                      note={false}
                    />
                    <ButtonLink
                      href={`/software/${r.tool.slug}` as Route}
                      variant="outline"
                      size="sm"
                    >
                      Zur Bewertung
                    </ButtonLink>
                  </div>
                </li>
              ))}
            </ol>
            {results.length >= 2 && (
              <ButtonLink
                href={
                  `/vergleichen?tools=${results.map((r) => r.tool.slug).join(",")}` as Route
                }
                variant="secondary"
                className="self-start"
              >
                Diese {results.length} vergleichen
              </ButtonLink>
            )}
          </>
        )}
        <p className="type-ui-sm text-neutral-600">
          Übereinstimmung = 60 % Dettingenstack-Score (nach deiner Priorität
          gewichtet) + 25 % gewünschte Funktionen + 15 % Budget.{" "}
          <Link
            href={`/${category.slug}` as Route}
            className="underline underline-offset-2"
          >
            Alle {category.name}-Tools ansehen
          </Link>
        </p>
      </div>
    );
  }

  if (!q) return null;
  const value = answers[q.id];
  const set = (v: Answers[string]) => setAnswers((a) => ({ ...a, [q.id]: v }));
  const canContinue =
    q.type === "multi" || value != null || q.type === "number";

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((x, i) => (
            <span
              key={x.id}
              className={cn(
                "h-1.5 flex-1 rounded-xs",
                i <= step ? "bg-black" : "bg-neutral-200",
              )}
            />
          ))}
        </div>
        <p className="type-ui-sm mt-3 text-neutral-600">
          Frage {step + 1} von {questions.length}
        </p>
      </div>
      <fieldset>
        <legend className="type-h2">{q.title}</legend>
        {q.hint && <p className="type-body mt-2 text-neutral-700">{q.hint}</p>}
        <div className="mt-6">
          {q.type === "number" ? (
            <RangeWithStepper
              label={q.title}
              unitLabel={category.unitLabel.plural}
              value={typeof value === "number" ? value : q.default}
              onValueChange={set}
              min={q.min}
              max={Math.min(q.max, 500)}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {q.options.map((o) => {
                const selected =
                  q.type === "multi"
                    ? Array.isArray(value) && value.includes(o.id)
                    : value === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      if (q.type === "multi") {
                        const list = Array.isArray(value) ? value : [];
                        set(
                          selected
                            ? list.filter((x) => x !== o.id)
                            : [...list, o.id],
                        );
                      } else set(o.id);
                    }}
                    className={cn(
                      "relative flex min-h-16 items-center rounded-lg bg-white px-5 py-4 text-left font-medium font-ui text-[16px] text-black transition-colors",
                      selected
                        ? "border-2 border-black bg-brand-50"
                        : "border border-neutral-300 hover:border-black",
                    )}
                  >
                    {o.label}
                    {selected && (
                      <Check
                        aria-hidden
                        className="absolute top-3 right-3 size-4"
                        strokeWidth={2.5}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </fieldset>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          arrow={false}
          onClick={() => setStep((s) => s - 1)}
        >
          Zurück
        </Button>
        <Button
          disabled={!canContinue}
          onClick={() => {
            if (q.type === "number" && typeof value !== "number")
              set(q.default);
            setStep((s) => s + 1);
          }}
        >
          {step === questions.length - 1 ? "Ergebnis anzeigen" : "Weiter"}
        </Button>
      </div>
    </div>
  );
}
