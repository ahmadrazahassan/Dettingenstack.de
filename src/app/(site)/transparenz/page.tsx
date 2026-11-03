import type { Metadata } from "next";
import { Callout } from "@/components/content/blocks";
import { Prose } from "@/components/content/prose";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { SiteImage } from "@/components/ui/site-image";
import { tools } from "@/data";

export const metadata: Metadata = {
  title: "Transparenz: So finanzieren wir uns",
  description:
    "Wie Dettingenstack Geld verdient, wie wir Werbelinks und Anzeigen kennzeichnen – und was bei uns nie passiert.",
  alternates: { canonical: "/transparenz" },
};

export default function TransparencyPage() {
  const activePartners = tools.filter((t) => t.affiliate?.active).length;

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Transparenz" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Transparenz</p>
            <h1 className="type-h1 mt-3">So finanzieren wir uns</h1>
            <p className="type-lead mt-4">
              Dettingenstack ist für dich kostenlos. Damit das so bleibt, dürfen
              wir an Software-Käufen verdienen – aber niemals an Bewertungen.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-09"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>

        <div className="mt-10 max-w-article">
          <Callout type="recht" title="Aktueller Stand">
            {activePartners === 0
              ? "Derzeit ist kein Partnerprogramm aktiv. Alle „Zum Anbieter“-Links führen ohne Provision direkt zum Anbieter."
              : `Derzeit sind ${activePartners} Partnerprogramme aktiv. Betroffene Links sind mit * als Werbelink markiert.`}
          </Callout>
        </div>

        <Prose className="mt-6">
          <h2>Werbelinks (*)</h2>
          <p>
            Wenn du über einen Link mit Sternchen eine Software kaufst, erhalten
            wir unter Umständen eine Provision vom Anbieter. Für dich ändert
            sich der Preis dadurch nicht. Jeder solche Link ist direkt am Button
            als „Werbelink“ gekennzeichnet.
          </p>
          <h2>Anzeigen</h2>
          <p>
            Anbieter können Werbeflächen buchen. Diese sind immer mit „Anzeige“
            markiert, stehen außerhalb unserer Rankings und erscheinen nie auf
            Vergleichsseiten.
          </p>
          <h2>Angebotsanfragen</h2>
          <p>
            Wenn du über Dettingenstack ein Angebot anfragst, geben wir deine
            Angaben nur an die Anbieter weiter, die du selbst auswählst – und
            nur mit deiner ausdrücklichen Einwilligung.
          </p>
          <h2>Was bei uns nie passiert</h2>
          <ul>
            <li>
              Anbieter können keine besseren Scores, Auszeichnungen oder
              Platzierungen im Ranking kaufen.
            </li>
            <li>
              Ob ein Anbieter ein Partnerprogramm hat, fließt nicht in den
              Dettingenstack-Score ein. Das prüfen wir mit einem automatischen
              Test bei jeder Änderung.
            </li>
            <li>
              Wir veröffentlichen keine gekauften oder erfundenen Bewertungen.
            </li>
            <li>Wir geben keine Daten ohne deine Einwilligung weiter.</li>
          </ul>
          <h2>Nutzerbewertungen</h2>
          <p>
            Derzeit zeigen wir ausschließlich redaktionelle Bewertungen. Sobald
            wir Erfahrungsberichte von Nutzerinnen und Nutzern veröffentlichen,
            erklären wir hier, wie wir prüfen, ob sie von echten Kundinnen und
            Kunden stammen.
          </p>
        </Prose>
      </Container>
      <NewsletterBand />
    </>
  );
}
