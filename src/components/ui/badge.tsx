import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const badgeStyles = cva(
  "inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 font-ui font-medium text-[13px] leading-none",
  {
    variants: {
      variant: {
        // Award labels carry the category name and can be long („… · Dokumentenmanagement 2026“): wrap on phones.
        award:
          "h-auto min-h-6 max-w-full whitespace-normal border border-brand-700 bg-brand-50 py-1 text-black leading-tight",
        neutral: "bg-neutral-100 text-black",
        trust: "border border-neutral-300 bg-white text-black",
        ad: "bg-black px-2 text-[11px] text-white uppercase tracking-[0.06em]",
        local: "border border-black bg-white text-black",
        positive: "bg-positive-50 text-positive",
        negative: "bg-negative-50 text-negative",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export function Badge({
  variant,
  icon: Icon,
  className,
  children,
}: VariantProps<typeof badgeStyles> & {
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn(badgeStyles({ variant }), className)}>
      {Icon && <Icon aria-hidden className="size-3.5" strokeWidth={1.75} />}
      {children}
    </span>
  );
}
