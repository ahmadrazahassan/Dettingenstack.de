import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

// Always starts with „Startseite“; the current page is plain text (§10.10).
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Startseite", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Brotkrumen-Navigation">
        <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[14px] text-neutral-600">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li
                key={crumb.href ?? crumb.label}
                className="flex items-center gap-1.5"
              >
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href as Route}
                    className="hover:text-black hover:underline hover:underline-offset-2"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-black" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    aria-hidden
                    className="size-3.5"
                    strokeWidth={1.75}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            ...(crumb.href
              ? { item: new URL(crumb.href, site.url).toString() }
              : {}),
          })),
        }}
      />
    </>
  );
}
