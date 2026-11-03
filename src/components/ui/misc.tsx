import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ───── Avatar: the only place where a full circle is allowed (real photos only) ───── */

export function Avatar({
  src,
  name,
  size = 40,
  className,
}: {
  src?: string;
  name: string;
  size?: 32 | 40 | 48 | 96;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-display font-bold text-black ring-2 ring-white",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}

/* ───── Stat tile ───── */

export function StatTile({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: ReactNode;
  label: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Icon && (
        <Icon
          aria-hidden
          className="mb-2 size-8 text-black"
          strokeWidth={1.5}
        />
      )}
      <span className="type-stat tabular">{value}</span>
      <span className="type-ui text-neutral-700">{label}</span>
    </div>
  );
}

/* ───── Skeleton: static pulse, no shimmer gradient ───── */

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block animate-pulse rounded-sm bg-neutral-100", className)}
    />
  );
}

/* ───── Empty state ───── */

export function EmptyState({
  spot,
  title,
  text,
  action,
  className,
}: {
  spot?: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-12 text-center",
        className,
      )}
    >
      {spot && <div className="mb-6 w-40">{spot}</div>}
      <h3 className="type-h4">{title}</h3>
      <p className="type-body mt-2 max-w-md text-neutral-700">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ───── Pagination: 40×40 squares, radius 6 ───── */

export function Pagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => Route;
}) {
  const cell =
    "flex size-10 items-center justify-center rounded-md font-medium font-ui text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-black";
  return (
    <nav aria-label="Seitennavigation" className="flex items-center gap-1">
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          className={cn(cell, "hover:bg-neutral-100")}
          aria-label="Vorherige Seite"
        >
          <ChevronLeft aria-hidden className="size-4" strokeWidth={2} />
        </Link>
      )}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            cell,
            n === page
              ? "bg-black text-white"
              : "text-black hover:bg-neutral-100",
          )}
        >
          {n}
        </Link>
      ))}
      {page < pageCount && (
        <Link
          href={hrefFor(page + 1)}
          className={cn(cell, "hover:bg-neutral-100")}
          aria-label="Nächste Seite"
        >
          <ChevronRight aria-hidden className="size-4" strokeWidth={2} />
        </Link>
      )}
    </nav>
  );
}
