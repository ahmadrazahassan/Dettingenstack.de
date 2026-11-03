import {
  Check,
  ClipboardCheck,
  type LucideIcon,
  MessageSquareText,
  Scale,
  Square,
  TriangleAlert,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { ScoreBox } from "@/components/tool/score";
import { cn } from "@/lib/cn";

/* ───── „Das Wichtigste in Kürze“ ───── */

export function KeyTakeaways({
  items,
  title = "Das Wichtigste in Kürze",
}: {
  items: ReactNode[];
  title?: string;
}) {
  return (
    <aside className="rounded-md border-black border-l-4 bg-brand-50 p-6 lg:p-7">
      <p className="type-h4">{title}</p>
      <ul className="type-body mt-4 flex flex-col gap-2.5 text-neutral-800">
        {items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static editorial list.
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-black" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ───── „Unser Fazit“ ───── */

export function VerdictBox({
  summary,
  idealFor,
  notIdealFor,
  score,
  cta,
}: {
  summary: ReactNode;
  idealFor: string[];
  notIdealFor: string[];
  score?: number;
  cta?: ReactNode;
}) {
  return (
    <section
      aria-label="Unser Fazit"
      className="rounded-lg border border-black p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex h-7 items-center rounded-sm bg-black px-2.5 font-semibold font-ui text-[13px] text-brand">
            Unser Fazit
          </span>
          <div className="type-lead mt-4 text-neutral-800">{summary}</div>
        </div>
        {(score != null || cta) && (
          <div className="flex shrink-0 flex-row items-center gap-5 lg:flex-col lg:items-end">
            {score != null && (
              <ScoreBox score={score} size="md" label="beside" />
            )}
            {cta}
          </div>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 border-neutral-200 border-t pt-6 md:grid-cols-2">
        <VerdictList title="Ideal für" items={idealFor} positive />
        <VerdictList title="Weniger geeignet für" items={notIdealFor} />
      </div>
    </section>
  );
}

function VerdictList({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  const Icon = positive ? Check : X;
  return (
    <div>
      <p className="mb-3 font-semibold font-ui text-[15px] text-black">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="type-small flex gap-2.5 text-neutral-800">
            <Icon
              aria-hidden
              className={cn(
                "mt-1 size-4 shrink-0",
                positive ? "text-positive" : "text-negative",
              )}
              strokeWidth={2.25}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───── Vorteile / Nachteile ───── */

type ProCon = { title: string; detail: string };

export function ProsCons({ pros, cons }: { pros: ProCon[]; cons: ProCon[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <ProConList
        title="Vorteile"
        items={pros}
        icon={Check}
        tone="text-positive"
      />
      <ProConList
        title="Nachteile"
        items={cons}
        icon={X}
        tone="text-negative"
      />
    </div>
  );
}

function ProConList({
  title,
  items,
  icon: Icon,
  tone,
}: {
  title: string;
  items: ProCon[];
  icon: LucideIcon;
  tone: string;
}) {
  return (
    <div>
      <h3 className="type-h4 flex items-center gap-2">
        <Icon aria-hidden className={cn("size-5", tone)} strokeWidth={2.25} />
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <Icon
              aria-hidden
              className={cn("mt-1 size-4 shrink-0", tone)}
              strokeWidth={2.25}
            />
            <p className="type-small text-neutral-800">
              <strong className="font-semibold text-black">
                {item.title}.
              </strong>{" "}
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───── Callouts ───── */

const callouts = {
  tipp: { icon: MessageSquareText, title: "Tipp" },
  wichtig: { icon: TriangleAlert, title: "Wichtig" },
  recht: { icon: Scale, title: "Rechtlicher Hinweis" },
  test: { icon: ClipboardCheck, title: "Aus unserem Test" },
} as const;

export function Callout({
  type,
  title,
  children,
}: {
  type: keyof typeof callouts;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, title: defaultTitle } = callouts[type];
  return (
    <aside className="flex gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-5">
      <Icon
        aria-hidden
        className="mt-0.5 size-5 shrink-0 text-black"
        strokeWidth={1.5}
      />
      <div>
        <p className="font-semibold font-ui text-[15px] text-black">
          {title ?? defaultTitle}
        </p>
        <div className="type-small mt-1 text-neutral-800">{children}</div>
      </div>
    </aside>
  );
}

/* ───── Checklist (visual square boxes) ───── */

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="type-body flex gap-3 text-neutral-800">
          <Square
            aria-hidden
            className="mt-1 size-5 shrink-0 text-black"
            strokeWidth={1.5}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ───── Numbered steps „01 …“ ───── */

export function Steps({
  steps,
}: {
  steps: { title: string; text: string; visual?: ReactNode }[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-3">
          {step.visual}
          <span className="font-bold font-display text-[32px] text-neutral-300 leading-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="type-h4">{step.title}</h3>
          <p className="type-small text-neutral-700">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ───── Simple table for MDX (no GFM tables in our MDX setup) ───── */

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="mb-6 overflow-x-auto rounded-md border border-neutral-200">
      <table className="w-full min-w-[520px] border-collapse font-ui text-[15px] text-neutral-800">
        {caption && (
          <caption className="type-ui-sm px-4 pt-3 text-left text-neutral-600">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="bg-neutral-50 px-4 py-3 text-left font-semibold text-black"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static editorial table.
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  // biome-ignore lint/suspicious/noArrayIndexKey: static editorial table.
                  key={j}
                  className="border-neutral-200 border-t px-4 py-3 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
