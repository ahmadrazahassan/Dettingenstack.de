import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Long-form text styles for MDX and legal pages.
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "type-article max-w-article text-neutral-800",
        "[&_h2]:type-h2 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-32",
        "[&_h3]:type-h3 [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_p]:mb-5 [&_strong]:font-semibold [&_strong]:text-black",
        "[&_ul]:mb-5 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-2",
        "[&_ul>li]:relative [&_ul>li]:pl-5 [&_ul>li]:before:absolute [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:left-0 [&_ul>li]:before:size-1.5 [&_ul>li]:before:bg-black [&_ul>li]:before:content-['']",
        "[&_a]:link-marker",
        "[&_dl]:mb-5 [&_dt]:font-semibold [&_dt]:text-black [&_dd]:mb-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Clearly marks text that must be replaced before launch.
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-xs bg-brand-100 px-1 font-ui text-[0.9em] text-black">
      {"{{"}
      {children}
      {"}}"}
    </mark>
  );
}
