"use client";

import { useState } from "react";
import { PriceBarChart, PriceHistoryChart } from "@/components/charts/charts";
import { CompareToggle } from "@/components/compare/compare-provider";
import { Button } from "@/components/ui/button";
import {
  Checkbox,
  RangeWithStepper,
  Segmented,
  Select,
} from "@/components/ui/controls";
import { Field, Input, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { formatEUR, withVat } from "@/lib/format";

// Example data for the styleguide only — fictional tools, no real prices.
const examplePrices = [
  { label: "Beispiel HR", perUnit: 650 },
  { label: "Muster Personal", perUnit: 890 },
  { label: "Demo People", perUnit: 420 },
  { label: "Probe Team", perUnit: 1150 },
];

export function FormDemo() {
  const [size, setSize] = useState<string>();
  const [email, setEmail] = useState("keine-email");
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Field
        id="sg-firma"
        label="Firma"
        required
        hint="So wie im Handelsregister."
      >
        {(describedBy) => (
          <Input
            id="sg-firma"
            placeholder="Muster GmbH"
            aria-describedby={describedBy}
          />
        )}
      </Field>
      <Field
        id="sg-email"
        label="Geschäftliche E-Mail"
        required
        error="Bitte gib eine gültige E-Mail-Adresse ein."
      >
        {(describedBy) => (
          <Input
            id="sg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid
            aria-describedby={describedBy}
          />
        )}
      </Field>
      <Field id="sg-groesse" label="Unternehmensgröße" required>
        {(describedBy) => (
          <Select
            id="sg-groesse"
            value={size}
            onValueChange={setSize}
            aria-describedby={describedBy}
            options={[
              { value: "1-9", label: "1–9 Mitarbeitende" },
              { value: "10-49", label: "10–49 Mitarbeitende" },
              { value: "50-249", label: "50–249 Mitarbeitende" },
              { value: "250+", label: "250 und mehr" },
            ]}
          />
        )}
      </Field>
      <Field id="sg-nachricht" label="Nachricht">
        {(describedBy) => (
          <Textarea id="sg-nachricht" rows={3} aria-describedby={describedBy} />
        )}
      </Field>
      <Checkbox label="Ich bin mit der Weitergabe an die ausgewählten Anbieter einverstanden." />
    </div>
  );
}

export function PricingControlsDemo() {
  const [billing, setBilling] = useState<"monatlich" | "jaehrlich">(
    "jaehrlich",
  );
  const [vat, setVat] = useState<"netto" | "brutto">("netto");
  const [team, setTeam] = useState(25);
  const factor = billing === "jaehrlich" ? 0.85 : 1;
  const data = examplePrices.map((p) => {
    const net = Math.round(p.perUnit * factor) * team;
    return { label: p.label, cents: vat === "brutto" ? withVat(net) : net };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
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
      </div>
      <RangeWithStepper
        label="Teamgröße"
        unitLabel="Mitarbeitende"
        value={team}
        onValueChange={setTeam}
      />
      <p className="type-ui text-neutral-700" aria-live="polite">
        Günstigstes Beispiel:{" "}
        <strong className="text-black">
          {formatEUR(Math.min(...data.map((d) => d.cents)))}
        </strong>{" "}
        pro Monat ({vat})
      </p>
      <PriceBarChart data={data} highlight="Beispiel HR" />
    </div>
  );
}

export function PriceHistoryDemo() {
  return (
    <PriceHistoryChart
      lines={[
        { key: "a", label: "Beispiel HR" },
        { key: "b", label: "Muster Personal" },
      ]}
      data={[
        { date: "01/2026", a: 650, b: 890 },
        { date: "03/2026", a: 650, b: 890 },
        { date: "05/2026", a: 690, b: 890 },
        { date: "07/2026", a: 690, b: 850 },
        { date: "09/2026", a: 690, b: 850 },
        { date: "10/2026", a: 720, b: 850 },
      ]}
    />
  );
}

export function ToastDemo() {
  const toast = useToast();
  return (
    <Button
      variant="outline"
      size="sm"
      arrow={false}
      onClick={() => toast("Link kopiert")}
    >
      Toast anzeigen
    </Button>
  );
}

export function CompareDemo() {
  return (
    <div className="flex flex-col gap-3">
      <CompareToggle slug="beispiel-hr" name="Beispiel HR" />
      <CompareToggle slug="muster-personal" name="Muster Personal" />
      <CompareToggle slug="demo-people" name="Demo People" />
    </div>
  );
}
