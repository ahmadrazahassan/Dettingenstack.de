import { ArrowRight, type LucideIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatDate, formatScore } from "@/lib/format";
import type { Tool } from "@/lib/schema";

// Presentational cards (§10.7). Phase 1 wires them to the typed data model.

const interactiveCard =
  "group relative flex min-w-0 flex-col rounded-lg border border-neutral-200 bg-white transition-[border-color,transform,box-shadow] duration-200 ease-brand hover:-translate-y-0.5 hover:border-black hover:shadow-md focus-within:border-black";

// Stretched link: the whole card is clickable, inner buttons stay separately focusable.
function StretchedLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href as Route}
      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}

/* ───── ComparisonCard ───── */

type Side = { name: string; logo?: string; score: number };

export function ComparisonCard({
  href,
  category,
  updatedAt,
  a,
  b,
  verdict,
}: {
  href: string;
  category: string;
  updatedAt: string;
  a: Side;
  b: Side;
  verdict: string;
}) {
  return (
    <article className={cn(interactiveCard, "p-6")}>
      <div className="flex items-center gap-3">
        <ToolLogo name={a.name} src={a.logo} size={48} />
        <span className="flex size-8 items-center justify-center rounded-sm bg-black font-display font-extrabold text-[13px] text-brand">
          vs.
        </span>
        <ToolLogo name={b.name} src={b.logo} size={48} />
      </div>
      <h3 className="type-h4 mt-5">
        <StretchedLink href={href}>
          {a.name} vs. {b.name}
        </StretchedLink>
      </h3>
      <p className="type-ui-sm mt-1 text-neutral-600">
        {category} · aktualisiert am {formatDate(updatedAt)}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        {[a, b].map((side, i) => (
          <div
            key={side.name}
            className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-3"
          >
            <span className="truncate font-ui text-[14px] text-black">
              {side.name}
            </span>
            <span className="h-1.5 rounded-xs bg-neutral-100">
              <span
                className={cn(
                  "block h-full rounded-xs",
                  i === 0
                    ? "bg-black"
                    : "bg-brand ring-1 ring-black ring-inset",
                )}
                style={{ width: `${side.score}%` }}
              />
            </span>
            <span className="tabular text-right font-semibold font-ui text-[14px] text-black">
              {formatScore(side.score)}
            </span>
          </div>
        ))}
      </div>
      <p className="type-small mt-5 text-neutral-700">{verdict}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold font-ui text-[15px] text-black">
        Zum Vergleich
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-1"
          strokeWidth={2}
        />
      </span>
    </article>
  );
}

/* ───── CategoryTile ───── */

export function CategoryTile({
  href,
  name,
  icon: Icon,
  meta,
}: {
  /** Omit for categories without data yet: the tile is shown but not linked. */
  href?: string;
  name: string;
  icon: LucideIcon;
  meta: string;
}) {
  if (!href) {
    return (
      <article className="flex min-w-0 flex-col gap-4 rounded-lg border border-neutral-200 border-dashed bg-white p-5">
        <Icon
          aria-hidden
          className="size-8 text-neutral-400"
          strokeWidth={1.5}
        />
        <div>
          <h3 className="wrap-break-word hyphens-auto font-semibold font-ui text-[16px] text-neutral-600">
            {name}
          </h3>
          <p className="type-ui-sm mt-1 text-neutral-600">{meta}</p>
        </div>
      </article>
    );
  }
  return (
    <article className={cn(interactiveCard, "gap-4 p-5")}>
      <Icon aria-hidden className="size-8 text-black" strokeWidth={1.5} />
      <div>
        <h3 className="wrap-break-word hyphens-auto font-semibold font-ui text-[16px] text-black">
          <StretchedLink href={href}>{name}</StretchedLink>
        </h3>
        <p className="type-ui-sm mt-1 text-neutral-600">{meta}</p>
      </div>
    </article>
  );
}

/* ───── GuideCard ───── */

export function GuideCard({
  href,
  image,
  category,
  title,
  description,
  readingMinutes,
}: {
  href: string;
  image: ReactNode;
  category: string;
  title: string;
  description: string;
  readingMinutes: number;
}) {
  return (
    <article className="group relative flex flex-col">
      <div className="overflow-hidden rounded-lg">{image}</div>
      <p className="type-eyebrow mt-5">{category}</p>
      <h3 className="type-h4 mt-2 group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
        <StretchedLink href={href}>{title}</StretchedLink>
      </h3>
      <p className="type-small mt-2 line-clamp-2 text-neutral-700">
        {description}
      </p>
      <p className="type-ui-sm mt-3 text-neutral-600">
        {readingMinutes} Min. Lesezeit
      </p>
    </article>
  );
}

/* ───── ToolCard ───── */

export function ToolCard({
  slug,
  name,
  logo,
  score,
  award,
  bestFor,
  entryPrice,
  trial,
  affiliate,
  reviewHref,
}: {
  slug: string;
  name: string;
  logo?: string;
  score: number;
  award?: string;
  bestFor: string;
  entryPrice: string;
  /** Display text, e.g. „14 Tage kostenlos“ or „Nicht angegeben“ — unknown is never shown as „nein“. */
  trial: string;
  affiliate?: Tool["affiliate"];
  reviewHref: string;
}) {
  return (
    <article className="flex flex-col rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ToolLogo name={name} src={logo} size={48} />
          <h3 className="type-h4">{name}</h3>
        </div>
        <ScoreBox score={score} size="sm" label={false} />
      </div>
      {award && (
        <Badge variant="award" className="mt-4 self-start">
          {award}
        </Badge>
      )}
      <dl className="mt-5 flex flex-col gap-2 font-ui text-[14px]">
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-600">Am besten für</dt>
          <dd className="text-right text-black">{bestFor}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-600">Startpreis</dt>
          <dd className="tabular text-right font-semibold text-black">
            {entryPrice}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-neutral-600">Testversion</dt>
          <dd className="text-right text-black">{trial}</dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-col gap-3">
        <VendorCTA
          tool={{ slug, name, affiliate }}
          placement="toolcard"
          size="sm"
          fullWidth
          note={false}
        />
        <ButtonLink
          href={reviewHref as Route}
          variant="outline"
          size="sm"
          fullWidth
        >
          Zum Test
        </ButtonLink>
      </div>
    </article>
  );
}
