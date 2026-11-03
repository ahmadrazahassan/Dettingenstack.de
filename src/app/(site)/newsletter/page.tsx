import { Check } from "lucide-react";
import type { Metadata } from "next";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { SiteImage } from "@/components/ui/site-image";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Einmal im Monat: neue Tests und Vergleiche, dokumentierte Preisänderungen und Fristen wie E-Rechnung oder Zeiterfassung. Kostenlos, jederzeit kündbar.",
  alternates: { canonical: "/newsletter" },
};

const benefits = [
  "Neue Tests und Vergleiche, sobald sie erscheinen",
  "Preisänderungen, die wir bei Anbietern erfasst haben",
  "Fristen und Pflichten, die Software betreffen – mit Quelle",
];

const topics = [
  "E-Rechnung: Was ab 2027 gilt",
  "Preiserhöhungen bei HR-Software",
  "Neue Kategorie mit Bestenliste",
  "Checkliste vor dem Vertragsende",
];

// Newsletter (§11.20). The yellow band is not repeated here – the form is the page.
export default function NewsletterPage() {
  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Newsletter" }]} />
      <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="type-eyebrow eyebrow-square">Newsletter</p>
          <h1 className="type-h1 mt-3">
            Einmal im Monat das Wichtigste zu Business-Software
          </h1>
          <ul className="mt-8 flex flex-col gap-3">
            {benefits.map((b) => (
              <li key={b} className="type-body flex gap-3 text-neutral-800">
                <Check
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-black"
                  strokeWidth={2}
                />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-xl rounded-lg bg-brand p-6">
            <NewsletterForm tone="band" />
          </div>
        </div>
        <div className="lg:col-span-6">
          <SiteImage id="B-41" sizes="(min-width: 1024px) 50vw, 100vw" eager />
        </div>
      </div>

      <section aria-labelledby="themen" className="mt-20">
        <h2 id="themen" className="type-h3">
          Beispiele für Themen
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {topics.map((t) => (
            <li
              key={t}
              className="inline-flex h-8 items-center rounded-sm bg-neutral-100 px-3 font-ui text-[14px] text-black"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="type-small mt-6 max-w-2xl text-neutral-700">
          Kein Spam, keine Weitergabe deiner Adresse. Abmeldung jederzeit über
          den Link in jeder E-Mail.
        </p>
      </section>
    </Container>
  );
}
