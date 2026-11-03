import type { Metadata, Route } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { featuredComparisons } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="inhalt" className="flex-1">
      <Container className="flex flex-col items-center py-20 text-center lg:py-28">
        <SiteImage id="C-08" sizes="160px" className="w-40" />
        <p className="type-eyebrow mt-8">Fehler 404</p>
        <h1 className="type-h1 mt-3 max-w-2xl">
          Diese Seite haben wir nicht im Vergleich.
        </h1>
        <p className="type-lead mt-4 max-w-xl">
          Vielleicht hilft dir die Suche weiter – oder du startest bei unseren
          beliebtesten Vergleichen.
        </p>
        <ButtonLink href="/" className="mt-8">
          Zur Startseite
        </ButtonLink>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {featuredComparisons.slice(0, 4).map((c) => (
            <li key={c.href}>
              <Link
                href={c.href as Route}
                className="link-marker font-medium font-ui text-[15px]"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
