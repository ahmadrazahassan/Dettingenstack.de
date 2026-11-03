import type { Metadata, Route } from "next";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";

export const metadata: Metadata = {
  title: "Anmeldung bestätigt",
  robots: { index: false, follow: true },
  alternates: { canonical: "/newsletter/bestaetigt" },
};

// Target of the double opt-in link (§11.20, BREVO_DOI_REDIRECT_URL).
export default function NewsletterConfirmedPage() {
  return (
    <Container className="flex flex-col items-center py-20 text-center lg:py-28">
      <SiteImage id="C-07" sizes="160px" className="w-40" />
      <h1 className="type-h1 mt-8">
        Geschafft! Deine Anmeldung ist bestätigt.
      </h1>
      <p className="type-lead mt-4 max-w-xl">
        Du bekommst unseren Newsletter ab der nächsten Ausgabe – einmal im
        Monat. Bis dahin findest du unsere Ratgeber und Vergleiche jederzeit auf
        der Website.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={"/ratgeber" as Route}>Zu den Ratgebern</ButtonLink>
        <ButtonLink href={"/" as Route} variant="outline">
          Zur Startseite
        </ButtonLink>
      </div>
    </Container>
  );
}
