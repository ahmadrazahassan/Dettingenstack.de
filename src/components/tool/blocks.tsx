import { Award, Check, ClipboardCheck, Minus, Plus, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { integrations as integrationNames } from "@/data/integrations";
import { cn } from "@/lib/cn";
import { awardLabel } from "@/lib/derive";
import { formatDate } from "@/lib/format";
import {
  certLabels,
  channelLabels,
  minTermLabel,
  onboardingLabels,
  priceLine,
  serverLabels,
  sizeLabels,
  trialLabel,
  triLabels,
} from "@/lib/labels";
import type { Category, FeatureState, Tool } from "@/lib/schema";
import type { AwardId } from "@/lib/scoring";

/* ───── Method notice for reviews based on vendor information (no hands-on test yet) ───── */

export function AnalysisNotice({
  checkedAt,
  className,
}: {
  checkedAt: string;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-md border border-brand-700 bg-brand-50 p-4",
        className,
      )}
    >
      <ClipboardCheck
        aria-hidden
        className="mt-0.5 size-5 shrink-0 text-black"
        strokeWidth={1.5}
      />
      <p className="type-small text-neutral-800">
        <strong className="font-semibold text-black">
          Analyse auf Basis von Herstellerangaben.
        </strong>{" "}
        Preise, Funktionen und Datenschutzangaben haben wir an der Quelle
        geprüft (Stand {formatDate(checkedAt)}). Einen Praxistest gibt es noch
        nicht: Bedienbarkeit und Support fließen bis dahin neutral in den Score
        ein.{" "}
        <Link href={"/methodik" as Route} className="link-marker">
          So bewerten wir
        </Link>
      </p>
    </aside>
  );
}

export function AwardBadges({
  ids,
  category,
}: {
  ids: AwardId[];
  category: Category;
}) {
  if (!ids.length) return null;
  return (
    <>
      {ids.map((id) => (
        <Badge key={id} variant="award" icon={Award}>
          {awardLabel(id, category)}
        </Badge>
      ))}
    </>
  );
}

/* ───── Key facts (Startpreis, Preismodell, Testversion …) ───── */

export function keyFacts(tool: Tool, category: Category) {
  return [
    {
      label: "Startpreis",
      value: priceLine(tool, category.unit, category.slug),
    },
    { label: "Testversion", value: trialLabel(tool) },
    { label: "Kostenlose Version", value: triLabels[tool.freePlan] },
    { label: "Mindestlaufzeit", value: minTermLabel(tool) },
    {
      label: "Serverstandort",
      value: serverLabels[tool.compliance.serverLocation],
    },
    {
      label: "Support auf Deutsch",
      value: tool.support.languages.includes("de") ? "Ja" : "Nicht angegeben",
    },
  ];
}

export function KeyFacts({
  tool,
  category,
  className,
}: {
  tool: Tool;
  category: Category;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {keyFacts(tool, category).map((f) => (
        <div key={f.label} className="flex flex-col">
          <dt className="type-ui-sm text-neutral-600">{f.label}</dt>
          <dd className="font-medium font-ui text-[15px] text-black">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ───── Facts table („{Tool} im Überblick“) ───── */

export function FactsTable({
  tool,
  category,
}: {
  tool: Tool;
  category: Category;
}) {
  const rows: [string, string][] = [
    ["Anbieter", `${tool.vendor.name}, ${tool.vendor.hq}`],
    ...(tool.vendor.founded
      ? [["Gegründet", String(tool.vendor.founded)] as [string, string]]
      : []),
    ["Zielgruppe", tool.bestFor],
    [
      "Unternehmensgröße",
      tool.companySizes.map((s) => sizeLabels[s]).join(", "),
    ],
    ["Preis", priceLine(tool, category.unit, category.slug)],
    ["Testversion", trialLabel(tool)],
    ["Mindestlaufzeit", minTermLabel(tool)],
    ["Serverstandort", serverLabels[tool.compliance.serverLocation]],
    [
      "Support",
      [
        tool.support.languages.includes("de") ? "Deutsch" : null,
        ...tool.support.channels.map((c) => channelLabels[c]),
      ]
        .filter(Boolean)
        .join(", ") || "Nicht angegeben",
    ],
    ["Einführung", onboardingLabels[tool.support.onboarding]],
  ];
  return (
    <dl className="divide-y divide-neutral-200 border-neutral-200 border-y">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6"
        >
          <dt className="font-ui text-[14px] text-neutral-600">{k}</dt>
          <dd className="font-ui text-[15px] text-black">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ───── Datenschutz & Sicherheit ───── */

export function ComplianceTable({ tool }: { tool: Tool }) {
  const c = tool.compliance;
  const rows: [string, string][] = [
    [
      "Serverstandort",
      c.serverNote
        ? `${serverLabels[c.serverLocation]} – ${c.serverNote}`
        : serverLabels[c.serverLocation],
    ],
    ["Auftragsverarbeitungsvertrag (AVV)", triLabels[c.avv]],
    [
      "Zertifizierungen",
      c.certifications.length
        ? c.certifications.map((x) => certLabels[x]).join(", ")
        : "Keine angegeben",
    ],
    ["Single Sign-On", triLabels[c.sso]],
    ["Zwei-Faktor-Authentifizierung", triLabels[c.twoFactor]],
    ["On-Premise möglich", triLabels[c.onPremise]],
  ];
  return (
    <div>
      <dl className="divide-y divide-neutral-200 border-neutral-200 border-y">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6"
          >
            <dt className="font-ui text-[14px] text-neutral-600">{k}</dt>
            <dd className="font-ui text-[15px] text-black">{v}</dd>
          </div>
        ))}
      </dl>
      {c.certificationNote && (
        <p className="type-ui-sm mt-3 text-neutral-700">
          {c.certificationNote}
        </p>
      )}
      <p className="type-ui-sm mt-2 text-neutral-600">
        Quelle:{" "}
        <a
          href={c.source.url}
          rel="noopener"
          className="underline underline-offset-2"
        >
          {c.source.name}
        </a>
        , abgerufen am {formatDate(c.source.accessedAt)}
      </p>
    </div>
  );
}

/* ───── Feature status icon incl. „unbekannt“ (never shown as „nein“) ───── */

const stateText: Record<FeatureState, string> = {
  ja: "ja",
  teilweise: "teilweise",
  addon: "als Add-on",
  nein: "nein",
  unbekannt: "nicht angegeben",
};

export function FeatureMark({
  state,
  showLabel = false,
}: {
  state: FeatureState;
  showLabel?: boolean;
}) {
  const icon = {
    ja: <Check aria-hidden className="size-5 text-black" strokeWidth={2} />,
    teilweise: (
      <Minus aria-hidden className="size-5 text-black" strokeWidth={2} />
    ),
    addon: <Plus aria-hidden className="size-4 text-black" strokeWidth={2} />,
    nein: <X aria-hidden className="size-5 text-neutral-400" strokeWidth={2} />,
    unbekannt: (
      <span aria-hidden className="font-ui text-[15px] text-neutral-400">
        –
      </span>
    ),
  }[state];
  const visible = showLabel || state === "teilweise" || state === "addon";
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span
        className={cn("type-ui-sm text-neutral-700", !visible && "sr-only")}
      >
        {stateText[state]}
      </span>
    </span>
  );
}

export function FeatureList({
  tool,
  category,
}: {
  tool: Tool;
  category: Category;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
      {category.featureGroups.map((group) => (
        <div key={group.id}>
          <h3 className="type-h4">{group.label}</h3>
          <ul className="mt-3 flex flex-col">
            {group.features.map((f) => {
              const s = tool.features[f.id] ?? { status: "unbekannt" as const };
              const plan = s.fromPlan
                ? tool.pricing.plans.find((p) => p.id === s.fromPlan)?.name
                : null;
              return (
                <li
                  key={f.id}
                  className="flex items-start justify-between gap-4 border-neutral-200 border-b py-2.5"
                >
                  <span>
                    <span className="block font-ui text-[15px] text-black">
                      {f.label}
                    </span>
                    {(s.note || plan) && (
                      <span className="type-ui-sm block text-neutral-600">
                        {[plan && `ab Tarif ${plan}`, s.note]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}
                  </span>
                  <FeatureMark state={s.status} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function FeatureLegend() {
  return (
    <p className="type-ui-sm flex flex-wrap gap-x-5 gap-y-1 text-neutral-600">
      <span className="inline-flex items-center gap-1.5">
        <Check aria-hidden className="size-4" strokeWidth={2} /> enthalten
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Minus aria-hidden className="size-4" strokeWidth={2} /> teilweise
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Plus aria-hidden className="size-4" strokeWidth={2} /> gegen Aufpreis
      </span>
      <span className="inline-flex items-center gap-1.5">
        <X aria-hidden className="size-4" strokeWidth={2} /> nicht enthalten
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden>–</span> vom Anbieter nicht angegeben
      </span>
    </p>
  );
}

export function IntegrationChips({ ids }: { ids: string[] }) {
  if (!ids.length)
    return (
      <p className="type-small text-neutral-600">
        Noch keine geprüften Integrationen erfasst.
      </p>
    );
  return (
    <ul className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <li key={id}>
          <Badge variant="trust">{integrationNames[id] ?? id}</Badge>
        </li>
      ))}
    </ul>
  );
}
