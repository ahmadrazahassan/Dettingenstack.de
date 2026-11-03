"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { useActionState, useId, useState } from "react";
import { type LeadField, type LeadState, requestQuote } from "@/actions/lead";
import { Button, buttonStyles } from "@/components/ui/button";
import { Checkbox, Select } from "@/components/ui/controls";
import { Field, Input, Textarea } from "@/components/ui/field";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/cn";

type Vendor = { slug: string; name: string };

const sizeOptions = [
  { value: "solo", label: "Selbstständig" },
  { value: "kleinst", label: "2–9 Mitarbeitende" },
  { value: "klein", label: "10–49 Mitarbeitende" },
  { value: "mittel", label: "50–249 Mitarbeitende" },
  { value: "gross", label: "250+ Mitarbeitende" },
];

const timeframeOptions = [
  { value: "sofort", label: "Sofort" },
  { value: "1-3-monate", label: "In 1–3 Monaten" },
  { value: "spaeter", label: "Später" },
];

const MAX_VENDORS = 3;

// „Angebot anfragen“ (§14.3): dialog on desktop, full-screen sheet on mobile. The current tool is preselected.
export function LeadDialog({
  tool,
  vendors,
  category,
  className,
}: {
  tool: Vendor;
  /** Tools of the same category the request can also go to (including `tool`). */
  vendors: Vendor[];
  category: { slug: string; name: string };
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // Remounting the form on every open resets its action state.
  const [round, setRound] = useState(0);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setRound((r) => r + 1);
      }}
    >
      <Dialog.Trigger
        className={cn(
          buttonStyles({ variant: "outline", fullWidth: true }),
          className,
        )}
      >
        Angebot anfragen
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-70 bg-black/40 data-[state=open]:animate-[fade-in_150ms]" />
        <Dialog.Content className="fixed inset-0 z-70 flex flex-col overflow-hidden bg-white data-[state=open]:animate-[panel-in_200ms_var(--ease-brand)] sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[90vh] sm:w-[calc(100vw-2rem)] sm:max-w-[640px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:shadow-lg">
          <LeadForm
            key={round}
            tool={tool}
            vendors={vendors}
            category={category}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LeadForm({
  tool,
  vendors,
  category,
}: {
  tool: Vendor;
  vendors: Vendor[];
  category: { slug: string; name: string };
}) {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(
    requestQuote,
    { status: "idle" },
  );
  const [selected, setSelected] = useState<string[]>([tool.slug]);
  const [size, setSize] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [consent, setConsent] = useState(false);
  const id = useId();
  const err = (f: LeadField) => state.errors?.[f];

  const toggle = (slug: string, on: boolean) =>
    setSelected((s) =>
      on
        ? s.length < MAX_VENDORS
          ? [...s, slug]
          : s
        : s.filter((x) => x !== slug),
    );

  const header = (
    <div className="flex items-start gap-4 border-neutral-200 border-b px-5 py-4 sm:px-6">
      <SiteImage
        id={state.status === "success" ? "C-06" : "C-14"}
        sizes="56px"
        className="w-14 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <Dialog.Title className="type-h4">Angebot anfragen</Dialog.Title>
        <Dialog.Description className="type-ui-sm mt-1 text-neutral-600">
          Kostenlos und unverbindlich. Wir leiten deine Anfrage an bis zu drei
          Anbieter weiter.
        </Dialog.Description>
      </div>
      <Dialog.Close
        aria-label="Schließen"
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-black hover:bg-neutral-100"
      >
        <X aria-hidden className="size-5" strokeWidth={1.75} />
      </Dialog.Close>
    </div>
  );

  if (state.status === "success") {
    return (
      <>
        {header}
        <div
          className="flex flex-1 flex-col items-start gap-4 overflow-y-auto px-5 py-8 sm:px-6"
          aria-live="polite"
        >
          <p className="type-h3">
            Danke! Deine Anfrage ist bei uns angekommen.
          </p>
          <p className="type-body text-neutral-800">
            Die ausgewählten Anbieter
            {state.vendors?.length ? ` (${state.vendors.join(", ")})` : ""}{" "}
            melden sich in der Regel innerhalb von zwei Werktagen bei dir.
          </p>
          <Dialog.Close className={buttonStyles({ variant: "secondary" })}>
            Schließen
          </Dialog.Close>
        </div>
      </>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
    >
      {header}
      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        <input type="hidden" name="category" value={category.slug} />
        <input type="hidden" name="size" value={size} />
        <input type="hidden" name="timeframe" value={timeframe} />
        {selected.map((s) => (
          <input key={s} type="hidden" name="vendors" value={s} />
        ))}
        {consent && <input type="hidden" name="consent" value="ja" />}
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id={`${id}-company`}
            label="Firma"
            required
            error={err("company")}
            className="sm:col-span-2"
          >
            {(d) => (
              <Input
                id={`${id}-company`}
                name="company"
                defaultValue={state.values?.company}
                autoComplete="organization"
                aria-describedby={d}
                aria-invalid={!!err("company") || undefined}
              />
            )}
          </Field>
          <Field
            id={`${id}-name`}
            label="Vor- und Nachname"
            required
            error={err("name")}
          >
            {(d) => (
              <Input
                id={`${id}-name`}
                name="name"
                defaultValue={state.values?.name}
                autoComplete="name"
                aria-describedby={d}
                aria-invalid={!!err("name") || undefined}
              />
            )}
          </Field>
          <Field
            id={`${id}-email`}
            label="Geschäftliche E-Mail"
            required
            error={err("email")}
          >
            {(d) => (
              <Input
                id={`${id}-email`}
                name="email"
                defaultValue={state.values?.email}
                type="email"
                autoComplete="email"
                aria-describedby={d}
                aria-invalid={!!err("email") || undefined}
              />
            )}
          </Field>
          <Field
            id={`${id}-phone`}
            label="Telefon (optional)"
            error={err("phone")}
          >
            {(d) => (
              <Input
                id={`${id}-phone`}
                name="phone"
                defaultValue={state.values?.phone}
                type="tel"
                autoComplete="tel"
                aria-describedby={d}
                aria-invalid={!!err("phone") || undefined}
              />
            )}
          </Field>
          <Field
            id={`${id}-size`}
            label="Unternehmensgröße"
            required
            error={err("size")}
          >
            {(d) => (
              <Select
                id={`${id}-size`}
                value={size}
                onValueChange={setSize}
                options={sizeOptions}
                aria-describedby={d}
              />
            )}
          </Field>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-1 font-medium font-ui text-black text-sm">
            Anbieter auswählen{" "}
            <span className="text-neutral-600" aria-hidden>
              *
            </span>
          </legend>
          <p className="type-ui-sm mb-3 text-neutral-600">
            {category.name} · höchstens {MAX_VENDORS} · {selected.length}{" "}
            ausgewählt
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {vendors.map((v) => (
              <Checkbox
                key={v.slug}
                label={v.name}
                checked={selected.includes(v.slug)}
                disabled={
                  !selected.includes(v.slug) && selected.length >= MAX_VENDORS
                }
                onCheckedChange={(c) => toggle(v.slug, c === true)}
              />
            ))}
          </div>
          {err("vendors") && (
            <p className="mt-2 type-ui-sm text-negative">{err("vendors")}</p>
          )}
        </fieldset>

        <div className="mt-6 grid grid-cols-1 gap-5">
          <Field id={`${id}-timeframe`} label="Zeitrahmen">
            {(d) => (
              <Select
                id={`${id}-timeframe`}
                value={timeframe}
                onValueChange={setTimeframe}
                options={timeframeOptions}
                aria-describedby={d}
              />
            )}
          </Field>
          <Field
            id={`${id}-message`}
            label="Nachricht (optional)"
            error={err("message")}
          >
            {(d) => (
              <Textarea
                id={`${id}-message`}
                name="message"
                defaultValue={state.values?.message}
                rows={3}
                placeholder="Zum Beispiel: gewünschte Funktionen, Anzahl der Nutzer, Starttermin"
                aria-describedby={d}
              />
            )}
          </Field>
        </div>

        <div className="mt-6 rounded-md bg-neutral-50 p-4">
          <Checkbox
            id={`${id}-consent`}
            checked={consent}
            onCheckedChange={(c) => setConsent(c === true)}
            aria-describedby={`${id}-consent-text`}
            aria-invalid={!!err("consent") || undefined}
            className="items-start"
            label="Ich bin einverstanden *"
          />
          <p
            id={`${id}-consent-text`}
            className="type-ui-sm mt-2 pl-7.5 text-neutral-700"
          >
            Ich bin einverstanden, dass Dettingenstack meine Angaben an die oben
            ausgewählten Anbieter weitergibt, damit sie mir ein Angebot senden.
            Ich kann meine Einwilligung jederzeit widerrufen. Mehr dazu in der{" "}
            <Link href="/datenschutz" className="underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </p>
          {err("consent") && (
            <p className="mt-2 pl-7.5 type-ui-sm text-negative">
              {err("consent")}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-neutral-200 border-t px-5 py-4 sm:px-6">
        <p
          aria-live="polite"
          className={cn(
            "type-ui-sm min-h-5",
            state.status === "not-ready" ? "text-black" : "text-negative",
          )}
        >
          {state.message}
        </p>
        <Button
          type="submit"
          disabled={pending}
          aria-busy={pending || undefined}
          fullWidth
        >
          {pending ? "Wird gesendet …" : "Kostenlos Angebote anfordern"}
        </Button>
      </div>
    </form>
  );
}
