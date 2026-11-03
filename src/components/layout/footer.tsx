import type { Route } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { liveCategorySlugs } from "@/data";
import { footerColumns } from "@/data/navigation";
import { operator, site } from "@/lib/site";
import { Container } from "./container";

// Black footer (§8.3, §10.10).
export function Footer() {
  const live: string[] = [...liveCategorySlugs];
  return (
    <footer id="seitenende" className="bg-black text-white">
      <Container className="grid grid-cols-1 gap-12 pt-16 pb-10 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="type-small mt-5 max-w-sm text-neutral-300">
            {site.mission}
          </p>
          <div className="mt-8 max-w-sm">
            <p className="mb-3 font-semibold font-ui text-[14px] text-white">
              Newsletter
            </p>
            <NewsletterForm tone="footer" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 font-semibold font-ui text-[14px] text-white">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => {
                  const soon =
                    column.title === "Kategorien" &&
                    !live.includes(link.href.slice(1));
                  return (
                    <li key={link.href}>
                      {soon ? (
                        <span className="font-ui text-[14px] text-neutral-500">
                          {link.label}{" "}
                          <span className="text-[12px]">(bald)</span>
                        </span>
                      ) : (
                        <Link
                          href={link.href as Route}
                          className="font-ui text-[14px] text-neutral-300 decoration-2 decoration-brand underline-offset-4 transition-colors hover:text-white hover:underline"
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
      </Container>

      <div className="border-white/15 border-t">
        <Container className="flex flex-col gap-2 py-6 font-ui text-[13px] text-neutral-400 leading-5 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.buildYear} {operator.legalName} · {operator.city}
          </p>
          <p>
            Alle Preise netto zzgl. USt., sofern nicht anders angegeben. Unsere
            Angebote richten sich an Unternehmen.
          </p>
        </Container>
        <Container className="pb-8 font-ui text-[13px] text-neutral-400 leading-5">
          <p>{site.affiliateFootnote}</p>
        </Container>
      </div>
    </footer>
  );
}
