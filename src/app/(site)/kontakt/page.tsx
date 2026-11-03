import type { Metadata, Route } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { SiteImage } from "@/components/ui/site-image";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Frage zu einem Vergleich, Fehler entdeckt oder Anfrage als Anbieter: So erreichst du die Dettingenstack-Redaktion. Wir antworten in der Regel innerhalb von zwei Werktagen.",
  alternates: { canonical: "/kontakt" },
};

// Kontakt (§11.19). Company address and register data live in the Impressum.
export default function ContactPage() {
  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SiteImage id="C-12" sizes="160px" className="w-32 lg:w-40" />
          <h1 className="type-h1 mt-6">Kontakt</h1>
          <p className="type-lead mt-4">
            Schreib uns, wenn du eine Frage zu einem Vergleich hast, einen
            Fehler entdeckt hast oder als Anbieter mit uns sprechen willst.
          </p>
          <p className="type-body mt-4 text-neutral-800">
            Wir antworten in der Regel innerhalb von zwei Werktagen.
          </p>
          <ul className="mt-8 flex flex-col gap-3 border-neutral-200 border-t pt-6">
            <li>
              <Link
                href={"/fuer-anbieter" as Route}
                className="link-marker font-medium font-ui text-[15px]"
              >
                Du bist Software-Anbieter?
              </Link>
            </li>
            <li>
              <Link
                href={"/methodik" as Route}
                className="link-marker font-medium font-ui text-[15px]"
              >
                So bewerten wir
              </Link>
            </li>
            <li>
              <Link
                href={"/impressum" as Route}
                className="link-marker font-medium font-ui text-[15px]"
              >
                Anschrift und Angaben zum Unternehmen (Impressum)
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-neutral-200 p-6 lg:p-8">
            <ContactForm
              subjects={[
                "frage",
                "korrektur",
                "anbieter",
                "presse",
                "sonstiges",
              ]}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
