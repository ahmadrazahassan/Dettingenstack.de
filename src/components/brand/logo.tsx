import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/cn";

// Brand mark: a „D“ built from three stacked layers – the software stack – with the middle layer marked in
// Textmarker yellow (the pick we highlight). No background; ink follows the surface (black, or white when inverted).
export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const id = useId();
  const ink = inverted ? "var(--color-white)" : "var(--color-black)";
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("size-8 shrink-0", className)}
    >
      <defs>
        <clipPath id={id}>
          <path d="M4 3h11a13 13 0 0 1 0 26H4z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="32" height="10.5" fill={ink} />
        <rect y="12.5" width="32" height="7" fill="var(--color-brand)" />
        <rect y="21.5" width="32" height="10.5" fill={ink} />
      </g>
    </svg>
  );
}

export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Dettingenstack – zur Startseite"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark inverted={inverted} />
      <span
        className={cn(
          "font-display text-[22px] leading-none font-bold tracking-[-0.03em]",
          inverted ? "text-white" : "text-black",
        )}
      >
        Dettingenstack
      </span>
    </Link>
  );
}
