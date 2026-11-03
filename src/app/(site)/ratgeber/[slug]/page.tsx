import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/cards/cards";
import { KeyTakeaways } from "@/components/content/blocks";
import { Byline, Sources } from "@/components/content/meta";
import { Prose } from "@/components/content/prose";
import { ReadingProgress, TableOfContents } from "@/components/content/reading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteImage } from "@/components/ui/site-image";
import { getAuthor, getGuide, guides, relatedGuides } from "@/data";
import { imagesById } from "@/data/images";
import { categories as navCategories } from "@/data/navigation";
import { guideBody } from "@/lib/guides";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

function load(slug: string) {
  const guide = getGuide(slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({
  params,
}: PageProps<"/ratgeber/[slug]">): Promise<Metadata> {
  const guide = load((await params).slug);
  const image = imagesById[guide.imageId];
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/ratgeber/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      ...(image
        ? {
            images: [
              {
                url: image.src,
                width: image.width,
                height: image.height,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
  };
}

// Blocking on purpose: unknown slugs must return a real 404, which Suspense streaming can't do.
// Every valid slug is prerendered by generateStaticParams, so this costs nothing in practice.
export const instant = false;

// Ratgeber article (§11.13): TOC 240 px + article 720 px, key takeaways on top, sources and related guides below.
export default async function GuidePage({
  params,
}: PageProps<"/ratgeber/[slug]">) {
  const guide = load((await params).slug);
  const { default: Body } = await import(
    `@/content/ratgeber/${guide.slug}.mdx`
  );
  const { headings, readingMinutes } = guideBody(guide.slug);
  const author = getAuthor(guide.authorId);
  const editor = getAuthor(guide.editorId);
  const person = (a: typeof author) => ({
    name: a?.name ?? site.name,
    href: a?.href ?? "/",
    photo: a?.photo,
  });
  const related = relatedGuides(guide);
  const categories = navCategories.filter((c) =>
    (guide.relatedCategories as string[]).includes(c.slug),
  );
  const toc = [
    { id: "kurz", label: "Das Wichtigste in Kürze" },
    ...headings,
    { id: "quellen", label: "Quellen" },
  ];

  return (
    <>
      <ReadingProgress />
      <Container className="pt-10 pb-20">
        <Breadcrumbs
          items={[
            { label: "Ratgeber", href: "/ratgeber" },
            { label: guide.title },
          ]}
        />

        <header className="mt-8 max-w-article">
          <p className="type-eyebrow eyebrow-square">{guide.topic}</p>
          <h1 className="type-h1 mt-3">{guide.title}</h1>
          <p className="type-lead mt-5">{guide.lead}</p>
          <div className="mt-6">
            <Byline
              author={person(author)}
              editor={person(editor)}
              label="Geschrieben von"
              updatedAt={guide.updatedAt}
              readingMinutes={readingMinutes}
            />
          </div>
        </header>

        <div className="mt-10 max-w-[60rem]">
          <SiteImage
            id={guide.imageId}
            ratio="16/9"
            sizes="(min-width: 1024px) 960px, 100vw"
            eager
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[15rem_minmax(0,45rem)] lg:gap-16">
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>

          <article>
            <div id="kurz" className="scroll-mt-32">
              <KeyTakeaways items={guide.keyTakeaways} />
            </div>
            <Prose className="mt-4">
              <Body />
            </Prose>

            {categories.length > 0 && (
              <aside
                aria-label="Passende Kategorien"
                className="mt-12 rounded-lg border border-neutral-200 p-6"
              >
                <p className="type-h4">Passende Software vergleichen</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}` as Route}
                        className="link-marker font-medium font-ui text-[15px]"
                      >
                        {c.name} im Vergleich
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="mt-12 scroll-mt-32">
              <Sources sources={guide.sources} />
            </div>

            {author && (
              <aside
                aria-label="Über die Redaktion"
                className="mt-12 rounded-lg bg-neutral-50 p-6"
              >
                <p className="type-eyebrow">Über die Redaktion</p>
                <p className="type-h4 mt-2">{author.name}</p>
                <p className="type-small mt-2 text-neutral-700">{author.bio}</p>
                <Link
                  href={"/methodik" as Route}
                  className="link-marker mt-3 inline-block font-medium font-ui text-[15px]"
                >
                  So arbeiten wir
                </Link>
              </aside>
            )}
          </article>
        </div>

        {related.length > 0 && (
          <section
            aria-labelledby="weitere-ratgeber"
            className="mt-20 border-neutral-200 border-t pt-14"
          >
            <h2 id="weitere-ratgeber" className="type-h2">
              Weitere Ratgeber
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((g) => (
                <GuideCard
                  key={g.slug}
                  href={`/ratgeber/${g.slug}`}
                  image={
                    <SiteImage
                      id={g.imageId}
                      ratio="16/9"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="rounded-none"
                    />
                  }
                  category={g.topic}
                  title={g.title}
                  description={g.description}
                  readingMinutes={guideBody(g.slug).readingMinutes}
                />
              ))}
            </div>
          </section>
        )}
      </Container>

      <NewsletterBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "de-DE",
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt,
          image: imagesById[guide.imageId]
            ? `${site.url}${imagesById[guide.imageId]?.src}`
            : undefined,
          author: { "@type": "Organization", name: author?.name ?? site.name },
          publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
          },
          mainEntityOfPage: `${site.url}/ratgeber/${guide.slug}`,
        }}
      />
    </>
  );
}
