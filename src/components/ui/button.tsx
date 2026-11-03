import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Premium CTA system (§10.1): one button family, square corners, sweep + looping arrow on hover.
export const buttonStyles = cva(
  "group relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-ui font-semibold tracking-[-0.005em] transition-[background-color,color,box-shadow,transform] duration-200 ease-brand active:translate-y-px disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-black shadow-[inset_0_-2px_0_rgb(0_0_0/0.14)] motion-reduce:hover:bg-brand-600",
        secondary: "bg-black text-white hover:bg-neutral-800",
        outline:
          "bg-white text-black ring-1 ring-black ring-inset hover:text-white motion-reduce:hover:bg-black",
        ghost: "bg-transparent text-black hover:bg-neutral-100",
      },
      size: {
        sm: "h-10 px-4 text-[15px]",
        md: "h-12 px-5 text-base",
        lg: "h-14 px-7 text-[17px]",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;
type Arrow = "internal" | "external" | false;

function ButtonInner({
  variant,
  arrow,
  children,
}: {
  variant: ButtonStyleProps["variant"];
  arrow: Arrow;
  children: ReactNode;
}) {
  const Icon = arrow === "external" ? ArrowUpRight : ArrowRight;
  const sweep =
    variant === "primary" || variant == null
      ? "bg-brand-600"
      : variant === "outline"
        ? "bg-black"
        : null;

  return (
    <>
      {sweep && (
        <span
          aria-hidden
          className={cn(
            "-z-10 absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-brand group-hover:scale-x-100 motion-reduce:hidden",
            sweep,
          )}
        />
      )}
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            "-mr-1 relative inline-flex size-5 overflow-hidden",
            variant === "secondary" &&
              "transition-colors group-hover:text-brand",
          )}
        >
          <Icon
            strokeWidth={2}
            className="absolute inset-0 size-5 transition-transform duration-300 ease-brand group-hover:translate-x-[120%] motion-reduce:transition-none"
          />
          <Icon
            strokeWidth={2}
            className="-translate-x-[120%] absolute inset-0 size-5 transition-transform duration-300 ease-brand group-hover:translate-x-0 motion-reduce:hidden"
          />
        </span>
      )}
    </>
  );
}

type ButtonProps = ComponentProps<"button"> &
  ButtonStyleProps & { arrow?: Arrow };

export function Button({
  className,
  variant,
  size,
  fullWidth,
  arrow = "internal",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      <ButtonInner variant={variant} arrow={arrow}>
        {children}
      </ButtonInner>
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> &
  ButtonStyleProps & { href: Route; arrow?: Arrow };

export function ButtonLink({
  className,
  variant,
  size,
  fullWidth,
  arrow = "internal",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      <ButtonInner variant={variant} arrow={arrow}>
        {children}
      </ButtonInner>
    </Link>
  );
}

// Plain anchor in the button system, for external links (new tab).
export function ButtonAnchor({
  className,
  variant,
  size,
  fullWidth,
  arrow = "external",
  children,
  ...props
}: ComponentProps<"a"> & ButtonStyleProps & { arrow?: Arrow }) {
  return (
    <a
      target="_blank"
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      <ButtonInner variant={variant} arrow={arrow}>
        {children}
      </ButtonInner>
    </a>
  );
}

// Affiliate CTA (§10.1): always via /go/{slug}, marked with * and the "Werbelink" microcopy.
export function AffiliateButton({
  slug,
  placement,
  label = "Zum Anbieter",
  note,
  size,
  fullWidth,
  className,
}: {
  slug: string;
  placement: string;
  label?: string;
  /** Extra microcopy after „*Werbelink“. `false` hides the line where space is tight (the footnote stays global). */
  note?: string | false;
  size?: ButtonStyleProps["size"];
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col gap-1.5",
        fullWidth && "w-full",
        className,
      )}
    >
      <a
        href={`/go/${slug}?p=${encodeURIComponent(placement)}`}
        target="_blank"
        rel="sponsored noopener"
        className={buttonStyles({ variant: "primary", size, fullWidth })}
      >
        <ButtonInner variant="primary" arrow="external">
          {label}*
        </ButtonInner>
      </a>
      {note !== false && (
        <span className="type-ui-sm text-neutral-600">
          *Werbelink{note ? ` · ${note}` : ""}
        </span>
      )}
    </span>
  );
}
