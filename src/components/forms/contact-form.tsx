"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import {
  type ContactField,
  type ContactState,
  sendContact,
} from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/controls";
import { Field, Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import { CONTACT_SUBJECTS, type ContactSubject } from "@/lib/contact";

// Contact form for /kontakt and /fuer-anbieter. `vendor` adds company and software fields.
export function ContactForm({
  subjects,
  defaultSubject,
  vendor = false,
}: {
  subjects: ContactSubject[];
  defaultSubject?: ContactSubject;
  vendor?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" },
  );
  const [subject, setSubject] = useState<string>(defaultSubject ?? "");
  const id = useId();
  const err = (f: ContactField) => state.errors?.[f];

  if (state.status === "success") {
    return (
      <div
        aria-live="polite"
        className="rounded-lg border border-neutral-200 bg-white p-6"
      >
        <p className="type-h4">Danke für deine Nachricht.</p>
        <p className="type-body mt-2 text-neutral-800">
          Wir antworten in der Regel innerhalb von zwei Werktagen.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="subject" value={subject} />
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
        <Field id={`${id}-name`} label="Name" required error={err("name")}>
          {(d) => (
            <Input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              defaultValue={state.values?.name}
              aria-describedby={d}
              aria-invalid={!!err("name") || undefined}
            />
          )}
        </Field>
        <Field id={`${id}-email`} label="E-Mail" required error={err("email")}>
          {(d) => (
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state.values?.email}
              aria-describedby={d}
              aria-invalid={!!err("email") || undefined}
            />
          )}
        </Field>
        {vendor && (
          <>
            <Field id={`${id}-company`} label="Firma">
              {(d) => (
                <Input
                  id={`${id}-company`}
                  name="company"
                  autoComplete="organization"
                  defaultValue={state.values?.company}
                  aria-describedby={d}
                />
              )}
            </Field>
            <Field id={`${id}-software`} label="Software">
              {(d) => (
                <Input
                  id={`${id}-software`}
                  name="software"
                  defaultValue={state.values?.software}
                  aria-describedby={d}
                />
              )}
            </Field>
          </>
        )}
      </div>

      <Field
        id={`${id}-subject`}
        label={vendor ? "Anliegen" : "Betreff"}
        required
        error={err("subject")}
      >
        {(d) => (
          <Select
            id={`${id}-subject`}
            value={subject}
            onValueChange={setSubject}
            options={subjects.map((s) => ({
              value: s,
              label: CONTACT_SUBJECTS[s],
            }))}
            aria-describedby={d}
          />
        )}
      </Field>

      <Field
        id={`${id}-message`}
        label="Nachricht"
        required
        error={err("message")}
      >
        {(d) => (
          <Textarea
            id={`${id}-message`}
            name="message"
            rows={6}
            defaultValue={state.values?.message}
            aria-describedby={d}
            aria-invalid={!!err("message") || undefined}
          />
        )}
      </Field>

      <p className="type-ui-sm text-neutral-600">
        Wir nutzen deine Angaben nur, um deine Nachricht zu beantworten. Mehr
        dazu in der{" "}
        <Link href="/datenschutz" className="underline underline-offset-2">
          Datenschutzerklärung
        </Link>
        .
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Button
          type="submit"
          disabled={pending}
          aria-busy={pending || undefined}
        >
          {pending ? "Wird gesendet …" : "Nachricht senden"}
        </Button>
        <p
          aria-live="polite"
          className={cn(
            "type-ui-sm",
            state.status === "not-ready" ? "text-black" : "text-negative",
          )}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
