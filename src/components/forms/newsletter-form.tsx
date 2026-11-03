"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import {
  type NewsletterState,
  subscribeNewsletter,
} from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

// `band` sits on the yellow newsletter band, `footer` on the black footer.
export function NewsletterForm({
  tone = "band",
}: {
  tone?: "band" | "footer";
}) {
  const [state, formAction, pending] = useActionState<
    NewsletterState,
    FormData
  >(subscribeNewsletter, {
    status: "idle",
  });
  const id = useId();
  const onDark = tone === "footer";

  return (
    <form action={formAction} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        E-Mail-Adresse
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="deine@firma.de"
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={`${id}-status`}
          className={cn(
            "h-12 w-full min-w-0 rounded-md border bg-white px-4 font-ui text-base text-black outline-none placeholder:text-neutral-500 focus-visible:shadow-[0_0_0_3px_var(--color-brand)] sm:rounded-r-none sm:border-r-0",
            onDark
              ? "border-white focus-visible:shadow-[0_0_0_3px_var(--color-brand)]"
              : "border-black focus-visible:shadow-[0_0_0_3px_var(--color-white)]",
          )}
        />
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <Button
          type="submit"
          variant={onDark ? "primary" : "secondary"}
          disabled={pending}
          aria-busy={pending || undefined}
          className="shrink-0 sm:rounded-l-none"
        >
          {pending ? "Wird gesendet …" : "Kostenlos abonnieren"}
        </Button>
      </div>
      <p
        id={`${id}-status`}
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 font-medium font-ui text-[14px]",
          onDark ? "text-brand" : "text-black",
        )}
      >
        {state.message}
      </p>
      <p
        className={cn(
          "type-ui-sm mt-1",
          onDark ? "text-neutral-400" : "text-neutral-800",
        )}
      >
        Mit der Anmeldung erhältst du einmal im Monat unseren Newsletter.
        Abmeldung jederzeit über den Link in jeder E-Mail.{" "}
        <Link
          href="/datenschutz"
          className={cn(
            "underline underline-offset-2",
            onDark ? "text-white" : "text-black",
          )}
        >
          Datenschutzerklärung
        </Link>
      </p>
    </form>
  );
}
