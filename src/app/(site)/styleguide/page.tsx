import { Award, ShieldCheck } from "lucide-react";
import type { Metadata, Route } from "next";
import type { ReactNode } from "react";
import {
  CategoryTile,
  ComparisonCard,
  GuideCard,
  ToolCard,
} from "@/components/cards/cards";
import { ChartFrame } from "@/components/charts/chart-frame";
import { PriceBarChart } from "@/components/charts/charts";
import {
  Callout,
  Checklist,
  KeyTakeaways,
  ProsCons,
  Steps,
  VerdictBox,
} from "@/components/content/blocks";
import {
  Byline,
  ChangeLog,
  Cite,
  Figure,
  Sources,
} from "@/components/content/meta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { ScoreBox, ScoreBreakdown } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { Badge } from "@/components/ui/badge";
import { AffiliateButton, Button, ButtonLink } from "@/components/ui/button";
import { Accordion, Tabs, Tooltip } from "@/components/ui/disclosure";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  EmptyState,
  Pagination,
  Skeleton,
  StatTile,
} from "@/components/ui/misc";
import { SectionTabs } from "@/components/ui/section-tabs";
import {
  FeatureStatus,
  GroupRow,
  Table,
  TableScroll,
  Td,
  Th,
} from "@/components/ui/table";
import { categories } from "@/data/navigation";
import {
  CompareDemo,
  FormDemo,
  PriceHistoryDemo,
  PricingControlsDemo,
  ToastDemo,
} from "./demos";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const sections = [
  { id: "farben", label: "Farben" },
  { id: "typografie", label: "Typografie" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges & Score" },
  { id: "formulare", label: "Formulare" },
  { id: "navigation", label: "Tabs & Akkordeon" },
  { id: "tabellen", label: "Tabellen" },
  { id: "karten", label: "Karten" },
  { id: "inhalte", label: "Inhaltsblöcke" },
  { id: "diagramme", label: "Diagramme" },
  { id: "feedback", label: "Feedback & Zustände" },
];

const colors: {
  name: string;
  token: string;
  hex: string;
  note: string;
  dark?: boolean;
}[] = [
  {
    name: "Brand",
    token: "brand",
    hex: "#FFD60A",
    note: "Nur Fläche – nie Text auf Weiß",
  },
  { name: "Brand 600", token: "brand-600", hex: "#F2C800", note: "Hover" },
  { name: "Brand 700", token: "brand-700", hex: "#E0B800", note: "Pressed" },
  { name: "Brand 100", token: "brand-100", hex: "#FFF3B8", note: "Auswahl" },
  {
    name: "Brand 50",
    token: "brand-50",
    hex: "#FFFAE0",
    note: "Kernaussagen, Gewinnerzellen",
  },
  {
    name: "Black",
    token: "black",
    hex: "#000000",
    note: "Überschriften, Score, Footer",
    dark: true,
  },
  {
    name: "Neutral 800",
    token: "neutral-800",
    hex: "#222221",
    note: "Fließtext",
    dark: true,
  },
  {
    name: "Neutral 700",
    token: "neutral-700",
    hex: "#3A3A38",
    note: "Lead-Text",
    dark: true,
  },
  {
    name: "Neutral 600",
    token: "neutral-600",
    hex: "#555552",
    note: "Meta, auch auf Neutral 50",
    dark: true,
  },
  {
    name: "Neutral 500",
    token: "neutral-500",
    hex: "#737370",
    note: "Nur auf Weiß (4,76 : 1)",
    dark: true,
  },
  {
    name: "Neutral 300",
    token: "neutral-300",
    hex: "#CFCFCA",
    note: "Input-Rahmen",
  },
  {
    name: "Neutral 200",
    token: "neutral-200",
    hex: "#E4E4E0",
    note: "Karten-Rahmen",
  },
  {
    name: "Neutral 100",
    token: "neutral-100",
    hex: "#EFEFEC",
    note: "Chips, Skeletons",
  },
  {
    name: "Neutral 50",
    token: "neutral-50",
    hex: "#F7F7F5",
    note: "Abschnitts-Hintergrund",
  },
  {
    name: "Positiv",
    token: "positive",
    hex: "#1A7F45",
    note: "Vorteile, Preis gesenkt",
    dark: true,
  },
  {
    name: "Negativ",
    token: "negative",
    hex: "#B42318",
    note: "Nachteile, Fehler",
    dark: true,
  },
];

const swatchBg: Record<string, string> = {
  brand: "bg-brand",
  "brand-600": "bg-brand-600",
  "brand-700": "bg-brand-700",
  "brand-100": "bg-brand-100",
  "brand-50": "bg-brand-50",
  black: "bg-black",
  "neutral-800": "bg-neutral-800",
  "neutral-700": "bg-neutral-700",
  "neutral-600": "bg-neutral-600",
  "neutral-500": "bg-neutral-500",
  "neutral-300": "bg-neutral-300",
  "neutral-200": "bg-neutral-200",
  "neutral-100": "bg-neutral-100",
  "neutral-50": "bg-neutral-50",
  positive: "bg-positive",
  negative: "bg-negative",
};

function Block({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titel`}
      className="scroll-mt-32 border-neutral-200 border-b py-16"
    >
      <h2 id={`${id}-titel`} className="type-h2">
        {title}
      </h2>
      {intro && <p className="type-lead mt-3 max-w-3xl">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-neutral-200 border-t py-6 md:grid-cols-[14rem_1fr] md:gap-8">
      <p className="type-ui-sm text-neutral-600">{label}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const breakdown = [
  {
    label: "Funktionsumfang",
    score: 91,
    weight: 0.25,
    average: 82,
    note: "Beispielnotiz: deckt 24 von 28 Funktionen ab.",
  },
  { label: "Bedienbarkeit", score: 88, weight: 0.2, average: 79 },
  { label: "Preis-Leistung", score: 74, weight: 0.15, average: 77 },
  { label: "Datenschutz", score: 92, weight: 0.2, average: 80 },
  { label: "Support", score: 85, weight: 0.1, average: 76 },
  { label: "Integrationen", score: 80, weight: 0.1, average: 74 },
];

export default function StyleguidePage() {
  return (
    <>
      <Container id="styleguide-kopf" className="pt-10 pb-12">
        <Breadcrumbs items={[{ label: "Styleguide" }]} />
        <p className="type-eyebrow eyebrow-square mt-8">
          Intern · nicht indexiert
        </p>
        <h1 className="type-h1 mt-3">Styleguide</h1>
        <p className="type-lead mt-4 max-w-3xl">
          Alle Bausteine des Dettingenstack-Designsystems an einem Ort. Alle
          Tools, Preise und Bewertungen auf dieser Seite sind{" "}
          <strong className="text-black">Beispieldaten</strong>.
        </p>
      </Container>

      <SectionTabs items={sections} label="Styleguide-Abschnitte" />

      <Container>
        <Block
          id="farben"
          title="Farben"
          intro="Gelb ist eine Fläche, keine Textfarbe. Schwarz auf Gelb erreicht 14,9 : 1."
        >
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((c) => (
              <li
                key={c.token}
                className="overflow-hidden rounded-lg border border-neutral-200"
              >
                <div className={`flex h-20 items-end p-3 ${swatchBg[c.token]}`}>
                  <span
                    className={`font-semibold font-ui text-[13px] ${c.dark ? "text-white" : "text-black"}`}
                  >
                    Aa
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-semibold font-ui text-[14px] text-black">
                    {c.name}
                  </p>
                  <p className="tabular font-ui text-[13px] text-neutral-600">
                    {c.hex}
                  </p>
                  <p className="type-ui-sm mt-1 text-neutral-700">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="typografie"
          title="Typografie"
          intro="Outfit für Überschriften, Nunito Sans zum Lesen, Work Sans für die Oberfläche."
        >
          <Specimen label="Display · Outfit 700 · 64/68">
            <p className="type-display">
              Finde die Software, die{" "}
              <span className="textmarker">wirklich passt</span>.
            </p>
          </Specimen>
          <Specimen label="H1 · Outfit 700 · 48/56">
            <p className="type-h1">HR-Software Vergleich 2026</p>
          </Specimen>
          <Specimen label="H2 · Outfit 700 · 36/44">
            <p className="type-h2">Preise im Vergleich</p>
          </Specimen>
          <Specimen label="H3 · Outfit 600 · 24/32">
            <p className="type-h3">So schlägt sich das Tool beim Onboarding</p>
          </Specimen>
          <Specimen label="H4 · Outfit 600 · 20/28">
            <p className="type-h4">Unser Fazit</p>
          </Specimen>
          <Specimen label="Stat · Outfit 700 · 56">
            <p className="type-stat tabular">1.234,50 €</p>
          </Specimen>
          <Specimen label="Lead · Nunito Sans 20/32">
            <p className="type-lead">
              Wir vergleichen Business-Software mit echten Preisen in Euro.
            </p>
          </Specimen>
          <Specimen label="Fließtext · Nunito Sans 17/28">
            <p className="type-body max-w-article">
              Lohnabrechnungssoftware, Dokumentenmanagement-Systeme und
              Zeiterfassungslösungen haben lange Namen – deshalb trennt der
              Browser deutsche Wörter automatisch, sobald es eng wird. Mehr zur{" "}
              <a href="#farben" className="link-marker">
                Textmarker-Verlinkung
              </a>{" "}
              im Fließtext.
            </p>
          </Specimen>
          <Specimen label="UI · Work Sans 500 · 15/22">
            <p className="type-ui">Sortieren nach: Dettingenstack-Score</p>
          </Specimen>
          <Specimen label="Eyebrow · Work Sans 600 · 13">
            <p className="type-eyebrow eyebrow-square">
              Vergleich · HR-Software
            </p>
          </Specimen>
        </Block>

        <Block
          id="buttons"
          title="Buttons"
          intro="Eckig, nie pillenförmig. Fahre über einen Button: Die Fläche läuft von links ein, der Pfeil wandert durch."
        >
          <Specimen label="Varianten · md">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Vergleich starten</Button>
              <Button variant="secondary">Zum ausführlichen Test</Button>
              <Button variant="outline">Alle Vergleiche ansehen</Button>
              <Button variant="ghost" arrow={false}>
                Filter zurücksetzen
              </Button>
            </div>
          </Specimen>
          <Specimen label="Größen · sm / md / lg">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Kosten berechnen</Button>
              <Button size="md">Kosten berechnen</Button>
              <Button size="lg">Kosten berechnen</Button>
            </div>
          </Specimen>
          <Specimen label="Werbelink (Affiliate)">
            <AffiliateButton
              slug="beispiel-hr"
              placement="styleguide"
              note="ab 6,50 € netto"
            />
          </Specimen>
          <Specimen label="Link-Button · deaktiviert">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink
                href={"/styleguide#buttons" as Route}
                variant="outline"
              >
                Als Link
              </ButtonLink>
              <Button disabled>Deaktiviert</Button>
              <Button aria-busy arrow={false}>
                Wird gesendet …
              </Button>
            </div>
          </Specimen>
          <Specimen label="Auf Schwarz">
            <div className="flex flex-wrap gap-3 rounded-lg bg-black p-6">
              <Button>Primär</Button>
              <Button variant="outline">Sekundär</Button>
            </div>
          </Specimen>
        </Block>

        <Block
          id="badges"
          title="Badges & Score"
          intro="Der Dettingenstack-Score ist eine redaktionelle Note von 0 bis 10 – Sterne gibt es erst für echte Nutzerbewertungen."
        >
          <Specimen label="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge variant="award" icon={Award}>
                Unsere Empfehlung · HR-Software 2026
              </Badge>
              <Badge variant="neutral">Kostenlose Testversion</Badge>
              <Badge variant="trust" icon={ShieldCheck}>
                Server in Deutschland
              </Badge>
              <Badge variant="local">Anbieter aus Deutschland</Badge>
              <Badge variant="ad">Anzeige</Badge>
              <Badge variant="positive">Preis gesenkt</Badge>
              <Badge variant="negative">Preis erhöht</Badge>
            </div>
          </Specimen>
          <Specimen label="ScoreBox · sm / md / lg">
            <div className="flex flex-wrap items-end gap-8">
              <ScoreBox score={72} size="sm" />
              <ScoreBox score={87} size="md" />
              <ScoreBox score={93} size="lg" />
              <ScoreBox score={64} size="md" label="beside" />
            </div>
          </Specimen>
          <Specimen label="Bewertung im Detail">
            <ScoreBreakdown rows={breakdown} className="max-w-xl" />
            <p className="type-ui-sm mt-3 text-neutral-600">
              Strich = Durchschnitt der Kategorie. Fahre über ein Kriterium für
              die Notiz.
            </p>
          </Specimen>
          <Specimen label="Tool-Logos mit Monogramm-Fallback">
            <div className="flex flex-wrap items-center gap-4">
              <ToolLogo name="Beispiel HR" size={32} />
              <ToolLogo name="Muster CRM" size={48} />
              <ToolLogo name="Demo Zeit" size={64} />
              <ToolLogo
                name="Probe Shop"
                size={96}
                src="/logos/tools/fehlt.svg"
              />
            </div>
          </Specimen>
          <Specimen label="Kennzahlen">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <StatTile
                icon={ShieldCheck}
                value="6 von 10"
                label="mit Server in Deutschland"
              />
              <StatTile value="4,00 €" label="ab pro Mitarbeitendem/Monat" />
              <StatTile value="25" label="Detail-Vergleiche" />
            </div>
          </Specimen>
        </Block>

        <Block
          id="formulare"
          title="Formulare"
          intro="48 px hoch, gelber Fokusring, Fehler mit Symbol und Text."
        >
          <FormDemo />
          <div className="mt-10">
            <PricingControlsDemo />
          </div>
        </Block>

        <Block
          id="navigation"
          title="Tabs & Akkordeon"
          intro="Die Abschnittsnavigation oben auf dieser Seite ist der sticky Tab-Baustein mit Scroll-Spy."
        >
          <Breadcrumbs
            items={[
              { label: "Vergleiche", href: "/vergleich" },
              { label: "HR-Software", href: "/hr-software" },
              { label: "Beispiel HR vs. Muster Personal" },
            ]}
          />
          <div className="mt-10">
            <Tabs
              label="Kategorie wählen"
              defaultValue="alle"
              tabs={[
                {
                  value: "alle",
                  label: "Alle",
                  content: <p className="type-body">Inhalt für „Alle“.</p>,
                },
                {
                  value: "hr",
                  label: "HR",
                  content: <p className="type-body">Inhalt für „HR“.</p>,
                },
                {
                  value: "crm",
                  label: "CRM",
                  content: <p className="type-body">Inhalt für „CRM“.</p>,
                },
                {
                  value: "buchhaltung",
                  label: "Buchhaltung",
                  content: (
                    <p className="type-body">Inhalt für „Buchhaltung“.</p>
                  ),
                },
              ]}
            />
          </div>
          <div className="mt-12 max-w-3xl">
            <Accordion
              items={[
                {
                  id: "kostenlos",
                  title: "Ist Dettingenstack wirklich kostenlos?",
                  content:
                    "Ja. Du zahlst bei uns nichts. Wir verdienen Geld, wenn du über einen mit * markierten Werbelink eine Software kaufst. Der Preis ändert sich für dich dadurch nicht.",
                },
                {
                  id: "bezahlen",
                  title: "Können Anbieter für bessere Bewertungen bezahlen?",
                  content:
                    "Nein. Der Dettingenstack-Score entsteht nach festen, öffentlich dokumentierten Kriterien. Bezahlte Platzierungen sind als „Anzeige“ gekennzeichnet und stehen außerhalb unserer Rankings.",
                },
              ]}
            />
          </div>
        </Block>

        <Block
          id="tabellen"
          title="Tabellen"
          intro="Zahlen rechtsbündig mit Tabellenziffern, Funktionen nie nur über Farbe."
        >
          <TableScroll label="Beispiel-Funktionsvergleich">
            <Table className="min-w-[560px]">
              <thead>
                <tr>
                  <Th>Funktion</Th>
                  <Th>Beispiel HR</Th>
                  <Th>Muster Personal</Th>
                </tr>
              </thead>
              <tbody>
                <GroupRow label="Abwesenheiten & Zeit" colSpan={3} />
                <tr>
                  <Td>Urlaubs- & Abwesenheitsverwaltung</Td>
                  <Td className="bg-brand-50">
                    <FeatureStatus state="ja" />
                  </Td>
                  <Td>
                    <FeatureStatus state="teilweise" />
                  </Td>
                </tr>
                <tr>
                  <Td>Arbeitszeiterfassung</Td>
                  <Td>
                    <FeatureStatus state="addon" />
                  </Td>
                  <Td>
                    <FeatureStatus state="ja" />
                  </Td>
                </tr>
                <GroupRow label="Lohn & Finanzen" colSpan={3} />
                <tr>
                  <Td>DATEV-Lohn-Export</Td>
                  <Td>
                    <FeatureStatus state="ja" />
                  </Td>
                  <Td>
                    <FeatureStatus state="nein" />
                  </Td>
                </tr>
                <tr>
                  <Td>Startpreis (netto, pro Monat)</Td>
                  <Td numeric>6,50 €</Td>
                  <Td numeric>8,90 €</Td>
                </tr>
              </tbody>
            </Table>
          </TableScroll>
        </Block>

        <Block
          id="karten"
          title="Karten"
          intro="Klickbare Karten: Rahmen wird schwarz, Karte hebt sich um 2 px."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComparisonCard
              href="/vergleich"
              category="HR-Software"
              updatedAt="2026-10-28"
              a={{ name: "Beispiel HR", score: 87 }}
              b={{ name: "Muster Personal", score: 83 }}
              verdict="Beispiel HR punktet bei Abwesenheiten, Muster Personal beim Preis für kleine Teams."
            />
            <ToolCard
              slug="beispiel-hr"
              name="Beispiel HR"
              score={87}
              award="Unsere Empfehlung"
              bestFor="50–500 Mitarbeitende"
              entryPrice="ab 6,50 €"
              trial="14 Tage kostenlos"
              reviewHref="/styleguide"
            />
            <GuideCard
              href="/ratgeber"
              image={
                <ImagePlaceholder
                  id="B-21"
                  label="Ratgeber E-Rechnung"
                  ratio="16/9"
                  className="rounded-none border-0"
                />
              }
              category="Buchhaltung"
              title="E-Rechnungspflicht 2025–2028: Was Unternehmen jetzt wissen müssen"
              description="Ab wann du E-Rechnungen ausstellen musst, welche Formate gelten und was deine Software können muss."
              readingMinutes={12}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <CategoryTile
                key={c.slug}
                href={`/${c.slug}`}
                name={c.name}
                icon={c.icon}
                meta={c.description}
              />
            ))}
          </div>
        </Block>

        <Block
          id="inhalte"
          title="Inhaltsblöcke"
          intro="Bausteine für Testberichte, Vergleiche und Ratgeber."
        >
          <div className="flex max-w-4xl flex-col gap-10">
            <Byline
              author={{ name: "Vorname Nachname", href: "/redaktion" }}
              editor={{ name: "Zweite Person", href: "/redaktion" }}
              updatedAt="2026-10-28"
              pricesCheckedAt="2026-10-28"
              readingMinutes={14}
            />
            <KeyTakeaways
              items={[
                "Beispiel HR ist stark bei Abwesenheiten und Onboarding.",
                <>
                  Ab 150 Mitarbeitenden wird es teurer als Muster Personal.
                  <Cite n={1} />
                </>,
                "Server in Deutschland, AVV online verfügbar.",
              ]}
            />
            <VerdictBox
              summary="Beispiel HR ist die runde Lösung für wachsende Mittelständler, die Urlaub, Onboarding und den DATEV-Export an einem Ort wollen."
              idealFor={[
                "Unternehmen mit 50–500 Mitarbeitenden",
                "Teams mit Lohnabrechnung beim Steuerbüro",
              ]}
              notIdealFor={[
                "Kleinstbetriebe unter 10 Personen – Muster Personal ist günstiger",
              ]}
              score={87}
              cta={
                <AffiliateButton
                  slug="beispiel-hr"
                  placement="verdict"
                  size="sm"
                />
              }
            />
            <ProsCons
              pros={[
                {
                  title: "Klare Abwesenheitsplanung",
                  detail:
                    "Urlaubsanträge sind in drei Klicks gestellt und genehmigt.",
                },
                {
                  title: "DATEV-Export",
                  detail: "Die Lohndaten gehen ohne Umweg an das Steuerbüro.",
                },
              ]}
              cons={[
                {
                  title: "Teuer für große Teams",
                  detail: "Ab 150 Mitarbeitenden steigen die Kosten deutlich.",
                },
                {
                  title: "Recruiting nur als Add-on",
                  detail: "Das Bewerbermanagement kostet extra.",
                },
              ]}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Callout type="tipp">
                Teste mit echten Abläufen, nicht mit der Demo-Tour des
                Anbieters.
              </Callout>
              <Callout type="wichtig">
                Prüfe die Kündigungsfrist vor dem Abschluss.
              </Callout>
              <Callout type="recht">
                Der Betriebsrat hat bei technischen Überwachungseinrichtungen
                ein Mitbestimmungsrecht.
              </Callout>
              <Callout type="test">
                Getestet im Tarif „Core“ mit einem Testteam aus zwölf Personen.
              </Callout>
            </div>
            <Checklist
              items={[
                "Serverstandort geprüft",
                "AVV liegt vor",
                "Kündigungsfrist notiert",
              ]}
            />
            <Steps
              steps={[
                {
                  title: "Markt sichten",
                  text: "Alle relevanten Anbieter für den deutschen Markt erfassen.",
                  visual: (
                    <ImagePlaceholder
                      id="C-01"
                      label="Spot"
                      ratio="1/1"
                      className="w-24"
                    />
                  ),
                },
                {
                  title: "Selbst testen",
                  text: "Echte Aufgaben mit Testzugängen durcharbeiten.",
                  visual: (
                    <ImagePlaceholder
                      id="C-02"
                      label="Spot"
                      ratio="1/1"
                      className="w-24"
                    />
                  ),
                },
                {
                  title: "Preise prüfen",
                  text: "Jeden Tarif für typische Teamgrößen durchrechnen.",
                  visual: (
                    <ImagePlaceholder
                      id="C-03"
                      label="Spot"
                      ratio="1/1"
                      className="w-24"
                    />
                  ),
                },
                {
                  title: "Bewerten",
                  text: "Sechs gewichtete Kriterien ergeben den Score.",
                  visual: (
                    <ImagePlaceholder
                      id="C-04"
                      label="Spot"
                      ratio="1/1"
                      className="w-24"
                    />
                  ),
                },
              ]}
            />
            <Figure
              caption="Abwesenheitskalender im Tarif „Core“"
              capturedAt="2026-10-28"
            >
              <ImagePlaceholder
                id="Screenshot"
                label="Eigener Test-Screenshot"
                ratio="16/10"
                className="rounded-none border-0"
              />
            </Figure>
            <ChangeLog
              entries={[
                {
                  date: "2026-10-28",
                  note: "Preise geprüft, Tarif „Core“ +0,30 €.",
                },
                {
                  date: "2026-07-14",
                  note: "Neuer Abschnitt zum DATEV-Export.",
                },
              ]}
            />
            <Sources
              sources={[
                {
                  name: "Beispielquelle",
                  title: "Beispiel-Statistik zur Digitalisierung",
                  url: "https://example.com/statistik",
                  publishedAt: "2026-03-01",
                  accessedAt: "2026-10-28",
                },
              ]}
            />
          </div>
        </Block>

        <Block
          id="diagramme"
          title="Diagramme"
          intro="Feste Reihenfolge: Schwarz, Gelb mit schwarzer Kontur, Grau. Jedes Diagramm hat eine Datentabelle."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartFrame
              title="Monatliche Kosten für dein Team"
              subtitle="Beispieldaten · in €, netto"
              source="Beispieldaten für den Styleguide"
              date="2026-10-28"
              table={{
                columns: ["Tool", "Preis pro Person"],
                rows: [
                  ["Beispiel HR", "6,50 €"],
                  ["Muster Personal", "8,90 €"],
                  ["Demo People", "4,20 €"],
                  ["Probe Team", "11,50 €"],
                ],
              }}
            >
              <PriceBarChart
                highlight="Beispiel HR"
                data={[
                  { label: "Beispiel HR", cents: 650 * 25 },
                  { label: "Muster Personal", cents: 890 * 25 },
                  { label: "Demo People", cents: 420 * 25 },
                  { label: "Probe Team", cents: 1150 * 25 },
                ]}
              />
            </ChartFrame>
            <ChartFrame
              title="Preisentwicklung Einstiegstarif"
              subtitle="Beispieldaten · pro Person und Monat, netto"
              source="Beispieldaten für den Styleguide"
              date="2026-10-28"
              legend={[
                { label: "Beispiel HR", swatch: "black" },
                { label: "Muster Personal", swatch: "yellow" },
              ]}
              table={{
                columns: ["Monat", "Beispiel HR", "Muster Personal"],
                rows: [
                  ["01/2026", "6,50 €", "8,90 €"],
                  ["05/2026", "6,90 €", "8,90 €"],
                  ["07/2026", "6,90 €", "8,50 €"],
                  ["10/2026", "7,20 €", "8,50 €"],
                ],
              }}
            >
              <PriceHistoryDemo />
            </ChartFrame>
          </div>
        </Block>

        <Block id="feedback" title="Feedback & Zustände">
          <Specimen label="Toast · Tooltip">
            <div className="flex flex-wrap items-center gap-4">
              <ToastDemo />
              <Tooltip content="Netto zzgl. 19 % USt.">
                <button
                  type="button"
                  className="link-marker font-ui text-[15px]"
                >
                  Tooltip anzeigen
                </button>
              </Tooltip>
            </div>
          </Specimen>
          <Specimen label="Vergleichsleiste">
            <CompareDemo />
            <p className="type-ui-sm mt-3 text-neutral-600">
              Wähle Tools aus – die Leiste erscheint unten.
            </p>
          </Specimen>
          <Specimen label="Skeleton">
            <div className="flex max-w-md flex-col gap-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </Specimen>
          <Specimen label="Pagination">
            <Pagination
              page={2}
              pageCount={4}
              hrefFor={(n) => `/styleguide?seite=${n}` as Route}
            />
          </Specimen>
          <Specimen label="Leerer Zustand">
            <EmptyState
              spot={
                <ImagePlaceholder
                  id="C-09"
                  label="Lupe über leerer Liste"
                  ratio="1/1"
                />
              }
              title="Keine Tools gefunden"
              text="Passe deine Filter an oder setze sie zurück."
              action={
                <Button variant="outline" size="sm" arrow={false}>
                  Filter zurücksetzen
                </Button>
              }
            />
          </Specimen>
        </Block>
      </Container>

      <NewsletterBand />

      <MobileStickyCTA afterId="styleguide-kopf">
        <ScoreBox score={87} size="sm" label={false} />
        <span className="min-w-0 flex-1 truncate font-semibold font-ui text-[15px] text-black">
          Beispiel HR
        </span>
        <AffiliateButton
          slug="beispiel-hr"
          placement="sticky-mobile"
          size="sm"
          note={false}
          className="shrink-0"
        />
      </MobileStickyCTA>
    </>
  );
}
