import type { Route } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { liveCategorySlugs } from "@/data";
import { footerColumns, legalLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { operator, site } from "@/lib/site";
import { Container } from "./container";

const linkClass =
  "font-ui text-[14px] text-neutral-300 leading-5 decoration-2 decoration-brand underline-offset-[6px] transition-colors hover:text-white hover:underline";

// Black footer (§8.3, §10.10): brand + newsletter, four link columns, then a quiet bottom bar with the legal links.
export function Footer() {
  const live: string[] = [...liveCategorySlugs];
  const [categories, comparisons, tools, about] = footerColumns;
  return (
    <footer id="seitenende" className="bg-black text-white">
      <Container className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <Logo inverted />
            <p className="type-small mt-5 text-neutral-400">{site.mission}</p>
          </div>
          <div className="w-full max-w-md">
            <p className="mb-3 font-semibold font-ui text-[14px] text-white">
              Einmal im Monat: neue Preise und Vergleiche
            </p>
            <NewsletterForm tone="footer" />
          </div>
        </div>

        {/* Kategorien spans two tracks (two short lists), Vergleiche and Tools share one, so the columns end level. */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 border-white/10 border-t pt-12 lg:mt-16 lg:grid-cols-4 lg:pt-14">
          {[[categories], [comparisons, tools], [about]].map((group) => (
            <div
              key={group[0].title}
              className={cn(
                "flex flex-col gap-12",
                group[0] === categories && "col-span-2",
              )}
            >
              {group.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <h2 className="mb-5 font-semibold font-ui text-[14px] text-white">
                    {column.title}
                  </h2>
                  <ul
                    className={cn(
                      "gap-x-8 [&>li+li]:mt-3",
                      column === categories &&
                        "sm:columns-2 sm:[&>li+li]:mt-0 sm:[&>li]:mb-3",
                    )}
                  >
                    {column.links.map((link) => {
                      const soon =
                        column === categories &&
                        !live.includes(link.href.slice(1));
                      return (
                        <li key={link.href}>
                          {soon ? (
                            <span className="font-ui text-[14px] text-neutral-600 leading-5">
                              {link.label}{" "}
                              <span className="text-[12px]">(bald)</span>
                            </span>
                          ) : (
                            <Link
                              href={link.href as Route}
                              className={linkClass}
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              ))}
            </div>
          ))}
        </div>
      </Container>

      <div className="border-white/10 border-t">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="font-ui text-[13px] text-neutral-400 leading-5">
            © {site.buildYear} {operator.legalName} · {operator.city}
          </p>
          <nav aria-label="Rechtliches">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className={cn(linkClass, "text-[13px]")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
        <Container className="flex flex-col gap-1 pb-8 font-ui text-[12px] text-neutral-500 leading-5">
          <p>
            Alle Preise netto zzgl. USt., sofern nicht anders angegeben. Unsere
            Angebote richten sich an Unternehmen.
          </p>
          <p>{site.affiliateFootnote}</p>
        </Container>
      </div>
    </footer>
  );
}
