"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PriceBarChart } from "@/components/charts/charts";
import { VendorCTA } from "@/components/tool/vendor-cta";
import {
  Checkbox,
  RangeWithStepper,
  Segmented,
  Select,
} from "@/components/ui/controls";
import { Accordion } from "@/components/ui/disclosure";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { formatEUR, withVat } from "@/lib/format";
import {
  type Billing,
  cheapestEligiblePlan,
  knownOneTimeFees,
} from "@/lib/pricing";
import type { Category, Tool } from "@/lib/schema";

type Vat = "netto" | "brutto";

// Kostenrechner (§11.10, §12.2): cheapest eligible plan per tool, known one-time fees, n-year totals.
export function CostCalculator({
  category,
  tools,
  categories,
  initialTeam,
}: {
  category: Category;
  tools: Tool[];
  /** All categories for the select; switching loads /kostenrechner?kategorie=… */
  categories: { slug: string; name: string }[];
  initialTeam?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [team, setTeam] = useState(
    initialTeam ?? category.referenceTeams[0] ?? 25,
  );
  const [billing, setBilling] = useState<Billing>("jaehrlich");
  const [vat, setVat] = useState<Vat>("netto");
  const [years, setYears] = useState<"1" | "2" | "3">("3");
  const [required, setRequired] = useState<string[]>([]);
  const core = category.featureGroups
    .flatMap((g) => g.features)
    .filter((f) => f.importance === "kern");
  const v = (c: number) => (vat === "brutto" ? withVat(c) : c);

  const rows = tools
    .map((tool) => {
      const quote = cheapestEligiblePlan(
        tool,
        team,
        billing,
        required,
        category.slug,
      );
      const fees = knownOneTimeFees(tool);
      const unknownFees = tool.pricing.oneTimeFees
        .filter((f) => f.amount == null)
        .map((f) => f.label);
      const missing = required.filter((f) => tool.features[f]?.status !== "ja");
      return { tool, quote, fees, unknownFees, missing };
    })
    .sort(
      (a, b) =>
        (a.quote?.cost.cents ?? Number.POSITIVE_INFINITY) -
        (b.quote?.cost.cents ?? Number.POSITIVE_INFINITY),
    );
  const priced = rows.filter((r) => r.quote);
  const unpriced = rows.filter((r) => !r.quote);
  const min = priced[0]?.quote?.cost.cents;
  const max = priced.at(-1)?.quote?.cost.cents;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <form
        aria-label="Eingaben"
        className="flex flex-col gap-7 rounded-lg border border-neutral-200 bg-white p-6 lg:sticky lg:top-24 lg:self-start"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p className="mb-2 font-medium font-ui text-[14px] text-black">
            Kategorie
          </p>
          <Select
            aria-label="Kategorie"
            value={category.slug}
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
            onValueChange={(slug) =>
              router.push(`${pathname}?kategorie=${slug}` as Route, {
                scroll: false,
              })
            }
          />
        </div>
        {/* Newsletter and shops compare the smallest package per account: no team size to choose. */}
        {category.maxTeam > 1 && (
          <div>
            <p className="mb-3 font-medium font-ui text-[14px] text-black">
              Teamgröße
            </p>
            <RangeWithStepper
              label="Teamgröße"
              unitLabel={category.unitLabel.plural}
              value={team}
              onValueChange={setTeam}
              max={category.maxTeam}
            />
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Segmented
            label="Abrechnung"
            value={billing}
            onValueChange={setBilling}
            options={[
              { value: "monatlich", label: "Monatlich" },
              { value: "jaehrlich", label: "Jährlich" },
            ]}
          />
          <Segmented
            label="Umsatzsteuer"
            value={vat}
            onValueChange={setVat}
            options={[
              { value: "netto", label: "Netto" },
              { value: "brutto", label: "Brutto" },
            ]}
          />
          <Segmented
            label="Zeitraum"
            value={years}
            onValueChange={setYears}
            options={[
              { value: "1", label: "1 Jahr" },
              { value: "2", label: "2 Jahre" },
              { value: "3", label: "3 Jahre" },
            ]}
          />
        </div>
        <fieldset>
          <legend className="mb-3 font-medium font-ui text-[14px] text-black">
            Benötigte Funktionen
          </legend>
          <div className="flex flex-col gap-3">
            {core.map((f) => (
              <Checkbox
                key={f.id}
                label={f.label}
                checked={required.includes(f.id)}
                onCheckedChange={(c) =>
                  setRequired((r) =>
                    c === true ? [...r, f.id] : r.filter((x) => x !== f.id),
                  )
                }
              />
            ))}
          </div>
        </fieldset>
      </form>

      <div className="min-w-0">
        <p aria-live="polite" className="type-lead text-neutral-800">
          {priced.length
            ? `${category.maxTeam > 1 ? `Für ${team} ${category.unitLabel.plural}` : "Im kleinsten veröffentlichten Paket"} kostet ${category.name} ${min ? `zwischen ${formatEUR(v(min))}` : "von kostenlos (Gratis-Tarif)"} ${min ? "und" : "bis"} ${formatEUR(v(max ?? 0))} pro Monat (${vat}) – bei den Anbietern, die Preise veröffentlichen.`
            : "Mit diesen Anforderungen veröffentlicht kein Anbieter einen passenden Preis."}
        </p>
        {priced.length > 0 && (
          <div className="mt-8">
            <PriceBarChart
              data={priced.map((r) => ({
                label: r.tool.name,
                cents: v(r.quote?.cost.cents ?? 0),
              }))}
            />
          </div>
        )}

        <div className="mt-8">
          <TableScroll label="Kostenvergleich">
            <Table className="min-w-[760px]">
              <thead>
                <tr>
                  <Th>Tool</Th>
                  <Th>Tarif</Th>
                  <Th className="text-right">pro Monat</Th>
                  <Th className="text-right">pro Jahr</Th>
                  <Th className="text-right">
                    {years} {years === "1" ? "Jahr" : "Jahre"} inkl. Einrichtung
                  </Th>
                  <Th>
                    <span className="sr-only">Anbieter</span>
                  </Th>
                </tr>
              </thead>
              <tbody>
                {priced.map(({ tool, quote, fees, unknownFees }) => {
                  const monthly = quote?.cost.cents ?? 0;
                  return (
                    <tr key={tool.slug}>
                      <Td>
                        <Link
                          href={`/software/${tool.slug}/preise` as Route}
                          className="font-semibold text-black hover:underline"
                        >
                          {tool.name}
                        </Link>
                      </Td>
                      <Td>
                        {quote?.plan.name}
                        {quote?.cost.fallback && (
                          <span className="type-ui-sm block text-neutral-600">
                            nur andere Abrechnung verfügbar
                          </span>
                        )}
                      </Td>
                      <Td numeric>{formatEUR(v(monthly))}</Td>
                      <Td numeric>{formatEUR(v(monthly * 12))}</Td>
                      <Td numeric>
                        {formatEUR(v(fees + monthly * 12 * Number(years)))}
                        {unknownFees.length > 0 && (
                          <span className="type-ui-sm block text-neutral-600">
                            zzgl. {unknownFees.join(", ")} (auf Anfrage)
                          </span>
                        )}
                      </Td>
                      <Td>
                        <VendorCTA
                          tool={tool}
                          placement="calculator"
                          size="sm"
                          note={false}
                        />
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableScroll>
        </div>

        {unpriced.length > 0 && (
          <div className="mt-8 rounded-lg bg-neutral-50 p-6">
            <p className="font-semibold font-ui text-[15px] text-black">
              Preis auf Anfrage oder Funktion fehlt
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {unpriced.map(({ tool, missing }) => (
                <li key={tool.slug} className="type-small text-neutral-800">
                  <Link
                    href={`/software/${tool.slug}` as Route}
                    className="font-semibold text-black underline underline-offset-2"
                  >
                    {tool.name}
                  </Link>
                  {missing.length
                    ? ` – nicht belegt: ${missing.map((id) => core.find((f) => f.id === id)?.label ?? id).join(", ")}`
                    : " – veröffentlicht keinen Preis für diese Auswahl"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <Accordion
            items={[
              {
                id: "so-rechnen-wir",
                title: "So rechnen wir",
                content: (
                  <ul className="flex flex-col gap-2">
                    <li>
                      Wir nehmen pro Anbieter den günstigsten Tarif, der alle
                      gewählten Funktionen enthält und deine Teamgröße abdeckt.
                    </li>
                    <li>
                      Mindestabnahmen (z. B. „mindestens 10 Mitarbeitende“)
                      rechnen wir mit ein.
                    </li>
                    <li>
                      Gesamtkosten = bekannte Einmalkosten + Monatspreis × 12 ×
                      Jahre. Unbekannte Einmalkosten führen wir separat auf.
                    </li>
                    <li>
                      Brutto = netto zzgl. 19 % Umsatzsteuer. Zusatzmodule sind
                      nicht enthalten.
                    </li>
                    <li>
                      Alle Preise stammen von den Preisseiten der Anbieter, mit
                      Prüfdatum auf der jeweiligen Preisseite.
                    </li>
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
