import { ClipboardCheck, ReceiptEuro, Scale, ShieldCheck } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { CategoryTile, ComparisonCard } from "@/components/cards/cards";
import { RankingTable } from "@/components/category/ranking";
import { Steps } from "@/components/content/blocks";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/layout/container";
import { HeroSearch } from "@/components/layout/hero-search";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/disclosure";
import { SiteImage } from "@/components/ui/site-image";
import { comparisons, getCategory, getTool, liveCategorySlugs } from "@/data";
import { categories as navCategories } from "@/data/navigation";
import {
  categoryRanking,
  categoryStats,
  priceChanges,
  rankedTool,
  siteStats,
} from "@/lib/derive";
import { formatDate, formatEUR, formatPercent, scoreLabel } from "@/lib/format";
import { perUnit, priceShort } from "@/lib/labels";
import { searchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: {
    absolute: "Dettingenstack – Business-Software unabhängig vergleichen",
  },
  description:
    "Business-Software unabhängig verglichen: echte Preise in Euro, Serverstandort, DATEV-Anbindung und ehrlich benannte Schwächen. Kostenlos für dich.",
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: "Ist Dettingenstack wirklich kostenlos?",
    a: "Ja. Du zahlst bei uns nichts. Wenn wir künftig an einem Kauf über einen Link verdienen, markieren wir ihn mit * als Werbelink. Der Preis ändert sich für dich dadurch nicht.",
  },
  {
    q: "Können Anbieter für bessere Bewertungen bezahlen?",
    a: "Nein. Der Dettingenstack-Score entsteht nach festen, öffentlich dokumentierten Kriterien. Bezahlte Platzierungen wären als „Anzeige“ gekennzeichnet und stehen außerhalb unserer Rankings.",
  },
  {
    q: "Woher stammen die Preise?",
    a: "Von den Preisseiten der Anbieter. Bei jedem Preis steht das Prüfdatum. Veröffentlicht ein Anbieter keinen Preis, schreiben wir „auf Anfrage“ – wir schätzen nicht.",
  },
  {
    q: "Sind die Preise netto oder brutto?",
    a: "Standardmäßig zeigen wir Nettopreise zzgl. 19 % USt., weil sich Dettingenstack an Unternehmen richtet. Mit dem Schalter „Brutto“ siehst du die Preise inklusive Umsatzsteuer.",
  },
];

const pillars = [
  {
    icon: ClipboardCheck,
    key: "tools",
    label: "im Vergleich",
    text: "Jede Software bewerten wir nach denselben sechs Kriterien – dokumentiert und nachvollziehbar.",
    href: "/methodik",
    cta: "So bewerten wir",
  },
  {
    icon: ReceiptEuro,
    key: "prices",
    label: "mit Prüfdatum",
    text: "Alle Preise in Euro und netto. Was nicht veröffentlicht ist, nennen wir „auf Anfrage“.",
    href: "/preisindex",
    cta: "Zum Preisindex",
  },
  {
    icon: Scale,
    key: "comparisons",
    label: "im Detail",
    text: "Zwei Tools, Funktion für Funktion – mit klarer Empfehlung je Situation.",
    href: "/vergleich",
    cta: "Alle Vergleiche",
  },
  {
    icon: ShieldCheck,
    key: "free",
    label: "für dich",
    text: "Bewertungen kann man bei uns nicht kaufen. Wie wir uns finanzieren, legen wir offen.",
    href: "/transparenz",
    cta: "So finanzieren wir uns",
  },
] as const;

export default function HomePage() {
  const stats = siteStats();
  const hr = getCategory("hr-software");
  const ranking = hr ? categoryRanking(hr) : [];
  const top = ranking[0];
  const latestChanges = priceChanges().slice(0, 5);
  const pillarValue = {
    tools: `${stats.tools} Tools`,
    prices: `${stats.pricePoints} Preise`,
    comparisons: `${stats.comparisons} Duelle`,
    free: "0 €",
  };

  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="type-eyebrow eyebrow-square mb-5">
              Unabhängiger Software-Vergleich
            </p>
            <h1 className="type-display">
              Finde die Business-Software, die{" "}
              <span className="textmarker textmarker-animate">
                wirklich zu dir passt
              </span>
              .
            </h1>
            <p className="type-lead mt-6 max-w-xl">
              Wir vergleichen Business-Software mit echten Preisen in Euro,
              Serverstandort und Funktionen – und benennen Schwächen ehrlich.
              Kostenlos und unabhängig.
            </p>
            <div className="mt-8 max-w-xl">
              <HeroSearch index={searchIndex()} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="type-ui-sm mr-1 text-neutral-600">Beliebt:</span>
              {[
                { href: "/buchhaltungssoftware", label: "Buchhaltung" },
                { href: "/hr-software", label: "HR-Software" },
                {
                  href: "/vergleich/lexware-office-vs-sevdesk",
                  label: "Lexware Office vs. sevdesk",
                },
                {
                  href: "/vergleich/personio-vs-hr-works",
                  label: "Personio vs. HR WORKS",
                },
                { href: "/kostenrechner", label: "Kostenrechner" },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href as Route}
                  className="inline-flex h-8 items-center rounded-sm bg-neutral-100 px-3 font-ui text-[14px] text-black transition-colors hover:bg-neutral-200"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <SiteImage
                  id="A-01"
                  ratio="4/5"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  eager
                />
                <SiteImage
                  id="A-03"
                  ratio="1/1"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="hidden sm:block"
                />
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <SiteImage
                  id="A-02"
                  ratio="4/3"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  eager
                />
                <SiteImage
                  id="A-04"
                  ratio="3/2"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="hidden sm:block"
                />
              </div>
            </div>
            {top && hr && (
              <Link
                href={`/software/${top.tool.slug}` as Route}
                className="absolute bottom-6 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-transform hover:-translate-y-0.5 sm:left-6"
              >
                <ToolLogo
                  name={top.tool.name}
                  src={top.tool.logo?.src}
                  size={32}
                />
                <span className="min-w-0">
                  <span className="type-eyebrow block text-[11px]">
                    Unsere Empfehlung · {hr.nameShort}
                  </span>
                  <span className="block font-semibold font-ui text-[15px] text-black">
                    {top.tool.name}
                  </span>
                  <span className="type-ui-sm block text-neutral-600">
                    {priceShort(top.tool)} {perUnit[hr.unit]}
                  </span>
                </span>
                <ScoreBox score={top.overall} size="sm" label={false} />
              </Link>
            )}
            <p className="mt-3 text-right font-ui text-[12px] text-neutral-500">
              Symbolbilder, KI-generiert
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Kennzahlen" className="border-neutral-200 border-y">
        <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.key}
              className="flex flex-col gap-2 border-neutral-200 border-b py-10 last:border-b-0 sm:px-6 sm:first:pl-0 lg:border-r lg:border-b-0 lg:py-14 lg:last:border-r-0"
            >
              <p.icon
                aria-hidden
                className="mb-2 size-8 text-black"
                strokeWidth={1.5}
              />
              <p className="type-stat tabular">{pillarValue[p.key]}</p>
              <p className="type-ui text-neutral-700">{p.label}</p>
              <p className="type-small mt-2 text-neutral-700">{p.text}</p>
              <Link
                href={p.href as Route}
                className="link-marker mt-2 self-start font-medium font-ui text-[15px]"
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </Container>
      </section>

      <Section>
        <SectionHeading
          title="Beliebte Vergleiche"
          intro="Die Duelle, die Unternehmen in Deutschland am häufigsten beschäftigen."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((c) => {
            const category = getCategory(c.category);
            const a = getTool(c.toolA);
            const b = getTool(c.toolB);
            const ra = category && a ? rankedTool(category, a.slug) : undefined;
            const rb = category && b ? rankedTool(category, b.slug) : undefined;
            if (!category || !a || !b || !ra || !rb) return null;
            return (
              <ComparisonCard
                key={c.slug}
                href={`/vergleich/${c.slug}`}
                category={category.name}
                updatedAt={c.updatedAt}
                a={{ name: a.name, logo: a.logo?.src, score: ra.overall }}
                b={{ name: b.name, logo: b.logo?.src, score: rb.overall }}
                verdict={`${c.verdict.summary.split(". ")[0]}.`}
              />
            );
          })}
        </div>
        <ButtonLink
          href={"/vergleich" as Route}
          variant="outline"
          className="mt-10"
        >
          Alle Vergleiche ansehen
        </ButtonLink>
      </Section>

      <Section tone="neutral">
        <SectionHeading
          title="Alle Kategorien auf einen Blick"
          intro="Wir bauen Kategorie für Kategorie auf – jeweils erst, wenn Preise und Funktionen geprüft sind."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {navCategories.map((c) => {
            const live = (liveCategorySlugs as readonly string[]).includes(
              c.slug,
            );
            const data = live ? getCategory(c.slug) : undefined;
            const s = data ? categoryStats(data) : null;
            const meta = s
              ? `${s.count} Tools · ab ${s.minEntryPrice != null ? formatEUR(s.minEntryPrice) : "–"}`
              : "In Vorbereitung";
            return (
              <CategoryTile
                key={c.slug}
                href={`/${c.slug}`}
                name={c.name}
                icon={c.icon}
                meta={meta}
              />
            );
          })}
        </div>
      </Section>

      {hr && ranking.length > 0 && (
        <Section>
          <SectionHeading
            title={`Unsere Bestenliste: ${hr.name}`}
            intro={`Sortiert nach Dettingenstack-Score. Aktuell vorn: ${ranking[0]?.tool.name} mit „${scoreLabel(ranking[0]?.overall ?? 0)}“.`}
          />
          <RankingTable ranking={ranking.slice(0, 3)} category={hr} />
          <Link
            href={`/${hr.slug}` as Route}
            className="link-marker mt-6 inline-block font-medium font-ui text-[16px]"
          >
            Zur vollständigen Bestenliste {hr.name}
          </Link>
        </Section>
      )}

      <Section tone="neutral">
        <SectionHeading title="Entscheide mit Zahlen statt Bauchgefühl" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              id: "B-02",
              href: "/vergleichen",
              title: "Vergleichstool",
              text: "Bis zu vier Tools nebeneinander: Funktionen, Preise, Datenschutz.",
              cta: "Vergleich starten",
            },
            {
              id: "B-03",
              href: "/kostenrechner",
              title: "Kostenrechner",
              text: "Was kostet die Software für dein Team wirklich – inklusive Einrichtung?",
              cta: "Kosten berechnen",
            },
            {
              id: "B-04",
              href: "/software-finder",
              title: "Software-Finder",
              text: "Sechs Fragen, zwei Minuten, eine begründete Shortlist.",
              cta: "Finder starten",
            },
          ].map((t) => (
            <article
              key={t.href}
              className="flex flex-col rounded-lg border border-neutral-200 bg-white p-6"
            >
              <SiteImage
                id={t.id}
                ratio="4/3"
                sizes="(min-width: 768px) 30vw, 100vw"
              />
              <h3 className="type-h3 mt-6">{t.title}</h3>
              <p className="type-small mt-2 text-neutral-700">{t.text}</p>
              <ButtonLink
                href={t.href as Route}
                size="sm"
                variant="secondary"
                className="mt-6 self-start"
              >
                {t.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Software-Preise im Blick"
          intro="Wir prüfen Preise regelmäßig und dokumentieren jede Änderung."
        />
        {latestChanges.length === 0 ? (
          <p className="type-body max-w-3xl text-neutral-800">
            Bisher hat keiner der erfassten Anbieter einen Tarifpreis geändert.
            Wir speichern {stats.pricePoints} Preispunkte
            {stats.latestPriceCheck
              ? `, zuletzt geprüft am ${formatDate(stats.latestPriceCheck)}`
              : ""}
            . Jede Änderung erscheint hier und im Preisindex.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200 border-neutral-200 border-y">
            {latestChanges.map((c) => {
              const up = (c.after ?? 0) > (c.before ?? 0);
              const delta =
                c.before && c.after ? (c.after - c.before) / c.before : null;
              return (
                <li
                  key={`${c.tool.slug}-${c.planName}-${c.date}`}
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4"
                >
                  <span className="type-ui-sm w-24 text-neutral-600 tabular">
                    {formatDate(c.date)}
                  </span>
                  <Link
                    href={`/software/${c.tool.slug}/preise` as Route}
                    className="min-w-40 font-semibold font-ui text-[15px] text-black hover:underline"
                  >
                    {c.tool.name}{" "}
                    <span className="font-normal text-neutral-600">
                      · {c.planName}
                    </span>
                  </Link>
                  <span className="type-ui tabular text-neutral-800">
                    {c.before != null ? formatEUR(c.before) : "–"} →{" "}
                    {c.after != null ? formatEUR(c.after) : "–"}
                  </span>
                  <Badge variant={up ? "negative" : "positive"}>
                    {up ? "Preis erhöht" : "Preis gesenkt"}
                    {delta != null
                      ? ` · ${delta > 0 ? "+" : ""}${formatPercent(delta)}`
                      : ""}
                  </Badge>
                </li>
              );
            })}
          </ul>
        )}
        <Link
          href={"/preisindex" as Route}
          className="link-marker mt-6 inline-block font-medium font-ui text-[16px]"
        >
          Zum Preisindex
        </Link>
      </Section>

      <Section tone="neutral">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SiteImage
              id="B-01"
              ratio="4/5"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
          </div>
          <div className="lg:col-span-8">
            <SectionHeading title="So entstehen unsere Bewertungen" />
            <Steps
              steps={[
                {
                  visual: <SiteImage id="C-01" sizes="80px" className="w-20" />,
                  title: "Markt sichten",
                  text: "Wir erfassen die relevanten Anbieter für den deutschen Markt – nicht nur die, die Provision zahlen.",
                },
                {
                  visual: <SiteImage id="C-02" sizes="80px" className="w-20" />,
                  title: "Fakten prüfen",
                  text: "Preise, Serverstandort und Zertifikate lesen wir direkt beim Anbieter nach und speichern das Prüfdatum.",
                },
                {
                  visual: <SiteImage id="C-03" sizes="80px" className="w-20" />,
                  title: "Praxistest",
                  text: "Mit Testzugängen arbeiten wir echte Aufgaben durch. Bis dahin kennzeichnen wir Bewertungen als Analyse auf Basis von Herstellerangaben.",
                },
                {
                  visual: <SiteImage id="C-04" sizes="80px" className="w-20" />,
                  title: "Bewerten",
                  text: "Sechs gewichtete Kriterien ergeben den Dettingenstack-Score. Mindestens einmal im Jahr prüfen wir neu.",
                },
              ]}
            />
            <Link
              href={"/methodik" as Route}
              className="link-marker mt-8 inline-block font-medium font-ui text-[16px]"
            >
              Unsere Methodik im Detail
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Ratgeber für bessere Software-Entscheidungen" />
        <Link
          href={"/hr-software#kaufberatung" as Route}
          className="group grid grid-cols-1 items-center gap-8 rounded-lg border border-neutral-200 p-4 transition-colors hover:border-black md:grid-cols-12 md:p-6"
        >
          <span className="md:col-span-5">
            <SiteImage
              id="B-14"
              ratio="16/9"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </span>
          <span className="md:col-span-7">
            <span className="type-eyebrow block">
              Kaufberatung · HR-Software
            </span>
            <span className="type-h3 mt-2 block group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
              HR-Software auswählen: Worauf es wirklich ankommt
            </span>
            <span className="type-small mt-3 block text-neutral-700">
              Kernfunktionen, Gesamtkosten, DATEV, Datenschutz, Betriebsrat und
              Zeiterfassungspflicht – in sieben Punkten.
            </span>
            <span className="type-ui-sm mt-3 block text-neutral-600">
              8 Min. Lesezeit
            </span>
          </span>
        </Link>
        <Link
          href={"/ratgeber" as Route}
          className="link-marker mt-6 inline-block font-medium font-ui text-[16px]"
        >
          Alle Ratgeber
        </Link>
      </Section>

      <Section tone="neutral">
        <SectionHeading title="Häufige Fragen zu Dettingenstack" />
        <div className="max-w-3xl">
          <Accordion
            type="single"
            items={faqs.map((f, i) => ({
              id: `faq-${i}`,
              title: f.q,
              content: f.a,
            }))}
          />
        </div>
      </Section>

      <NewsletterBand />
    </>
  );
}
