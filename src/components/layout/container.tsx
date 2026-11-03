import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ComponentProps<"div"> & { as?: ElementType }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-page px-4 sm:px-6", className)}
      {...props}
    />
  );
}

const tones = {
  white: "bg-white",
  neutral: "bg-neutral-50",
  brand: "bg-brand",
  black: "bg-black text-white",
} as const;

export function Section({
  tone = "white",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn("py-16 lg:py-24", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

// Section heading block: eyebrow, H2, optional intro.
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl lg:mb-12", className)}>
      {eyebrow && <p className="type-eyebrow eyebrow-square mb-3">{eyebrow}</p>}
      <h2 id={id} className="type-h2">
        {title}
      </h2>
      {intro && <p className="type-lead mt-3">{intro}</p>}
    </div>
  );
}
