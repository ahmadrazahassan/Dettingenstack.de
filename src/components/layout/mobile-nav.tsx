"use client";

import { Menu, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/disclosure";
import { categories, featuredComparisons, toolLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

// Full-width sheet from the right (§10.10). Every link closes the sheet before navigating.
export function MobileNav({
  className,
  liveSlugs,
}: {
  className?: string;
  liveSlugs: string[];
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkList = (
    links: { href: string; label: string; soon?: boolean }[],
  ) => (
    <ul className="flex flex-col">
      {links.map((l) => (
        <li key={l.href}>
          {l.soon ? (
            <span className="flex items-center gap-2 py-2.5 font-ui text-[16px] text-neutral-500">
              {l.label}
              <span className="rounded-xs bg-neutral-100 px-1.5 font-medium text-[11px] text-neutral-700 uppercase tracking-[0.06em]">
                bald
              </span>
            </span>
          ) : (
            <Link
              href={l.href as Route}
              onNavigate={close}
              className="block rounded-md py-2.5 font-ui text-[16px] text-black"
            >
              {l.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Menü öffnen"
        className={cn(
          "flex size-10 items-center justify-center rounded-md text-black hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-black",
          className,
        )}
      >
        <Menu aria-hidden className="size-6" strokeWidth={1.75} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-70 flex flex-col bg-white data-[state=open]:animate-[sheet-in_250ms_var(--ease-brand)]"
        >
          <Dialog.Title className="sr-only">Menü</Dialog.Title>
          <div className="flex h-16 shrink-0 items-center justify-between border-neutral-200 border-b px-4">
            <Logo />
            <Dialog.Close
              aria-label="Menü schließen"
              className="flex size-10 items-center justify-center rounded-md text-black hover:bg-neutral-100"
            >
              <X aria-hidden className="size-6" strokeWidth={1.75} />
            </Dialog.Close>
          </div>

          <nav
            aria-label="Hauptnavigation"
            className="flex-1 overflow-y-auto px-4"
          >
            <Accordion
              type="single"
              className="border-t-0"
              items={[
                {
                  id: "kategorien",
                  title: "Kategorien",
                  content: linkList(
                    categories.map((c) => ({
                      href: `/${c.slug}`,
                      label: c.name,
                      soon: !liveSlugs.includes(c.slug),
                    })),
                  ),
                },
                {
                  id: "vergleiche",
                  title: "Vergleiche",
                  content: linkList([
                    ...featuredComparisons,
                    { href: "/vergleich", label: "Alle Vergleiche" },
                  ]),
                },
                { id: "tools", title: "Tools", content: linkList(toolLinks) },
              ]}
            />
            <Link
              href={"/ratgeber" as Route}
              onNavigate={close}
              className="flex h-[68px] items-center border-neutral-200 border-b font-semibold font-ui text-[17px] text-black"
            >
              Ratgeber
            </Link>
          </nav>

          <div className="shrink-0 border-neutral-200 border-t p-4">
            <ButtonLink
              href={"/software-finder" as Route}
              fullWidth
              onNavigate={close}
            >
              Software-Finder starten
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
