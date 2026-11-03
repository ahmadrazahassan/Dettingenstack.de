"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { categories, featuredComparisons, toolLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const topLevel =
  "group inline-flex h-10 items-center gap-1.5 rounded-md px-3 font-medium font-ui text-[15px] text-black transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-black data-[state=open]:bg-neutral-100";

function MenuLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link href={href as Route} className={className}>
        {children}
      </Link>
    </NavigationMenu.Link>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  return (
    <NavigationMenu.Trigger className={topLevel}>
      {children}
      <ChevronDown
        aria-hidden
        className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        strokeWidth={1.75}
      />
    </NavigationMenu.Trigger>
  );
}

// Mega menu (§10.10): full-width panel attached under the header, straight top edge.
export function DesktopNav({
  className,
  liveSlugs,
}: ComponentProps<"nav"> & { liveSlugs: string[] }) {
  return (
    <NavigationMenu.Root
      delayDuration={150}
      className={cn("static", className)}
      aria-label="Hauptnavigation"
    >
      <NavigationMenu.List className="flex items-center gap-1">
        <NavigationMenu.Item>
          <Trigger>Kategorien</Trigger>
          <NavigationMenu.Content>
            <Container className="grid grid-cols-12 gap-8 py-8">
              <div className="col-span-6">
                <p className="type-eyebrow mb-4">Software-Kategorien</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {categories.map(({ slug, name, description, icon: Icon }) =>
                    !liveSlugs.includes(slug) ? (
                      // Category without data yet: shown, but not linked (no 404s).
                      <li key={slug} className="flex gap-3 p-2.5 opacity-60">
                        <Icon
                          aria-hidden
                          className="mt-0.5 size-5 shrink-0 text-black"
                          strokeWidth={1.5}
                        />
                        <span>
                          <span className="flex items-center gap-2 font-semibold font-ui text-[15px] text-black">
                            {name}
                            <span className="rounded-xs bg-neutral-100 px-1.5 font-medium text-[11px] text-neutral-700 uppercase tracking-[0.06em]">
                              bald
                            </span>
                          </span>
                          <span className="block type-ui-sm text-neutral-600">
                            {description}
                          </span>
                        </span>
                      </li>
                    ) : (
                      <li key={slug}>
                        <MenuLink
                          href={`/${slug}`}
                          className="flex gap-3 rounded-md p-2.5 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-black"
                        >
                          <Icon
                            aria-hidden
                            className="mt-0.5 size-5 shrink-0 text-black"
                            strokeWidth={1.5}
                          />
                          <span>
                            <span className="block font-semibold font-ui text-[15px] text-black">
                              {name}
                            </span>
                            <span className="block type-ui-sm text-neutral-600">
                              {description}
                            </span>
                          </span>
                        </MenuLink>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="col-span-3">
                <p className="type-eyebrow mb-4">Beliebte Vergleiche</p>
                <ul className="flex flex-col gap-1">
                  {featuredComparisons.map((c) => (
                    <li key={c.href}>
                      <MenuLink
                        href={c.href}
                        className="block rounded-md px-2.5 py-2 font-ui text-[15px] text-black transition-colors hover:bg-neutral-50"
                      >
                        {c.label}
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-3 flex flex-col rounded-lg bg-neutral-50 p-6">
                <p className="type-h4">Software-Finder</p>
                <p className="type-small mt-2 text-neutral-700">
                  Sechs Fragen, zwei Minuten, eine begründete Shortlist.
                </p>
                <NavigationMenu.Link asChild>
                  <ButtonLink
                    href={"/software-finder" as Route}
                    size="sm"
                    className="mt-auto self-start"
                  >
                    Finder starten
                  </ButtonLink>
                </NavigationMenu.Link>
              </div>
              <div className="col-span-12 border-neutral-200 border-t pt-5">
                <MenuLink
                  href="/kategorien"
                  className="inline-flex items-center gap-2 font-semibold font-ui text-[15px] text-black hover:underline hover:decoration-2 hover:underline-offset-4"
                >
                  Alle Kategorien ansehen
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </MenuLink>
              </div>
            </Container>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <MenuLink href="/vergleich" className={topLevel}>
            Vergleiche
          </MenuLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <MenuLink href="/ratgeber" className={topLevel}>
            Ratgeber
          </MenuLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Trigger>Tools</Trigger>
          <NavigationMenu.Content>
            <Container className="grid grid-cols-4 gap-4 py-8">
              {toolLinks.map(({ href, label, description, icon: Icon }) => (
                <MenuLink
                  key={href}
                  href={href}
                  className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-black"
                >
                  {Icon && (
                    <Icon
                      aria-hidden
                      className="size-6 text-black"
                      strokeWidth={1.5}
                    />
                  )}
                  <span>
                    <span className="block font-semibold font-ui text-[16px] text-black">
                      {label}
                    </span>
                    <span className="block type-ui-sm mt-1 text-neutral-600">
                      {description}
                    </span>
                  </span>
                </MenuLink>
              ))}
            </Container>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute inset-x-0 top-full">
        <NavigationMenu.Viewport className="w-full overflow-hidden rounded-b-lg border-neutral-200 border-b bg-white shadow-lg data-[state=open]:animate-[panel-in_200ms_var(--ease-brand)]" />
      </div>
    </NavigationMenu.Root>
  );
}
